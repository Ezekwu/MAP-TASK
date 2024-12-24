import React from 'react';

interface Props {
  error?: string;
  label?: string;
  children: React.ReactNode;
  optional?: boolean;
}
export default function UiField({ error, label, children, optional }: Props) {
  return (
    <div className="text-left relative  w-full">
      {label && (
        <label className="text-sm font-bold text-tertiary-600 leading-9">
          {label}
        </label>
      )}
      <div className="h-full">{children}</div>
      {error && (
        <div data-testid="error-text" className=" text-danger-200 text-xs mt-1">
          {error}
        </div>
      )}
    </div>
  );
}
