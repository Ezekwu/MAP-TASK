export default function CalendarWidgetWeekDays() {
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <ul className="grid grid-cols-7">
      {weekdays.map((weekday, index) => (
        <li key={index} className="p-1 text-left text-xs -mb-12 text-3 dark:text-gray-900">
          {weekday}
        </li>
      ))}
    </ul>
  );
}
