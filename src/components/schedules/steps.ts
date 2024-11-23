import { useSteps } from '@/hooks/useSteps';

export enum Steps {
  FORM = 'set-schedule-form',
  SELECT_MEALS = 'select-meals',
  ASSIGN_TO_USERS = 'assign-schedule-to-users',
}

export default function useScheduleSteps() {
  const { resetStep, nextStep, isStep, step } = useSteps(Steps.SELECT_MEALS);

  return { resetStep, nextStep, isStep, step };
}
