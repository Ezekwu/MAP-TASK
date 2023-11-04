import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useMemo } from 'react';

interface Props {
  isCurrentMonth: boolean;
  isToday: boolean;
  day: Dayjs;
  dateClicked: (day: Dayjs) => void;
}

export default function CalendarWidgetDayItem({
  day,
  isToday,
  isCurrentMonth,
  dateClicked,
}: Props) {
  const label = useMemo(() => {
    return dayjs(day).format('D');
  }, [day]);

  function pickDate() {
    if (!isCurrentMonth) return;

    dateClicked(day);
  }

  return (
    <li
      className={`day-item cursor-pointer p-1 py-2 text-center text-3 dark:text-gray-900 ${
        !isCurrentMonth ? 'text-gray-300 cursor-not-allowed' : ''
      } ${isToday ? 'is-today text-blue' : ''}`}
      onClick={pickDate}
    >
      {label}
    </li>
  );
}
