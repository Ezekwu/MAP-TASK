import React from 'react';
import UiField from './UiField';

interface Props {
  label?: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export default function UiSwitch({ value, label, onChange }: Props) {
  const toggleSwitch = () => {
    onChange(!value);
  };

  return (
    <UiField label={label}>
      <button
        onClick={toggleSwitch}
        type="button"
        className={`relative inline-flex items-center h-6 w-12 rounded-full transition-colors duration-300 ${
          value ? 'bg-primary-500' : 'bg-tertiary-300'
        }`}
      >
        <span
          className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${
            value ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </UiField>
  );
}
