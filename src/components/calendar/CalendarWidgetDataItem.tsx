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

  return (
    <li
      className={`day-item p-2 ${size === 'sm' ? 'h-20' : 'min-h-[192px]'} ${
        hasMeals ? 'has-no-meals' : ''
      }  ${!isCurrent ? 'text-typography-muted cursor-not-allowed' : ''}`}
    >
      {label && (
        <div
          className={`text-[10px] w-fit py-[2px] px-2 mb-1 rounded-[4px] ${
            isToday
              ? 'text-typography-light bg-dark-200'
              : 'text-typography-dark-accent'
          }`}
        >
          {label}
        </div>
      )}
      <div className={`h-full ${label ? 'h-[88%]' : ''}`}>{itemNode}</div>
    </li>
  );
}
