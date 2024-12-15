import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import dayjs, { Dayjs } from 'dayjs';

import Meal, { MealType } from '@/types/Meal';

import UiModal from '../ui/UiModal';
import ScheduleOverviewMealItem from './ScheduleOverviewMealItem';

interface Schedule {
  day: Dayjs;
  formattedDay: string;
  meals: Record<MealType, Meal | null>;
}

interface Props {
  schedule: Schedule;
  isOpen: boolean;
  onClose: () => void;
  onSwapMeal: (param: { day: Dayjs; type: MealType }) => void;
}
export default function DayScheduleOverviewModal({
  isOpen,
  schedule,
  onSwapMeal,
  onClose,
}: Props) {
  if (!schedule) return <></>;

  const { t } = useTranslation();

  const availableMealTypes = useMemo(() => {
    return Object.keys(schedule.meals).filter((type) =>
      Boolean(schedule.meals[type as MealType]),
    ) as MealType[];
  }, [schedule]);

  const isSwapDurationPast = useMemo(() => {
    const fridayOfCurrentWeek = dayjs()
      .startOf('week')
      .add(5, 'days')
      .endOf('day');

    return dayjs().isAfter(fridayOfCurrentWeek, 'day');
  }, [dayjs()]);

  function handleChangeMeal(type: MealType) {
    onSwapMeal({ type, day: schedule?.day });
  }

  return (
    <UiModal
      title={schedule.formattedDay}
      alignRight
      isOpen={isOpen}
      onClose={onClose}
    >
      {availableMealTypes.map((type) => (
        <div
          key={type}
          className="p-4 border-b last:border-b-transparent border-[#EBEBEF]"
        >
          <div className="text-secondary-1300 text-base font-semibold mb-4">
            {t(`general.${type}`)}
          </div>
          <ScheduleOverviewMealItem
            meal={schedule.meals[type]!}
            mealType={type}
            isWithinSwapDuration={!isSwapDurationPast}
            onChangeMeal={() => handleChangeMeal(type)}
          />
        </div>
      ))}
    </UiModal>
  );
}
