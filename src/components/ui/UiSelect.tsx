import { useMemo, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import OnChangeParams from '../../types/OnChangeParams';
import UiField from './UiField';

interface Option {
  label: string;
  value: string;
}

interface Props {
  label?: string;
  value: string | null | number;
  variant?: 'default' | 'light';
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
  variant,
  name,
  disabled,
  options,
  error,
  onChange,
}: Props) {
  const [optionsAreVisible, setOptionsAreVisible] = useState(false);
  const valueLabel = useMemo(() => {
    return 'Value';
  }, [value]);
  return (
    <OutsideClickHandler onOutsideClick={() => setOptionsAreVisible(false)}>
      <UiField error={error} label={label}>
        <button
          type="button"
          data-testid="ui-select"
          className={`outline-none rounded-md w-full border text-left text-sm  h-12 pl-4 ${
            !!error
              ? 'bg-danger-100 placeholder:text-danger border-danger'
              : `bg-white border-gray-50`
          }`}
          onClick={() => setOptionsAreVisible(!optionsAreVisible)}
        >
          {!!valueLabel ? (
            <span>{valueLabel}</span>
          ) : (
            <span>{placeholder}</span>
          )}
        </button>
        {optionsAreVisible && (
          <ul className="absolute bg-white rounded-md mt-2 border-gray-50 border z-20 p-2 w-full">
            {options.map((option) => (
              <li
                className={`p-2 hover:bg-gray-25 text-sm rounded-sm`}
                onClick={() => onChange({ value: option.value, name })}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </UiField>
    </OutsideClickHandler>
  );
}
