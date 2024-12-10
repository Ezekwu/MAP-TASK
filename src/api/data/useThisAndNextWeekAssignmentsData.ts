import ScheduleAssignment from '@/types/ScheduleAssignment';

import { Api } from '..';

export default function useThisAndNextWeekAssignmentsData(): Promise<{
  thisWeekSchedules: ScheduleAssignment[];
  nextWeekSchedules: ScheduleAssignment[];
}> {
  return Api.getThisAndNextWeekSchedules();
}
