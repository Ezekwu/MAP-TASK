import { useMemo } from 'react';

import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

import useToggle from '@/hooks/useToggle';

import UiButton from '../ui/UiButton';
import UiIcon from '../ui/UiIcon';
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
  const changeDisplayIsEnabled = useToggle();

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

  const prevIsDisabled = useMemo(() => {
    const startOfWeek = dayjs().startOf('week');
    const endOfWeek = dayjs().endOf('week');

    return selectedDate.isBetween(startOfWeek, endOfWeek, 'day', '[]');
  }, [selectedDate]);

  const nextIsDisabled = useMemo(() => {
    const endOfWeek = dayjs().endOf('week');

    return !(
      selectedDate.isBefore(endOfWeek, 'day') ||
      selectedDate.isSame(endOfWeek, 'day')
    );
  }, [selectedDate]);

  function goToPrev() {
    const newSelectedDate = dayjs(selectedDate).subtract(1, display);

    onChange(newSelectedDate);
  }

  function goToNext() {
    const newSelectedDate = dayjs(selectedDate).add(1, display);

    onChange(newSelectedDate);
  }

  return (
    <div className="w-full flex flex-col-reverse xs:flex-row items-start xs:items-center justify-between gap-5 xs:gap-8 py-4">
      <div className="flex items-center w-full justify-between xs:justify-start gap-3 sm:gap-8">
        <UiButton
          variant="tertiary"
          size="icon"
          disabled={prevIsDisabled}
          onClick={goToPrev}
        >
          <UiIcon icon="CaretLeft" size="10" />
        </UiButton>
        <span className="text-sm font-semibold text-typography-base">
          {durationDisplayText}
        </span>
        <UiButton
          variant="tertiary"
          size="icon"
          disabled={nextIsDisabled}
          onClick={goToNext}
        >
          <UiIcon icon="CaretRight" size="10" />
        </UiButton>
      </div>
      {changeDisplayIsEnabled.value && (
        <UiToggleButton
          active={display}
          options={displayOptions}
          onSelect={(param) => onSelectDisplay(param as Display)}
        />
      )}
    </div>
  );
}
