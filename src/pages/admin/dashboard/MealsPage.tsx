import { useMemo, useState } from 'react';

import BasePage from '@/components/layout/BasePage';
import SetMealModal from '@/components/meals/SetMealModal';
import UiButton from '@/components/ui/UiButton';

import useBooleanState from '@/hooks/useBooleanState';

import Meal from '@/types/Meal';
import useMealsQuery from '@/api/query/useMealsQuery';
import MealCard from '@/components/meals/MealCard';
import UiToggleButton from '@/components/ui/UiToggleButton';
import MealFilter from '@/types/enums/MealFilter';

export default function MealsPage() {
  const setMealIsVisible = useBooleanState(false);

  const [activeMeal, setActiveMeal] = useState<Meal | null>(null);

  const [filter, setFilter] = useState(MealFilter.ALL);

  const filterOptions = [
    {
      title: 'All',
      value: MealFilter.ALL,
    },
    {
      title: 'Spotlight',
      value: MealFilter.SPOTLIGHT,
    },
    {
      title: 'High Calorie',
      value: MealFilter.HIGH_CALORIE,
    },
    {
      title: 'Best Sellers',
      value: MealFilter.BEST_SELLER,
    },
    {
      title: 'Sold out',
      value: MealFilter.SOLD_OUT,
    },
  ];

  const {
    query: { isLoading },
    setData,
    filteredMeals: meals,
  } = useMealsQuery(filter);

  const navDetails = useMemo(() => {
    return {
      title: 'Manage meals',
      edgeNode: (
        <UiButton
          variant="secondary"
          size="lg"
          rounded="md"
          onClick={setMealIsVisible.on}
        >
          Add new meal
        </UiButton>
      ),
    };
  }, []);

  function onMealSet(meal: Meal) {
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
      <UiToggleButton
        options={filterOptions}
        active={filter}
        onSelect={(val) => setFilter(val as MealFilter)}
      />
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
        onDone={onMealSet}
      />
    </BasePage>
  );
}
