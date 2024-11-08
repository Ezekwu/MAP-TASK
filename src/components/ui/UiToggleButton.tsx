interface Props {
  active: string;
  options: { title: string; value: string }[];
  onSelect: (value: string) => void;
}
export default function UiToggleButton(props: Props) {
  return (
    <div className="flex overflow-hidden rounded-lg bg-gray-100">
      {props.options.map((option) => (
        <button
          key={option.value}
          className={`px-4 py-2 text-sm font-semibold rounded-lg ${
            option.value === props.active
              ? 'bg-primary-500 text-typography-light'
              : 'text-typography-secondary'
          }`}
          onClick={() => props.onSelect(option.value)}
        >
          {option.title}
        </button>
      ))}
    </div>
  );
}
