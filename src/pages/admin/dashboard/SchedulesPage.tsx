import BasePage from '@/components/layout/BasePage';
import UiButton from '@/components/ui/UiButton';
import { useMemo } from 'react';

export default function SchedulesPage() {
  const navDetails = useMemo(() => {
    return {
      title: 'Manage Schedules',
      edgeNode: (
        <UiButton variant="secondary" size="lg">
          Add schedule
        </UiButton>
      ),
    };
  }, []);

  return (
    <BasePage navDetails={navDetails}>
      <></>
    </BasePage>
  );
}
