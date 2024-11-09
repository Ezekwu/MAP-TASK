import { MouseEventHandler } from 'react';
import UiLoader from './UiLoader';

const sizeClasses = {
  lg: 'h-[43px] text-base leading-5',
  md: 'h-[34px] text-sm',
  sm: 'h-8 text-xs leading-5',
  icon: 'w-8 h-8',
};

const variantClasses = {
  primary: 'bg-primary-500 text-white',
  neutral: 'bg-neutral-600 hover:bg-neutral-700 text-neutral-900',
  dark: '',
  tertiary: 'bg-tertiary-300 hover:bg-tertiary-500 text-typography-base',
  'tertiary-outlined':
    'bg-[#fff] hover:bg-tertiary-300 text-typography-base border border-tertiary-300',
};

const roundedClasses = {
  sm: 'rounded-lg',
  md: 'rounded-2xl',
  lg: '',
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
      className={`outline-none w-fit px-5 flex gap-2 items-center justify-center font-semibold ${
        block && 'w-full'
      } ${variantClasses[variant]} ${sizeClasses[size]} ${
        roundedClasses[rounded]
      }`}
      disabled={disabled}
      type={type}
      data-testid="ui-button"
      onClick={onClick}
    >
      {loading ? <UiLoader /> : children}
    </button>
  );
}
