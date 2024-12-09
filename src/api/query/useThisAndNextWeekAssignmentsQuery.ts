import { useQuery, useQueryClient } from '@tanstack/react-query';

import useThisAndNextWeekAssignmentsData from '../data/useThisAndNextWeekAssignmentsData';
import ScheduleAssignment from '@/types/ScheduleAssignment';

export function useThisAndNextWeekAssignmentsQuery(userId?: string) {
  const queryClient = useQueryClient();

  const queryKey = ['thisAndNextWeekSchedules', userId || ''];

  const query = useQuery({
    queryKey,
    queryFn: async () => {
      try {
        const response = await useThisAndNextWeekAssignmentsData(userId);

        return response;
      } catch (err) {
        return Promise.reject(err);
      }
    },
  });

  function reloadQuery() {
    queryClient.invalidateQueries({ queryKey });
  }

  function setData(
    param: ScheduleAssignment | ScheduleAssignment[],
    addToThisWeek: boolean = false,
  ) {
    queryClient.setQueryData<{
      thisWeekSchedules: ScheduleAssignment[];
      nextWeekSchedules: ScheduleAssignment[];
    }>(queryKey, (oldData) => {
      if (!oldData) {
        return {
          thisWeekSchedules: addToThisWeek
            ? Array.isArray(param)
              ? param
              : [param]
            : [],
          nextWeekSchedules: !addToThisWeek
            ? Array.isArray(param)
              ? param
              : [param]
            : [],
        };
      }

      const updatedData = { ...oldData };

      const targetKey = addToThisWeek
        ? 'thisWeekSchedules'
        : 'nextWeekSchedules';

      const newSchedules = Array.isArray(param) ? param : [param];

      updatedData[targetKey] = [...updatedData[targetKey], ...newSchedules];

      return updatedData;
    });
  }

  return {
    query,
    setData,
    reloadQuery,
  };
}
