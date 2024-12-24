import useObjectState from "@/hooks/useObjectState";
import { QuoteTermsAndAttachments } from "@/types/Quote";
import UiInput from "../ui/UiInput";
import UiSelect from "../ui/UiSelect";
import { paymentTerms, deliverySchedule, leadTime, shippingMethods } from "@/utils/constants";
import UiIcon from "../ui/UiIcon";


interface Props {
  termsAndAttachments: QuoteTermsAndAttachments;
}
export default function TermsAndAttachment({ termsAndAttachments }: Props) {
  const formData = useObjectState({
    paymentTerms: termsAndAttachments.paymentTerms,
    deliverySchedule: termsAndAttachments.deliverySchedule,
    shippingMethod: termsAndAttachments.shippingMethod,
    leadTime: termsAndAttachments.leadTime,
  });
  return (
    <div>
      <div className="mb-8">
        <h3 className="text-xl mb-2 font-bold text-primary-1000">
          Terms and Attachments
        </h3>
        <p className="text-sm text-tertiary-350">
          Provide detailed information on payment and delivery terms
        </p>
      </div>
      <div className="grid grid-cols-2 gap-x-[18px] gap-y-6">
        <UiSelect
          name="paymentTerms"
          label="Payment Terms"
          value={formData.value.paymentTerms}
          options={paymentTerms}
          onChange={formData.set}
        />
        <UiSelect
          name="deliverySchedule"
          label="Delivery Schedule"
          value={formData.value.deliverySchedule}
          options={deliverySchedule}
          onChange={formData.set}
        />
        <UiSelect
          name="shippingMethod"
          label="Shipping Method"
          value={formData.value.shippingMethod}
          options={shippingMethods}
          onChange={formData.set}
        />
        <UiInput
          name="shippingMethod"
          label="Lead time"
          value={formData.value.leadTime}
          onChange={formData.set}
          suffixNode={
            <div className="flex gap-1 items-center h-6 px-2 bg-tertiary-50 rounded">
              Days <UiIcon icon="CaretDown" size="16" />
            </div>
          }
        />
        <div className="border border-tertiary-300" />
      </div>
      <div className="mt-4">
        <h4 className="font-bold text-primary-1000 mb-2">Attachments</h4>
        <p className="text-sm text-tertiary-350">
          Attach all necessary files or documents
        </p>
      </div>
    </div>
  );
}
