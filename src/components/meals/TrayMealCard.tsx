import { useMemo } from 'react';

import UiIcon from '../ui/UiIcon';
import UiTag from '../ui/UiTag';

import Meal from '@/types/Meal';

export interface TrayMeal extends Meal {
  quantity: number;
}

interface Props {
  meal: TrayMeal;
  removeMeal: (mealId: string) => void;
}

export default function TrayMealCard({ meal, removeMeal }: Props) {
  const nutrients = useMemo(() => {
    return Object.entries(meal.nutrients).map(
      ([key, value]) => `${value}${key === 'kcal' ? '' : 'g'} ${key}`,
    );
  }, [meal]);

  return (
    <article className="flex gap-4 ">
      <button
        onClick={() => removeMeal(meal.id)}
        className="group overflow-hidden rounded-xl relative w-full"
      >
        {/* {meal.highCalorie && (
          <div className="bg-primary-500 text-typography-light font-extrabold text-[10px] py-1 px-4 absolute rounded-br-xl">
            HIGH CALORIE
          </div>
        )} */}
        <img
          src={meal.img}
          alt={meal.name}
          className="w-full rounded-xl group-hover:scale-110 transition-transform duration-300 ease-in-out"
        />
        <div className="absolute top-0 left-0 bg-[#00000099] rounded-xl w-full h-full flex justify-center items-center">
          <UiIcon icon="Trash" />
        </div>
      </button>
      <div className="w-full">
        <div className="text-sm font-semibold text-typography-base my-2">
          {meal.name}
        </div>
        <div className="flex flex-wrap gap-1 mb-4">
          {nutrients.map((nutrient, index) => (
            <UiTag variant="primary" key={`${nutrient}-${index}`}>
              {nutrient}
            </UiTag>
          ))}
        </div>
        {/* incrementer */}

        <div className="text-secondary-1300 text-sm font-semibold mb-2">
          &#8358; {meal.price.toLocaleString()}
        </div>
      </div>
    </article>
  );
}
