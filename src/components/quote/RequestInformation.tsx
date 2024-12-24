import Quote from "@/types/Quote"
import UiInput from "../ui/UiInput"
import UiIcon from "../ui/UiIcon"
import UiTable from "../ui/UiTable"
import UidatePicker from "../ui/UiDatePicker"
import UiBorderedBox from "../ui/UiBorderedBox"
import { Header } from "../ui/UiTable"
import { useMemo } from "react"
import UiSelect from "../ui/UiSelect"
import { itemVariants } from "@/utils/constants"
import dayjs from "dayjs"
import CostBreakDown from "./CostBreakDown"
import UiTextarea from "../ui/UiTextarea"
import useObjectState from "@/hooks/useObjectState"

interface Props {
  quote: Quote
}

export default function RequestInformation({ quote }: Props) {
  const formData = useObjectState({
    note:''
  })
  const headers: Header[] = [
    {
      title: 'Items',
      query: 'items',
    },
    {
      title: 'Variant',
      query: 'variant',
    },
    {
      title: 'Quantity',
      query: 'quantity',
    },
    {
      title: 'Price',
      query: 'price',
    },
    {
      title: 'Expected Delivery Date',
      query: 'expectedDeliveryDate',
    },
    {
      title: 'Amount',
      query: 'amount',
    },
  ];

  const totalPrice = quote.items.reduce((total, item) => {
    total += Number(item.amount);
    return total;
  }, 0);

  const data = useMemo(() => {
    return quote.items.map((item) => ({
      _id: `${item.id}`,
      items: (
        <UiSelect
          size="sm"
          disabled
          name=""
          onChange={() => {}}
          options={[{ label: item.name, value: item.name }]}
          value={item.name}
        />
      ),
      variant: (
        <div className="">
          <UiSelect
            size="sm"
            value={item.variants.toLocaleLowerCase()}
            name=""
            onChange={() => {}}
            options={itemVariants}
          />
        </div>
      ),
      quantity: (
        <UiInput
          suffixNode={
            <span className="h-6 text-xs px-2 flex items-center bg-tertiary-50 rounded-[4px] text-tertiary-400">
              Pack
            </span>
          }
          name=""
          onChange={() => {}}
          value={'100'}
          size="sm"
        />
      ),
      price: (
        <UiInput
          name=""
          prefixNode={<UiIcon icon="Dollar" />}
          onChange={() => {}}
          value={'100'}
          size="sm"
        />
      ),
      expectedDeliveryDate: (
        <UiInput
          label=""
          size="sm"
          name=""
          onChange={() => {}}
          prefixNode={<UiIcon icon="Calendar" />}
          value={dayjs(item.expectedDeliveryDate).format('YYYY-MM-DD')}
        />
      ),
      amount: (
        <p className="font-bold text-tertiary-700">
          ${item.amount.toLocaleString()}
        </p>
      ),
    }));
  }, [quote.items]);

  return (
    <div>
      <div className="mb-8">
        <h3 className="text-xl mb-2 font-bold text-primary-1000">
          Request for Quote
        </h3>
        <p className="text-sm text-tertiary-350">
          Fill out these details to send the RFQ
        </p>
      </div>
      <div className="grid grid-cols-2 gap-x-[18px] gap-y-6">
        <UiInput
          label="RFQ"
          name="rfqNumber"
          disabled
          onChange={() => {}}
          value={`RFQ-${quote.rfqNumber}`}
        />
        <UiInput
          label="Title"
          name="title"
          disabled
          onChange={() => {}}
          value={quote.title}
        />
        <UiInput
          label="Department"
          name="department"
          disabled
          onChange={() => {}}
          value={quote.department}
          suffixNode={<UiIcon icon="Multiply" />}
        />
        <div>
          <UidatePicker
            label="Expected delivery date"
            name="delivery.expectedDate"
            disabled
            onChange={() => {}}
            value={quote.delivery.expectedDate}
          />
          <p className="text-xs text-tertiary-400 mt-2">
            Calculated based on lead time and issue date
          </p>
        </div>
      </div>{' '}
      <div className="border-y border-[#E9E9E9] mt-6 pt-4 pb-8 overflow-x-auto">
        <h4 className="font-bold text-primary-1000 mb-2">Add Items</h4>
        <UiTable
          actionTriggers={() => (
            <button>
              <UiIcon icon="Bin" />
            </button>
          )}
          simplified
          data={data}
          headers={headers}
        />
      </div>
      <div className="mt-6 ">
        <CostBreakDown subTotal={totalPrice} />
      </div>
      <div className="w-2/5">
        <UiTextarea
          name="note"
          label="Note"
          placeholder="Enter note here"
          onChange={formData.set}
          value={formData.value.note}
          maxChar={200}
        />
      </div>
    </div>
  );
}
