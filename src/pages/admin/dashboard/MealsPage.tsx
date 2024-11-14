import BasePage from '@/components/layout/BasePage';
import UiButton from '@/components/ui/UiButton';
import { useMemo } from 'react';

export default function MealsPage() {
  const navDetails = useMemo(() => {
    return {
      title: 'Manage meals',
      edgeNode: (
        <UiButton variant="secondary" size="lg">
          {/* TODO: add a plus icon here */}
          Create new meal
        </UiButton>
      ),
    };
  }, []);

  return <BasePage navDetails={navDetails}>n</BasePage>;
}
