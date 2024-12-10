import { MealType } from '@/types/Meal';
import { useTranslation } from 'react-i18next';
import UiIconCheckMark from '../ui/UiIconCheckmark';

interface Props {
  type: MealType;
  hasMeals?: boolean;
  onSelectMealType: (type: MealType) => void;
}
export default function MealSelector(props: Props) {
  const { t } = useTranslation();

  return (
    <button
      className={`border border-secondary-700 hover:bg-secondary-100 h-40 rounded-2xl flex flex-col items-center ${
        props.hasMeals ? 'justify-between pt-8' : 'justify-center'
      } relative p-1`}
      onClick={() => props.onSelectMealType(props.type)}
    >
      {props.hasMeals && (
        <div className="mb-2">
          <UiIconCheckMark value />
        </div>
      )}
      <div className="capitalize text-secondary-1400 font-semibold text-sm mb-1">
        {props.type} {props.hasMeals ? t('general.meals-added') : ''}
      </div>
      {props.hasMeals ? (
        <div className="w-full mb-2 bg-[#EBEBEF] py-2 px-4 rounded-xl text-xs text-secondary-1400 font-medium">
          {t('actions.edit-selection')}
        </div>
      ) : (
        <div className="text-typography-label text-xs">
          {t('actions.click-to-add-meals')}
        </div>
      )}
    </button>
  );
}
