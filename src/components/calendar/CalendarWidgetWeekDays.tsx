export default function CalendarWidgetWeekDays() {
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <ul className="grid grid-cols-7 text-center text-xs text-typography-disabled">
      {weekdays.map((weekday, index) => (
        <li
          key={index}
          className="p-1  border-b border-r last:border-r-0 border-gray-200 h-10 flex items-center justify-center"
        >
          {weekday}
        </li>
      ))}
    </ul>
  );
}
