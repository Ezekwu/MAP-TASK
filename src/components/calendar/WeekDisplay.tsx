import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
export default function WeekDisplay(props: Props) {
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="border-tertiary-500 bg-tertiary-50 border rounded-t-2xl rounded-b-lg overflow-x-auto">
      <div className="grid grid-cols-7   min-h-[200px] min-w-[750px]">
        {weekdays.map((weekDay) => (
          <div key={weekDay} className="border-r last:border-r-0 p-1">
            <div className="text-center text-typography-disabled text-xs font-medium p-1">
              {weekDay}
            </div>
            <div className="grid gap-2 pt-1">{props.children}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
