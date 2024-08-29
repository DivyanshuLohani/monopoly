import { useState } from "react";
import { toast } from "react-toastify";
import { socket } from "../socket/socket";
import { Events } from "../types/events";
import { useLocalStorage } from "@uidotdev/usehooks";
import { generateRandomPlayerName } from "../lib/utils";
import { useGame } from "../context/GameContext";

function lightenHexColor(hex: string, percent: number) {
  // Convert hex to RGB
  const num = parseInt(hex.replace("#", ""), 16);
  const r = (num >> 16) + Math.round((255 - (num >> 16)) * (percent / 100));
  const g =
    ((num >> 8) & 0x00ff) +
    Math.round((255 - ((num >> 8) & 0x00ff)) * (percent / 100));
  const b =
    (num & 0x0000ff) + Math.round((255 - (num & 0x0000ff)) * (percent / 100));

  // Return new lightened color in hex format
  return `#${(0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

const tokenColors = [
  "#FF5733", // Vibrant Orange
  "#33FF57", // Bright Green
  "#3357FF", // Bold Blue
  "#F733FF", // Bright Purple
  "#FF33A5", // Hot Pink
  "#F5A623", // Warm Yellow
  "#FFC300", // Golden Yellow
  "#00BFFF", // Deep Sky Blue
  "#FF4500", // Orange Red
];
export default function AppearanceSelector() {
  const [selectedIdx, setSelected] = useState<number | null>(null);
  const [name] = useLocalStorage("PLAYER_NAME", generateRandomPlayerName());
  const { room } = useGame();

  function handleEnterRoom() {
    if (!selectedIdx) return toast.error("Please select a color.");
    if (!socket.connected) socket.connect();
    const color = tokenColors[selectedIdx];
    socket.emit(Events.ENTER_ROOM, { name, color, roomId: room.id });
  }
  return (
    <div className="absolute  w-full h-full bg-black/50 flex flex-col items-center justify-center z-50 p-32 ">
      <div className="flex items-center content-center flex-wrap gap-5">
        {tokenColors.map((e, i) => (
          <button
            onClick={() => setSelected(i)}
            key={e}
            className={`w-16 h-16 rounded-full transition-transform ${
              selectedIdx === i ? "transform scale-105" : ""
            }`}
            style={{
              backgroundColor: e,
              boxShadow:
                selectedIdx === i
                  ? `0 0 15px 5px ${lightenHexColor(e, 50)}`
                  : "none",
            }}
          />
        ))}
      </div>
      <div>
        <button
          className="bg-purple-600 hover:bg-purple-700 px-5 py-4 text-white font-bold text-xl rounded-full transition-colors duration-100"
          onClick={handleEnterRoom}
        >
          Join Game
        </button>
      </div>
    </div>
  );
}
