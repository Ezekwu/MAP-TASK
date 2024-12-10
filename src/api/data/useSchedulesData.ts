import { WeeklyMealSchedule } from '@/types/WeeklyMealSchedule';
import { Api } from '..';

export default function useSchedulesData(): Promise<WeeklyMealSchedule[]> {
  return Api.getSchedules();
}
