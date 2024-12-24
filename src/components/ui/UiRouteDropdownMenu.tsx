import React, { useState } from 'react';

import UiIcon, { Icons } from './UiIcon';
import { Link } from 'react-router-dom';
import OutsideClickHandler from 'react-outside-click-handler';

// --

export interface DropDownData {
  label: string;
  path: string;
}

interface Props {
  label: string;
  icon: Icons;
  subRoutes: DropDownData[];
  currentRoute: string;
}

export default function UiRouteDropdownMenu({
  subRoutes,
  label,
  icon,
  currentRoute,
}: Props) {
  const [optionsAreVisible, setOptionsAreVisible] = useState(false);

  return (
    <OutsideClickHandler onOutsideClick={() => setOptionsAreVisible(false)}>
      <div className="">
        <button
          onClick={() => setOptionsAreVisible(!optionsAreVisible)}
          className={`flex items-center justify-between h-10 py-3 px-4 rounded-[4px] w-full fill-tertiary-400 hover:bg-primary-300 ${optionsAreVisible && 'bg-primary-300 font-medium'}`}
        >
          <li
            className={`flex items-center gap-3 ${optionsAreVisible && 'bg-primary-300 font-medium fill-primary-500'}`}
            onClick={() => setOptionsAreVisible(!optionsAreVisible)}
          >
            <UiIcon icon={icon} />
            <span className="text-tertiary-700 text-sm">{label}</span>
          </li>
          <UiIcon icon={optionsAreVisible ? 'CaretUp' : 'CaretDown'} />
        </button>
        {optionsAreVisible && (
          <ul className="mt-2 w-full z-50">
            {subRoutes.map((subRoutes, index) => (
              <li key={index}>
                <Link
                  className={`flex items-center gap-3 h-10  py-3 px-4 pl-12 rounded-[4px] hover:bg-primary-300 ${subRoutes.path === currentRoute && 'bg-primary-300 font-medium'}`}
                  to={subRoutes.path}
                >
                  <span className="text-tertiary-700 text-sm">
                    {subRoutes.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </OutsideClickHandler>
  );
}
