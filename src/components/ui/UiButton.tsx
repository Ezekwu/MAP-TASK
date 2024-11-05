import { MouseEventHandler } from 'react';
import UiLoader from './UiLoader';

const sizeClasses = {
  lg: 'h-[43px] text-base leading-5',
  md: 'h-[34px] text-sm',
  sm: 'h-8 text-xs leading-5',
};

const variantClasses = {
  primary: 'bg-primary-500 text-white',
  neutral: 'bg-gray-10 hover:bg-gray-50 text-gray-900',
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
  injectedClasses?: string;
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
  injectedClasses,
  onClick,
}: Props) {
  
  return (
    <button
      className={`outline-none rounded-2xl px-4 flex gap-2 items-center justify-center font-semibold ${
        block && 'w-full'
      } ${variantClasses[variant]} ${sizeClasses[size]} ${injectedClasses}`}
      disabled={disabled}
      type={type}
      data-testid="ui-button"
      onClick={onClick}
    >
      {loading ? <UiLoader /> : children}
    </button>
  );
}
