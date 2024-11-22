import { useTranslation } from 'react-i18next';
import UiModal from '../ui/UiModal';
import { useMemo } from 'react';
import UiForm from '../ui/UiForm';
import useObjectState from '@/hooks/useObjectState';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  schedule?: Record<string, string>;
}
export default function SetScheduleModal({ isOpen, schedule, onClose }: Props) {
  const { t } = useTranslation();

  const formData = useObjectState();

  const title = useMemo(() => {
    if (schedule) return t('modals.set-schedule.update-title');

    return t('modals.set-schedule.create-title');
  }, [schedule]);

  function setSchedule() {}

  return (
    <UiModal isOpen={isOpen} title={title} onClose={onClose}>
      <p className="text-sm text-[#585B5A] mb-8">
        {t('modals.set-schedule.description')}
      </p>
      <UiForm formData={formData.value} onSubmit={setSchedule}>
        {() => <div className="grid "></div>}
      </UiForm>
    </UiModal>
  );
}
