import { Dayjs } from 'dayjs';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import Meal, { MealType } from '@/types/Meal';

import UiButton from '../ui/UiButton';
import UiTag from '../ui/UiTag';

// ---

interface Props {
  mealType: MealType;
  meal: Meal;
  onChangeMeal: () => void;
}
export default function ScheduleOverviewMealItem({
  meal,
  mealType = MealType.BREAKFAST,
  onChangeMeal,
}: Props) {
  const { t } = useTranslation();

  const times: Record<MealType, string> = {
    breakfast: '9:00 AM',
    lunch: '1:30 PM',
    dinner: '4:00 PM',
  };

  const nutrients = useMemo(() => {
    return Object.entries(meal.nutrients).map(
      ([key, value]) => `${value}${key === 'kcal' ? '' : 'g'} ${key}`,
    );
  }, [meal]);

  return (
    <div className="flex gap-4">
      <img
        src={meal.img}
        alt={`${meal.name} eatritewithlulu`}
        className="w-52 h-48 rounded-xl"
      />
      <div>
        <div className="text-sm text-typography-base font-semibold mb-2">
          {meal.name}
        </div>
        <div className="flex flex-wrap gap-1 mb-4">
          {nutrients.map((nutrient, index) => (
            <UiTag variant="primary" key={`${nutrient}-${index}`}>
              {nutrient}
            </UiTag>
          ))}
        </div>
        <p className="text-[12px] text-typography-disabled mb-4">
          {t('general.meals-will-be-delivered-by', { time: times[mealType] })}
        </p>
        <UiButton variant="tertiary" onClick={onChangeMeal}>
          {t('actions.change-meal-option')}
        </UiButton>
      </div>
    </div>
  );
}
