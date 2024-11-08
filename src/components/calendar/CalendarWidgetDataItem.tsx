import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import './CalendarWidgetDayItemStyling.css';

interface Props {
  isCurrentMonth: boolean;
  day: Dayjs;
  size?: 'sm' | 'lg';
  itemNode?: React.ReactNode;
}
export default function CalendarWidgetDayItem({
  day,
  size,
  itemNode,
  isCurrentMonth,
}: Props) {
  const label = useMemo(() => {
    return dayjs(day).format('D');
  }, [day]);

  const hasMeals = useMemo(() => {
    return day.date() % 5 !== 0;
  }, [day]);

  return (
    <li
      className={`day-item p-2 ${size === 'sm' ? 'h-20' : 'h-40'} ${
        hasMeals ? 'has-no-meals' : ''
      }  ${!isCurrentMonth ? 'text-typography-muted cursor-not-allowed' : ''}`}
    >
      <div className="text-[10px] text-dark-accent">{label}</div>
      {itemNode}
    </li>
  );
}
