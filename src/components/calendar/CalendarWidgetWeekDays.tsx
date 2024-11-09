import { Dayjs } from 'dayjs';
import { useMemo } from 'react';
import { Display } from './CalendarWidgetControls';

interface Props {
  day?: Dayjs;
  display: Display;
}
export default function CalendarWidgetWeekDays(props: Props) {
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const startOfWeek = useMemo(() => {
    if (props.display === Display.MONTH || !props.day) return;

    return Number(props.day.startOf('week').format('D'));
  }, [props.day]);

  return (
    <ul className="grid grid-cols-7 text-center text-xs text-typography-disabled">
      {weekdays.map((weekday, index) => (
        <li
          key={index}
          className="p-1  border-b border-r last:border-r-0 border-gray-200 h-10 flex items-center justify-center"
        >
          {weekday} {startOfWeek ? startOfWeek + index : ''}
        </li>
      ))}
    </ul>
  );
}
