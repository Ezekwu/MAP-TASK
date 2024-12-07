import { useQuery, useQueryClient } from '@tanstack/react-query';

import useThisAndNextWeekAssignmentsData from '../data/useThisAndNextWeekAssignmentsData';

export function useThisAndNextWeekAssignmentsQuery(userId?: string) {
  const queryClient = useQueryClient();

  const queryKey = ['thisAndNextWeekSchedules', userId];

  const query = useQuery({
    queryKey,
    queryFn: async () => {
      try {
        const response = await useThisAndNextWeekAssignmentsData();

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
