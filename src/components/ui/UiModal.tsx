import { X } from '@phosphor-icons/react';
import UiButton from './UiButton';
import { Children, useMemo } from 'react';

const sizeClasses = {
  lg: 'w-4/6 max-w-[966px]',
  md: 'w-2/5',
  sm: '',
};

interface Props {
  size?: keyof typeof sizeClasses;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}
export default function UiModal({
  children,
  size = 'md',
  isOpen,
  onClose,
}: Props) {
  // TODO: animate modals
  const cardStyle = useMemo(() => {
    return 'fixed z-50 top-0 left-0 right-0 bottom-0 h-fit py-8 px-6 rounded-lg mt-12 mx-auto bg-white w-full md:w-2/5 overflow-y-auto overflow-x-hidden';
  }, []);

  if (!isOpen) return <></>;

  return (
    <>
      <div
        className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
        data-testid="overlay"
        onClick={onClose}
      />
      <div className={` ${cardStyle}  ${sizeClasses[size]}`}>{children}</div>
    </>
  );
}
