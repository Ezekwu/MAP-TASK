import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useMemo } from 'react';

interface Props {
  selectedDate: Dayjs;
  selectMonth: (val: Dayjs) => void;
}
export default function CalendarWidgetMonthNavigator({
  selectedDate,
  selectMonth,
}: Props) {
  const selectedMonth = useMemo(() => {
    return selectedDate.format('MMMM YYYY');
  }, [selectedDate]);

  function goToPrevMonth() {
    const newSelectedDate = dayjs(selectedDate).subtract(1, 'month');
    selectMonth(newSelectedDate);
  }

  function goToNextMonth() {
    const newSelectedDate = dayjs(selectedDate).add(1, 'month');
    selectMonth(newSelectedDate);
  }

  return (
    <div className="align-center flex justify-center gap-8 py-4 dark:text-gray-900">
      <button className="icon-btn" onClick={goToPrevMonth}>
        <div i-carbon-arrow-left />
      </button>
      <span className="text-4">{selectedMonth}</span>
      <button className="icon-btn" onClick={goToNextMonth}>
        <div i-carbon-arrow-right />
      </button>
    </div>
  );
}
