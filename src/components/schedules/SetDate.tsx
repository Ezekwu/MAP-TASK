import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import useMealsQuery from '@/api/query/useMealsQuery';

import { MealType } from '@/types/Meal';

import UiButton from '../ui/UiButton';
import UiLoader from '../ui/UiLoader';
import UiSearchInput from '../ui/UiSearchInput';
import MealItem from './MealItem';

interface Props {
  mealType?: MealType;
}
export default function SelectMeals({ mealType = MealType.BREAKFAST }: Props) {
  const { t } = useTranslation();

  const {
    filteredMeals,
    query: { isLoading },
  } = useMealsQuery();

  const [selectedMeals, setSelectedMeals] = useState([] as string[]);

  function onMealSearch() {}

  function onSelectMeal(mealId: string) {
    setSelectedMeals((meals) => [...meals, mealId]);
  }

  function onRemoveMeal(mealId: string) {
    setSelectedMeals((meals) => meals.filter((id) => id !== mealId));
  }

  function isMealSelected(mealId: string) {
    return selectedMeals.includes(mealId);
  }

  return (
    <div>
      <p className="text-sm text-[#585B5A] mx-8 py-2">
        {t('modals.set-schedule.select-weekly-meals', { mealType })}
      </p>
      <div className="max-h-[55vh]  overflow-auto grid gap-4">
        {filteredMeals.map((meal) => (
          <MealItem
            meal={meal}
            onSelect={onSelectMeal}
            onRemove={onRemoveMeal}
            isSelected={(() => isMealSelected(meal.id))()}
            key={meal.id}
          />
        ))}
      </div>
      <div className="p-4 border-t border-tertiary-700">
        <UiButton
          block
          variant="tertiary"
          size="lg"
          disabled={!selectedMeals.length}
        >
          {t('actions.add-meals')}
        </UiButton>
      </div>
    </div>
  );
}
