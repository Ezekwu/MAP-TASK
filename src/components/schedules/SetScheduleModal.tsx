import { useTranslation } from 'react-i18next';
import UiModal from '../ui/UiModal';
import { useMemo } from 'react';
import UiForm from '../ui/UiForm';
import useObjectState from '@/hooks/useObjectState';
import UiInput from '../ui/UiInput';
import UiField from '../ui/UiField';
import MealSelector from './MealSelector';
import { MealType } from '@/types/Meal';
import UiButton from '../ui/UiButton';
import UiIcon from '../ui/UiIcon';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  schedule?: Record<string, string>;
}
export default function SetScheduleModal({ isOpen, schedule, onClose }: Props) {
  const { t } = useTranslation();

  const formData = useObjectState({
    name: '',
  });

  const mealTypes = Object.values(MealType);

  const title = useMemo(() => {
    if (schedule) return t('modals.set-schedule.update-title');

    return t('modals.set-schedule.create-title');
  }, [schedule]);

  function setSchedule() {}

  function onSelectMeal() {}
  return (
    <UiModal isOpen={isOpen} title={title} onClose={onClose}>
      <p className="text-sm text-[#585B5A] mb-8">
        {t('modals.set-schedule.description')}
      </p>
      <UiForm formData={formData.value} onSubmit={setSchedule}>
        {() => (
          <div className="grid ">
            <div className="border-b-dashed pb-4">
              <UiInput
                label={t('fields.schedule-name')}
                value={formData.value.name}
                name="name"
                onChange={formData.set}
              />
            </div>
            <div className="border-b-dashed pb-4">
              <UiField label={t('fields.add-meals-to-schedule')}>
                <div className="grid grid-cols-3 gap-2">
                  {mealTypes.map((type) => (
                    <MealSelector type={type} onSelectMeals={onSelectMeal} />
                  ))}
                </div>
              </UiField>
            </div>
            <div className="mb-24">
              <UiField label={t('fields.assign-schedule-to-users')}>
                <UiButton size="lg" variant="tertiary-outlined" block>
                  <UiIcon icon="Users" />
                  <div className="text-xs text-[#55556D]">
                    {t('actions.assign-schedules-to-users')}
                  </div>
                </UiButton>
              </UiField>
            </div>

            <UiButton block size="lg">
              {t('actions.create-schedule')}
            </UiButton>
          </div>
        )}
      </UiForm>
    </UiModal>
  );
}
