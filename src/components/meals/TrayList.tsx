import { useMemo, useState } from 'react';

import { TrayMeal } from './TrayMealCard';
import TrayMealCard from './TrayMealCard';
import ClearTrayConfirmation from './ClearTrayConfirmation';

import UiButton from '../ui/UiButton';
import UiIcon from '../ui/UiIcon';
import UiLoader from '../ui/UiLoader';
import UiModal from '../ui/UiModal';

import useMealsQuery from '@/api/query/useMealsQuery';
import StoredMeal from '@/types/StoredMeal';
import MealTrayHandler from '@/utils/MealTrayHandler';
import useToggle from '@/hooks/useToggle';
import { Toast } from '@/utils/toast';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  trayMeals: StoredMeal[];
  handleTrayMeals: (meals: StoredMeal[]) => void;
}

//--

export default function TrayList({
  isOpen,
  trayMeals,
  onClose,
  handleTrayMeals,
}: Props) {
  const {
    query: { data, isLoading },
  } = useMealsQuery();

  const isClearTrayConfirmVisible = useToggle();

  function removeMeal(mealId: string) {
    MealTrayHandler.removeMeal(mealId);
    handleTrayMeals(MealTrayHandler.getMeals());
  }

  function clearTray() {
    MealTrayHandler.clearTray();
    handleTrayMeals([]);
    onClose();
    Toast.success({ msg: 'Your cart is now empty.' });
  }

  function hideConfirmModal() {
    isClearTrayConfirmVisible.off();
  }

  const meals = useMemo(() => {
    if (trayMeals.length === 0) return;

    return trayMeals?.map((trayMeal) => {
      const localMeal = data?.find((meal) => meal.id === trayMeal.id);

      return {
        ...localMeal,
        quantity: Number(trayMeal.quantity),
      } as TrayMeal;
    });
  }, [data, trayMeals]);

  const ClearAllBtn = (
    <UiButton
      onClick={() => isClearTrayConfirmVisible.on()}
      variant="danger-outlined"
    >
      <UiIcon icon="TrashX" />
      Clear all
    </UiButton>
  );

  if (isLoading) {
    return <UiLoader />;
  }

  return (
    <div className="relative">
      <UiModal
        alignRight={true}
        edgeNode={ClearAllBtn}
        isOpen={isOpen}
        onClose={onClose}
        title="Food tray"
      >
        <div className="grid gap-8">
          {meals?.map((meal, index) => (
            <div
              className={`pb-8 ${
                index !== meals.length - 1 &&
                'border-b border-dashed border-b-tetiary-500'
              }`}
            >
              <TrayMealCard removeMeal={removeMeal} key={meal.id} meal={meal} />
            </div>
          ))}
        </div>
        {isClearTrayConfirmVisible.value && (
          <ClearTrayConfirmation
            clearTray={clearTray}
            hideConfirmModal={hideConfirmModal}
          />
        )}
      </UiModal>
    </div>
  );
}
