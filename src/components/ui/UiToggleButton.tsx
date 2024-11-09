import { useEffect, useMemo, useRef, useState } from 'react';

interface Option {
  title: string;
  value: string;
}

interface Props {
  active: string;
  options: Option[];
  onSelect: (value: string) => void;
}

export default function UiToggleButton(props: Props) {
  const [bgPosition, setBgPosition] = useState(0);
  const buttonRefs = useRef<HTMLButtonElement[]>([]);

  const indexOfActiveItem = useMemo(() => {
    return props.options.findIndex((option) => option.value === props.active);
  }, [props.active, props.options]);

  useEffect(() => {
    const activeIndex = props.options.findIndex(
      (option) => option.value === props.active,
    );

    if (buttonRefs.current[activeIndex]) {
      setBgPosition(buttonRefs.current[activeIndex].offsetLeft);
    }
  }, [props.active, props.options]);

  return (
    <div className="relative flex overflow-hidden rounded-lg bg-gray-100">
      <div
        className="absolute top-0 left-0 h-full bg-primary-500 transition-all duration-300 rounded-lg"
        style={{
          width: buttonRefs.current[indexOfActiveItem]?.offsetWidth || 0,
          transform: `translateX(${bgPosition}px)`,
        }}
      />

      {props.options.map((option, index) => (
        <button
          key={option.value}
          ref={(el) => {
            if (el) buttonRefs.current[index] = el;
          }}
          className={`relative px-4 py-2 text-xs font-semibold rounded-lg transition-colors duration-300 ${
            option.value === props.active
              ? 'text-light bg-primary-500'
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
