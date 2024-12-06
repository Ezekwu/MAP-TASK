import { useMemo } from 'react';

import MealPlan from '@/types/MealPlan';

import UiButton from '../ui/UiButton';
import UiIcon from '../ui/UiIcon';

interface Props {
  mealPlan: MealPlan;
  isColumn?: boolean;
  isActivePlan?: boolean;
  onAction: (data?: MealPlan) => void;
}

export default function MealPlanCard({
  mealPlan,
  isColumn,
  isActivePlan,
  onAction,
}: Props) {
  const mealTimes = useMemo(() => {
    const meals = [...mealPlan.meals];

    if (meals.length === 1) {
      return `${meals[0]} only`;
    }

    const lastMeal = meals.pop();

    return `${meals.join(', ')} & ${lastMeal}`;
  }, [mealPlan]);

  return (
    <article
      className={`rounded-3xl  bg-secondary-100 w-full xs:max-w-[481px] p-3 flex flex-col xs:flex-row ${
        isColumn && 'xs:flex-col w-full xs:w-full'
      }  ${isActivePlan && 'bg-tertiary-600'}`}
    >
      <section
        className={` rounded-xl p-5 w-full ${
          isActivePlan ? 'bg-secondary-1500' : 'bg-white'
        } `}
      >
        <div className="mb-3">
          <h3
            className={`${
              isActivePlan ? 'text-white' : 'text-secondary-1500 '
            } font-semibold text-xl`}
          >
            {mealPlan.name}
          </h3>
          <p className="text-[10px] leading-3 text-typography-muted font-semibold">
            MONTHLY PLAN
          </p>
        </div>
        <div className={`mb-10 xs:mb-[60px]  ${isColumn && 'mb-10'}`}>
          <h3
            className={`text-secondary-1500 ${
              isActivePlan ? 'text-white' : 'text-secondary-1500'
            } font-semibold text-2xl`}
          >
            &#8358; {mealPlan.price.toLocaleString()}
          </h3>
          <p className="text-[10px] leading-3 text-typography-muted font-semibold">
            PER MONTH
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <UiButton
            onClick={() => onAction()}
            block
            rounded="lg"
            variant={isActivePlan ? 'primary' : 'secondary'}
          >
            {isActivePlan ? 'Current plan' : 'Change plan'}
          </UiButton>
          {!isColumn && (
            <UiButton rounded="lg" block variant="danger-text">
              Unsubscribe
            </UiButton>
          )}
        </div>
      </section>
      <section className="w-full p-5">
        {!isColumn && (
          <p className="text-[10px] leading-3 text-typography-muted font-semibold mb-4">
            BENEFITS
          </p>
        )}
        <div className="flex items-center gap-2 mb-4">
          <div
            className={`w-8 h-8 shrink-0 rounded-lg flex justify-center items-center ${
              isActivePlan ? 'bg-secondary-1800' : 'bg-secondary-600'
            }`}
          >
            <UiIcon icon="Spaghetti" />
          </div>
          <p className="text-sm text-secondary-1500">{mealTimes}</p>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`w-8 h-8 shrink-0 rounded-lg flex justify-center items-center  ${
              isActivePlan ? 'bg-secondary-1800' : 'bg-secondary-600'
            }`}
          >
            <UiIcon icon="CalendarNoDots" />
          </div>
          <p className="text-sm text-secondary-1500">{mealPlan.duration}</p>
        </div>
      </section>
    </article>
  );
}
