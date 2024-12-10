import { ReactNode } from 'react';

const variants = {
  primary: 'bg-primary-100 text-primary-700',
  tertiary: 'bg-tertiary-50 border border-tertiary-700',
};

const roundedVariants = {
  normal: 'rounded-lg',
  pill: 'rounded-2xl',
};

interface Props {
  children: ReactNode;
  variant: keyof typeof variants;
  rounded?: keyof typeof roundedVariants;
}
export default function UiTag({
  children,
  rounded = 'normal',
  variant,
}: Props) {
  return (
    <div
      className={`${variants[variant]} text-[10px] p-2 font-medium ${roundedVariants[rounded]} w-fit`}
    >
      {children}
    </div>
  );
}
