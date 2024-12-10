import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import dayjs, { Dayjs } from 'dayjs';

import { useScheduleQuery } from '@/api/query/useScheduleQuery';
import { useThisAndNextWeekAssignmentsQuery } from '@/api/query/useThisAndNextWeekAssignmentsQuery';
import useMealsQuery from '@/api/query/useMealsQuery';

import CalendarWidget from '@/components/calendar/CalendarWidget';
import TheTopNav from '@/components/layout/TheTopNav';
import MealScheduleCard from '@/components/meals/MealScheduleCard';

import { MealType } from '@/types/Meal';

import UiLoader from '@/components/ui/UiLoader';
import TokenHandler from '@/utils/TokenHandler';

export default function SchedulesPage() {
  const { t } = useTranslation();

  const [selectedDate, setSelectedDate] = useState(dayjs());

  const {
    query: { data: thisAndNextWeekAssignments, isLoading: assignmentIsLoading },
  } = useThisAndNextWeekAssignmentsQuery(TokenHandler.getToken());

  const { findMealById } = useMealsQuery();

  const activeAssignment = useMemo(() => {
    if (!thisAndNextWeekAssignments) return null;

    const { thisWeekSchedules, nextWeekSchedules } = thisAndNextWeekAssignments;

    const selectedTimestamp = selectedDate.valueOf();

    const thisWeekAssignment = thisWeekSchedules.find(
      (schedule) =>
        selectedTimestamp >= schedule.startDate &&
        selectedTimestamp <= schedule.endDate,
    );

    if (thisWeekAssignment)
      return { ...thisWeekAssignment, period: 'thisWeek' };

    const nextWeekAssignment = nextWeekSchedules.find(
      (schedule) =>
        selectedTimestamp >= schedule.startDate &&
        selectedTimestamp <= schedule.endDate,
    );

    if (nextWeekAssignment)
      return { ...nextWeekAssignment, period: 'nextWeek' };

    return null;
  }, [thisAndNextWeekAssignments, selectedDate]);

  const {
    query: { data: schedule, isLoading: scheduleIsLoading },
  } = useScheduleQuery(activeAssignment?.scheduleId);

  function selectDate(day: Dayjs) {
    console.log(day);
    setSelectedDate(day);
  }

  function getMealBasedOnMetaData(day: Dayjs, type: MealType) {
    const dayName = day.format('dddd').toLowerCase();

    const daySchedule = schedule?.days.find(
      (dayData) => dayData.day === dayName,
    );

    if (!daySchedule) {
      return { meal: null, isPast: false, mealType: type };
    }

    const mealEntries = daySchedule.meals[type];

    if (!mealEntries || mealEntries.length === 0) {
      return { meal: null, isPast: false, mealType: type };
    }

    const meal = findMealById(mealEntries[0].mealId);

    const isPast = day.isBefore(dayjs(), 'day');

    return { meal, isPast, mealType: type };
  }

  function getMealNode(day: Dayjs, type?: MealType) {
    if (!type) {
      console.error('No meal type was sent');

      return;
    }
    const mealScheduleDetails = getMealBasedOnMetaData(day, type);

    if (!mealScheduleDetails.meal) return <></>;

    return (
      <div className="h-full grid gap-1">
        <MealScheduleCard
          type={mealScheduleDetails.mealType}
          meal={mealScheduleDetails.meal}
          isPast={mealScheduleDetails.isPast}
        />
      </div>
    );
  }

  return (
    <div>
      <TheTopNav pageTitle={t('pages.schedule')} />
      <div className="m-5 bg-white rounded-md pb-4 overflow-y-hidden">
        {scheduleIsLoading && assignmentIsLoading ? (
          <UiLoader />
        ) : (
          <CalendarWidget
            value={selectedDate}
            itemNode={getMealNode}
            selectDate={selectDate}
          />
        )}
      </div>
    </div>
  );
}
