import { DollarSign } from "lucide-react";

interface RentPricingProps {
  payments: number[];
}

export default function RentPricing({ payments }: RentPricingProps) {
  return (
    <div className="flex flex-col gap-2 w-full justify-center pb-3">
      <div className="flex justify-between w-full px-2">
        <span className="underline italic">when</span>
        <span className="underline italic">get</span>
      </div>
      <div className="flex justify-between w-full px-2">
        <span className="text-sm ">with rent</span>
        <span className="text-sm flex items-center">
          <DollarSign size={12} />
          {payments[0]}
        </span>
      </div>
      <div className="flex justify-between w-full px-2">
        <span className="text-sm ">with one house</span>
        <span className="text-sm flex items-center">
          <DollarSign size={12} />
          {payments[1]}
        </span>
      </div>
      <div className="flex justify-between w-full px-2">
        <span className="text-sm ">with two house</span>
        <span className="text-sm flex items-center">
          <DollarSign size={12} />
          {payments[2]}
        </span>
      </div>
      <div className="flex justify-between w-full px-2">
        <span className="text-sm ">with three house</span>
        <span className="text-sm flex items-center">
          <DollarSign size={12} />
          {payments[3]}
        </span>
      </div>
      <div className="flex justify-between w-full px-2">
        <span className="text-sm ">with four house</span>
        <span className="text-sm flex items-center">
          <DollarSign size={12} />
          {payments[4]}
        </span>
      </div>
      <div className="flex justify-between w-full px-2">
        <span className="text-sm ">with a hotel</span>
        <span className="text-sm flex items-center">
          <DollarSign size={12} />
          {payments[5]}
        </span>
      </div>
    </div>
  );
}
