import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import useMealsQuery from '@/api/query/useMealsQuery';

import { MealType } from '@/types/Meal';

import UiNoData from '../ui/UiNoData';
import UiSearchInput from '../ui/UiSearchInput';
import MealItem from './MealItem';
import UiButton from '../ui/UiButton';

interface Props {
  mealType?: MealType;
}
export default function SelectMeals({ mealType = MealType.BREAKFAST }: Props) {
  const { t } = useTranslation();

  const { filteredMeals } = useMealsQuery();

  const noMealsSelected = useMemo(() => {
    return true;
  }, []);

  function onMealSearch() {}

  function onSelectMeal() {}

  return (
    <div>
      <div className="mx-8 pt-8">
        <UiSearchInput
          placeholder={t('placeholders.search-meals')}
          onSearch={onMealSearch}
        />
      </div>

      {noMealsSelected ? (
        <div className="h-28 my-4 mx-8">
          <UiNoData
            text={t('modals.set-schedule.selected-meals-would-appear-here')}
          />
        </div>
      ) : (
        <></>
      )}

      <p className="text-sm text-[#585B5A] mb-4 mx-8">
        {t('modals.set-schedule.select-weekly-meals', { mealType })}
      </p>
      <div className="max-h-[30vh] overflow-auto grid gap-4">
        {filteredMeals.map((meal) => (
          <MealItem meal={meal} onSelect={onSelectMeal} key={meal.id} />
        ))}
      </div>
      <div className="p-4 border-t border-tertiary-700">
        <UiButton block variant="tertiary" size="lg">
          {t('actions.add-meals')}
        </UiButton>
      </div>
    </div>
  );
}
