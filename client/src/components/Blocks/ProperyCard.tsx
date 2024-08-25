import { Block } from "../../types";

export default function ProperyCard({ blockData }: { blockData: Block }) {
  return <div className="block bg-black cursor-pointer">{blockData.name}</div>;
}
