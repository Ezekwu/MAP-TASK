import { useQuery, useQueryClient } from '@tanstack/react-query';

import useSchedulesData from '../data/useSchedulesData';
import useScheduleData from '../data/useScheduleData';

export function useScheduleQuery(scheduleId?: string) {
  const queryClient = useQueryClient();

  const queryKey = ['schedule', scheduleId];

  const query = useQuery({
    queryKey,
    queryFn: async () => {
      try {
        if (!scheduleId) return null;

        return useScheduleData(scheduleId);
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
