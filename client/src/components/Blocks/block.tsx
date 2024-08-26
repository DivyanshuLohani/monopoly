import { BlockType, Block as IBlock } from "../../types";
import ChanceCard from "./ChanceCard";
import IncomeTax from "./IncomeTax";
import LuxuryTax from "./LuxuryTax";
import ProperyCard from "./ProperyCard";
import TresureCard from "./TresureCard";

export default function Block({
  blockData,
  orientation,
}: {
  blockData: IBlock;
  orientation: "left" | "right" | "top" | "bottom";
}) {
  let element = <ProperyCard blockData={blockData} side={orientation} />;
  switch (blockData.type) {
    case BlockType.Chance:
      element = <ChanceCard />;
      break;
    case BlockType.Tresure:
      element = <TresureCard />;
      break;
    case BlockType.IncomeTax:
      element = <IncomeTax />;
      break;
    case BlockType.LuxuryTax:
      element = <LuxuryTax />;
      break;
  }

  return (
    <div
      className={`w-20 h-20 text-white flex items-center justify-center select-none ${
        orientation === "left" && "rotate-90"
      } ${orientation === "right" && "-rotate-90"}`}
    >
      {element}
    </div>
  );
}
