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
  'secondary-text': 'bg-white text-primary-500',
  danger: 'bg-danger-200 text-light',
  neutral: 'bg-transparent border-none',
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
