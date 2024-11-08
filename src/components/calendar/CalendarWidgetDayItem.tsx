import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import './CalendarWidgetDayItemStyling.css';

interface Props {
  isCurrentMonth: boolean;
  isToday: boolean;
  day: Dayjs;
  size?: 'sm' | 'lg';
  itemNode?: React.ReactNode;
  dateClicked: (day: Dayjs) => void;
}

export default function CalendarWidgetDayItem({
  day,
  isToday,
  size,
  itemNode,
  isCurrentMonth,
  dateClicked,
}: Props) {
  const label = useMemo(() => {
    return dayjs(day).format('D');
  }, [day]);

  const hasMeals = useMemo(() => {
    return day.date() % 5 !== 0;
  }, [day]);

  function pickDate() {
    if (!isCurrentMonth) return;

    dateClicked(day);
  }

  return (
    <li
      className={`day-item ${size === 'sm' ? 'h-20' : 'h-40'}  ${
        !isCurrentMonth ? 'text-gray-300 cursor-not-allowed' : ''
      }`}
      style={
        hasMeals
          ? {}
          : {
              position: 'relative',
              overflow: 'hidden',
              backgroundImage:
                'linear-gradient(45deg, rgba(0, 0, 0, 0.05) 25%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.05) 75%, rgba(0, 0, 0, 0.05)), linear-gradient(45deg, rgba(0, 0, 0, 0.05) 25%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.05) 75%, rgba(0, 0, 0, 0.05))',
              backgroundSize: '5px 5px',
            }
      }
      onClick={pickDate}
    >
      <div
        className={`${
          isToday ? 'bg-primary text-white p-2' : ''
        } rounded-full flex justify-center items-center w-6 h-6 ml-auto`}
      >
        {label}
      </div>
      {itemNode}
    </li>
  );
}
