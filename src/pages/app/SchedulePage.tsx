import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import dayjs, { Dayjs } from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(advancedFormat);

import { Api } from '@/api';
import useMealsQuery from '@/api/query/useMealsQuery';
import { useScheduleQuery } from '@/api/query/useScheduleQuery';
import { useThisAndNextWeekAssignmentsQuery } from '@/api/query/useThisAndNextWeekAssignmentsQuery';

import CalendarWidget from '@/components/calendar/CalendarWidget';
import TheTopNav from '@/components/layout/TheTopNav';
import MealScheduleCard from '@/components/meals/MealScheduleCard';

import { MealType } from '@/types/Meal';

import DayScheduleOverviewModal from '@/components/schedules/DayScheduleOverviewModal';
import SwapMealModal from '@/components/schedules/SwapMealModal';
import UiConfirmationModal from '@/components/ui/UiConfirmationModal';
import UiLoader from '@/components/ui/UiLoader';

import useToggle from '@/hooks/useToggle';

import MealSwapData from '@/types/MealSwapData';

import TokenHandler from '@/utils/TokenHandler';
import { generateUuid } from '@/utils/helpers';
import { Toast } from '@/utils/toast';

// ---

export default function SchedulesPage() {
  const { t } = useTranslation();

  const [calendarReferenceDate, setCalendarReferenceDate] = useState(dayjs());
  const [focusedScheduleDate, setFocusedScheduleDate] = useState<Dayjs | null>(
    null,
  );
  const [mealToSwap, setMealToSwap] = useState<MealSwapData | null>(null);
  const [mealIdToSwapWith, setMealIdToSwapWith] = useState<string | null>(null);

  const dayScheduleIsVisible = useToggle();
  const swapMealIsVisible = useToggle();
  const confirmMealSwapIsVisible = useToggle();
  const confirmMealSwapIsLoading = useToggle();

  const userId = useMemo(
    () => TokenHandler.getToken(),
    [TokenHandler.getToken()],
  );
  const {
    query: { data: thisAndNextWeekAssignments, isLoading: assignmentIsLoading },
  } = useThisAndNextWeekAssignmentsQuery(userId);

  const { findMealById } = useMealsQuery();

  const activeAssignment = useMemo(() => {
    if (!thisAndNextWeekAssignments) return null;

    const { thisWeekSchedules, nextWeekSchedules } = thisAndNextWeekAssignments;

    const selectedTimestamp = calendarReferenceDate.valueOf();

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
  }, [thisAndNextWeekAssignments, calendarReferenceDate]);

  const {
    query: { data: schedule, isLoading: scheduleIsLoading },
  } = useScheduleQuery(activeAssignment?.scheduleId);

  function onChangeDate(day: Dayjs) {
    setCalendarReferenceDate(day);
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

    if (!mealScheduleDetails.meal) return;

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

  const focusedSchedule = useMemo(() => {
    if (!focusedScheduleDate) return;

    return {
      day: focusedScheduleDate,
      formattedDay: focusedScheduleDate.format('ddd Do MMM, YYYY'),
      meals: {
        [MealType.BREAKFAST]:
          getMealBasedOnMetaData(focusedScheduleDate, MealType.BREAKFAST)
            ?.meal || null,
        [MealType.LUNCH]:
          getMealBasedOnMetaData(focusedScheduleDate, MealType.LUNCH)?.meal ||
          null,
        [MealType.DINNER]:
          getMealBasedOnMetaData(focusedScheduleDate, MealType.DINNER)?.meal ||
          null,
      },
    };
  }, [focusedScheduleDate]);

  function selectFocusedDate(day: Dayjs) {
    setFocusedScheduleDate(day);

    dayScheduleIsVisible.on();
  }

  function onCloseDaySchedule() {
    dayScheduleIsVisible.off();

    setFocusedScheduleDate(null);
  }

  function triggerMealSwapModal(param: MealSwapData) {
    setMealToSwap(param);

    dayScheduleIsVisible.off();
    swapMealIsVisible.on();
  }

  function beginMealSwap(mealId: string) {
    setMealIdToSwapWith(mealId);

    confirmMealSwapIsVisible.on();
  }

  function generateUpdatedSchedule() {
    if (!mealToSwap || !mealIdToSwapWith) return;

    const { type, day } = mealToSwap;

    const targetDay = dayjs(day).format('dddd').toLowerCase();

    if (!schedule) return;

    const updatedSchedule = { ...schedule };

    const daySchedule = updatedSchedule.days.find(
      (scheduleDay) => scheduleDay.day.toLowerCase() === targetDay,
    );

    if (!daySchedule) return;

    if (daySchedule && daySchedule.meals[type]) {
      daySchedule.meals[type] = daySchedule.meals[type]?.map((meal) => {
        return {
          ...meal,
          mealId: mealIdToSwapWith,
        };
      });
    }

    const clientUpdateText = '- Client update';

    return {
      ...updatedSchedule,
      id: generateUuid(),
      name: `${updatedSchedule.name} ${
        updatedSchedule.name.includes(clientUpdateText) ? '' : clientUpdateText
      }`,
    };
  }

  async function assignNewScheduleToUser() {
    try {
      const newSchedule = generateUpdatedSchedule();

      const nextWeekAssignment =
        thisAndNextWeekAssignments?.nextWeekSchedules[0];

      if (!userId) return;
      if (!nextWeekAssignment) {
        Toast.error({ msg: t('messages.no-schedule-exists-to-change') });

        return;
      }
      if (!newSchedule) {
        Toast.error({ msg: t('messages.schedule-not-properly-formatted') });

        return;
      }

      confirmMealSwapIsLoading.on();

      await Api.setSchedule(newSchedule);

      const assignment = {
        scheduleId: newSchedule.id,
        userId,
        id: nextWeekAssignment.id,
        startDate: nextWeekAssignment.startDate,
        endDate: nextWeekAssignment.endDate,
        createdAt: Date.now(),
      };

      await Api.assignSchedule(assignment);

      Toast.success({ msg: t('messages.schedule-updated') });
      onCloseModals();
    } catch (err) {
      Toast.error({ msg: t('errors.default') });
    } finally {
      confirmMealSwapIsLoading.off();
    }
  }

  function onCloseModals() {
    confirmMealSwapIsVisible.off();
    swapMealIsVisible.off();
    dayScheduleIsVisible.off();
    setFocusedScheduleDate(null);
    setMealIdToSwapWith(null);
    setMealToSwap(null);
  }

  return (
    <div>
      <TheTopNav pageTitle={t('pages.schedule')} />
      <div className="m-5 bg-white rounded-md pb-4 overflow-y-hidden">
        {scheduleIsLoading || assignmentIsLoading ? (
          <UiLoader />
        ) : (
          <CalendarWidget
            value={calendarReferenceDate}
            itemNode={getMealNode}
            onChangeDate={onChangeDate}
            onSelectDate={selectFocusedDate}
          />
        )}
      </div>
      {focusedSchedule && (
        <DayScheduleOverviewModal
          isOpen={dayScheduleIsVisible.value}
          schedule={focusedSchedule}
          onClose={onCloseDaySchedule}
          onSwapMeal={triggerMealSwapModal}
        />
      )}
      {mealToSwap && (
        <SwapMealModal
          isOpen={swapMealIsVisible.value}
          swapData={mealToSwap}
          onClose={swapMealIsVisible.off}
          onBeginSwap={beginMealSwap}
        />
      )}
      <UiConfirmationModal
        isOpen={confirmMealSwapIsVisible.value}
        onClose={confirmMealSwapIsVisible.off}
        actionTxt={t('actions.yes-switch')}
        loading={confirmMealSwapIsLoading.value}
        display={t('messages.are-you-sure-you-want-to-change-meal', {
          mealType: t(`general.${mealToSwap?.type || MealType.BREAKFAST}`),
          day: mealToSwap?.day.format('ddd Do MMM, YYYY'),
        })}
        onAction={assignNewScheduleToUser}
      />
    </div>
  );
}
