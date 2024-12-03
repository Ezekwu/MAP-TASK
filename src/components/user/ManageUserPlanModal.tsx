import { useMemo } from 'react';

import { useTranslation } from 'react-i18next';

import useObjectState from '@/hooks/useObjectState';

import Plans from '@/types/enums/Plans';

import ManagePlanSchema from '@/utils/schemas/ManagePlanSchema';

import UiButton from '../ui/UiButton';
import UiForm from '../ui/UiForm';
import UiModal from '../ui/UiModal';
import UiSelect from '../ui/UiSelect';

interface Props {
  isOpen: boolean;
  plan?: Plans;
  loading: boolean;
  onClose: () => void;
  onChangePlan: (plan: Plans) => void;
}
export default function ManageUserPlanModal({
  isOpen,
  plan = Plans.ALL_INCLUSIVE,
  loading,
  onChangePlan,
  onClose,
}: Props) {
  const { t, i18n } = useTranslation();

  const plansOptions = useMemo(() => {
    return Object.values(Plans).map((p) => ({
      value: p,
      label: t(`plans.${p}`),
    }));
  }, [i18n.language]);

  const formData = useObjectState({
    plan,
  });

  function onSubmit() {
    onChangePlan(formData.value.plan);
  }

  return (
    <UiModal
      title={t('modals.manage-user-plan.title')}
      isOpen={isOpen}
      onClose={onClose}
    >
      {/* TODO: add an alert here describing what would happen here */}
      <UiForm
        formData={formData.value}
        schema={ManagePlanSchema}
        onSubmit={onSubmit}
      >
        {({ errors }) => (
          <div className="grid gap-6">
            <UiSelect
              error={errors.plan}
              label={t('fields.plan')}
              name="plan"
              onChange={formData.set}
              options={plansOptions}
              placeholder={t('placeholders.select-new-plan')}
              value={formData.value.plan}
            />
            <div className="grid gap-2 grid-cols-2">
              <UiButton
                block
                size="lg"
                variant="tertiary"
                type="button"
                onClick={onClose}
              >
                {t('actions.cancel')}
              </UiButton>
              <UiButton block size="lg" loading={loading}>
                {t('actions.change-plan')}
              </UiButton>
            </div>
          </div>
        )}
      </UiForm>
    </UiModal>
  );
}
