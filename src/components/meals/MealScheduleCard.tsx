import { useMemo } from 'react';

import Meal from '../../types/Meal';

const mealTypeConfigs = {
  breakfast: {
    time: '9:00 AM',
    timeColor: 'text-success',
    backgroundColor: 'bg-primary-300',
    textColor: 'text-typography-base',
  },
  lunch: {
    time: '1:30 PM',
    timeColor: 'text-success',
    backgroundColor: 'bg-primary-400',
    textColor: 'text-typography-base',
  },
  dinner: {
    time: '7:30 PM',
    timeColor: 'text-typography-highlight-soft',
    backgroundColor: 'bg-primary-500',
    textColor: 'text-light',
  },
};

// TODO: handle the time colors.
const pastMealTypeConfigs = {
  breakfast: {
    time: '9:00 AM',
    timeColor: '',
    backgroundColor: 'bg-tertiary-300',
    textColor: 'text-typography-base',
  },
  lunch: {
    time: '1:30 PM',
    timeColor: '',
    backgroundColor: 'bg-tertiary-900',
    textColor: 'text-typography-base',
  },
  dinner: {
    time: '7:30 PM',
    timeColor: 'text-light',
    backgroundColor: 'bg-tertiary-1000',
    textColor: 'text-light',
  },
};

interface Props {
  type: keyof typeof mealTypeConfigs;
  meal: Meal;
  isPast: boolean;
}
export default function MealScheduleCard(props: Props) {
  const timeSlotConfig = useMemo(() => {
    if (props.isPast) return pastMealTypeConfigs[props.type];

    return mealTypeConfigs[props.type];
  }, [props.meal, props.type, props.isPast]);

  return (
    <div className={`rounded p-3 ${timeSlotConfig.backgroundColor}`}>
      <div className={`text-[8px] ${timeSlotConfig.timeColor}`}>
        {timeSlotConfig.time}
      </div>
      <div className={`text-[10px] ${timeSlotConfig.textColor} font-medium`}>
        {props.meal?.name}
      </div>
    </div>
  );
}
