import { MouseEventHandler } from 'react';
import UiLoader from './UiLoader';

const sizeClasses = {
  sm: 'p-2',
  md: 'p-3',
  lg: '',
};

const variantClasses = {
  primary: 'bg-primary text-white',
  neutral: 'bg-neutral-600 hover:bg-neutral-700 text-neutral-900',
  transparent:
    'bg-transparent hover:bg-gray-10 text-gray-1000 border border-gray-400',
  dark: '',
  gray: 'bg-gray-100 text-base',
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
      className={`outline-none rounded-2xl px-4 flex gap-2 items-center justify-center font-semibold ${
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
