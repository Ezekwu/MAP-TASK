import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

import { quotes } from "@/api/mock/quoteDetails";

import QuoteItem from '@/assets/quote-item.png';

import ClientDetailsCard from "@/components/quote/ClientDetailsCard";
import CostBreakDown from "@/components/quote/CostBreakDown";
import QuoteInformation, { Title } from '@/components/quote/QuoteInformation';
import TheTopNav from "@/components/layout/TheTopNav";
import UiBorderedBox from "@/components/ui/UiBorderedBox";
import UiButton from "@/components/ui/UiButton";
import UiIcon from "@/components/ui/UiIcon";
import UiInitialsAvatar from "@/components/ui/UiInitialsAvatar";
import UiPill from "@/components/ui/UiPill";
import UiTable, { Header } from "@/components/ui/UiTable";

import QuoteStatus from "@/types/enum/QuoteStatus";
import Pill from "@/types/Pill";

//--

export default function QuoteDetailsPage() {
  const [selectedItemsId, setSelectedItemsId] = useState<string[]>([])

  const quote = quotes[0];
  const createdDate = dayjs(quote.createdDate).format('ddd, MMMM YYYY, hh:mma');
  const expectedDeliveryDate = dayjs(quote.delivery.expectedDate).format('YYYY-MM-DD'); 

  const quoteInfoTitle: Title[] = [
    {
      label: 'Title',
      query: 'title',
    },
    {
      label: 'RFQ No',
      query: 'RFQNo',
    },
    {
      label: 'Requestor',
      query: 'requestor',
    },
    {
      label: 'Status',
      query: 'status',
    },
    {
      label: 'Department',
      query: 'department',
    },
  ];

  const quoteItemsHeaders: Header[] = [
    {
      title: 'Items',
      query: 'items',
    },
    {
      title: 'Variants',
      query: 'variants',
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
      title: 'Amount',
      query: 'amount',
    },
    {
      title: 'Expected Delivery Date',
      query: 'expectedDeliveryDate',
    },
  ];

  function getPillVariant(status: QuoteStatus): Pill {
    if (status === QuoteStatus.AWAITING)
      return { text: 'Awaiting', variant: 'warning' };
    
    return { text: 'Completed', variant: 'success' };
  }

  const { text, variant} = getPillVariant(quote.status);

  const totalPrice = quote.items.reduce((total, item) => {
    total += Number(item.amount) 
    return total;
  }, 0);

  const quoteInfoData = useMemo(() => {
    return {
      title: <p>{quote.title}</p>,
      RFQNo: <p>RQ #{quote.rfqNumber}</p>,
      requestor: (
        <div className="flex gap-2 items-center flex-wrap 2xl:flex-nowrap">
          <span className="shrink-0 flex gap-2 items-center">
            <UiInitialsAvatar name={quote.requestor.name} />
            {quote.requestor.name}
          </span>
          <div className="w-[6px] h-[6px] rounded-full bg-tertiary-200 shrink-0"></div>
          <span className="shrink-0 text-tertiary-350">
            {quote.requestor.position}
          </span>
        </div>
      ),
      status: <UiPill variant={variant}>{text}</UiPill>,
      department: <p>{quote.department}</p>,
    };
  }, [quote]);

  const itemsData = useMemo(() => {
    return quote.items.map((item) => ({
      _id: `${item.id}`,
      items: (
        <div className="flex gap-3">
          <img
            className="w-10 h-10 rounded-lg object-cover border border-tertiary-300"
            src={QuoteItem}
            alt="quote item"
          />
          <div>
            <h4 className="font-medium text-sm text-tertiary-900">
              {item.name}
            </h4>
            <p className="text-sm text-tertiary-600">#28373</p>
          </div>
        </div>
      ),
      variants: <p className="text-tertiary-700 text-sm">{item.variants}</p>,
      quantity: <p className="text-tertiary-700 text-sm">{item.quantity}</p>,
      price: <p className="text-tertiary-700 text-sm">{item.price}</p>,
      amount: <p className="text-tertiary-700 text-sm">{item.amount}</p>,
      expectedDeliveryDate: (
        <p className="text-tertiary-700 text-sm">
          {dayjs(item.expectedDeliveryDate).format('YYYY-MM-DD')}
        </p>
      ),
    }));
  }, [quote.items]);

    function handleCheckbox(id: string) {
      setSelectedItemsId((prevData) => {
        if (prevData.includes(id)) {
          return prevData.filter((selectedId) => selectedId !== id);
        } else {
          return [...prevData, id];
        }
      });
    }

    function selectAllItems() {
      if (quote.items.length === selectedItemsId.length) {
        setSelectedItemsId([]);
      } else {
        setSelectedItemsId(quote.items.map((item) => String(item.id)));
      }
    }

  return (
    <section>
      <TheTopNav
        startNode={
          <Link
            to=""
            className="flex items-center gap-2 text-tertiary-400 text-sm"
          >
            <UiIcon icon="CaretLeft" />
            <p>Back</p>
          </Link>
        }
      />
      <div className="p-8">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-black mb-[2px]">
              Quote details
            </h2>
            <p className="text-sm text-tertiary-400">
              Created on {createdDate}
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/procurement/quotes/respond-to-quote">
              <UiButton size="md">Respond</UiButton>
            </Link>
            <div className="fill-white">
              <UiButton size="md" variant="danger">
                <UiIcon icon="Multiply" />
                Reject
              </UiButton>
            </div>
          </div>
        </header>
        <div className="mb-6">
          <UiBorderedBox>
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-primary-1000 mb-2">
                Quote Information
              </h3>
              <p className="text-sm text-tertiary-400">
                Expected delivery date : {expectedDeliveryDate}
              </p>
            </div>
            <div className="flex justify-between gap-6">
              <QuoteInformation data={quoteInfoData} titles={quoteInfoTitle} />
              <ClientDetailsCard client={quote.client} />
            </div>
          </UiBorderedBox>
        </div>
        <div className="mb-6">
          <UiBorderedBox boxShadow>
            <div className="mb-8">
              <h3 className="text-xl font-bold text-primary-1000">Item(s)</h3>
            </div>
            <UiTable
              checkable
              checkAllIds={selectAllItems}
              onCheckboxChange={handleCheckbox}
              checkedIds={selectedItemsId}
              headers={quoteItemsHeaders}
              data={itemsData}
            />
            <div className="mt-6 ">
              <CostBreakDown subTotal={totalPrice} extraCharges={750} />
            </div>
          </UiBorderedBox>
        </div>
        <UiBorderedBox>
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <UiIcon icon="SignDocEmpt" size="32" />
              <div>
                <h3 className="text-xl font-bold text-primary-1000 mb-2">
                  Terms and Attachments
                </h3>
                <p className="text-sm text-tertiary-600">
                  Review payment and delivery terms
                </p>
              </div>
            </div>
            <UiIcon icon="CaretDown" size="28" />
          </div>
        </UiBorderedBox>
      </div>
    </section>
  );
}
