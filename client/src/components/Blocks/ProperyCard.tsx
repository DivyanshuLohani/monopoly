import { Block } from "../../types";

export default function ProperyCard({ blockData }: { blockData: Block }) {
  return <div>{blockData.name}</div>;
}
