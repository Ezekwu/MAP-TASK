import { useMemo } from 'react';

import Meal from '@/types/Meal';

import UiTag from '../ui/UiTag';

interface Props {
  btnLabel?: string;
  onSelect: (id: string) => void;
  meal: Meal;
}
export default function MealItem({ meal, onSelect }: Props) {
  const nutrients = useMemo(() => {
    return Object.entries(meal.nutrients).map(
      ([key, value]) => `${value}${key === 'kcal' ? '' : 'g'} ${key}`,
    );
  }, [meal]);

  return (
    <div
      className="flex gap-2 border-b-dashed p-4 cursor-pointer"
      onClick={() => onSelect(meal.id)}
    >
      <div className="relative  rounded overflow-hidden w-32 h-32">
        {meal.highCalorie && (
          <div className="bg-primary-500 text-typography-light text-[8px] py-1 px-4 absolute rounded-br-xl">
            HIGH CALORIE
          </div>
        )}
        <img src={meal.img} alt={meal.name} className="w-32 h-32 rounded" />
      </div>
      <div style={{ width: 'calc(100% - 128px)' }}>
        <div className="flex justify-between items-center">
          <div className="text-sm font-semibold text-typography-base my-2">
            {meal.name}
          </div>
          <UiTag variant="tertiary" rounded="pill">
            Monday
          </UiTag>
        </div>
        <div className="flex flex-wrap gap-1 mb-4">
          {nutrients.map((nutrient, index) => (
            <UiTag variant="primary" key={`${nutrient}-${index}`}>
              {nutrient}
            </UiTag>
          ))}
        </div>
      </div>
    </div>
  );
}
