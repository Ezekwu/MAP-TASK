import QuoteStatus from "@/types/enum/QuoteStatus";

export const quotes = [
  {
    createdDate: new Date("2022-06-12T08:00:00"),
    title: "Request for Equipments",
    rfqNumber: "01234",
    requestor: {
      name: "Jane Doe",
      position: "Head Nurse, Paediatrics",
    },
    status: QuoteStatus.AWAITING,
    department: "Maternity",
    client: {
      name: "Westend Hospital",
      address: "Clear Street",
    },
    delivery: {
      expectedDate: new Date("2024-12-02"),
    },
    items: [
      {
        id: 1,
        name: "Oxygen Concentrator",
        variants: "blue",
        quantity: "100 pieces",
        price: 200.0,
        amount: 2000.0,
        expectedDeliveryDate: new Date("2024-08-07"),
      },
      {
        id: 2,
        name: "Mechanical Ventilator",
        variants: "NIL",
        quantity: "45 Kg",
        price: 350.0,
        amount: 2500.0,
        expectedDeliveryDate: new Date("2024-08-07"),
      },
      {
        id: 3,
        name: "Patient Monitor",
        variants: "blue",
        quantity: "30 Units",
        price: 300.0,
        amount: 1500.0,
        expectedDeliveryDate: new Date("2024-08-07"),
      },
      {
        id: 4,
        name: "Mechanical Ventilator",
        variants: "blue",
        quantity: "35 Units",
        price: 200.0,
        amount: 1500.0,
        expectedDeliveryDate: new Date("2024-08-07"),
      },
    ],
    totals: {
      subTotal: 8000.0,
      total: 8750.0,
    },
    termsAndAttachments: {
      paymentTerms: "Net 30",
      shippingMethod: "Courier Services",
      deliverySchedule: "Immediate delivery",
      leadTime: "10 Days",
      attachments: { },
    },
  },
];
