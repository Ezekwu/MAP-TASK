import UiIcon from './UiIcon';

interface Props {
  value?: boolean;
}
export default function UiIconCheckMark({ value }: Props) {
  return (
    <div
      className={`${
        value ? 'bg-primary-500' : 'bg-tertiary-50 border border-tertiary-700'
      } w-5 h-5 rounded-full flex items-center justify-center`}
    >
      {value && <UiIcon icon="Checkmark" size="10" />}
    </div>
  );
}
