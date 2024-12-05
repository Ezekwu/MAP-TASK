import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  error?: string;
  label?: string;
  children: React.ReactNode;
  optional?: boolean;
}
export default function UiField({ error, label, children, optional }: Props) {
  const { t } = useTranslation();

  return (
    <div className="text-left relative  w-full">
      {label && (
        <label className="text-xs font-medium text-typography-label leading-9">
          {label} {optional ? `${t('fields.optional')}` : ''}
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
