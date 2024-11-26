import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import Meal from '@/types/Meal';

import UiTag from '../ui/UiTag';
import UiIcon from '../ui/UiIcon';
import UiSelect from '../ui/UiSelect';
import OnChangeParams from '@/types/OnChangeParams';

interface Props {
  btnLabel?: string;
  onSelect?: (id: string) => void;
  onSelectDay?: (params: { id: string; day: string }) => void;
  onRemove?: (id: string) => void;
  meal: Meal;
  isSelected?: boolean;
  showDay?: boolean;
  day?: string;
}
export default function MealItem({
  meal,
  isSelected,
  onRemove,
  day,
  onSelect,
  onSelectDay,
}: Props) {
  const { t } = useTranslation();

  const weekdayOptions = [
    {
      label: t('options.sunday'),
      value: 'sunday',
    },
    {
      label: t('options.monday'),
      value: 'monday',
    },
    {
      label: t('options.tuesday'),
      value: 'tuesday',
    },
    {
      label: t('options.wednesday'),
      value: 'wednesday',
    },
    {
      label: t('options.thursday'),
      value: 'thursday',
    },
    {
      label: t('options.friday'),
      value: 'friday',
    },
    {
      label: t('options.saturday'),
      value: 'saturday',
    },
  ];

  const nutrients = useMemo(() => {
    return Object.entries(meal.nutrients).map(
      ([key, value]) => `${value}${key === 'kcal' ? '' : 'g'} ${key}`,
    );
  }, [meal]);

  function handleClick() {
    if (isSelected) {
      onRemove?.(meal.id);

      return;
    }

    onSelect?.(meal.id);
  }

  function onChange({ value }: OnChangeParams) {
    onSelectDay?.({ id: meal.id, day: value as string });
  }

  return (
    <div
      className="flex gap-2 border-b-dashed py-4 px-8 cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative  rounded overflow-hidden w-32 h-32">
        {meal.highCalorie && (
          <div className="bg-primary-500 text-typography-light text-[8px] py-1 px-4 absolute rounded-br-xl">
            {t('general.high-calorie')}
          </div>
        )}
        <img src={meal.img} alt={meal.name} className="w-32 h-32 rounded" />
      </div>
      <div style={{ width: 'calc(100% - 128px)' }}>
        <div className="flex justify-between items-center">
          <div className="text-sm font-semibold text-typography-base my-2">
            {meal.name}
          </div>
          {day !== undefined ? (
            <UiSelect
              options={weekdayOptions}
              value={day}
              placeholder={t('placeholders.select-day')}
              name="day-of-week"
              onChange={onChange}
            />
          ) : (
            <div
              className={`${
                isSelected
                  ? 'bg-primary-500'
                  : 'bg-tertiary-50 border border-tertiary-700'
              } w-5 h-5 rounded-full flex items-center justify-center`}
            >
              {isSelected && <UiIcon icon="Checkmark" size="10" />}
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-1 mb-4">
          {nutrients.map((nutrient, index) => (
            <UiTag variant="primary" key={`${nutrient}-${index}`}>
              {nutrient}
            </UiTag>
          ))}
        </div>
      </div>
    </div>
  );
}
