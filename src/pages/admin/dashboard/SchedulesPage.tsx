import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

import { useSchedulesQuery } from '@/api/query/useSchedulesQuery';
import { useThisAndNextWeekAssignmentsQuery } from '@/api/query/useThisAndNextWeekAssignmentsQuery';

import BasePage from '@/components/layout/BasePage';
import AssignScheduleToUsersModal from '@/components/schedules/AssignScheduleToUsersModal';
import SetScheduleModal from '@/components/schedules/SetScheduleModal';
import UiButton from '@/components/ui/UiButton';

import useKey from '@/hooks/useKey';
import useToggle from '@/hooks/useToggle';

import ScheduleCard from '@/components/schedules/ScheduleCard';
import UiNoData from '@/components/ui/UiNoData';

import { WeeklyMealSchedule } from '@/types/WeeklyMealSchedule';
import ScheduleAssignment from '@/types/ScheduleAssignment';
import UiConfirmationModal from '@/components/ui/UiConfirmationModal';
import { Api } from '@/api';
import { Toast } from '@/utils/toast';

export default function SchedulesPage() {
  const { t } = useTranslation();

  const { key, newKey } = useKey();

  const {
    query: { data },
    setData,
    removeData,
  } = useSchedulesQuery();

  const {
    query: { data: thisAndNextWeekAssignments },
    setData: setThisAndNextWeekAssignments,
  } = useThisAndNextWeekAssignmentsQuery();

  const [activeSchedule, setActiveSchedule] =
    useState<WeeklyMealSchedule | null>(null);

  const setScheduleIsOpen = useToggle();
  const assignScheduleToUserIsOpen = useToggle();
  const deleteScheduleConfirmationIsOpen = useToggle();
  const deleteScheduleConfirmationIsLoading = useToggle();

  const navDetails = {
    title: t('pages.schedules'),
    edgeNode: (
      <UiButton
        variant="secondary"
        size="lg"
        rounded="md"
        onClick={setScheduleIsOpen.on}
      >
        {t('actions.create-schedule')}
      </UiButton>
    ),
  };

  const activeSchedules = useMemo(() => {
    const thisWeekAssignments = thisAndNextWeekAssignments?.thisWeekSchedules;

    const startOfThisWeek = dayjs().startOf('week').format('ddd MMM DD YYYY');
    const endOfThisWeek = dayjs().endOf('week').format('ddd MMM DD YYYY');

    const date = `${startOfThisWeek} -  ${endOfThisWeek}`;
    if (!thisWeekAssignments || !data) return { date, data: [] };

    const activeScheduleIds = thisWeekAssignments.map(
      ({ scheduleId }) => scheduleId,
    );

    const filteredSchedules = data.filter(({ id }) =>
      activeScheduleIds.includes(id),
    );

    return { date, data: filteredSchedules };
  }, [data, thisAndNextWeekAssignments]);

  const pendingSchedules = useMemo(() => {
    const nextWeekAssignments = thisAndNextWeekAssignments?.nextWeekSchedules;

    const startOfNextWeek = dayjs()
      .add(1, 'week')
      .startOf('week')
      .format('ddd MMM DD YYYY');

    const endOfNextWeek = dayjs()
      .add(1, 'week')
      .endOf('week')
      .format('ddd MMM DD YYYY');

    const date = `${startOfNextWeek} - ${endOfNextWeek}`;

    if (!nextWeekAssignments || !data) return { date, data: [] };

    const pendingScheduleIds = nextWeekAssignments.map(
      ({ scheduleId }) => scheduleId,
    );

    const filteredSchedules = data.filter(({ id }) =>
      pendingScheduleIds.includes(id),
    );

    return { date, data: filteredSchedules };
  }, [data, thisAndNextWeekAssignments]);

  const inactiveSchedules = useMemo(() => {
    const existingScheduleIds = [
      ...pendingSchedules.data.map(({ id }) => id),
      ...activeSchedules.data.map(({ id }) => id),
    ];

    return (
      data?.filter((schedule) => !existingScheduleIds.includes(schedule.id)) ||
      []
    );
  }, [data, pendingSchedules, activeSchedules]);

  function onScheduleSet(schedule: WeeklyMealSchedule) {
    setData(schedule);

    newKey();

    setScheduleIsOpen.off();

    if (schedule.id) {
      setActiveSchedule(null);

      return;
    }

    setActiveSchedule(schedule);

    assignScheduleToUserIsOpen.on();
  }

  function onCloseSetSchedule() {
    setScheduleIsOpen.off();

    newKey();

    setActiveSchedule(null);
  }

  function handleActions(action: string, scheduleParam: WeeklyMealSchedule) {
    setActiveSchedule(scheduleParam);

    switch (action) {
      case 'clone':
        setActiveSchedule({ ...scheduleParam, id: '' });
        setScheduleIsOpen.on();
        break;
      case 'update':
        setScheduleIsOpen.on();
        break;
      case 'delete':
        deleteScheduleConfirmationIsOpen.on();
        break;
      case 'assign':
        assignScheduleToUserIsOpen.on();
        break;
      default:
        console.error(`${action} has not been implemented`);
    }
  }

  function onUsersAssigned(assignments: ScheduleAssignment[]) {
    closeAssignSchedule();

    setThisAndNextWeekAssignments(assignments);
  }

  function closeAssignSchedule() {
    assignScheduleToUserIsOpen.off();

    newKey();

    setActiveSchedule(null);
  }

  async function onDeleteSchedule() {
    if (!activeSchedule) return;

    try {
      deleteScheduleConfirmationIsLoading.on();

      await Api.deleteSchedule(activeSchedule.id);

      removeData(activeSchedule.id);

      deleteScheduleConfirmationIsOpen.off();

      Toast.success({ msg: t('messages.schedule-deleted') });

      setActiveSchedule(null);
    } catch (err) {
      Toast.success({ msg: t('errors.default') });
    } finally {
      deleteScheduleConfirmationIsLoading.off();
    }
  }

  return (
    <BasePage navDetails={navDetails}>
      {data?.length ? (
        <>
          <div className="grid gap-4 border-b-dashed">
            <span className="text-sm font-medium text-typography-base">
              {t('titles.this-week-schedules')}{' '}
              <span className="text-[10px]">({activeSchedules.date})</span>
            </span>

            {activeSchedules.data.length ? (
              <div className="flex flex-wrap gap-4 pb-8">
                {activeSchedules.data.map((schedule) => (
                  <ScheduleCard
                    key={schedule.id}
                    schedule={schedule}
                    state="active"
                    onHandleActions={handleActions}
                  />
                ))}
              </div>
            ) : (
              <UiNoData text={t('general.no-schedule-for-this-week')} />
            )}
          </div>

          <div className="grid gap-4 border-b-dashed">
            <span className="text-sm font-medium text-typography-base mb-4">
              {t('titles.next-week-schedules')}{' '}
              <span className="text-[10px]">({pendingSchedules.date})</span>
            </span>

            <div className="flex flex-wrap gap-4 pb-8">
              {pendingSchedules.data.map((schedule) => (
                <ScheduleCard
                  key={schedule.id}
                  schedule={schedule}
                  state="pending"
                  onHandleActions={handleActions}
                />
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <span className="text-sm font-medium text-typography-base mb-4">
              {t('titles.inactive-schedules')}
            </span>

            <div className="flex flex-wrap gap-4 pb-8">
              {inactiveSchedules.map((schedule) => (
                <ScheduleCard
                  key={schedule.id}
                  schedule={schedule}
                  onHandleActions={handleActions}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <UiNoData
          actionText={t('actions.create-schedule')}
          onAction={setScheduleIsOpen.on}
          screen
          text={t('general.you-havent-created-schedules')}
        />
      )}
      {activeSchedule?.name}
      <SetScheduleModal
        key={`set-schedule-${key}-${activeSchedule?.id || ''}`}
        schedule={activeSchedule}
        isOpen={setScheduleIsOpen.value}
        onClose={onCloseSetSchedule}
        onDone={onScheduleSet}
      />
      {activeSchedule?.id && (
        <AssignScheduleToUsersModal
          key={`assign-schedule-${key}`}
          scheduleId={activeSchedule.id}
          isOpen={assignScheduleToUserIsOpen.value}
          onClose={closeAssignSchedule}
          onDone={onUsersAssigned}
        />
      )}
      <UiConfirmationModal
        display={
          <p className="text-center p-4 pb-8">
            {t('messages.sure-you-want-to-delete')}{' '}
            <b>{activeSchedule?.name}</b>? <br />
            {t('messages.this-action-cant-be-undone')}
          </p>
        }
        loading={deleteScheduleConfirmationIsLoading.value}
        isOpen={deleteScheduleConfirmationIsOpen.value}
        onClose={deleteScheduleConfirmationIsOpen.off}
        onAction={onDeleteSchedule}
      />
    </BasePage>
  );
}
