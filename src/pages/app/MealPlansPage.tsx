import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { mealPlans } from '@/api/mock/mealPlans';
import useMealsQuery from '@/api/query/useMealsQuery';
import BasePage from '@/components/layout/BasePage';
import MealCard from '@/components/meals/MealCard';
import TrayList from '@/components/meals/TrayList';
import UiIcon from '@/components/ui/UiIcon';
import MealPlanDetails from '@/components/meals/MealPlanDetails';
import Meal from '@/types/Meal';
import StoredMeal from '@/types/StoredMeal';
import MealTrayHandler from '@/utils/MealTrayHandler';
import { Toast } from '@/utils/toast';
import useToggle from '@/hooks/useToggle';

export default function MealPlansPage() {
  const {
    query: { data: meals, isLoading },
  } = useMealsQuery();

  const { t } = useTranslation();

  const [trayMeals, setTrayMeals] = useState<StoredMeal[]>(
    MealTrayHandler.getMeals(),
  );

  const isTrayVisible = useToggle();

  const pageMetaData = {
    title: 'Meal plans',
    edgeNode: (
      <div className="flex gap-3">
        {/* <button className="w-12 h-12 border border-secondary-700 rounded-2xl flex justify-center items-center">
          <UiIcon icon="Bell" />
        </button> */}
        <button
          onClick={() => isTrayVisible.on()}
          className="relative w-12 h-12 bg-secondary-1500 rounded-2xl flex justify-center items-center"
        >
          <UiIcon icon="Dish" />
          {trayMeals.length > 0 && (
            <span className="absolute bottom-8 left-8 w-[22px] h-[22px] rounded-full bg-primary-500 text-white text-sm font-bold border border-secondary-1500">
              {trayMeals.length}
            </span>
          )}
        </button>
      </div>
    ),
  };

  const mealTypeOrder = ['breakfast', 'lunch', 'dinner'];

  const sortedMealsMap = useMemo(() => {
    return meals?.reduce<Map<string, Meal[]>>((acc, meal) => {
      if (!acc.has(meal.mealType)) {
        acc.set(meal.mealType, []);
      }
      acc.get(meal.mealType)!.push(meal);
      return acc;
    }, new Map());
  }, [meals]);

  function handleTrayMeals(meals: StoredMeal[]) {
    setTrayMeals(meals);
  }

  function updateMealQuantity(mealId: string, quantity: number) {
    const mealIndex = trayMeals.findIndex((meal) => meal.id === mealId);

    if(mealIndex !== -1){
      const updatedMeals = [...trayMeals];
      updatedMeals[mealIndex].quantity = `${quantity}`;
      setTrayMeals(updatedMeals)
    }
  }

  function addMeal(meal: StoredMeal) {
    try {
      MealTrayHandler.addMeal(meal);

      setTrayMeals((prevMeals) => [...prevMeals, meal]);

      const msg = t(`messages.mealAddedToTraySuccess`);

      Toast.success({ msg });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <BasePage navDetails={pageMetaData} loading={isLoading}>
      <div>
        <p className="text-sm text-secondary-1500 mb-4">
          You’re currently subscribed to the{' '}
          <span className="font-bold">“All inclusive”</span> plan
        </p>
        <MealPlanDetails mealPlan={mealPlans[2]} />
        <section className="mt-16">
          <h3 className="font-semibold text-secondary-1500 text-xl mb-1">
            Meal catalogue
          </h3>
          <p className="text-secondary-1600 text-sm max-w-md mb-8">
            Here you see all the meals we have available, and you can order
            outside your calendar schedule.
          </p>
          <div className="flex flex-col gap-8">
            {mealTypeOrder.map((mealtype, index) => (
              <div
                className={`pb-8 ${
                  index !== mealTypeOrder.length - 1 &&
                  'border-b border-dashed border-b-tetiary-500'
                }`}
              >
                {sortedMealsMap?.has(mealtype) && (
                  <div>
                    <h4 className="text-sm text-secondary-1500 font-medium mb-4 capitalize">
                      {mealtype}
                    </h4>
                    <div className="flex flex-wrap gap-x-5 gap-y-8">
                      {sortedMealsMap.get(mealtype)?.map((meal) => (
                        <MealCard
                          meal={meal}
                          isMealInTray={MealTrayHandler.isMealInTray(meal.id)}
                          onAction={() => {
                            addMeal({
                              id: meal.id,
                              quantity: '1',
                              price: `${meal.price}`,
                            });
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
      <TrayList
        trayMeals={trayMeals}
        handleTrayMeals={handleTrayMeals}
        updateMealQuantity={updateMealQuantity}
        isOpen={isTrayVisible.value}
        onClose={() => isTrayVisible.off()}
      />
    </BasePage>
  );
}
