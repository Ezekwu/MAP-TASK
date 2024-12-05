import { MouseEventHandler } from 'react';

import UiLoader from './UiLoader';

const sizeClasses = {
  lg: 'h-[43px] text-sm leading-5 px-5',
  md: 'h-[34px] text-sm px-5',
  sm: 'h-8 text-xs leading-5 px-5',
  icon: 'h-8 px-2',
};

const variantClasses = {
  primary: 'bg-primary-500 text-white',
  neutral: 'bg-neutral-600 hover:bg-neutral-700 text-neutral-900',
  secondary: 'bg-secondary-1500 hover:bg-secondary-1100 text-light',
  danger: 'bg-danger-200 text-light',
  'danger-text': 'bg-light hover:bg-danger-100 text-danger-200',
  'danger-light':
    'bg-danger-100 hover:bg-danger-200 hover:text-light text-danger-200',
  'danger-outlined': 'bg-danger-100  border border-danger-200 text-danger-200',
  tertiary: 'bg-tertiary-300 hover:bg-tertiary-500 text-typography-base',
  'tertiary-outlined':
    'bg-light hover:bg-tertiary-300 text-typography-base border border-tertiary-300',
};

const roundedClasses = {
  xs: 'rounded',
  sm: 'rounded-lg',
  md: 'rounded-2xl',
  lg: 'rounded-3xl',
};

interface Props {
  children: React.ReactNode;
  variant?: keyof typeof variantClasses;
  block?: boolean;
  disabled?: boolean;
  loading?: boolean;
  rounded?: keyof typeof roundedClasses;
  size?: keyof typeof sizeClasses;
  type?: 'button' | 'submit';
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
export default function UiButton({
  children,
  variant = 'primary',
  disabled,
  loading,
  size = 'sm',
  rounded = 'sm',
  type = 'submit',
  block,
  onClick,
}: Props) {
  return (
    <button
      className={`outline-none whitespace-nowrap flex gap-3 items-center justify-center font-semibold ${
        block && 'w-full'
      } ${variantClasses[variant]} ${sizeClasses[size]} ${
        roundedClasses[rounded]
      } ${disabled && 'cursor-not-allowed opacity-75'}`}
      disabled={disabled}
      type={type}
      data-testid="ui-button"
      onClick={onClick}
    >
      {loading ? <UiLoader variant="light" size="sm" /> : children}
    </button>
  );
}
