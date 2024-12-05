import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import useMealsQuery from '@/api/query/useMealsQuery';

import { MealType } from '@/types/Meal';
import { MealEntry, WeeklyMealSchedule } from '@/types/WeeklyMealSchedule';

import UiButton from '../ui/UiButton';

import MealItem from './MealItem';

interface Props {
  schedule: WeeklyMealSchedule;
  mealType?: MealType;
  goBack: () => void;
  onChange: (data: WeeklyMealSchedule) => void;
  onDone: (data: WeeklyMealSchedule) => void;
}
export default function SetMealDays({
  schedule,
  onChange,
  onDone,
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
      const updatedDays = [...prevSchedule.days];
      let mealToUpdate: MealEntry | undefined;

      updatedDays.forEach((daySchedule) => {
        const mealIndex = daySchedule.meals[mealType]?.findIndex(
          ({ mealId }) => mealId === id,
        );

        if (mealIndex !== undefined && mealIndex > -1) {
          mealToUpdate = daySchedule.meals[mealType]?.splice(mealIndex, 1)[0];
        }
      });

      if (!mealToUpdate) return prevSchedule;

      const dayIndex = updatedDays.findIndex((day) => day.day === selectedDay);

      if (dayIndex > -1) {
        const targetDaySchedule = { ...updatedDays[dayIndex] };
        targetDaySchedule.meals[mealType] = [
          ...(targetDaySchedule.meals[mealType] || []),
          { ...mealToUpdate, day: selectedDay },
        ];
        updatedDays[dayIndex] = targetDaySchedule;
      } else {
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

        const insertionIndex = updatedDays.findIndex(
          (day) => day.day > selectedDay,
        );
        if (insertionIndex === -1) {
          updatedDays.push(newDaySchedule);
        } else {
          updatedDays.splice(insertionIndex, 0, newDaySchedule);
        }
      }

      return { ...prevSchedule, days: updatedDays };
    });
  }

  function handleGoBack() {
    onChange(updatedSchedule);

    goBack();
  }

  function handleDone() {
    const sanitizedSchedule = {
      ...updatedSchedule,
      days: updatedSchedule.days.filter(({ day }) => Boolean(day)),
    };

    onDone(sanitizedSchedule);
  }

  return (
    <div>
      <p className="text-sm text-[#585B5A] mx-8 py-2">
        {t('modals.set-schedule.select-day-of-week')}
      </p>
      <div className="max-h-[55vh] overflow-auto grid gap-4">
        {updatedSchedule.days.flatMap(
          (daySchedule) =>
            daySchedule.meals[mealType]?.map((mealSchedule) => {
              const foundMeal = findMealById(mealSchedule.mealId)!;
              return (
                <MealItem
                  key={mealSchedule.mealId}
                  meal={foundMeal}
                  day={mealSchedule.day || ''}
                  onSelectDay={onSelectDay}
                />
              );
            }),
        )}
      </div>
      <div className="p-4 border-t border-tertiary-700 grid grid-cols-2 gap-2">
        <UiButton
          block
          variant="tertiary-outlined"
          size="lg"
          onClick={handleGoBack}
        >
          {t('actions.back')}
        </UiButton>
        <UiButton block variant="tertiary" size="lg" onClick={handleDone}>
          {t('actions.add-meals')}
        </UiButton>
      </div>
    </div>
  );
}
