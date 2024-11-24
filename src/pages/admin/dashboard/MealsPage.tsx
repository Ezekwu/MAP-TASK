import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import BasePage from '@/components/layout/BasePage';
import SetMealModal from '@/components/meals/SetMealModal';
import UiButton from '@/components/ui/UiButton';

import useToggle from '@/hooks/useToggle';

import useMealsQuery from '@/api/query/useMealsQuery';
import MealCard from '@/components/meals/MealCard';
import UiToggleButton from '@/components/ui/UiToggleButton';
import Meal from '@/types/Meal';
import MealFilter from '@/types/enums/MealFilter';

export default function MealsPage() {
  const { t } = useTranslation();

  const setMealIsVisible = useToggle(false);

  const [activeMeal, setActiveMeal] = useState<Meal | null>(null);

  const [filter, setFilter] = useState(MealFilter.ALL);

  const filterOptions = [
    {
      title: t('options.all'),
      value: MealFilter.ALL,
    },
    {
      title: t('options.spotlight'),
      value: MealFilter.SPOTLIGHT,
    },
    {
      title: t('options.high-calorie'),
      value: MealFilter.HIGH_CALORIE,
    },
    {
      title: t('options.best-seller'),
      value: MealFilter.BEST_SELLER,
    },
    {
      title: t('options.sold-out'),
      value: MealFilter.SOLD_OUT,
    },
  ];

  const {
    query: { isLoading },
    setData,
    filteredMeals: meals,
  } = useMealsQuery({ filter });

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
