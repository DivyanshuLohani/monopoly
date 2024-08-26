import { TicketsPlane } from "lucide-react";

export default function Vacation() {
  return (
    <div className="vacation w-full h-full flex flex-col items-center justify-center bg-purple-900 rounded-lg">
      <TicketsPlane />
      <h3 className="text-lg">Vacation</h3>
      <span className="text-xs">$0 on hold</span>
    </div>
  );
}
