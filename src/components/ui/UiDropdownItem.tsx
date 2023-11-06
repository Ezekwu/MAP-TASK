interface Props {
  label: React.ReactNode;
  func: () => void;
  dataTestId: string;
}
export default function UiDropdownItem({
  dataTestId,
  label,
  func,
}: Props) {
  return (
    <li
      className={`p-2 hover:bg-gray-25 text-sm rounded-sm`}
      data-testid={dataTestId}
      tabIndex={0}
      role="button"
      onClick={() => func()}
      onKeyDown={(event) => {
        if (event.key === 'Enter') func();
      }}
    >
      {label}
    </li>
  );
}
