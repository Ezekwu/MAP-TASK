import { useState, useMemo } from 'react';
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
  name: string;
  error?: string;
  optional?: boolean;
  disabled?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
  onChange: (event: { name: string; value: string | null }) => void;
  prefixNode?: React.ReactNode;
  suffixNode?: React.ReactNode;
}
export default function UiInput({
  type = 'text',
  value,
  label,
  variant,
  optional,
  name,
  placeholder,
  disabled,
  error,
  onChange,
  prefixNode,
  suffixNode,
}: Props) {
  const [inputType, setInputType] = useState(type);

  function sendValue(e: React.ChangeEvent<HTMLInputElement>) {
    onChange({ name: e.target.name, value: e.target.value });
  }

  function handlePhoneChange(value: string | undefined) {
    onChange({ name, value: value! });
  }

  function togglePassword() {
    setInputType((prev) => (prev === 'password' ? 'text' : 'password'));
  }

  const validationStyle = useMemo(() => {
    return error ? 'border-danger-200' : `bg-white border-tertiary-700`;
  }, [error]);

  return (
    <UiField label={label} error={error} optional={optional}>
      <div
        className={`relative flex items-center rounded w-full border text-xs h-[52px] ${validationStyle}`}
      >
        {prefixNode && (
          <div className="pl-2  text-gray-500 text-sm flex items-center">
            {prefixNode}
          </div>
        )}

        {type === 'phone' ? (
          <PhoneInput
            country="NG"
            defaultCountry="NG"
            className="phone-input flex-1"
            value={`${value || ''}`}
            onChange={handlePhoneChange}
          />
        ) : (
          <input
            className={`flex-1 outline-none text-gray-1000 bg-transparent rounded placeholder:text-sm placeholder:font-normal placeholder:text-typography-disabled text-xs font-semibold h-full pl-4 ${
              prefixNode ? 'pl-0' : ''
            }`}
            placeholder={placeholder}
            type={inputType}
            value={value || ''}
            name={name}
            id={name}
            disabled={disabled}
            onChange={sendValue}
          />
        )}

        {/* Suffix Node */}
        {suffixNode && (
          <div className="pl-2 pr-4 text-gray-500 text-sm flex items-center">
            {suffixNode}
          </div>
        )}

        {type === 'password' && (
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-0 top-[25%] mx-3 bg-white"
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
