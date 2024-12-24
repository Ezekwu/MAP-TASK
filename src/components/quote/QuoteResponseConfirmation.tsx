import UiButton from "../ui/UiButton";
import UiModal from "../ui/UiModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuoteResponseConfirmation({ isOpen, onClose }: Props) {
  return (
    <UiModal isOpen={isOpen} onClose={onClose}>
      <div>
        <h3 className="text-xl font-bold mb-6 text-tertiary-900">
          Confirmation
        </h3>
        <p className="text-sm text-tertiary-600">
          You are about to submit this quote in response to RFQ ID, this will
          immediately be sent to the client “Westend Clear Hospital”. Are you
          sure you want to proceed?
        </p>
        <div className="flex justify-end gap-4 mt-8">
          <UiButton onClick={onClose} variant="tertiary">Cancel</UiButton>
          <UiButton>Continue</UiButton>
        </div>
      </div>
    </UiModal>
  );
}
