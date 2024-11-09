import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useGetUserData } from '../data/useGetUserData';

export function useGetUserQuery(userId: string) {
  const queryClient = useQueryClient();

  const queryKey = ['user', userId];

  const query = useQuery({
    queryKey,
    queryFn: async () => {
      try {
        const response = await useGetUserData();

        return response;
      } catch (err) {
        return Promise.reject(err);
      }
    },
  });

  function reloadQuery() {
    queryClient.invalidateQueries({ queryKey });
  }

  return {
    query,
    reloadQuery,
  };
}
