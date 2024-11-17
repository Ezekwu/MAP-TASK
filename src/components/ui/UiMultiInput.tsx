import { X, Plus } from '@phosphor-icons/react';
import { useState } from 'react';
import UiButton from './UiButton';
import UiInput from './UiInput';
import OnChangeParams from '@/types/OnChangeParams';
import UiField from './UiField';

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  value?: string[];
  onChange: (params: OnChangeParams) => void;
}

export default function UiMultiInput({
  name,
  label,
  value = [''],
  placeholder,
  onChange,
}: Props) {
  const [values, setValues] = useState<string[]>(value);

  const handleInputChange = (index: number, newValue: string) => {
    const updatedValues = [...values];

    updatedValues[index] = newValue;

    setValues(updatedValues);

    onChange({ name, value: updatedValues });
  };

  const addInput = () => {
    const updatedValues = [...values, ''];

    setValues(updatedValues);

    onChange({ name, value: updatedValues });
  };

  const removeInput = (index: number) => {
    const updatedValues = values.filter((_, i) => i !== index);

    setValues(updatedValues);

    onChange({ name, value: updatedValues });
  };

  return (
    <UiField label={label}>
      <div className="space-y-4">
        {values.map((v, index) => (
          <div key={index} className="flex items-end gap-2">
            <div className="w-full">
              <UiInput
                name={`${name}-${index}`}
                placeholder={placeholder}
                value={v}
                onChange={(e) => handleInputChange(index, e.value as string)}
              />
            </div>
            {index > 0 && (
              <UiButton
                size="icon"
                variant="tertiary-outlined"
                onClick={() => removeInput(index)}
              >
                <X />
              </UiButton>
            )}
          </div>
        ))}
        <UiButton variant="tertiary-outlined" type="button" onClick={addInput}>
          <Plus /> Add another item
        </UiButton>
      </div>
    </UiField>
  );
}
