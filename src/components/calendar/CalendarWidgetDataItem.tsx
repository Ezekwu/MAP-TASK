import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import './CalendarWidgetDayItemStyling.css';

interface Props {
  isCurrent: boolean;
  day?: Dayjs;
  size?: 'sm' | 'lg';
  itemNode?: React.ReactNode;
}
export default function CalendarWidgetDayItem({
  day,
  size,
  itemNode,
  isCurrent,
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
      {label && <div className="text-[10px] text-dark-accent">{label}</div>}
      <div className={`h-full ${label ? 'h-[92%]' : ''}`}>{itemNode}</div>
    </li>
  );
}
