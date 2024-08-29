import { DollarSign } from "lucide-react";
import { Block } from "../../types";
import Tippy from "@tippyjs/react";
import BlockInfo from "../BlockInfo";

interface PropertyCardProps {
  blockData: Block;
  side: string;
}

export default function ProperyCard({ blockData, side }: PropertyCardProps) {
  const placement =
    side === "left"
      ? "right"
      : side === "right"
      ? "left"
      : side === "top"
      ? "bottom"
      : side === "bottom"
      ? "top"
      : "top";

  return (
    <Tippy
      content={<BlockInfo blockData={blockData} />}
      animation="scale"
      placement={placement}
      trigger="click"
      interactive
      arrow
    >
      <div
        className="block bg-black cursor-pointer"
        style={{
          backgroundImage: `url('/flags/${blockData.country.id.toLowerCase()}.svg')`,
        }}
      >
        <div className="block backdrop-blur-sm flex-col justify-between py-1 bg-gray-700/80">
          <span className="text-sm font-bold">{blockData.name}</span>
          <span className="py-1 px-2 bg-gray-500/50  flex gap-1 items-center justify-center rounded-lg">
            <DollarSign size={15} />
            {blockData.price}
          </span>
        </div>
      </div>
    </Tippy>
  );
}
