interface Props {
  label: React.ReactNode;
  func: () => void;
  dataTestId: string;
  disabled?: boolean;
}
export default function UiDropdownItem({
  dataTestId,
  disabled,
  label,
  func,
}: Props) {
  function trigger() {
    if (disabled) return;

    return func();
  }

  return (
    <li
      className={`p-2 hover:bg-gray-25 text-sm rounded-sm whitespace-nowrap ${
        disabled ? 'cursor-not-allowed' : 'hover:bg-tertiary-100'
      }`}
      data-testid={dataTestId}
      tabIndex={0}
      role="button"
      onClick={trigger}
      onKeyDown={(event) => {
        if (event.key === 'Enter') trigger();
      }}
    >
      {label}
    </li>
  );
}
