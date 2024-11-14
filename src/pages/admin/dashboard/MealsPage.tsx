import BasePage from '@/components/layout/BasePage';
import SetMealModal from '@/components/meals/SetMealModal';
import UiButton from '@/components/ui/UiButton';
import useBooleanState from '@/hooks/useBooleanState';
import { useMemo } from 'react';

export default function MealsPage() {
  const setMealIsVisible = useBooleanState(false);

  const navDetails = useMemo(() => {
    return {
      title: 'Manage meals',
      edgeNode: (
        <UiButton variant="secondary" size="lg" onClick={setMealIsVisible.on}>
          {/* TODO: add a plus icon here */}
          Create new meal
        </UiButton>
      ),
    };
  }, []);

  return (
    <BasePage navDetails={navDetails}>
      <SetMealModal
        isOpen={setMealIsVisible.value}
        onClose={setMealIsVisible.off}
      />
    </BasePage>
  );
}
