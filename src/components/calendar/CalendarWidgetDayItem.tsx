import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useMemo } from 'react';

interface Props {
  isCurrentMonth: boolean;
  isToday: boolean;
  day: Dayjs;
  size?: 'sm' | 'lg';
  dateClicked: (day: Dayjs) => void;
}

export default function CalendarWidgetDayItem({
  day,
  isToday,
  size,
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
      className={`day-item cursor-pointer py-4 text-right text-sm p-2 text-3 dark:text-gray-900 ${
        size === 'sm' ? 'h-20' : 'h-40'
      } border-gray-50 border-r border-t ${
        !isCurrentMonth ? 'text-gray-300 cursor-not-allowed' : ''
      }`}
      onClick={pickDate}
    >
      <div
        className={`${
          isToday ? 'bg-primary text-white p-2' : ''
        } rounded-full flex justify-center items-center w-6 h-6 ml-auto`}
      >
        {label}
      </div>
    </li>
  );
}
