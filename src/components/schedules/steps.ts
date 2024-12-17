import { useSteps } from '@/hooks/useSteps';

export enum Steps {
  FORM = 'set-schedule-form',
  SELECT_MEALS = 'select-meals',
  SET_MEAL_DAYS = 'set-meal-days',
}

export default function useScheduleSteps() {
  const { resetStep, nextStep, isStep, step } = useSteps(Steps.FORM);

  return { resetStep, nextStep, isStep, step };
}