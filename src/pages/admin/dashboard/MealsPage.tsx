import { useMemo, useState } from 'react';

import BasePage from '@/components/layout/BasePage';
import SetMealModal from '@/components/meals/SetMealModal';
import UiButton from '@/components/ui/UiButton';

import useBooleanState from '@/hooks/useBooleanState';

import Meal from '@/types/Meal';
import useMealsQuery from '@/Api/query/useMealsQuery';
import MealCard from '@/components/meals/MealCard';

export default function MealsPage() {
  const {
    query: { data: meals, isLoading },
    setData,
  } = useMealsQuery();

  const setMealIsVisible = useBooleanState(false);

  const [activeMeal, setActiveMeal] = useState<Meal | null>(null);

  const navDetails = useMemo(() => {
    return {
      title: 'Manage meals',
      edgeNode: (
        <UiButton variant="secondary" size="lg" onClick={setMealIsVisible.on}>
          {/* TODO: add a plus icon here */}
          Create new meal
        </UiButton>
      ),
    };
  }, []);

  function onMealCreated(meal: Meal) {
    setData(meal);

    setMealIsVisible.off();
  }

  function manageMeal(meal: Meal) {
    setActiveMeal(meal);

    setMealIsVisible.on();
  }

  function onCloseSetMeal() {
    setMealIsVisible.off();

    setActiveMeal(null);
  }

  return (
    <BasePage navDetails={navDetails} loading={isLoading}>
      <div className="flex flex-wrap gap-x-5 gap-y-8">
        {meals?.map((meal) => (
          <MealCard
            key={meal.id}
            meal={meal}
            btnLabel="Manage meal"
            onAction={manageMeal}
          />
        ))}
      </div>
      <SetMealModal
        isOpen={setMealIsVisible.value}
        key={`set-meal-${setMealIsVisible.value}-${activeMeal?.id || ''}`}
        meal={activeMeal}
        onClose={onCloseSetMeal}
        onDone={onMealCreated}
      />
    </BasePage>
  );
}
