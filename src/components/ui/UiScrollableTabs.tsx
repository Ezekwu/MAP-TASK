import React, { useRef, useState, useEffect, ReactNode } from 'react';
import UiIcon from './UiIcon';
import UiButton from './UiButton';

interface Props {
  items: { label: string | ReactNode; value: string }[];
  onSelect: (selected: string) => void;
}

export default function UiScrollableTabs({ items, onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollPosition = () => {
    const container = containerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollWidth > container.offsetWidth + container.scrollLeft,
      );
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    const container = containerRef.current;
    if (container) {
      const scrollAmount = container.offsetWidth / 2; // Scroll by half the container width
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    checkScrollPosition();
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      return () => container.removeEventListener('scroll', checkScrollPosition);
    }
  }, []);

  return (
    <div className="relative flex items-center w-full">
      {canScrollLeft && (
        <div className="absolute left-0">
          <UiButton
            variant="tertiary-outlined"
            size="lg"
            rounded="full"
            onClick={() => scroll('left')}
          >
            <UiIcon icon="CaretLeft" />
          </UiButton>
        </div>
      )}

      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto no-scrollbar w-full"
      >
        {items.map((item, index) => (
          <UiButton
            key={index}
            variant="tertiary-outlined-filled"
            size="lg"
            rounded="full"
            onClick={() => onSelect(item.value)}
          >
            {item.label}
          </UiButton>
        ))}
      </div>

      {canScrollRight && (
        <div className="absolute right-0">
          <UiButton
            variant="tertiary-outlined"
            size="lg"
            rounded="full"
            onClick={() => scroll('right')}
          >
            <UiIcon icon="CaretRight" />
          </UiButton>
        </div>
      )}
    </div>
  );
}
