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

export default function SchedulesPage() {
  const { t } = useTranslation();

  const { key, newKey } = useKey();

  const {
    query: { data },
    setData,
  } = useSchedulesQuery();

  const {
    query: { data: thisAndNextWeekAssignments },
  } = useThisAndNextWeekAssignmentsQuery();

  const [activeSchedule, setActiveSchedule] =
    useState<WeeklyMealSchedule | null>(null);

  const setScheduleIsOpen = useToggle();
  const assignScheduleToUserIsOpen = useToggle(true);

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

  function onScheduleCreated(schedule: WeeklyMealSchedule) {
    setActiveSchedule(schedule);
    setData(schedule);

    newKey();

    setScheduleIsOpen.off();
    assignScheduleToUserIsOpen.on();
  }

  function onCloseSetSchedule() {
    setScheduleIsOpen.off();

    newKey();
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
                <ScheduleCard key={schedule.id} schedule={schedule} />
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
      <SetScheduleModal
        key={`set-schedule-${key}`}
        isOpen={setScheduleIsOpen.value}
        onClose={onCloseSetSchedule}
        onDone={onScheduleCreated}
      />
      {activeSchedule?.id && (
        <AssignScheduleToUsersModal
          key={`assign-schedule-${key}`}
          scheduleId={activeSchedule?.id}
          isOpen={assignScheduleToUserIsOpen.value}
          onClose={assignScheduleToUserIsOpen.off}
        />
      )}
    </BasePage>
  );
}
