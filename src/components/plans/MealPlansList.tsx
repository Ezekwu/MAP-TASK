import { useState } from 'react';

import { mealPlans } from '@/api/mock/mealPlans';
import useToggle from '@/hooks/useToggle';
import MealPlan from '@/types/MealPlan';

import UiModal from '../ui/UiModal';

import MealPlanCard from './MealPlanCard';
import UpgradePlan from './UpgradePlan';

//--

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function MealPlansList({ isOpen, onClose }: Props) {
  const [activeMealPlan, setActiveMealPlan] = useState<MealPlan | null>(null);

  const isUpgradePlanVisible = useToggle();

  function openUpgradePlan(meal: MealPlan) {
    setActiveMealPlan(meal);
    isUpgradePlanVisible.on();
  }

  return (
    <UiModal
      title="Plans"
      isOpen={isOpen}
      onClose={onClose}
      alignRight
      size="lg"
    >
      <div className="grid grid-cols-3 gap-5">
        {mealPlans.map((meal) => (
          <MealPlanCard
            isActivePlan={meal.isActivePlan}
            onAction={() => openUpgradePlan(meal)}
            isColumn
            mealPlan={meal}
            key={meal.name}
          />
        ))}
      </div>
      <UpgradePlan
        isOpen={isUpgradePlanVisible.value}
        onClose={() => isUpgradePlanVisible.off()}
        mealPlan={activeMealPlan!}
      />
    </UiModal>
  );
}
