import { MouseEventHandler } from 'react';
import UiLoader from './UiLoader';

const sizeClasses = {
  lg: 'h-[43px] text-base leading-5',
  md: 'h-[34px] text-sm',
  sm: 'h-8 text-xs leading-5',
};

const variantClasses = {
  primary: 'bg-primary-500 text-white',
  neutral: 'bg-gray-300 text-gray-1000',
  transparent: 'bg-transparent text-gray-1000 border border-gray-400',
};

interface Props {
  children: React.ReactNode;
  variant?: keyof typeof variantClasses;
  block?: boolean;
  disabled?: boolean;
  loading?: boolean;
  size?: keyof typeof sizeClasses;
  type?: 'button' | 'submit';
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function UiButton({
  children,
  variant = 'primary',
  disabled,
  loading,
  size = 'lg',
  type = 'submit',
  block,
  onClick,
}: Props) {
  return (
    <button
      className={`outline-none w-fit rounded-2xl px-5 flex gap-2 items-center justify-center font-semibold ${
        block && 'w-full'
      } ${variantClasses[variant]} ${sizeClasses[size]}`}
      disabled={disabled}
      type={type}
      data-testid="ui-button"
      onClick={onClick}
    >
      {loading ? <UiLoader /> : children}
    </button>
  );
}
