import { X } from '@phosphor-icons/react';
import UiButton from './UiButton';
import { useMemo } from 'react';

const sizeClasses = {
  lg: 'w-2/3',
  md: 'w-2/5',
  sm: '',
};

interface Props {
  alignRight?: boolean;
  size?: keyof typeof sizeClasses;
  children: React.ReactNode;
  isOpen: boolean;
  title: string;
  edgeNode?: React.ReactNode;
  onClose: () => void;
}
export default function UiModal({
  alignRight,
  children,
  size = 'md',
  isOpen,
  title,
  edgeNode,
  onClose,
}: Props) {
  // TODO: animate modals
  const cardStyle = useMemo(() => {
    if (alignRight)
      return 'fixed top-0 right-0 bottom-0 z-20 w-2/5 h-screen overflow-y-auto bg-[#fff]';

    return 'absolute z-20 top-0 left-0 right-0 bottom-0 h-fit mt-24 mx-auto bg-white p-8 w-2/5 rounded';
  }, [alignRight]);

  if (!isOpen) return <></>;

  return (
    <>
      <div
        className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
        data-testid="overlay"
        onClick={onClose}
      />
      <div className={` ${cardStyle} ${sizeClasses[size]}`}>
        <header className="sticky top-0 left-0 w-full bg-white z-20 flex justify-between items-center border-b border-tertiary-700 p-8 pb-4">
          <h2
            className="text-gray-900 text-xl font-semibold"
            data-testid="modal-title"
          >
            {title}
          </h2>
          <div className="flex gap-2 items-center">
            {edgeNode}
            <UiButton variant="tertiary-outlined" size="icon" onClick={onClose}>
              <X size="16" />
            </UiButton>
          </div>
        </header>
        <div className="p-8 overflow-y-auto">{children}</div>
      </div>
    </>
  );
}
