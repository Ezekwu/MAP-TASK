interface Props {
  subTotal: number;
  extraCharges?: number;
}


export default function CostBreakDown({ subTotal, extraCharges }: Props) {
  return (
    <div className="w-full flex justify-end">
      <div className="flex gap-4 flex-col w-[285px] text-tertiary-600">
        <div className="flex gap-4 justify-between">
          <p className="">Sub Total</p>
          <p className="w-[151px] ">${subTotal.toLocaleString()}</p>
        </div>
        {extraCharges && (
          <div className="flex gap-4 justify-between">
            <p>Total</p>
            <p className="w-[151px] font-bold">
              ${(subTotal + extraCharges).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
