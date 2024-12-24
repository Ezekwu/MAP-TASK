import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import UiButton from './UiButton';
import UiDropdownItem from './UiDropdownItem';
import UiIcon from './UiIcon';

// ---

export interface DropDownData {
  label: string;
  func: (id?: string) => void;
  disabled?: boolean;
}
interface Props {
  options: DropDownData[];
  trigger?: React.ReactNode | ((optionsAreVisible: boolean) => React.ReactNode);
  itemId?: string;
  triggerSize?: 'sm' | 'lg' | 'md';
}

export default function UiDropDownMenu({
  options,
  itemId,
  trigger,
  triggerSize = 'sm',
}: Props) {
  const [optionsAreVisible, setOptionsAreVisible] = useState(false);

  function selectOption(option: DropDownData) {
    option.func(itemId);

    setOptionsAreVisible(false);
  }

  return (
    <OutsideClickHandler onOutsideClick={() => setOptionsAreVisible(false)}>
      <div className="relative">
        <button onClick={() => setOptionsAreVisible(!optionsAreVisible)}>
          {typeof trigger === 'function'
            ? trigger(optionsAreVisible)
            : trigger || <UiIcon icon="CaretDown" />}
        </button>
        {optionsAreVisible && (
          <ul
            data-testid="ui-dropdown-options"
            className="absolute bg-white rounded-md mt-2 border-gray-50 border w-fit z-50 p-2"
          >
            {options.map((option, index) => (
              <UiDropdownItem
                key={index}
                disabled={option.disabled}
                dataTestId={`ui-dropdown-option-${option.label}`}
                label={option.label}
                func={() => selectOption(option)}
              />
            ))}
          </ul>
        )}
      </div>
    </OutsideClickHandler>
  );
}
