import { useTranslation } from 'react-i18next';
import UiButton from './UiButton';
import UiModal from './UiModal';
import { ReactNode } from 'react';

interface Props {
  display: ReactNode;
  isOpen: boolean;
  actionTxt?: string;
  onClose: () => void;
  onAction: () => void;
  loading?: boolean;
}
export default function UiConfirmationModal({
  actionTxt = 'actions.yes-delete',
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
      size="sm"
      title={t('titles.confirm-action')}
    >
      <div className="p-4">
        <div className="p-8 text-center">{display}</div>
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
            {t(actionTxt)}
          </UiButton>
        </div>
      </div>
    </UiModal>
  );
}
