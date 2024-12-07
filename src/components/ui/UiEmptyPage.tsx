import UiButton from './UiButton';

interface Props {
  text: string;
  onAction: () => void;
  actionText: string;
}
export default function UiEmptyPage({ text, actionText, onAction }: Props) {
  return (
    <div className="h-[82vh] border border-tertiary-500 bg-tertiary-50 rounded-2xl flex flex-col items-center justify-center gap-5">
      <span className="text-typography-base font-semibold text-xl">{text}</span>

      <UiButton onClick={onAction} variant="secondary" size="lg" rounded="md">
        {actionText}
      </UiButton>
    </div>
  );
}
