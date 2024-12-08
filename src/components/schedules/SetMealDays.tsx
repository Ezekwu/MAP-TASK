import { useEffect, useMemo, useState } from 'react';
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

  const WEEKDAY_ORDER = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];

  const sortedMeals = useMemo(() => {
    return sortByWeekday(
      updatedSchedule.days.flatMap(
        (daySchedule) =>
          daySchedule.meals[mealType]?.map((mealSchedule) => ({
            day: daySchedule.day,
            mealType,
            mealId: mealSchedule.mealId,
          })) || [],
      ),
    );
  }, [updatedSchedule]);

  const weekDayOptions = useMemo(() => {
    const options = [
      {
        label: t('options.sunday'),
        value: 'sunday',
      },
      {
        label: t('options.monday'),
        value: 'monday',
      },
      {
        label: t('options.tuesday'),
        value: 'tuesday',
      },
      {
        label: t('options.wednesday'),
        value: 'wednesday',
      },
      {
        label: t('options.thursday'),
        value: 'thursday',
      },
      {
        label: t('options.friday'),
        value: 'friday',
      },
      {
        label: t('options.saturday'),
        value: 'saturday',
      },
    ].map((option) => {
      const alreadySelectedDaysSet = new Set();

      updatedSchedule.days.forEach((day) => {
        if (day.meals[mealType]?.[0]?.day)
          alreadySelectedDaysSet.add(day.meals[mealType]?.[0]?.day);
      });

      return { ...option, disabled: alreadySelectedDaysSet.has(option.value) };
    });

    return options;
  }, [updatedSchedule]);

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

  function sortByWeekday(data: any) {
    return data.sort(
      (a: any, b: any) =>
        WEEKDAY_ORDER.indexOf(a.day.toLowerCase()) -
        WEEKDAY_ORDER.indexOf(b.day.toLowerCase()),
    );
  }

  useEffect(() => {
    setUpdatedSchedule(schedule);
  }, [schedule]);

  return (
    <div>
      <p className="text-sm text-[#585B5A] mx-8 py-2">
        {t('modals.set-schedule.select-day-of-week')}
      </p>
      <div className="max-h-[55vh] overflow-auto grid gap-4">
        {sortedMeals.map((mealSchedule: MealEntry) => {
          const foundMeal = findMealById(mealSchedule.mealId);
          if (!foundMeal) return null;

          return (
            <MealItem
              key={mealSchedule.mealId}
              meal={foundMeal}
              weekdayOptions={weekDayOptions}
              day={mealSchedule.day}
              onSelectDay={onSelectDay}
            />
          );
        })}
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
