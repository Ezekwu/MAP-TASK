import UiIcon from "./UiIcon";

interface Props {
  label: React.ReactNode;
  func: () => void;
  dataTestId: string;
  optionValue: string | boolean;
  value: string | null | number | boolean;
}
export default function UiDropdownItem({ dataTestId, label, optionValue, value, func }: Props) {

  function isActiveCycle(optionValue: string | boolean) {
    return value === optionValue;
  }

  return (
    <li
      className={`p-2 py-[10px] hover:bg-secondary-100 text-sm rounded-sm`}
      data-testid={dataTestId}
      tabIndex={0}
      role="button"
      onClick={() => func()}
      onKeyDown={(event) => {
        if (event.key === 'Enter') func();
      }}
    >
      <div className="flex justify-between items-center">
        {label}
        <span
          className={`flex justify-center items-center w-5 shrink-0 h-5 rounded-full  ${
            isActiveCycle(optionValue)
              ? 'border-none bg-primary-500'
              : 'bg-gray-100 outiline outline-tertiary-700 '
          }`}
        >
          {isActiveCycle(optionValue) && <UiIcon icon="Checkmark" size="10" />}
        </span>
      </div>
    </li>
  );
}
