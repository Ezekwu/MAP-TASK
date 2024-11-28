import { useMemo, useState } from 'react';
import { CaretDown, CaretUp } from '@phosphor-icons/react';
import OutsideClickHandler from 'react-outside-click-handler';
import OnChangeParams from '../../types/OnChangeParams';
import UiField from './UiField';
import UiDropdownItem from './UiDropdownItem';
import { useTranslation } from 'react-i18next';

export interface Option {
  label: React.ReactNode;
  value: string | boolean;
}

interface Props {
  label?: string;
  value: string | null | number | boolean;
  placeholder?: string;
  /** The name property should always be the same as the model value. example if the input belongs to
   * formData.confirm_password, the name prop should be confirm_password.
   */
  name: string;
  error?: string;
  disabled?: boolean;
  optional?: boolean;
  options: Option[];
  inputRef?: React.RefObject<HTMLInputElement>;
  onChange: (event: OnChangeParams) => void;
}
export default function UiSelect({
  value,
  label,
  optional,
  placeholder = 'Select from the options',
  name,
  options,
  error,
  onChange,
}: Props) {
  const { t } = useTranslation();

  const [optionsAreVisible, setOptionsAreVisible] = useState(false);

  const displayText = useMemo(() => {
    if (!value === null) return placeholder;

    const foundOptionLabel = options.find((option) => value === option.value)
      ?.label;

    if (!foundOptionLabel) return placeholder;

    if (typeof foundOptionLabel === 'string') return t(foundOptionLabel);

    return foundOptionLabel;
  }, [value]);

  const validationStyle = useMemo(() => {
    return !!error ? 'border-danger-200' : `bg-white border-tertiary-700`;
  }, [error]);

  function selectOption(value: string | boolean) {
    onChange({ name, value });
    setOptionsAreVisible(false);
  }

  return (
    <OutsideClickHandler onOutsideClick={() => setOptionsAreVisible(false)}>
      <UiField error={error} label={label} optional={optional}>
        <button
          type="button"
          data-testid="ui-select-trigger"
          style={{ minHeight: '52px' }}
          className={`outline-none rounded w-full border text-left text-xs py-2 flex items-center justify-between px-4 ${validationStyle}`}
          onClick={() => setOptionsAreVisible(!optionsAreVisible)}
        >
          <div
            className={`w-full text-typography-disabled text-sm ${
              value && ' text-secondary-1400'
            }`}
          >
            {displayText}
          </div>
          {optionsAreVisible ? <CaretUp /> : <CaretDown />}
        </button>
        {optionsAreVisible && (
          <ul
            data-testid="ui-select-options"
            className="absolute bg-white border-tertiary-700 border rounded-2xl text-gray-700 mt-2  z-20 p-2 w-full"
          >
            <div className="overflow-auto max-h-72 custom-sidebar">
              {options.map((option, index) => (
                <UiDropdownItem
                  key={index}
                  dataTestId="ui-select-option"
                  label={
                    typeof option.label === 'string'
                      ? t(option.label)
                      : option.label
                  }
                  func={() => selectOption(option.value)}
                />
              ))}
            </div>
          </ul>
        )}
      </UiField>
    </OutsideClickHandler>
  );
}
