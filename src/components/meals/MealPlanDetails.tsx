import { useMemo } from "react";

import MealPlan from "@/types/MealPlan"

import UiButton from "../ui/UiButton";
import UiIcon from "../ui/UiIcon";

interface Props {
  mealPlan: MealPlan;
  isColumn?: boolean;
}

export default function MealPlanDetails({ mealPlan, isColumn }: Props) {  
  const mealTimes = useMemo(()=>{
    const meals = [...mealPlan.meals];    

    if(meals.length === 1) {
      return `${meals[0]} only`
    }

    const lastMeal = meals.pop();

    return `${meals.join(', ')} & ${lastMeal}`
    
  },[mealPlan]);


  return (
    <article
      className={`rounded-3xl bg-secondary-100 w-full xs:w-[481px] p-3 flex flex-col xs:flex-row ${
        isColumn && 'flex-col w-[287px]'
      }`}
    >
      <section className="bg-white rounded-xl p-5 w-full">
        <div className="mb-3">
          <h3 className="text-secondary-1500 font-semibold text-xl">
            {mealPlan.name}
          </h3>
          <p className="text-[10px] leading-3 text-typography-muted font-semibold">
            MONTHLY PLAN
          </p>
        </div>
        <div className="mb-10">
          <h3 className="text-secondary-1500 font-semibold text-2xl">
            &#8358; {mealPlan.price.toLocaleString()}
          </h3>
          <p className="text-[10px] leading-3 text-typography-muted font-semibold">
            PER MONTH
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <UiButton block variant="secondary">
            Change plan
          </UiButton>
          {!isColumn && (
            <UiButton block variant="danger-text">
              Unsubscribe
            </UiButton>
          )}
        </div>
      </section>
      <section className="w-full p-5">
        <p className="text-[10px] leading-3 text-typography-muted font-semibold mb-4">
          BENEFITS
        </p>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 shrink-0 rounded-lg flex justify-center items-center bg-secondary-600">
            <UiIcon icon="Spaghetti" />
          </div>
          <p className="text-sm text-secondary-1500">{mealTimes}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 shrink-0 rounded-lg flex justify-center items-center bg-secondary-600">
            <UiIcon icon="CalendarNoDots" />
          </div>
          <p className="text-sm text-secondary-1500">{mealPlan.duration}</p>
        </div>
      </section>
    </article>
  );
}