import React from 'react';

interface Props {
  error?: string;
  label?: string;
  children: React.ReactNode;
}

export default function UiField({ error, label, children }: Props) {
  return (
    <div className="text-left relative">
      {label && (
        <label className="text-xs font-medium text-tertiary-700 leading-9">
          {label}
        </label>
      )}
      <div>{children}</div>
      {error && (
        <div data-testid="error-text" className=" text-danger-200 text-xs mt-1">
          {error}
        </div>
      )}
    </div>
  );
}
