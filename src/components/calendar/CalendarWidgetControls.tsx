import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import UiButton from '../ui/UiButton';
import UiToggleButton from '../ui/UiToggleButton';

export enum Display {
  WEEK = 'week',
  MONTH = 'month',
}

interface Props {
  selectedDate: Dayjs;
  display: Display;
  onSelectDisplay: (display: Display) => void;
  onChange: (val: Dayjs) => void;
}
export default function CalendarWidgetControls({
  display = Display.MONTH,
  selectedDate,
  onChange,
  onSelectDisplay,
}: Props) {
  const displayOptions = [
    {
      title: 'Week',
      value: Display.WEEK,
    },
    {
      title: 'Month',
      value: Display.MONTH,
    },
  ];

  const durationDisplayText = useMemo(() => {
    if (display === Display.MONTH) return selectedDate.format('MMMM YYYY');

    const startOfWeek = selectedDate.startOf('week');
    const endOfWeek = selectedDate.endOf('week');

    const startFormatted = startOfWeek.format('MMMM D');
    const endFormatted = endOfWeek.format('D');
    const year = selectedDate.format('YYYY');

    return `${startFormatted}-${endFormatted}, ${year}`;
  }, [selectedDate, display]);

  function goToPrev() {
    const newSelectedDate = dayjs(selectedDate).subtract(1, display);
    onChange(newSelectedDate);
  }

  function goToNext() {
    const newSelectedDate = dayjs(selectedDate).add(1, display);
    onChange(newSelectedDate);
  }

  return (
    <div className="flex items-center justify-between gap-8 py-4 dark:text-gray-900">
      <div className="flex items-center gap-8 dark:text-gray-900">
        <UiButton variant="gray" size="md" onClick={goToPrev}>
          <ArrowLeft />
        </UiButton>
        <span className="text-sm font-semibold">{durationDisplayText}</span>
        <UiButton variant="gray" size="md" onClick={goToNext}>
          <ArrowRight />
        </UiButton>
      </div>
      <UiToggleButton
        active={display}
        options={displayOptions}
        onSelect={(param) => onSelectDisplay(param as Display)}
      />
    </div>
  );
}
