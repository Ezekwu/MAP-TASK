import { useMemo, useState } from 'react';
import { CaretDown, CaretUp } from '@phosphor-icons/react';
import OutsideClickHandler from 'react-outside-click-handler';
import OnChangeParams from '../../types/OnChangeParams';
import UiField from './UiField';
import UiDropdownItem from './UiDropdownItem';

interface Option {
  label: React.ReactNode;
  value: string;
}

interface Props {
  label?: string;
  value: string | null | number;
  placeholder?: string;
  /** The name property should always be the same as the model value. example if the input belongs to
   * formData.confirm_password, the name prop should be confirm_password.
   */
  name: string;
  error?: string;
  disabled?: boolean;
  options: Option[];
  inputRef?: React.RefObject<HTMLInputElement>;
  onChange: (event: OnChangeParams) => void;
}
export default function UiSelect({
  value,
  label,
  placeholder = 'Select from the options',
  name,
  options,
  error,
  onChange,
}: Props) {
  const [optionsAreVisible, setOptionsAreVisible] = useState(false);
  const valueLabel = useMemo(() => {
    if (!value) return placeholder;

    return (
      options.find((option) => value === option.value)?.label || placeholder
    );
  }, [value]);

  function selectOption(value: string) {
    onChange({ name, value });
    setOptionsAreVisible(false);
  }
  return (
    <OutsideClickHandler onOutsideClick={() => setOptionsAreVisible(false)}>
      <UiField error={error} label={label}>
        <button
          type="button"
          data-testid="ui-select-trigger"
          style={{ minHeight: '48px' }}
          className={`outline-none rounded-md w-full border text-left text-xs py-2  flex items-center justify-between px-4 ${
            !!error
              ? 'bg-danger-100 placeholder:text-danger border-danger'
              : `bg-white border-gray-50`
          }`}
          onClick={() => setOptionsAreVisible(!optionsAreVisible)}
        >
          <div className="w-full">
            {!!valueLabel ? valueLabel : placeholder}
          </div>
          {optionsAreVisible ? <CaretUp /> : <CaretDown />}
        </button>
        {optionsAreVisible && (
          <ul
            data-testid="ui-select-options"
            className="absolute bg-white rounded-md mt-2 border-gray-50 border z-20 p-2 w-full"
          >
            {options.map((option, index) => (
              <UiDropdownItem
                key={index}
                dataTestId="ui-select-option"
                label={option.label}
                func={() => selectOption(option.value)}
              />
            ))}
          </ul>
        )}
      </UiField>
    </OutsideClickHandler>
  );
}
