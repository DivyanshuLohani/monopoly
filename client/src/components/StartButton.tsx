import { useGame } from "../context/GameContext";
import { socket } from "../socket/socket";
import { GameState } from "../types";
import { PlayCircle } from "lucide-react";
import { Events } from "../types/events";

export default function StartButton() {
  const { room } = useGame();
  const handleStart = () => {
    socket.emit(Events.START_GAME);
  };

  if (room.state != GameState.Lobby) return null;
  return (
    <button
      className="bg-purple-600 hover:bg-purple-700 px-5 py-2 text-white rounded-lg transition-colors duration-100 cursor-pointer flex items-center gap-2 font-bold"
      onClick={handleStart}
      disabled={room.players.length <= 1 && room.host?.id != socket.id}
    >
      <PlayCircle /> <span>Start Game</span>
    </button>
  );
}
