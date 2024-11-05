import OnChangeParams from '../../types/OnChangeParams';
import UiField from './UiField';

export type InputType = 'text' | 'password' | 'number' | 'phone' | 'date';

interface Props {
  label?: string;
  type?: InputType;
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
  hideLabel?: boolean;
}
export default function UiInput({
  type = 'text',
  value,
  label,
  variant,
  name,
  placeholder,
  disabled,
  error,
  hideLabel,
  onChange,
}: Props) {
  function sendValue(e: { target: { name: string; value: string } }) {
    onChange({ name: e.target.name, value: e.target.value });
  }

  return (
    <UiField hideLabel={hideLabel} label={label} error={error}>
      <input
        className={`outline-none rounded-2xl w-full  border placeholder:text-sm text-xs h-[52px] pl-4 ${
          !!error
            ? 'bg-danger-100 placeholder:text-danger border-danger'
            : `bg-white border-gray-400 placeholder:text-gray-500`
        }`}
        data-testid="ui-input"
        placeholder={placeholder}
        type={type}
        value={value || ''}
        name={name}
        id={name}
        disabled={disabled}
        onChange={sendValue}
      />
    </UiField>
  );
}
