import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import BasePage from '@/components/layout/BasePage';
import AssignScheduleToUsersModal from '@/components/schedules/AssignScheduleToUsersModal';
import SetScheduleModal from '@/components/schedules/SetScheduleModal';
import UiButton from '@/components/ui/UiButton';

import useKey from '@/hooks/useKey';
import useToggle from '@/hooks/useToggle';

import { useSchedulesQuery } from '@/api/query/useSchedulesQuery';
import { useThisAndNextWeekAssignmentsQuery } from '@/api/query/useThisAndNextWeekAssignmentsQuery';
import ScheduleCard from '@/components/schedules/ScheduleCard';
import UiEmptyPage from '@/components/ui/UiEmptyPage';
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
    title: t('pages.manage-schedules'),
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

    if (!thisWeekAssignments || !data) return [];

    const activeScheduleIds = thisWeekAssignments.map(
      ({ scheduleId }) => scheduleId,
    );

    return data.filter(({ id }) => activeScheduleIds.includes(id));
  }, [data, thisAndNextWeekAssignments]);

  const pendingSchedules = useMemo(() => {
    const nextWeekAssignments = thisAndNextWeekAssignments?.thisWeekSchedules;

    if (!nextWeekAssignments || !data) return [];

    const pendingScheduleIds = nextWeekAssignments.map(
      ({ scheduleId }) => scheduleId,
    );

    return data.filter(({ id }) => pendingScheduleIds.includes(id));
  }, [data, thisAndNextWeekAssignments]);

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
      <div className="flex flex-wrap gap-4">
        {activeSchedules.map((schedule) => (
          <ScheduleCard key={schedule.id} schedule={schedule} />
        ))}
      </div>
      <div className="flex flex-wrap gap-4">
        {pendingSchedules.map((schedule) => (
          <ScheduleCard key={schedule.id} schedule={schedule} />
        ))}
      </div>
      {!data?.length && (
        <UiEmptyPage
          actionText={t('actions.create-schedule')}
          onAction={setScheduleIsOpen.on}
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
