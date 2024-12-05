import { useMemo } from 'react';

import useMealsQuery from '@/api/query/useMealsQuery';
import useToggle from '@/hooks/useToggle';
import StoredMeal from '@/types/StoredMeal';
import MealTrayHandler from '@/utils/MealTrayHandler';
import { Toast } from '@/utils/toast';

import UiButton from '../ui/UiButton';
import UiIcon from '../ui/UiIcon';
import UiLoader from '../ui/UiLoader';
import UiModal from '../ui/UiModal';

import ClearTrayConfirmation from './ClearTrayConfirmation';
import EmptyTrayState from './EmptyTrayState';
import TrayMealCard, { TrayMeal } from './TrayMealCard';

//--

interface Props {
  isOpen: boolean;
  onClose: () => void;
  trayMeals: StoredMeal[];
  handleTrayMeals: (meals: StoredMeal[]) => void;
  updateMealQuantity: (mealId: string, quantity: number) => void;
}

export default function TrayList({
  isOpen,
  trayMeals,
  onClose,
  handleTrayMeals,
  updateMealQuantity,
}: Props) {
  const {
    query: { data, isLoading },
  } = useMealsQuery();

  const isClearTrayConfirmVisible = useToggle();

  const isTrayEmpty = trayMeals.length === 0;

  function removeMeal(mealId: string) {
    MealTrayHandler.removeMeal(mealId);
    handleTrayMeals(MealTrayHandler.getMeals());
  }

  function clearTray() {
    MealTrayHandler.clearTray();
    handleTrayMeals([]);
    isClearTrayConfirmVisible.off();
    Toast.success({ msg: 'Your cart is now empty.' });
  }

  function hideConfirmModal() {
    isClearTrayConfirmVisible.off();
  }

  const totalPrice = trayMeals.reduce((total, meal) => {
    total += Number(meal.price) * Number(meal.quantity);
    return total;
  }, 0);

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
    <UiModal
      alignRight={true}
      edgeNode={!isTrayEmpty && ClearAllBtn}
      isOpen={isOpen}
      onClose={onClose}
      title="Food tray"
    >
      {!isTrayEmpty && (
        <div>
          <section className="grid gap-8">
            {meals?.map((meal) => (
              <div
                key={meal.id}
                className={`pb-8 border-b border-dashed border-b-tetiary-500`}
              >
                <TrayMealCard
                  removeMeal={removeMeal}
                  key={meal.id}
                  meal={meal}
                  updateMealQuantity={updateMealQuantity}
                />
              </div>
            ))}
          </section>

          <section className="flex gap-2 pt-8 mb-4">
            <article className="p-4 bg-tertiary-100 border border-tertiary-700 rounded-2xl w-full">
              <p className="text-typography-disabled text-xs font-medium mb-1">
                TOTAL
              </p>
              <h3 className="text-2xl font-bold text-secondary-1500">
                ₦{totalPrice.toLocaleString()}
              </h3>
            </article>
            <article className="p-4 bg-secondary-1700 border border-tertiary-700 flex gap-4  rounded-2xl w-full">
              <UiIcon icon="Info" />
              <p className="text-secondary-1500 text-sm">
                Orders placed from{' '}
                <span className="font-bold">3PM & above</span> would be
                delivered the next day
              </p>
            </article>
          </section>
          <UiButton size="lg" block>
            Proceed to pay
          </UiButton>
        </div>
      )}

      {isTrayEmpty && <EmptyTrayState />}

      {isClearTrayConfirmVisible.value && (
        <ClearTrayConfirmation
          onAction={clearTray}
          onCancel={hideConfirmModal}
        />
      )}
    </UiModal>
  );
}
