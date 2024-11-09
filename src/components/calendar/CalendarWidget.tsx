import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { useMemo, useState } from 'react';

import CalenderWidgetDataItem from './CalendarWidgetDataItem';
import CalenderWidgetControls, { Display } from './CalendarWidgetControls';
import CalendarWidgetWeekDays from './CalendarWidgetWeekDays';

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

interface Props {
  value: Dayjs;
  size?: 'sm' | 'lg';
  data?: { date: string | Dayjs; name: string; [key: string]: unknown }[];
  selectDate?: (day: Dayjs) => void;
  itemNode?: (day: Dayjs) => React.ReactNode;
}
export default function CalendarWidget({
  value,
  size = 'lg',
  itemNode,
  selectDate,
}: Props) {
  const [display, setDisplay] = useState(Display.WEEK);

  const today = dayjs().format('YYYY-MM-DD');
  const mealTypes = ['Breakfast', 'Lunch', 'Dinner'];
  const arrayForEachDayOfTheWeek = Array.from({ length: 7 }, (_, i) => i + 1);

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
    <div className="calendar w-full">
      <CalenderWidgetControls
        display={display}
        onSelectDisplay={setDisplay}
        selectedDate={activeMonthDayReference}
        onChange={selectMonth}
      />
      <div className="overflow-x-scroll">
        <div className="min-w-[750px] rounded-t-2xl rounded-b-lg border border-gray-200">
          <div className="flex">
            {display === Display.WEEK && (
              <div className="w-10 border-r border-b box-content border-gray-200" />
            )}
            <div className="w-full">
              <CalendarWidgetWeekDays
                day={activeMonthDayReference}
                display={display}
              />
            </div>
          </div>

          {display === Display.WEEK && (
            <>
              {mealTypes.map((type, index) => (
                <div
                  key={type}
                  className={`flex  border-gray-200 ${
                    index !== 2 ? 'border-b' : ''
                  }`}
                >
                  <div
                    className="w-10 flex items-center justify-center transform rotate-180 text-center border-l border-gray-200 font-medium text-xs text-typography-disabled"
                    style={{
                      writingMode: 'vertical-rl',
                    }}
                  >
                    {type}
                  </div>
                  <ol className="grid grid-cols-7 w-full">
                    {arrayForEachDayOfTheWeek.map((index) => (
                      <CalenderWidgetDataItem
                        key={index}
                        size={size}
                        itemNode={(() => itemNode?.(visibleDays[0].date))()}
                        isCurrent
                      />
                    ))}
                  </ol>
                </div>
              ))}
            </>
          )}
          {display === Display.MONTH && (
            <ol className="grid grid-cols-7">
              {visibleDays.map((day, index) => (
                <CalenderWidgetDataItem
                  key={index}
                  size={size}
                  day={day.date}
                  itemNode={(() => itemNode?.(day.date))()}
                  isCurrent={day.isCurrentMonth}
                  isToday={day.date.format('YYYY-MM-DD') === today}
                />
              ))}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}
