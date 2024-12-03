import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import UiButton from './UiButton';
import UiDropdownItem from './UiDropdownItem';
import UiIcon from './UiIcon';

// ---

export interface DropDownData {
  label: string;
  func: (id: string) => void;
}

interface Props {
  options: DropDownData[];
  trigger?: React.ReactNode;
  itemId: string;
}

export default function UiDropDownMenu({ options, itemId, trigger }: Props) {
  const [optionsAreVisible, setOptionsAreVisible] = useState(false);

  function selectOption(option: DropDownData) {
    option.func(itemId);

    setOptionsAreVisible(false);
  }

  return (
    <OutsideClickHandler onOutsideClick={() => setOptionsAreVisible(false)}>
      {trigger || (
        <UiButton
          data-testid="ui-dropdown-trigger"
          size="sm"
          variant="tertiary"
          onClick={() => setOptionsAreVisible(!optionsAreVisible)}
        >
          <UiIcon icon="HorizontalThreeDots" />
        </UiButton>
      )}

      {/* TODO: fix dropdown in modals */}
      {optionsAreVisible && (
        <ul
          data-testid="ui-dropdown-options"
          className="absolute bg-white rounded-md mt-2 border-gray-50 border w-fit z-50 p-2"
        >
          {options.map((option, index) => (
            <UiDropdownItem
              key={index}
              dataTestId={`ui-dropdown-option-${option.label}`}
              label={option.label}
              func={() => selectOption(option)}
            />
          ))}
        </ul>
      )}
    </OutsideClickHandler>
  );
}
