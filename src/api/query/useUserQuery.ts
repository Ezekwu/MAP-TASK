import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useUserData } from '../data/useUserData';

export function useUserQuery(userId: string) {
  const queryClient = useQueryClient();

  const queryKey = ['user', userId];

  const query = useQuery({
    queryKey,
    queryFn: async () => {
      try {
        const response = await useUserData(userId);

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
