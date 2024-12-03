import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useUsersData } from '../data/useUsersData';
import User from '@/types/User';
export function useUsersQuery() {
  const queryClient = useQueryClient();

  const queryKey = ['users'];

  const query = useQuery({
    queryKey,
    queryFn: async () => {
      try {
        const response = await useUsersData();
        return response;
      } catch (err) {
        return Promise.reject(err);
      }
    },
  });

  function reloadQuery() {
    queryClient.invalidateQueries({ queryKey });
  }

  function setData(newUser: User) {
    queryClient.setQueryData<User[]>(queryKey, (oldData) => {
      if (!oldData) return [newUser];

      const index = oldData.findIndex((user) => user.id === newUser.id);

      if (index !== -1) {
        const updatedData = [...oldData];
        updatedData[index] = { ...updatedData[index], ...newUser };
        return updatedData;
      }

      return [...oldData, newUser];
    });
  }

  return {
    query,
    reloadQuery,
    setData,
  };
}
