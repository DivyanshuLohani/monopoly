import { DollarSign, HandPlatter } from "lucide-react";

export default function LuxuryTax() {
  return (
    <div className="h-full w-full bg-blue-600 flex flex-col items-center justify-center rounded-lg">
      <HandPlatter />
      <span className="text-sm">Luxury Tax</span>
      <span className="text-xs flex gap-1 items-center ">
        <DollarSign size={12} />
        75
      </span>
    </div>
  );
}
