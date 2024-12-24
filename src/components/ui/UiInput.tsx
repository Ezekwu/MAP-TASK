import { useState, useMemo } from 'react';
import UiField from './UiField';
import UiIcon from './UiIcon';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

export type InputType = 'text' | 'password' | 'number' | 'phone' | 'date';

const sizeClasses = {
  md: 'h-10',
  sm: 'h-8',
};

interface Props {
  label?: string;
  type?: InputType;
  value: string | null | number;
  placeholder?: string;
  variant?: 'default' | 'light';
  name: string;
  size?: keyof typeof sizeClasses;
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
  size = 'md',
  optional,
  name,
  placeholder,
  disabled,
  error,
  onChange,
  prefixNode,
  suffixNode,
}: Props) {
  function sendValue(e: React.ChangeEvent<HTMLInputElement>) {
    onChange({ name: e.target.name, value: e.target.value });
  }

  const validationStyle = useMemo(() => {
    return error ? 'border-danger-200' : `border-[#D0D5DD] `;
  }, [error]);

  return (
    <UiField label={label} error={error} optional={optional}>
      <div
        className={`relative flex  items-center rounded-md  ${disabled ? 'bg-[#F0F2F5]' : ' bg-transparent'} border text-sm h-10 ${validationStyle} ${sizeClasses[size]}`}
      >
        {prefixNode && (
          <div className="pl-2 ext-gray-500 text-sm flex items-center">
            {prefixNode}
          </div>
        )}
        <input
          className={`flex-1 outline-none rounded-md placeholder:text-sm  text-sm h-full pl-4 ${
            prefixNode ? 'pl-0' : ''
          } ${disabled ? 'text-tertiary-350' : 'text-tertiary-900 '}`}
          placeholder={placeholder}
          value={value || ''}
          name={name}
          id={name}
          disabled={disabled}
          onChange={sendValue}
        />
        {/* Suffix Node */}
        {suffixNode && (
          <div className="pl-2 pr-1 text-gray-500 text-sm flex items-center fill-tertiary-400">
            {suffixNode}
          </div>
        )}
      </div>
    </UiField>
  );
}
