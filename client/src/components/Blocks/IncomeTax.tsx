import { Receipt } from "lucide-react";

export default function IncomeTax() {
  return (
    <div className="h-full w-full bg-blue-500 flex flex-col items-center justify-center">
      <Receipt />
      <span className="text-sm">Income Tax</span>
      <span className="text-xs">10%</span>
    </div>
  );
}
