import UiIcon from './UiIcon';

interface Props {
  value: boolean;
  name: string;
  variant?: 'light' | 'dark';
  onChange: (value: boolean) => void;
}
export default function UiCheckbox({
  value = true,
  variant = 'dark',
  name,
  onChange,
}: Props) {
  return (
    <button
      type="button"
      className={`${
        variant === 'light'
          ? `${`${
              value && `bg-primary-500`
            }`} stroke-black border border-gray-400`
          : 'bg-black stroke-primary-500'
      }   w-6 h-6 rounded-md inline-flex items-center justify-center p-2`}
      onClick={() => onChange(value!)}
    >
      {value && <UiIcon icon="Check" size="12" />}
    </button>
  );
}
