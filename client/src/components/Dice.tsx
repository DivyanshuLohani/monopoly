import { useEffect, useState } from "react";
import { useGame } from "../context/GameContext";
import { GameState } from "../types";
import { socket } from "../socket/socket";
import { Events } from "../types/events";

export default function Dice() {
  const [text, setText] = useState("Rolling Dice...");
  const { room, isMyTurn } = useGame();

  function rollDice() {
    setText("Rolling Dice....");
    socket.emit(Events.ROLL_DICES);
  }

  function dicesRolled(dices: number[]) {
    setText(`${dices[0]}, ${dices[1]}`);
  }

  useEffect(() => {
    socket.on(Events.DICE_ROLLED, dicesRolled);
    return () => {
      socket.off(Events.DICE_ROLLED, dicesRolled);
    };
  });
  if (room.state != GameState.Started) return null;
  return (
    <div className="flex gap-10 flex-col">
      <span>{text}</span>

      {isMyTurn && (
        <button
          className="bg-purple-600 hover:bg-purple-700 px-5 py-2 text-white rounded-full transition-colors duration-100 cursor-pointer"
          onClick={rollDice}
        >
          Roll Dice
        </button>
      )}
    </div>
  );
}
