import { X } from '@phosphor-icons/react';
import UiButton from './UiButton';
import { useMemo } from 'react';

interface Props {
  alignRight?: boolean;
  children: React.ReactNode;
  isOpen: boolean;
  title: string;
  onClose: () => void;
}
export default function UiModal({
  alignRight,
  children,
  isOpen,
  title,
  onClose,
}: Props) {
  const cardStyle = useMemo(() => {
    // TODO: handle sizing seperately from card styling.
    if (alignRight) return 'fixed top-0 right-0 bottom-0 z-50 w-2/5 bg-[#fff]';

    return 'fixed z-50 top-0 left-0 right-0 bottom-0 h-fit mt-24 mx-auto bg-white p-8 w-2/5 rounded';
  }, [alignRight]);

  if (!isOpen) return <></>;

  return (
    <>
      <div
        className="fixed inset-0 flex items-center justify-center z-40 bg-black bg-opacity-50"
        data-testid="overlay"
        onClick={onClose}
      />
      <div className={cardStyle}>
        <header className="flex mb-4 justify-between items-center border-b border-tertiary-700 p-8 pb-4">
          <h2
            className="text-gray-900 text-md font-bold"
            data-testid="modal-title"
          >
            {title}
          </h2>
          <UiButton variant="tertiary-outlined" size="icon" onClick={onClose}>
            <X size="16" />
          </UiButton>
        </header>
        <div className="p-8">{children}</div>
      </div>
    </>
  );
}
