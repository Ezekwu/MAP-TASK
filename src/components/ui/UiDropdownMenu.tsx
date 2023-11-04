import React, { useState } from 'react';
import { DotsThreeOutlineVertical } from '@phosphor-icons/react';
import OutsideClickHandler from 'react-outside-click-handler';

export interface DropDownData {
  label: string;
  func: (id?: string) => void;
}

interface Props {
  options: DropDownData[];
  trigger?: React.ReactNode;
  itemId?: string;
}

export default function UiDropDownMenu({ options, itemId, trigger }: Props) {
  const [optionsAreVisible, setOptionsAreVisible] = useState(false);

  function selectOption(option: DropDownData) {
    option.func(itemId);
    setOptionsAreVisible(false);
  }
  return (
    <OutsideClickHandler onOutsideClick={() => setOptionsAreVisible(false)}>
      <button onClick={() => setOptionsAreVisible(!optionsAreVisible)}>
        {trigger || <DotsThreeOutlineVertical />}
      </button>

      {optionsAreVisible && (
        <ul
          data-testid="ui-dropdown-options"
          className="absolute bg-white rounded-md mt-2 border-gray-50 border w-fit z-20 p-2 w-full"
        >
          {options.map((option) => (
            <li
              className={`p-2 hover:bg-gray-25 text-sm rounded-sm cursor-pointer`}
              data-testid="ui-dropdown-option"
              onClick={() => selectOption(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </OutsideClickHandler>
  );
}
