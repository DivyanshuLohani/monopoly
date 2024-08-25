import { Codesandbox } from "lucide-react";

export default function TresureCard() {
  console.log("Hello");
  return (
    <div className="h-full w-full bg-red-800 flex flex-col items-center justify-center rounded-lg">
      <Codesandbox />
      <span>Tresure</span>
    </div>
  );
}
