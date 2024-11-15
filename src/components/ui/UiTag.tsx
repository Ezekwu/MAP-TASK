import { ReactNode } from 'react';

const variants = {
  primary: 'bg-primary-100 text-primary-700',
};
interface Props {
  children: ReactNode;
  variant: keyof typeof variants;
}
export default function UiTag({ children, variant }: Props) {
  return (
    <div
      className={`${variants[variant]} text-[10px] p-2 font-medium rounded-lg w-fit`}
    >
      {children}
    </div>
  );
}
