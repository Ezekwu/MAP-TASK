import React from 'react';

interface Props {
  error?: string;
  label?: string;
  children: React.ReactNode;
  hideLabel?: boolean;
}

export default function UiField({ error, label, children, hideLabel }: Props) {
  return (
    <div className="text-left relative w-full">
      {!hideLabel && (
        <label className="text-xs font-medium text-gray-700 leading-5">
          {label}
        </label>
      )}
      <div>{children}</div>
      <div data-testid="error-text" className=" text-danger-700 text-xs mt-1">
        {error}
      </div>
    </div>
  );
}
