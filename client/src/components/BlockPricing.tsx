import { DollarSign, Hotel, House } from "lucide-react";

export default function BlockPricing() {
  return (
    <div className="flex justify-evenly text-sm">
      <div className="flex flex-col items-center">
        Price
        <span className="flex items-center justify-center">
          <DollarSign size={15} /> 100
        </span>
      </div>
      <div className="flex flex-col items-center">
        <House />
        <span className="flex  items-center justify-center">
          <DollarSign size={15} /> 100
        </span>
      </div>
      <div className="flex flex-col items-center">
        <Hotel />
        <span className="flex  items-center justify-center">
          <DollarSign size={15} /> 100
        </span>
      </div>
    </div>
  );
}
