import React from 'react';
import UiField from './UiField';
import UiIcon from './UiIcon';

interface Tag {
  label: string;
  value: string;
}

interface Props {
  tags: Tag[];
  label?: string;
  value: string[];
  onChange: (selectedValues: string[]) => void;
}

export default function UiSelectableTags({
  tags,
  label,
  value,
  onChange,
}: Props) {
  const handleToggle = (tagValue: string) => {
    const isSelected = value.includes(tagValue);
    if (isSelected) {
      onChange(value.filter((v) => v !== tagValue));
    } else {
      onChange([...value, tagValue]);
    }
  };

  return (
    <UiField label={label}>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const isSelected = value.includes(tag.value);
          return (
            <button
              key={tag.value}
              type="button"
              onClick={() => handleToggle(tag.value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all 
              ${
                isSelected
                  ? 'bg-green-100 border-green-500'
                  : 'bg-gray-100 border-gray-300'
              }`}
            >
              <span className="text-sm font-medium">{tag.label}</span>

              <div
                className={`w-4 h-4 ${
                  isSelected
                    ? 'bg-green-500'
                    : 'bg-[#ECECEC] border border-[#DBDBDB]'
                } rounded-full flex items-center justify-center`}
              >
                {isSelected && <UiIcon icon="Checkmark" size="8" />}
              </div>
            </button>
          );
        })}
      </div>
    </UiField>
  );
}
