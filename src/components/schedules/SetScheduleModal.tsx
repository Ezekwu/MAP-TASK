import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Api } from '@/api';

import useToggle from '@/hooks/useToggle';

import { MealType } from '@/types/Meal';
import { DaySchedule, WeeklyMealSchedule } from '@/types/WeeklyMealSchedule';

import { generateUuid, removeUndefined } from '@/utils/helpers';
import { Toast } from '@/utils/toast';

import UiModal from '../ui/UiModal';

import useScheduleSteps, { Steps } from './steps';

import SelectMeals from './SelectMeals';
import SetMealDays from './SetMealDays';
import SetScheduleForm from './SetScheduleForm';

// ---

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onDone: (schedule: WeeklyMealSchedule) => void;
  schedule?: WeeklyMealSchedule | null;
}
export default function SetScheduleModal({
  schedule,
  isOpen,
  onClose,
  onDone,
}: Props) {
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

  const loading = useToggle();

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

  async function submitSchedule({ name }: { name: string }) {
    try {
      loading.on();

      const schedule = {
        name,
        id: localSchedule.id || generateUuid(),
        days: removeUndefined(localSchedule.days) as DaySchedule[],
        createdAt: Date.now(),
      };

      await Api.setSchedule(schedule);

      Toast.success({ msg: t('messages.schedule-created') });

      onDone(schedule);
    } catch (err) {
      console.error(err);
    } finally {
      loading.off();
    }
  }

  const steps = {
    [Steps.FORM]: (
      <SetScheduleForm
        schedule={localSchedule}
        loading={loading.value}
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

  useEffect(() => {
    if (!schedule) return;

    setLocalSchedule(schedule);
  }, [schedule]);

  return (
    <UiModal isOpen={isOpen} title={title} onClose={onClose}>
      {steps[step]}
    </UiModal>
  );
}
