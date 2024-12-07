import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { MealType } from '@/types/Meal';
import { WeeklyMealSchedule } from '@/types/WeeklyMealSchedule';

import UiIcon from '../ui/UiIcon';
import UiButton, { BtnVariants } from '../ui/UiButton';
import UiDropDownMenu from '../ui/UiDropdownMenu';

const variants: Record<string, BtnVariants> = {
  pending: 'warning-light',
  active: 'primary-light',
  inactive: 'tertiary',
};

interface Props {
  schedule: WeeklyMealSchedule;
  state?: keyof typeof variants;
}
export default function ScheduleCard({ schedule, state = 'inactive' }: Props) {
  const { t } = useTranslation();

  const numOfMeals = useMemo(() => {
    let mealCount = 0;

    schedule.days.forEach((day) => {
      for (const mealType in day.meals) {
        mealCount += day.meals[mealType as MealType]?.length || 0;
      }
    });

    return mealCount;
  }, [schedule]);

  const availableMealTypes = useMemo(() => {
    const mealTypesSet = new Set();

    schedule.days.forEach((day) => {
      if (day.meals) {
        Object.keys(day.meals).forEach((mealType) => {
          mealTypesSet.add(mealType);
        });
      }
    });

    const mealTypesArray = Array.from(mealTypesSet)
      .sort()
      .map((type) => t(`general.${type}`));

    if (mealTypesArray.length === 1) {
      return mealTypesArray[0];
    }

    const lastMealType = mealTypesArray.pop();

    return `${mealTypesArray.join(', ')} & ${lastMealType}`;
  }, [schedule]);

  return (
    <div className="border border-tertiary-700 bg-[#F9F9F9] rounded-2xl p-2 w-[360px]">
      <div className="text-center font-medium capitalize text-xs text-typography-base mb-4">
        {schedule.name}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-secondary-400 rounded-lg p-4 grid gap-5">
          <UiIcon icon="Meal" />
          <span className="text-xs">{numOfMeals} meals added</span>
        </div>
        <div className="bg-secondary-400 rounded-lg p-4 grid gap-5">
          <UiIcon icon="Meal" />
          <span className="text-xs">{availableMealTypes}</span>
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <UiButton variant={variants[state]} disabled size="lg" block>
          {t(`actions.${state}`)}
        </UiButton>
        <UiDropDownMenu options={[]} triggerSize="lg" itemId="" />
      </div>
    </div>
  );
}
