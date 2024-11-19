import { useMemo, useState } from 'react';

import BasePage from '@/components/layout/BasePage';
import SetMealModal from '@/components/meals/SetMealModal';
import UiButton from '@/components/ui/UiButton';

import useBooleanState from '@/hooks/useBooleanState';

import Meal from '@/types/Meal';
import useMealsQuery from '@/Api/query/useMealsQuery';
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
      title: 'In Stock',
      value: MealFilter.IN_STOCK,
    },
    {
      title: 'Sold out',
      value: MealFilter.SOLD_OUT,
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
        onDone={onMealCreated}
      />
    </BasePage>
  );
}
