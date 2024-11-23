import { MealType } from '@/types/Meal';
import { useTranslation } from 'react-i18next';

interface Props {
  type: MealType;
  onSelectMealType: (type: MealType) => void;
}
export default function MealSelector(props: Props) {
  const { t } = useTranslation();

  return (
    <button
      className="border border-secondary-700 hover:bg-secondary-100 h-36 rounded-2xl flex flex-col items-center justify-center"
      onClick={() => props.onSelectMealType(props.type)}
    >
      <div className="capitalize text-secondary-1400 font-semibold text-sm mb-1">
        {props.type}
      </div>
      <div className="text-typography-label text-xs">
        {t('actions.click-to-add-meals')}
      </div>
    </button>
  );
}
