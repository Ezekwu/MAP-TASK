import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import OutsideClickHandler from 'react-outside-click-handler';

import UiButton from './UiButton';
import UiIcon from './UiIcon';
import useToggle from '@/hooks/useToggle';
import FilterData from '@/types/FilterData';

export interface FilterOption {
  label: string;
  value: string | number;
}

export interface FilterSection {
  title: string;
  key: string;
  options: FilterOption[];
}

interface Props {
  data: FilterSection[];
  onFilterChange: (selectedFilter: {
    key: string;
    value: string | number | null;
  }) => void;
}
export default function UiFilter({ data, onFilterChange }: Props) {
  const { t } = useTranslation();

  const optionsAreVisible = useToggle();

  const [selectedFilter, setSelectedFilter] = useState<FilterData>({
    key: '',
    value: null,
  });

  function handleOptionSelect(key: string, value: string | number | null) {
    setSelectedFilter({ key, value });
    onFilterChange({ key, value });
    optionsAreVisible.off();
  }

  function clearFilter() {
    setSelectedFilter({ key: '', value: null });
    onFilterChange({ key: '', value: null });
  }

  const SelectedSignifier = ({ isSelected }: { isSelected: boolean }) => (
    <div
      className={`${
        isSelected ? 'bg-primary-500' : 'bg-[#ECECEC] border border-[#DBDBDB]'
      } w-5 h-5 rounded-full flex items-center justify-center`}
    >
      {isSelected && <UiIcon icon="Checkmark" size="10" />}
    </div>
  );

  return (
    <OutsideClickHandler onOutsideClick={optionsAreVisible.off}>
      <div className="relative">
        <div className="flex gap-3">
          <UiButton
            size="lg"
            variant="tertiary-outlined"
            onClick={optionsAreVisible.toggle}
          >
            <div className="flex gap-3 px-3">
              {t('actions.filter')} <UiIcon icon="Filter" />
            </div>
          </UiButton>
          <div className="border-l border-[#E3E3E8] pl-3">
            <UiButton variant="tertiary" size="lg" onClick={clearFilter}>
              <span>
                {selectedFilter.key
                  ? t(`titles.${selectedFilter.key}`) + ' - '
                  : ''}
                {t(`components.filter.${selectedFilter.value || 'all'}`)}{' '}
              </span>
              <UiIcon icon="X" size="10" />
            </UiButton>
          </div>
        </div>
        {optionsAreVisible.value && (
          <ul className="bg-white rounded-md shadow-lg w-60 py-4 absolute z-10 mt-2 px-4">
            <li>
              <button
                onClick={() => handleOptionSelect('', null)}
                className={`flex items-center justify-between w-full text-xs font-medium hover:bg-tertiary-300 p-2 rounded`}
              >
                {t('general.all')}
                <SelectedSignifier isSelected={selectedFilter.value === null} />
              </button>
            </li>
            {data.map((section, index) => (
              <li key={`${section.title}-${index}`}>
                <p className="text-[8px] mt-3 font-semibold text-gray-500 uppercase">
                  {section.title}
                </p>
                <ul className="mt-2 space-y-2">
                  {section.options.map((option) => (
                    <li key={`${section.key}-${option.value}`}>
                      <button
                        onClick={() =>
                          handleOptionSelect(section.key || '', option.value)
                        }
                        className={`flex items-center justify-between w-full text-xs font-medium hover:bg-tertiary-300 p-2 rounded`}
                      >
                        {option.label}
                        <SelectedSignifier
                          isSelected={
                            selectedFilter.key === section.key &&
                            selectedFilter.value === option.value
                          }
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </OutsideClickHandler>
  );
}
