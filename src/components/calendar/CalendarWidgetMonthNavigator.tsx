import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';

interface Props {
  selectedDate: Dayjs;
  changeMonth: (val: Dayjs) => void;
}
export default function CalendarWidgetMonthNavigator({
  selectedDate,
  changeMonth,
}: Props) {
  const selectedMonth = useMemo(() => {
    return selectedDate.format('MMMM YYYY');
  }, [selectedDate]);

  function goToPrevMonth() {
    const newSelectedDate = dayjs(selectedDate).subtract(1, 'month');
    changeMonth(newSelectedDate);
  }

  function goToNextMonth() {
    const newSelectedDate = dayjs(selectedDate).add(1, 'month');
    changeMonth(newSelectedDate);
  }

  return (
    <div className="align-center flex justify-center gap-8 py-4 dark:text-gray-900">
      <button className="icon-btn" onClick={goToPrevMonth}>
        <ArrowLeft />
      </button>
      <span className="text-4">{selectedMonth}</span>
      <button className="icon-btn" onClick={goToNextMonth}>
        <ArrowRight />
      </button>
    </div>
  );
}
