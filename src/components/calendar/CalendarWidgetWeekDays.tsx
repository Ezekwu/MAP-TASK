import { Dayjs } from 'dayjs';
import { useMemo } from 'react';
import { Display } from './CalendarWidgetControls';

interface Props {
  day?: Dayjs;
  display: Display;
}

export default function CalendarWidgetWeekDays(props: Props) {
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Calculate start date and total days in the current month
  const startOfWeek = useMemo(() => {
    if (props.display === Display.MONTH || !props.day) return null;

    const startDay = props.day.startOf('week');
    const daysInMonth = props.day.daysInMonth();

    // Array of dates for each weekday, wrapping around when the month ends
    return weekdays.map((_, index) => {
      const date = startDay.date() + index;
      return date > daysInMonth ? date - daysInMonth : date;
    });
  }, [props.day, props.display]);

  return (
    <ul className="grid grid-cols-7 text-center text-xs text-typography-disabled">
      {weekdays.map((weekday, index) => (
        <li
          key={index}
          className="p-1 border-b border-r last:border-r-0 border-gray-200 h-10 flex items-center justify-center"
        >
          {weekday} {startOfWeek ? startOfWeek[index] : ''}
        </li>
      ))}
    </ul>
  );
}
