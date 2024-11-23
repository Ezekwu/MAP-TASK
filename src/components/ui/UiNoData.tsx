import UiButton from './UiButton';

interface Props {
  text: string;
  actionText?: string;
  onAction?: () => void;
}
export default function UiNoData({ text, actionText, onAction }: Props) {
  return (
    <div className="flex items-center justify-center h-full w-full border border-tertiary-500 bg-tertiary-50 rounded-2xl">
      <div className="font-semibold text-sm">{text}</div>
      {onAction && <UiButton onClick={onAction}>{actionText}</UiButton>}
    </div>
  );
}
