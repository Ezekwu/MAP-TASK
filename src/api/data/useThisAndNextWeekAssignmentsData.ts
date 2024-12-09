import ScheduleAssignment from '@/types/ScheduleAssignment';

import { Api } from '..';

export default function useThisAndNextWeekAssignmentsData(
  userId?: string,
): Promise<{
  thisWeekSchedules: ScheduleAssignment[];
  nextWeekSchedules: ScheduleAssignment[];
}> {
  return Api.getThisAndNextWeekSchedules(userId);
}
