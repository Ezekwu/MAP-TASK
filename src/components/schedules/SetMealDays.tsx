import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import useMealsQuery from '@/api/query/useMealsQuery';

import { MealType } from '@/types/Meal';
import { DaySchedule, WeeklyMealSchedule } from '@/types/WeeklyMealSchedule';

import UiButton from '../ui/UiButton';

import MealItem from './MealItem';

import { Steps } from './steps';

interface Props {
  schedule: WeeklyMealSchedule;
  mealType?: MealType;
  goBack: () => void;
}

export default function SetMealDays({
  schedule,
  mealType = MealType.BREAKFAST,
  goBack,
}: Props) {
  const { t } = useTranslation();

  const { findMealById } = useMealsQuery();

  const [updatedSchedule, setUpdatedSchedule] =
    useState<WeeklyMealSchedule>(schedule);

  useEffect(() => {
    setUpdatedSchedule(schedule);
  }, [schedule]);

  function onSelectDay({ id, day }: { id: string; day: string }) {
    setUpdatedSchedule((prevSchedule) => {
      const newDays = prevSchedule.days.map((daySchedule: DaySchedule) => {
        const updatedMeals = daySchedule.meals[mealType]?.map((meal) =>
          meal.mealId === id ? { ...meal, day } : meal,
        );

        return {
          ...daySchedule,
          meals: {
            ...daySchedule.meals,
            [mealType]: updatedMeals,
          },
        };
      });

      return { ...prevSchedule, days: newDays };
    });
  }

  return (
    <div>
      <p className="text-sm text-[#585B5A] mx-8 py-2">
        {t('modals.set-schedule.select-day-of-week')}
      </p>
      <div className="max-h-[55vh] overflow-auto grid gap-4">
        {updatedSchedule.days.flatMap((daySchedule) =>
          Object.keys(daySchedule.meals).map((mealType) => {
            const typedMealType = mealType as keyof typeof daySchedule.meals;
            return daySchedule.meals[typedMealType]?.map((meal) => {
              const foundMeal = findMealById(meal.mealId)!;
              return (
                <MealItem
                  key={meal.mealId}
                  meal={foundMeal}
                  showDay
                  onSelectDay={onSelectDay}
                />
              );
            });
          }),
        )}
      </div>
      <div className="p-4 border-t border-tertiary-700 grid grid-cols-2 gap-2">
        <UiButton block variant="tertiary-outlined" size="lg" onClick={goBack}>
          {t('actions.back')}
        </UiButton>
        <UiButton block variant="tertiary" size="lg">
          {t('actions.add-meals')}
        </UiButton>
      </div>
    </div>
  );
}
