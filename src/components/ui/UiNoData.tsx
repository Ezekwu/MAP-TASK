import UiButton from './UiButton';

interface Props {
  text: string;
  screen?: boolean;
  onAction?: () => void;
  actionText?: string;
}
export default function UiNoData({
  text,
  actionText,
  screen,
  onAction,
}: Props) {
  return (
    <div
      className={`${
        screen ? 'h-[82vh]' : 'h-[40vh]'
      } border border-tertiary-500 bg-tertiary-50 rounded-2xl flex flex-col items-center justify-center gap-5`}
    >
      <span className="text-typography-base font-semibold text-xl">{text}</span>

      {onAction && actionText && (
        <UiButton onClick={onAction} variant="secondary" size="lg" rounded="md">
          {actionText}
        </UiButton>
      )}
    </div>
  );
}
