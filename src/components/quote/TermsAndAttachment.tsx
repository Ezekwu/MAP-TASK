import useObjectState from "@/hooks/useObjectState";
import { QuoteTermsAndAttachments } from "@/types/Quote";
import UiInput from "../ui/UiInput";
import UiSelect from "../ui/UiSelect";
import { paymentTerms, deliverySchedule, leadTime, shippingMethods } from "@/utils/constants";


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
        <UiSelect
          name="shippingMethod"
          label="Shipping Method"
          value={formData.value.shippingMethod}
          options={shippingMethods}
          onChange={formData.set}
        />
      </div>
    </div>
  );
}
