import { convertIndexToCoords } from "../../lib/utils";

interface TokenProps {
  blockIndex: number;
  color: string;
}

export default function Token({ blockIndex, color }: TokenProps) {
  const { row, col } = convertIndexToCoords(blockIndex);

  return (
    <div
      className={`w-10 h-10 absolute rounded-full top-0 z-10 transition-transform duration-300 ease-in-out`}
      style={{
        transform: `translate(${col * 200}%, ${row * 200}%)`,
        backgroundColor: color,
      }}
    ></div>
  );
}
