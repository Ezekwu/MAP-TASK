import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { MealType } from '@/types/Meal';

import UiModal from '../ui/UiModal';

import useScheduleSteps, { Steps } from './steps';

import SetScheduleForm from './SetScheduleForm';
import SelectMeals from './SelectMeals';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  schedule?: Record<string, string>;
}
export default function SetScheduleModal(props: Props) {
  const { t } = useTranslation();

  const { step } = useScheduleSteps();

  const [mealTypeToFill, setMealTypeToFill] = useState<MealType>();

  const title = useMemo(() => {
    if (props.schedule) return t('modals.set-schedule.update-title');

    return t('modals.set-schedule.create-title');
  }, [props.schedule]);

  function setSchedule() {}

  function onSelectMealType(type: MealType) {
    setMealTypeToFill(type);
  }

  const steps = {
    [Steps.FORM]: (
      <SetScheduleForm
        schedule={props.schedule}
        onSelectMealType={onSelectMealType}
      />
    ),
    [Steps.SELECT_MEALS]: <SelectMeals mealType={mealTypeToFill} />,
    [Steps.ASSIGN_TO_USERS]: (
      <SetScheduleForm
        schedule={props.schedule}
        onSelectMealType={onSelectMealType}
      />
    ),
  };

  return (
    <UiModal isOpen={props.isOpen} title={title} onClose={props.onClose}>
      {steps[step]}
    </UiModal>
  );
}
