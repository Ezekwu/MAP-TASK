import React from 'react';

interface Props {
  error?: string;
  label?: string;
  children: React.ReactNode;
  hideLabel?: boolean
}
export default function UiField({ error, label, children, hideLabel}: Props) {
  return (
    <div className="text-left relative w-full">
      {!hideLabel && (
        <label className="text-xs font-medium text-gray-700">{label}</label>
      )}
      <div className="mt-[7px]">{children}</div>
      <div data-testid="error-text" className=" text-danger text-xs">
        {error}
      </div>
      <div className="text-sm font-bold text-gray"></div>
    </div>
  );
}
