import OnChangeParams from '../../types/OnChangeParams';
import UiField from './UiField';

interface Props {
  label?: string;
  value: string | null | number;
  placeholder?: string;
  variant?: 'default' | 'light';
  /** The name property should always be the same as the model value. example if the input belongs to
   * formData.confirm_password, the name prop should be confirm_password.
   */
  name: string;
  error?: string;
  disabled?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
  onChange: (event: OnChangeParams) => void;
}
export default function UiTextarea({
  value,
  label,
  name,
  placeholder,
  disabled,
  error,
  onChange,
}: Props) {
  function sendValue(e: { target: { name: string; value: string } }) {
    onChange({ name: e.target.name, value: e.target.value });
  }

  return (
    <UiField label={label} error={error}>
      <textarea
        className={`outline-none rounded-md w-full border placeholder:text-sm text-xs  h-48 p-4 ${
          !!error
            ? 'bg-danger-100 placeholder:text-danger border-danger'
            : `bg-white border-gray-50`
        }`}
        data-testid="ui-input"
        placeholder={placeholder}
        value={value || ''}
        name={name}
        id={name}
        disabled={disabled}
        onChange={sendValue}
      />
    </UiField>
  );
}
