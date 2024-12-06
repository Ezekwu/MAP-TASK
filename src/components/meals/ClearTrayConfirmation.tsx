import UiButton from '../ui/UiButton';

interface Props {
  onAction: () => void;
  onCancel: () => void;
}

export default function ClearTrayConfirmation({ onAction, onCancel }: Props) {
  return (
    <div
      style={{
        backdropFilter: 'blur(12px)',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
      }}
      className="fixed top-0 right-0 bottom-0 z-50 w-2/5 h-screen flex justify-center items-center"
    >
      <div className="text-center max-w-[265px]">
        <h2 className="text-xl mb-1 text-secondary-1500 font-semibold">
          Clear all
        </h2>
        <p className="text-sm mb-6 text-secondary-1600">
          Are you sure you want to clear out all the food in your tray?
        </p>
        <div className="flex justify-center gap-1">
          <UiButton onClick={onAction} variant="danger-light">
            Yes, clear all
          </UiButton>
          <UiButton onClick={onCancel} variant="secondary">
            No, cancel
          </UiButton>
        </div>
      </div>
    </div>
  );
}
