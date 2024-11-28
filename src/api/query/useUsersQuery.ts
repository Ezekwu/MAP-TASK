import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useUsersData } from '../data/useUsersData';

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

  return {
    query,
    reloadQuery,
  };
}
