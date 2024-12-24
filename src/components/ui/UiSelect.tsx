import { CaretDown, CaretUp } from '@phosphor-icons/react';
import { useMemo, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import OnChangeParams from '@/types/OnChangeParams';
import UiDropdownItem from './UiDropdownItem';
import UiField from './UiField';
import UiIcon from './UiIcon';

const sizeClasses = {
  md: 'h-10',
  sm: 'h-8',
};

export interface Option {
  label: React.ReactNode;
  value: string | boolean;
  disabled?: boolean;
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
  size?: keyof typeof sizeClasses;
  inputRef?: React.RefObject<HTMLInputElement>;
  onChange: (event: OnChangeParams) => void;
}
export default function UiSelect({
  value,
  label,
  disabled,
  optional,
  placeholder = 'Select from the options',
  name,
  size = 'md',
  options,
  error,
  onChange,
}: Props) {
  const [optionsAreVisible, setOptionsAreVisible] = useState(false);

  const displayText = useMemo(() => {
    if (value === null) return placeholder;

    const foundOptionLabel = options.find(
      (option) => value === option.value,
    )?.label;

    if (!foundOptionLabel) return placeholder;

    return foundOptionLabel;
  }, [value]);

  const validationStyle = useMemo(() => {
    return !!error ? 'border-danger-200' : `bg-white border-[#D0D5DD]`;
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
          className={`outline-none rounded w-full border text-left px-3 text-xs flex items-center justify-between fill-tertiary-400 ${disabled ? 'bg-[#F0F2F5]' : ' bg-white'}  ${validationStyle}  ${sizeClasses[size]}`}
          onClick={() => {
            !disabled && setOptionsAreVisible(!optionsAreVisible);
          }}
        >
          <div
            className={`w-full text-nowrap text-typography-disabled text-sm ${
              value && ' text-secondary-1400'
            }`}
          >
            {displayText}
          </div>
          <UiIcon icon={optionsAreVisible ? 'CaretUp' : 'CaretDown'} />
        </button>
        {optionsAreVisible && (
          <ul
            data-testid="ui-select-options"
            className="absolute bg-white border border-[#D0D5DD]  rounded text-gray-700 mt-2 z-20 w-full"
          >
            <div className="overflow-auto max-h-72 custom-sidebar">
              {options.map((option, index) => (
                <UiDropdownItem
                  isActive={option.value === value}
                  key={index}
                  dataTestId="ui-select-option"
                  disabled={option.disabled}
                  label={option.label}
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
