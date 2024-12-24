import UiIcon from './UiIcon';

interface Props {
  label: React.ReactNode;
  func: () => void;
  dataTestId: string;
  isActive?: boolean;
  disabled?: boolean;
}
export default function UiDropdownItem({
  dataTestId,
  label,
  isActive,
  disabled,
  func,
}: Props) {
  function trigger() {
    if (disabled) return;

    func();
  }
  return (
    <li
      className={`px-2 py-[10px] text-sm rounded-md whitespace-nowrap hover:bg-tertiary-100 ${
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
      <div className="flex justify-between items-center">
        {label}
      </div>
    </li>
  );
}
