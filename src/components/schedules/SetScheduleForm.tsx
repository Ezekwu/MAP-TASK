import { useTranslation } from 'react-i18next';

import useObjectState from '@/hooks/useObjectState';

import { MealType } from '@/types/Meal';
import { WeeklyMealSchedule } from '@/types/WeeklyMealSchedule';

import UiButton from '../ui/UiButton';
import UiField from '../ui/UiField';
import UiForm from '../ui/UiForm';
import UiInput from '../ui/UiInput';

import MealTypeSelector from './MealTypeSelector';
import ScheduleSchema from '@/utils/schemas/ScheduleSchema';

// ---

interface Props {
  schedule?: WeeklyMealSchedule;
  onSelectMealType: (type: MealType) => void;
  onSubmit: () => void;
}
export default function SetScheduleForm(props: Props) {
  const { t } = useTranslation();

  const formData = useObjectState({
    name: '',
  });

  const mealTypes = Object.values(MealType);

  function checkAddedMealsForMealType(mealType: MealType) {
    return props.schedule?.days.some(({ meals }) =>
      Boolean(meals[mealType]?.length),
    );
  }

  function setSchedule() {}

  return (
    <div className="p-8">
      <p className="text-sm text-[#585B5A] mb-4">
        {t('modals.set-schedule.description')}
      </p>
      <UiForm
        formData={formData.value}
        schema={ScheduleSchema}
        onSubmit={setSchedule}
      >
        {({ errors }) => (
          <div className="grid ">
            <div className="border-b-dashed pb-4">
              <UiInput
                label={t('fields.schedule-name')}
                error={errors.name}
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
                      hasMeals={(() => checkAddedMealsForMealType(type))()}
                      onSelectMealType={props.onSelectMealType}
                    />
                  ))}
                </div>
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
