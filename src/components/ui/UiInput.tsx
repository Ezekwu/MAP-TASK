import { useState } from 'react';
import OnChangeParams from '../../types/OnChangeParams';
import UiField from './UiField';
import UiIcon from './UiIcon';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

export type InputType = 'text' | 'password' | 'number' | 'phone' | 'date';

interface Props {
  label?: string;
  type?: InputType;
  value: string | null | number;
  placeholder?: string;
  variant?: 'default' | 'light';
  /** The name property should always be the same as the model value. example if the input belongs to
   * formData.confirm_password, the name prop should be confirm_password.
   */
  name: string;
  error?: string;
  disabled?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
  onChange: (event: OnChangeParams) => void;
}
export default function UiInput({
  type = 'text',
  value,
  label,
  variant,
  name,
  placeholder,
  disabled,
  error,
  onChange,
}: Props) {
  const [inputType, setInputType] = useState(type);

  function sendValue(e: { target: { name: string; value: string } }) {
    onChange({ name: e.target.name, value: e.target.value });
  }

  function handlePhoneChange(value: string | undefined) {
    onChange({ name, value });
  }

  function togglePassword() {
    if (inputType === 'password') setInputType('text');
    else setInputType('password');
  }

  return (
    <UiField hideLabel={!label} label={label} error={error}>
      <div className="relative">
        {type === 'phone' ? (
          <div
            className={`flex items-center gap-2 rounded-2xl w-full border  text-xs h-[52px] p-1 pl-4 ${
              !!error
                ? 'border-danger-700 placeholder:text-danger-700'
                : `bg-white border-gray-400`
            }`}
          >
            <span className="text-gray-500 text-sm">+234</span>
            <PhoneInput
              country="NG"
              defaultCountry="NG"
              className="phone-input"
              value={`${value || ''}`}
              onChange={handlePhoneChange}
            />
          </div>
        ) : (
          <input
            className={`outline-none text-gray-1000 rounded-2xl w-full border placeholder:text-sm placeholder:font-normal text-sm font-semibold h-[52px] pl-4 ${
              !!error
                ? 'border-danger-700 placeholder:text-danger-700'
                : `bg-white border-gray-400 placeholder:text-gray-500`
            }`}
            data-testid="ui-input"
            placeholder={placeholder}
            type={inputType}
            value={value || ''}
            name={name}
            id={name}
            disabled={disabled}
            onChange={sendValue}
          />
        )}
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-0 top-[25%]  mx-3 bg-white"
          >
            <UiIcon
              size="20"
              icon={inputType === 'password' ? 'EyeSlash' : 'Eye'}
            />
          </button>
        )}
      </div>
    </UiField>
  );
}
