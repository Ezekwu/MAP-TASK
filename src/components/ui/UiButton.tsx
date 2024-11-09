import { MouseEventHandler } from 'react';
import UiLoader from './UiLoader';

const sizeClasses = {
  lg: 'h-[43px] text-base leading-5',
  md: 'h-[34px] text-sm',
  sm: 'h-8 text-xs leading-5',
};

const variantClasses = {
  primary: 'bg-primary-500 text-white',
  neutral: 'bg-neutral-600 hover:bg-neutral-700 text-neutral-900',
  transparent:
    'bg-transparent hover:bg-gray-10 text-gray-1000 border border-gray-400',
  dark: '',
  gray: 'bg-gray-400 trxt-gray-950',
  'gray-outlined': '',
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
