import { useState } from 'react';

import UiModal from '../ui/UiModal';

import MealPlan from '@/types/MealPlan';
import UiIcon from '../ui/UiIcon';
import UiButton from '../ui/UiButton';

//--

interface Props {
  isOpen: boolean;
  mealPlan: MealPlan;
  onClose: () => void;
}

type BillingCycle = 'monthly' | 'weekly';

type BillingOptions = {
  type: BillingCycle;
  price: number;
};

export default function UpgradePlan({ isOpen, mealPlan, onClose }: Props) {
  const [activeCycle, setActiveCycle] = useState<BillingCycle>('monthly');

  const billingOptions: BillingOptions[] = [
    {
      type: 'monthly',
      price: mealPlan?.price,
    },
    {
      type: 'weekly',
      price: mealPlan?.price / 4,
    },
  ];

  function handleActiveCycle(cycle: BillingCycle) {
    setActiveCycle(cycle);
  }

  function isActiveCycle(cycle: BillingCycle) {
    return activeCycle === cycle;
  }

  function closeModal() {
    setActiveCycle('monthly');
    onClose();
  }

  return (
    <UiModal
      title="Upgrade your plan"
      isOpen={isOpen}
      onClose={closeModal}
      alignRight
    >
      <div className="flex flex-col justify-between min-h-[73vh]">
        <section>
          <p className="text-xs font-medium text-typography-label leading-9">
            Billing options
          </p>
          <div className="flex gap-4">
            {billingOptions.map((option) => (
              <button
                key={option?.type}
                onClick={() => handleActiveCycle(option.type)}
                className={`flex rounded-2xl p-4 w-full min-w-[215px] transition-all duration-300 ${
                  isActiveCycle(option.type)
                    ? 'bg-secondary-1500 border'
                    : 'border border-tertiary-700  bg-white hover:bg-tertiary-50'
                }`}
              >
                <div className="w-full flex flex-col gap-2 items-start">
                  <p className="text-sm text-typography-disabled">
                    {option.type === 'monthly' ? 'Monthly' : 'Weekly'}
                  </p>
                  <h3
                    className={`font-bold  text-2xl ${
                      isActiveCycle(option.type)
                        ? 'text-typography-light'
                        : 'text-secondary-1500'
                    }`}
                  >
                    ₦{option?.price?.toLocaleString()}
                  </h3>
                  <p
                    className={`text-xs font-medium ${
                      isActiveCycle(option.type)
                        ? 'text-typography-disabled'
                        : 'text-typography-label'
                    }`}
                  >
                    Per {option?.type === 'monthly' ? 'month' : 'Week'}
                  </p>
                </div>
                <span
                  className={`flex justify-center items-center w-5 shrink-0 h-5 rounded-full  ${
                    isActiveCycle(option.type)
                      ? 'border-none bg-primary-500'
                      : 'bg-gray-100 outiline outline-tertiary-700 '
                  }`}
                >
                  {isActiveCycle(option.type) && (
                    <UiIcon icon="Checkmark" size="10" />
                  )}
                </span>
              </button>
            ))}
          </div>
        </section>
        <UiButton size="lg" block>
          Upgrade to Weekday
        </UiButton>
      </div>
    </UiModal>
  );
}
