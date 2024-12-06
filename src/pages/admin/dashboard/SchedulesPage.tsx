import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import BasePage from '@/components/layout/BasePage';
import AssignScheduleToUsersModal from '@/components/schedules/AssignScheduleToUsersModal';
import SetScheduleModal from '@/components/schedules/SetScheduleModal';
import UiButton from '@/components/ui/UiButton';

import useToggle from '@/hooks/useToggle';

export default function SchedulesPage() {
  const { t } = useTranslation();

  const [activeScheduleId, setActiveScheduleId] = useState('');

  const setScheduleIsOpen = useToggle();
  const assignScheduleToUserIsOpen = useToggle(true);

  const navDetails = useMemo(() => {
    return {
      title: t('pages.manage-schedules'),
      edgeNode: (
        <UiButton
          variant="secondary"
          size="lg"
          rounded="md"
          onClick={setScheduleIsOpen.on}
        >
          {t('actions.add-schedule')}
        </UiButton>
      ),
    };
  }, []);

  function onScheduleCreated(scheduleId: string) {
    setActiveScheduleId(scheduleId);

    setScheduleIsOpen.off();
    assignScheduleToUserIsOpen.on();
  }

  return (
    <BasePage navDetails={navDetails}>
      <SetScheduleModal
        isOpen={setScheduleIsOpen.value}
        onClose={setScheduleIsOpen.off}
        onDone={onScheduleCreated}
      />
      <AssignScheduleToUsersModal
        isOpen={assignScheduleToUserIsOpen.value}
        onClose={assignScheduleToUserIsOpen.off}
      />
    </BasePage>
  );
}
