import { DollarSign, Hotel, House } from "lucide-react";

interface BlockPricingProps {
  price: number;
  hotelPrice: number;
  housePrice: number;
}

export default function BlockPricing({
  price,
  hotelPrice,
  housePrice,
}: BlockPricingProps) {
  return (
    <div className="flex justify-evenly text-sm">
      <div className="flex flex-col items-center">
        Price
        <span className="flex items-center justify-center">
          <DollarSign size={15} /> {price}
        </span>
      </div>
      <div className="flex flex-col items-center">
        <House />
        <span className="flex  items-center justify-center">
          <DollarSign size={15} /> {housePrice}
        </span>
      </div>
      <div className="flex flex-col items-center">
        <Hotel />
        <span className="flex  items-center justify-center">
          <DollarSign size={15} /> {hotelPrice}
        </span>
      </div>
    </div>
  );
}
