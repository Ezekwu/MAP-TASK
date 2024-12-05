import { useState } from 'react';

import UiButton from '../ui/UiButton';
import UiIcon from '../ui/UiIcon';

import MealTrayHandler from '@/utils/MealTrayHandler';

interface Props {
  quantity: number;
  mealId: string;
  updateMealQuantity: (mealId: string, quantity: number) => void;
}
export default function MealQuantityCounter({
  quantity,
  mealId,
  updateMealQuantity,
}: Props) {
  function increment() {
    updateMealQuantity(mealId, quantity + 1);

    MealTrayHandler.setMealQuantity(mealId, quantity + 1);
  }

  function decrement() {
    if (quantity === 1) return;

    updateMealQuantity(mealId, quantity - 1);

    MealTrayHandler.setMealQuantity(mealId, quantity - 1);
  }
  return (
    <div className="flex gap-1">
      <UiButton onClick={decrement} size="icon" variant="secondary">
        <UiIcon icon="Minus" />
      </UiButton>
      <span className="w-20 flex items-center justify-center border rounded-lg border-tetiary-700 font-semibold text-secondary-1500">
        {quantity}
      </span>
      <UiButton onClick={increment} size="icon" variant="secondary">
        <UiIcon icon="Plus" />
      </UiButton>
    </div>
  );
}
