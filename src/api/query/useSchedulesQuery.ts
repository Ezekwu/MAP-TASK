import { useQuery, useQueryClient } from '@tanstack/react-query';

import { WeeklyMealSchedule } from '@/types/WeeklyMealSchedule';
import useSchedulesData from '../data/useSchedulesData';

export function useSchedulesQuery() {
  const queryClient = useQueryClient();

  const queryKey = ['schedules'];

  const query = useQuery({
    queryKey,
    queryFn: async () => {
      try {
        const response = await useSchedulesData();

        return response;
      } catch (err) {
        return Promise.reject(err);
      }
    },
  });

  function reloadQuery() {
    queryClient.invalidateQueries({ queryKey });
  }

  function setData(newSchedule: WeeklyMealSchedule) {
    queryClient.setQueryData<WeeklyMealSchedule[]>(queryKey, (oldData) => {
      if (!oldData) return [newSchedule];

      const index = oldData.findIndex(
        (schedule) => schedule.id === newSchedule.id,
      );

      if (index !== -1) {
        const updatedData = [...oldData];
        updatedData[index] = { ...updatedData[index], ...newSchedule };
        return updatedData;
      }

      return [...oldData, newSchedule];
    });
  }

  function removeData(scheduleId: string) {
    queryClient.setQueryData<WeeklyMealSchedule[]>(queryKey, (oldData) => {
      if (!oldData) return [];

      return oldData.filter((schedule) => schedule.id !== scheduleId);
    });
  }

  return {
    query,
    reloadQuery,
    setData,
    removeData,
  };
}
