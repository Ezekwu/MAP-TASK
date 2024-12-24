import OnChangeParams from '@/types/OnChangeParams';
import UiField from './UiField';

interface Props {
  label?: string;
  value: string;
  placeholder?: string;
  variant?: 'default' | 'light';
  /** The name property should always be the same as the model value. example if the input belongs to
   * formData.confirm_password, the name prop should be confirm_password.
   */
  name: string;
  maxChar?: number;
  error?: string;
  disabled?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
  onChange: (event: OnChangeParams) => void;
}
export default function UiTextarea({
  value,
  label,
  name,
  maxChar,
  placeholder,
  disabled,
  error,
  onChange,
}: Props) {
  function sendValue(e: { target: { name: string; value: string } }) {
    onChange({
      name: e.target.name,
      value: maxChar ? e.target.value.slice(0, maxChar) : e.target.value,
    });
  }

  return (
    <UiField label={label} error={error}>
      <textarea
        className={`outline-none rounded-md w-full border placeholder:text-sm placeholder:text-tertiary-350 text-xs  h-[106px] p-4 ${
          !!error
            ? 'bg-danger-100 placeholder:text-danger border-danger'
            : `bg-white border-[#D0D5DD] `
        }`}
        placeholder={placeholder}
        value={value || ''}
        name={name}
        id={name}
        disabled={disabled}
        onChange={sendValue}
      />
      {maxChar && (
        <div className="flex justify-end text-tertiary-400 mt-2 text-sx">
          <span>{value.length}</span>/ <span>{maxChar}</span>
        </div>
      )}
    </UiField>
  );
}
