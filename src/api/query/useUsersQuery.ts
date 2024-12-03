import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useUsersData } from '../data/useUsersData';
import User from '@/types/User';
import FilterData from '@/types/FilterData';
import { useMemo } from 'react';

export function useUsersQuery(filter?: FilterData) {
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

  const users = useMemo(() => {
    return queryClient.getQueryData<User[]>(queryKey) || [];
  }, [queryClient, queryKey]);

  const filteredData = useMemo(() => {
    if (!users) return [];

    if (!filter) return users;

    if (!filter.key || !filter.value) return users;

    const foundUsers = users.filter((user) => {
      if (filter.key === 'plan') {
        return user.plan?.plan === filter.value;
      }

      return user[filter.key as keyof User] === filter.value;
    });

    return foundUsers;
  }, [filter, users]);

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
    filteredData,
    reloadQuery,
    setData,
  };
}
