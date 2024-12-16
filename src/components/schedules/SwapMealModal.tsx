import { useTranslation } from 'react-i18next';

import useAvailableMealsQuery from '@/api/query/useAvailableMealsQuery';
import MealSwapData from '@/types/MealSwapData';

import MealCard from '../meals/MealCard';
import UiLoader from '../ui/UiLoader';
import UiModal from '../ui/UiModal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  swapData: MealSwapData;
  onBeginSwap: (mealId: string) => void;
}
export default function SwapMealModal({
  swapData,
  isOpen,
  onBeginSwap,
  onClose,
}: Props) {
  const { t } = useTranslation();

  const {
    meals,
    query: { isLoading },
  } = useAvailableMealsQuery({ type: swapData.type });

  function handleSwap(mealId: string) {
    onBeginSwap(mealId);
  }

  return (
    <UiModal
      title={t('modals.swap-meal.title')}
      isOpen={isOpen}
      alignRight
      size="lg"
      onClose={onClose}
    >
      <div className="p-8">
        {isLoading && <UiLoader />}
        <div className="text-sm text-secondary-1600 mb-8">
          {t('general.available-meals-text', {
            day: swapData.day.format('ddd Do MMM, YYYY'),
            type: t(`general.${swapData.type}`),
          })}
        </div>
        <div className="flex flex-wrap gap-4">
          {/* TODO: check if empty state would be needed */}
          {meals.map((meal) => (
            <MealCard
              key={meal.id}
              meal={meal}
              onAction={() => handleSwap(meal.id)}
              btnLabel={t('actions.select-meal')}
            />
          ))}
        </div>
      </div>
    </UiModal>
  );
}
