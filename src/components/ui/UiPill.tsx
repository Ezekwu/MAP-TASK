import UiIcon, { Icons } from './UiIcon';

// const variants = {
//   warning: 'bg-neutral-100 text-neutral-primary',
//   success:
//     'bg-[#E6FFEA] text-[#0A6A14] stroke-[#0A6A14] fill-[#0A6A14] border-[#0A6A14]',

// };

const variants = {
  warning: 'bg-neutral-100 text-neutral-500',
  success:
    'bg-[#E6FFEA] text-[#0A6A14] stroke-[#0A6A14] fill-[#0A6A14] border-[#0A6A14]',
  'neutral-primary': 'bg-primary-50 text-gray-1000',
};

interface Props {
  variant?: keyof typeof variants;
  children: React.ReactNode;
}
export default function UiPill({ children, variant = 'warning' }: Props) {
  return (
    <div
      className={`px-2 w-fit h-[17px] flex gap-1 items-center rounded-2xl text-xs font-medium whitespace-nowrap ${variants[variant]}`}
    >
      <span>{children}</span>
    </div>
  );
}
