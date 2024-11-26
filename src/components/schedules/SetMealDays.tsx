import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import useMealsQuery from '@/api/query/useMealsQuery';

import { MealType } from '@/types/Meal';
import {
  DaySchedule,
  MealEntry,
  WeeklyMealSchedule,
} from '@/types/WeeklyMealSchedule';

import UiButton from '../ui/UiButton';

import MealItem from './MealItem';

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

  function onSelectDay({ id, day: selectedDay }: { id: string; day: string }) {
    setUpdatedSchedule((prevSchedule) => {
      // Create a copy of the current schedule to maintain immutability
      const updatedDays = [...prevSchedule.days];
      let mealToUpdate: MealEntry | undefined;

      // Find and remove the meal from its current day
      updatedDays.forEach((daySchedule) => {
        const mealIndex = daySchedule.meals[mealType]?.findIndex(
          ({ mealId }) => mealId === id,
        );

        if (mealIndex !== undefined && mealIndex > -1) {
          // Remove the meal
          mealToUpdate = daySchedule.meals[mealType]?.splice(mealIndex, 1)[0];
        }
      });

      if (!mealToUpdate) return prevSchedule;

      // Check if the selected day already exists in the schedule
      const dayIndex = updatedDays.findIndex((day) => day.day === selectedDay);

      if (dayIndex > -1) {
        // Update the existing day's meals
        const targetDaySchedule = { ...updatedDays[dayIndex] };
        targetDaySchedule.meals[mealType] = [
          ...(targetDaySchedule.meals[mealType] || []),
          { ...mealToUpdate, day: selectedDay },
        ];
        updatedDays[dayIndex] = targetDaySchedule;
      } else {
        // Insert the new day at the correct position, preserving order
        const newDaySchedule = {
          day: selectedDay,
          meals: {
            [MealType.BREAKFAST]:
              MealType.BREAKFAST === mealType
                ? [{ ...mealToUpdate, day: selectedDay }]
                : undefined,
            [MealType.LUNCH]:
              MealType.LUNCH === mealType
                ? [{ ...mealToUpdate, day: selectedDay }]
                : undefined,
            [MealType.DINNER]:
              MealType.DINNER === mealType
                ? [{ ...mealToUpdate, day: selectedDay }]
                : undefined,
          },
        };

        // Insert the new day at the same level as others in sorted order
        const insertionIndex = updatedDays.findIndex(
          (day) => day.day > selectedDay,
        );
        if (insertionIndex === -1) {
          // If no larger date is found, add to the end
          updatedDays.push(newDaySchedule);
        } else {
          // Insert before the first day with a larger date
          updatedDays.splice(insertionIndex, 0, newDaySchedule);
        }
      }

      return { ...prevSchedule, days: updatedDays };
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
            return daySchedule.meals[typedMealType]?.map((mealSchedule) => {
              const foundMeal = findMealById(mealSchedule.mealId)!;
              return (
                <MealItem
                  key={mealSchedule.mealId}
                  meal={foundMeal}
                  day={mealSchedule.day}
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
