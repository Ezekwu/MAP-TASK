import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import './CalendarWidgetDayItemStyling.css';

interface Props {
  isCurrent: boolean;
  day?: Dayjs;
  size?: 'sm' | 'lg';
  itemNode?: React.ReactNode;
  hideLabel?: boolean;
  isToday?: boolean;
  onSelectDate?: (day: Dayjs) => void;
}
export default function CalendarWidgetDayItem({
  day,
  size,
  itemNode,
  isCurrent,
  hideLabel,
  isToday,
  onSelectDate,
}: Props) {
  const label = useMemo(() => {
    if (!day || hideLabel) return;

    return dayjs(day).format('D');
  }, [day]);

  const hasData = useMemo(() => {
    return Boolean(itemNode);
  }, [day]);

  function selectDate() {
    if (!day || !itemNode || !onSelectDate) return;

    onSelectDate(day);
  }

  // TODO: style no meals
  return (
    <li
      className={`day-item box-border p-2 flex flex-col ${
        itemNode ? 'cursor-pointer' : 'cursor-not-allowed'
      } ${size === 'sm' ? 'h-20' : 'min-h-[192px]'} ${
        hasData ? 'has-no-meals' : ''
      } ${!isCurrent ? 'text-typography-muted opacity-75' : ''}`}
      onClick={selectDate}
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
