import Meal from '@/types/Meal';
import { useMemo } from 'react';
import UiTag from '../ui/UiTag';
import UiButton from '../ui/UiButton';
import UiIcon from '../ui/UiIcon';

interface Props {
  btnLabel?: string;
  onAction: (data: Meal) => void;
  meal: Meal;
  isMealInTray?: boolean;
}
export default function MealCard(props: Props) {
  const nutrients = useMemo(() => {
    return Object.entries(props.meal.nutrients).map(
      ([key, value]) => `${value}${key === 'kcal' ? '' : 'g'} ${key}`,
    );
  }, [props.meal]);

  console.log(props.isMealInTray);

  return (
    <div className="w-56 flex flex-col justify-between">
      <div>
        <div className=" overflow-hidden rounded relative">
          {props.meal.highCalorie && (
            <div className="bg-primary-500 text-typography-light font-extrabold text-[10px] py-1 px-4 absolute rounded-br-xl">
              HIGH CALORIE
            </div>
          )}
          <img
            src={props.meal.img}
            alt={props.meal.name}
            className="w-full rounded-xl"
          />
          {props.isMealInTray && (
            <div className="absolute top-0 left-0 bg-[#00000099] rounded-xl w-full h-full flex justify-center items-center">
              <UiIcon icon="CheckMarkDouble" />
            </div>
          )}
        </div>
        <div className="text-sm font-semibold text-typography-base my-2">
          {props.meal.name}
        </div>
        <div className="flex flex-wrap gap-1 mb-4">
          {nutrients.map((nutrient, index) => (
            <UiTag variant="primary" key={`${nutrient}-${index}`}>
              {nutrient}
            </UiTag>
          ))}
        </div>
      </div>
      <div>
        <div className="text-secondary-1300 text-sm font-semibold mb-2">
          &#8358; {props.meal.price.toLocaleString()}
        </div>
        <UiButton
          variant="tertiary"
          block
          disabled={props.isMealInTray}
          onClick={() => props.onAction(props.meal)}
        >
          {props.btnLabel || 'Add to Tray'}
        </UiButton>
      </div>
    </div>
  );
}
