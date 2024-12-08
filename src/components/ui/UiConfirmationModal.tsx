import { useTranslation } from 'react-i18next';
import UiButton from './UiButton';
import UiModal from './UiModal';
import { ReactNode } from 'react';

interface Props {
  display: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onAction: () => void;
  loading?: boolean;
}
export default function UiConfirmationModal({
  display,
  isOpen,
  loading,
  onClose,
  onAction,
}: Props) {
  const { t } = useTranslation();

  return (
    <UiModal
      isOpen={isOpen}
      onClose={onClose}
      title={t('titles.confirm-action')}
    >
      <div className="p-4">
        {display}
        <div className="grid grid-cols-2 gap-4">
          <UiButton variant="tertiary" size="lg" block onClick={onClose}>
            {t('actions.cancel')}
          </UiButton>
          <UiButton
            variant="danger"
            size="lg"
            block
            loading={loading}
            onClick={onAction}
          >
            {t('actions.yes-delete')}
          </UiButton>
        </div>
      </div>
    </UiModal>
  );
}
