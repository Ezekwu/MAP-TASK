import { WeeklyMealSchedule } from '@/types/WeeklyMealSchedule';
import { Api } from '..';

export default function useScheduleData(
  scheduleId: string,
): Promise<WeeklyMealSchedule> {
  return Api.getSchedule(scheduleId);
}
