import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { MealType } from '@/types/Meal';
import { WeeklyMealSchedule } from '@/types/WeeklyMealSchedule';

import UiModal from '../ui/UiModal';

import useScheduleSteps, { Steps } from './steps';

import SelectMeals from './SelectMeals';
import SetMealDays from './SetMealDays';
import SetScheduleForm from './SetScheduleForm';
import { Api } from '@/api';

// ---

interface Props {
  isOpen: boolean;
  onClose: () => void;
  schedule?: WeeklyMealSchedule;
}
export default function SetScheduleModal({ schedule, isOpen, onClose }: Props) {
  const { t } = useTranslation();

  const { step, nextStep } = useScheduleSteps();

  const [mealTypeToFill, setMealTypeToFill] = useState<MealType>();
  const [localSchedule, setLocalSchedule] = useState<WeeklyMealSchedule>(
    schedule || {
      id: '',
      name: '',
      days: [],
    },
  );

  const title = useMemo(() => {
    if (schedule) return t('modals.set-schedule.update-title');

    return t('modals.set-schedule.create-title');
  }, [schedule]);

  function onSelectMealType(type: MealType) {
    setMealTypeToFill(type);
    nextStep(Steps.SELECT_MEALS);
  }

  function handleSelectedMeals(updatedSchedule: WeeklyMealSchedule) {
    setLocalSchedule(updatedSchedule);
    nextStep(Steps.SET_MEAL_DAYS);
  }

  function handleMealsAndDaysSelected(updatedSchedule: WeeklyMealSchedule) {
    setLocalSchedule(updatedSchedule);

    setMealTypeToFill(undefined);

    nextStep(Steps.FORM);
  }

  async function submitSchedule() {
    try {
      await Api.setSchedule(localSchedule);

      onClose();
    } catch (err) {}
  }

  const steps = {
    [Steps.FORM]: (
      <SetScheduleForm
        schedule={localSchedule}
        onSelectMealType={onSelectMealType}
        onSubmit={submitSchedule}
      />
    ),
    [Steps.SELECT_MEALS]: (
      <SelectMeals
        mealType={mealTypeToFill}
        weeklyMealSchedule={localSchedule}
        onDone={handleSelectedMeals}
        onUpdateSchedule={setLocalSchedule}
        goBack={() => nextStep(Steps.FORM)}
      />
    ),
    [Steps.SET_MEAL_DAYS]: (
      <SetMealDays
        schedule={localSchedule}
        mealType={mealTypeToFill}
        onChange={setLocalSchedule}
        goBack={() => nextStep(Steps.SELECT_MEALS)}
        onDone={handleMealsAndDaysSelected}
      />
    ),
  };

  return (
    <UiModal isOpen={isOpen} title={title} onClose={onClose}>
      {steps[step]}
    </UiModal>
  );
}
