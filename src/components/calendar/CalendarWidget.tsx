import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { useMemo, useState } from 'react';

import CalenderWidgetDayItem from './CalendarWidgetDayItem';
import CalenderWidgetMonthNavigator from './CalendarWidgetMonthNavigator';
import CalendarWidgetWeekDays from './CalendarWidgetWeekDays';
dayjs.extend(weekday);
dayjs.extend(weekOfYear);

interface Props {
  value: Dayjs;
  size?: 'sm' | 'lg';
  data?: { date: string | Dayjs; name: string; [key: string]: unknown }[];
  selectDate?: (day: Dayjs) => void;
}
export default function CalendarWidget({ value, size, selectDate }: Props) {
  const today = dayjs().format('YYYY-MM-DD');

  const [activeMonthDayReference, setActiveMonthDayReference] = useState(value);
  const activeDate = useMemo(() => {
    return activeMonthDayReference || dayjs();
  }, [activeMonthDayReference]);

  const yearOfActiveDate = useMemo(() => {
    return dayjs(activeDate).year();
  }, [activeDate]);

  const monthOfActiveDate = useMemo(() => {
    return dayjs(activeDate).month() + 1;
  }, [activeDate]);

  const numberOfDaysInSelectedMonth = useMemo(() => {
    return dayjs(value).daysInMonth();
  }, [value]);

  const daysInSelectedMonth = useMemo(() => {
    return [...Array(numberOfDaysInSelectedMonth)].map((_, index) => {
      return {
        date: dayjs(`${yearOfActiveDate}-${monthOfActiveDate}-${index + 1}`),
        isCurrentMonth: true,
      };
    });
  }, [numberOfDaysInSelectedMonth, yearOfActiveDate, monthOfActiveDate]);

  const visibleDaysInPreviousMonth = useMemo(() => {
    const firstDayOfTheMonthWeekday = getWeekday(daysInSelectedMonth[0].date);
    const previousMonth = dayjs(
      `${yearOfActiveDate}-${monthOfActiveDate}-01`,
    ).subtract(1, 'month');

    const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
      ? firstDayOfTheMonthWeekday - 1
      : 6;

    const previousMonthLastMondayDayOfMonth = dayjs(daysInSelectedMonth[0].date)
      .subtract(visibleNumberOfDaysFromPreviousMonth, 'day')
      .date();

    return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((_, index) => {
      return {
        date: dayjs(
          `${previousMonth.year()}-${previousMonth.month() + 1}-${
            previousMonthLastMondayDayOfMonth + index
          }`,
        ),
        isCurrentMonth: false,
      };
    });
  }, [daysInSelectedMonth, yearOfActiveDate, monthOfActiveDate]);

  const visibleDaysInNextMonth = useMemo(() => {
    const lastDayOfTheMonthWeekday = getWeekday(
      `${yearOfActiveDate}-${monthOfActiveDate}-${daysInSelectedMonth.length}`,
    );
    const nextMonth = dayjs(`${yearOfActiveDate}-${monthOfActiveDate}-01`).add(
      1,
      'month',
    );
    const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
      ? 7 - lastDayOfTheMonthWeekday
      : lastDayOfTheMonthWeekday;

    return [...Array(visibleNumberOfDaysFromNextMonth)].map((_, index) => {
      return {
        date: dayjs(
          `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`,
        ),
        isCurrentMonth: false,
      };
    });
  }, [yearOfActiveDate, monthOfActiveDate, daysInSelectedMonth]);

  const visibleDays = useMemo(
    () => [
      ...visibleDaysInPreviousMonth,
      ...daysInSelectedMonth,
      ...visibleDaysInNextMonth,
    ],
    [visibleDaysInPreviousMonth, daysInSelectedMonth, visibleDaysInNextMonth],
  );

  function selectMonth(date: Dayjs) {
    setActiveMonthDayReference(date);
  }

  function getWeekday(date: Dayjs | string) {
    return dayjs(date).weekday();
  }

  function selectDay(e: Dayjs) {
    selectDate?.(e);
  }

  return (
    <div className="calendar">
      <CalenderWidgetMonthNavigator
        selectedDate={activeMonthDayReference}
        changeMonth={selectMonth}
      />
      <CalendarWidgetWeekDays />
      <ol className="grid grid-cols-7">
        {visibleDays.map((day, index) => (
          <CalenderWidgetDayItem
            key={index}
            size={size}
            isToday={day.date.format('YYYY-MM-DD') === today}
            day={day.date}
            isCurrentMonth={day.isCurrentMonth}
            dateClicked={selectDay}
          />
        ))}
      </ol>
    </div>
  );
}
