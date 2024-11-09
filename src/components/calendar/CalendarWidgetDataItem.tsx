import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import './CalendarWidgetDayItemStyling.css';

interface Props {
  isCurrent: boolean;
  day?: Dayjs;
  size?: 'sm' | 'lg';
  itemNode?: React.ReactNode;
  isToday?: boolean;
}
export default function CalendarWidgetDayItem({
  day,
  size,
  itemNode,
  isCurrent,
  isToday,
}: Props) {
  const label = useMemo(() => {
    if (!day) return;

    return dayjs(day).format('D');
  }, [day]);

  const hasMeals = useMemo(() => {
    return true;
  }, [day]);

  // TODO: style no meals
  return (
    <li
      className={`day-item box-border p-2 flex flex-col ${
        size === 'sm' ? 'h-20' : 'min-h-[192px]'
      } ${hasMeals ? 'has-no-meals' : ''} ${
        !isCurrent ? 'text-typography-muted opacity-75' : ''
      }`}
    >
      {label && (
        <div
          className={`text-[10px] w-fit py-[2px] px-2 mb-1 rounded-[4px] ${
            isToday
              ? 'text-light bg-secondary-#272932'
              : 'text-typography-dark-accent'
          }`}
        >
          {label}
        </div>
      )}
      <div className="flex-1">{itemNode}</div>
    </li>
  );
}
