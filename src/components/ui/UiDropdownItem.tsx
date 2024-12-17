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
      className={`px-2 py-[10px] text-sm rounded-sm whitespace-nowrap hover:bg-tertiary-100 ${
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
        <span
          className={`flex justify-center items-center w-5 shrink-0 h-5 rounded-full  ${
            isActive
              ? 'border-none bg-primary-500'
              : 'bg-gray-100 outiline outline-tertiary-700 '
          }`}
        >
          {isActive && <UiIcon icon="Checkmark" size="10" />}
        </span>
      </div>
    </li>
  );
}