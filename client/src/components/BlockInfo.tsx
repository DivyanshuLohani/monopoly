import { Block } from "../types";
import BlockPricing from "./BlockPricing";
import RentPricing from "./RentPricing";

interface BlockInfoProps {
  blockData: Block;
}

export default function BlockInfo({ blockData }: BlockInfoProps) {
  return (
    <div className="block relative bg-gray-700/80">
      <div className="z-10 bg-gray-700/80 rounded-lg w-full flex flex-col gap-2">
        <span className="text-xl font-bold text-center px-5 py-2 border-b border-gray-500">
          {blockData.name}
        </span>

        <RentPricing />
        <BlockPricing />
      </div>
      <div
        className="block blur-sm flex-col justify-between absolute top-0 bottom-0 right-0 left-0"
        style={{
          backgroundImage: "url('/flag.png')",
        }}
      ></div>
    </div>
  );
}
