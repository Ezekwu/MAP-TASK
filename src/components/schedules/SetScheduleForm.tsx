import { useTranslation } from 'react-i18next';

import useObjectState from '@/hooks/useObjectState';

import { MealType } from '@/types/Meal';
import { WeeklyMealSchedule } from '@/types/WeeklyMealSchedule';

import UiButton from '../ui/UiButton';
import UiField from '../ui/UiField';
import UiForm from '../ui/UiForm';
import UiIcon from '../ui/UiIcon';
import UiInput from '../ui/UiInput';

import MealTypeSelector from './MealTypeSelector';

// ---

interface Props {
  schedule?: WeeklyMealSchedule;
  onSelectMealType: (type: MealType) => void;
}
export default function SetScheduleForm(props: Props) {
  const { t } = useTranslation();

  const formData = useObjectState({
    name: '',
  });

  const mealTypes = Object.values(MealType);

  function setSchedule() {}

  function onSelectMealType() {}

  return (
    <div className="p-8">
      <p className="text-sm text-[#585B5A] mb-4">
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
                    <MealTypeSelector
                      type={type}
                      key={type}
                      onSelectMealType={props.onSelectMealType}
                    />
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
    </div>
  );
}
