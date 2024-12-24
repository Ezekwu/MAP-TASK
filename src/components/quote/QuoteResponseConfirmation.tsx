import UiButton from '../ui/UiButton';
import UiLoader from '../ui/UiLoader';
import UiModal from '../ui/UiModal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  rfqNumber: string;
  client: string;
  sendQuoteResponse: () => void
}

export default function QuoteResponseConfirmation({
  isOpen,
  onClose,
  sendQuoteResponse,
  client,
  isLoading,
  rfqNumber,
}: Props) {

  const QuoteIsSending = () => {
    return (
      <div className=" py-9 flex justify-center items-center">
        <div>
          <UiLoader />
          <p className='text-sm mt-2'>Sending Quote...</p>
        </div>
      </div>
    );
  };

  return (
    <UiModal isOpen={isOpen} onClose={onClose}>
      {isLoading ? (
        <QuoteIsSending />
      ) : (
        <div>
          <h3 className="text-xl font-bold mb-6 text-tertiary-900">
            Confirmation
          </h3>
          <p className="text-sm text-tertiary-600">
            You are about to submit this quote in response to RFQ #{rfqNumber},
            this will immediately be sent to the client “{client}”. Are you sure
            you want to proceed?
          </p>
          <div className="flex justify-end gap-4 mt-8">
            <UiButton onClick={onClose} variant="tertiary">
              Cancel
            </UiButton>
            <UiButton onClick={sendQuoteResponse}>Continue</UiButton>
          </div>
        </div>
      )}
    </UiModal>
  );
}
