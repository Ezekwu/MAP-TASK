import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import UiButton from './UiButton';
import UiIcon from './UiIcon';
import useToggle from '@/hooks/useToggle';

export interface FilterOption {
  label: string;
  value: string | number;
}

export interface FilterSection {
  title: string;
  options: FilterOption[];
}

interface Props {
  data: FilterSection[];
  onFilterChange: (selectedFilter: {
    section: string;
    value: string | number | null;
  }) => void;
}
export default function UiFilter({ data, onFilterChange }: Props) {
  const { t } = useTranslation();

  const optionsAreVisible = useToggle();

  const [selectedFilter, setSelectedFilter] = useState<{
    section: string;
    value: string | number | null;
  }>({
    section: '',
    value: null,
  });

  function handleOptionSelect(section: string, value: string | number | null) {
    setSelectedFilter({ section, value });
    onFilterChange({ section, value });
  }

  const SelectedSignifier = ({ isSelected }: { isSelected: boolean }) => (
    <div
      className={`${
        isSelected ? '' : 'bg-[#ECECEC] border border-[#DBDBDB] rounded-full'
      } w-5 h-5`}
    ></div>
  );

  return (
    <div className="relative">
      <UiButton
        size="lg"
        variant="tertiary-outlined"
        onClick={optionsAreVisible.toggle}
      >
        <div className="flex gap-3 px-3">
          {t('actions.filter')} <UiIcon icon="Filter" />
        </div>
      </UiButton>
      {optionsAreVisible.value && (
        <ul className="bg-white rounded-md shadow-lg w-60 p-4 absolute z-10 mt-2">
          <li className="mb-4">
            <button
              onClick={() => handleOptionSelect('All', null)}
              className={`flex items-center justify-between w-full text-sm font-medium`}
            >
              All
              <SelectedSignifier isSelected={selectedFilter.value === null} />
            </button>
          </li>
          {data.map((section) => (
            <li key={section.title} className="mb-6">
              <p className="text-xs font-semibold text-gray-500 uppercase">
                {section.title}
              </p>
              <ul className="mt-2 space-y-2">
                {section.options.map((option) => (
                  <li key={option.value}>
                    <button
                      onClick={() =>
                        handleOptionSelect(section.title, option.value)
                      }
                      className={`flex items-center justify-between w-full text-sm ${
                        selectedFilter.section === section.title &&
                        selectedFilter.value === option.value
                          ? 'text-blue-600'
                          : 'text-gray-800'
                      }`}
                    >
                      {option.label}
                      {selectedFilter.section === section.title &&
                        selectedFilter.value === option.value && (
                          <span className="text-green-600 font-bold">✓</span>
                        )}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
