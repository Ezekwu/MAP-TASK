import QuoteStatus from './enum/QuoteStatus';

type QuoteItem = {
  id: number;
  name: string;
  variants: string;
  quantity: string;
  price: number;
  amount: number;
  expectedDeliveryDate: Date;
};

type QuoteTotals = {
  subTotal: number;
  total: number;
};

export type QuoteTermsAndAttachments = {
  paymentTerms: string;
  shippingMethod: string;
  deliverySchedule: string;
  leadTime: string;
};

type QuoteRequestor = {
  name: string;
  position: string;
};

export type QuoteClient = {
  name: string;
  address: string;
};

type QuoteDelivery = {
  expectedDate: Date;
};

export default interface Quote {
  createdDate: Date;
  title: string;
  rfqNumber: string;
  requestor: QuoteRequestor;
  status: QuoteStatus;
  department: string;
  client: QuoteClient;
  delivery: QuoteDelivery;
  items: QuoteItem[];
  totals: QuoteTotals;
  termsAndAttachments: QuoteTermsAndAttachments;
}
