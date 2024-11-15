import Meal from '@/types/Meal';
import { useMemo } from 'react';
import UiTag from '../ui/UiTag';
import UiButton from '../ui/UiButton';

interface Props {
  meal: Meal;
}
export default function MealCard(props: Props) {
  const nutrients = useMemo(() => {
    return Object.entries(props.meal.nutrients).map(
      ([key, value]) => `${value} ${key}`,
    );
  }, [props.meal]);

  return (
    <div className="w-56 flex flex-col justify-between">
      <div>
        <img src={props.meal.img} alt={props.meal.name} className="w-full" />
        <div className="text-sm font-semibold text-typography-base my-2">
          {props.meal.name}
        </div>
        <div className="flex flex-wrap gap-1 mb-4">
          {nutrients.map((nutrient) => (
            <UiTag variant="primary">{nutrient}</UiTag>
          ))}
        </div>
      </div>
      <div>
        <div className="text-secondary-1300 text-sm font-semibold mb-2">
          &#8358; {props.meal.price.toLocaleString()}
        </div>
        <UiButton variant="tertiary" block>
          Add to Tray
        </UiButton>
      </div>
    </div>
  );
}
