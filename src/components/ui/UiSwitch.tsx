import UiField from './UiField';

interface Props {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  onLabel: string;
  offLabel: string;
}

export default function UiSwitch({
  label,
  value,
  onChange,
  onLabel,
  offLabel,
}: Props) {
  return (
    <UiField label={label}>
      <div className="flex items-center gap-4">
        <span
          className={`text-sm font-medium ${
            !value ? 'text-gray-900' : 'text-gray-400'
          }`}
        >
          {offLabel}
        </span>
        <button
          onClick={() => onChange(!value)}
          type="button"
          className={`relative flex items-center h-6 w-12 rounded-full transition-all duration-300 
            ${value ? 'bg-primary-500' : 'bg-tertiary-300'}`}
        >
          <span
            className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 
              ${value ? 'translate-x-6' : ''}`}
          />
        </button>
        <span
          className={`text-sm font-medium ${
            value ? 'text-gray-900' : 'text-gray-400'
          }`}
        >
          {onLabel}
        </span>
      </div>
    </UiField>
  );
}
