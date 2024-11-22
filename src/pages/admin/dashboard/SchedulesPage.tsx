import BasePage from '@/components/layout/BasePage';
import SetScheduleModal from '@/components/schedules/SetScheduleModal';
import UiButton from '@/components/ui/UiButton';
import useToggle from '@/hooks/useToggle';
import { useMemo } from 'react';

export default function SchedulesPage() {
  const setScheduleIsOpen = useToggle(true);

  const navDetails = useMemo(() => {
    return {
      title: 'Manage Schedules',
      edgeNode: (
        <UiButton
          variant="secondary"
          size="lg"
          rounded="md"
          onClick={setScheduleIsOpen.on}
        >
          Add schedule
        </UiButton>
      ),
    };
  }, []);

  return (
    <BasePage navDetails={navDetails}>
      <SetScheduleModal
        isOpen={setScheduleIsOpen.value}
        onClose={setScheduleIsOpen.off}
      />
    </BasePage>
  );
}
