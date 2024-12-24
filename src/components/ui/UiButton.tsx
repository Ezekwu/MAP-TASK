import { MouseEventHandler } from 'react';

import UiLoader from './UiLoader';

const sizeClasses = {
  lg: 'h-10 text-sm leading-5 px-5',
  md: 'h-9 text-sm px-4',
  sm: 'h-8 text-xs leading-5 px-5',
  icon: 'h-8 px-2',
};

const variantClasses = {
  primary: 'bg-primary-500 text-white',
  tertiary: 'bg-white border border-tertiary-300 text-tertiary-600',
  secondary: 'bg-white border border-primary-500 text-primary-500',
  danger: 'bg-danger-200 text-light',
  'danger-text': 'bg-light hover:bg-danger-100 text-danger-200',
  'danger-light':
    'bg-danger-100 hover:bg-danger-200 hover:text-light text-danger-200',
  'primary-light': 'bg-primary-100 text-primary-500',
  'warning-light': 'bg-warning-100 text-warning-500',
  'danger-outlined': 'bg-danger-100  border border-danger-200 text-danger-200',
  'tertiary-outlined':
    'bg-light hover:bg-tertiary-300 text-typography-base border border-tertiary-300',
  'tertiary-outlined-filled':
    'bg-light hover:bg-tertiary-300 text-typography-base border border-tertiary-300 bg-[#FAFAFA]',
};

export type BtnVariants = keyof typeof variantClasses;

const roundedClasses = {
  xs: 'rounded',
  sm: 'rounded-lg',
  md: 'rounded-2xl',
  lg: 'rounded-3xl',
  full: 'rounded-full',
};

interface Props {
  children: React.ReactNode;
  variant?: BtnVariants;
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
      className={`outline-none  whitespace-nowrap flex gap-2 items-center justify-center font-semibold ${
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
