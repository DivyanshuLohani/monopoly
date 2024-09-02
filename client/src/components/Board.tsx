import { useEffect, useState } from "react";
import { convertBoard } from "../lib/utils";
import AppearanceSelector from "./AppearanceSelector";
import Block from "./Blocks/block";
import GoToJail from "./Blocks/GoToJail";
import Jail from "./Blocks/Jail";
import Start from "./Blocks/Start";
import Vacation from "./Blocks/Vacation";
import Dice from "./Dice";
import { socket } from "../socket/socket";
import { Events } from "../types/events";
import StartButton from "./StartButton";
import { useGame } from "../context/GameContext";
import Token from "./Token/Token";

export default function Board() {
  const [appearranceOpen, setAppearanceOpen] = useState(true);
  const { room } = useGame();
  useEffect(() => {
    function handleEnterRoom() {
      setAppearanceOpen(false);
    }
    socket.on(Events.ENTERED_ROOM, handleEnterRoom);
    return () => {
      socket.off(Events.ENTERED_ROOM, handleEnterRoom);
    };
  });

  return (
    <div className="flex justify-center w-3/5 h-full">
      <div className="board relative">
        {appearranceOpen && <AppearanceSelector />}
        {/* Token Container */}
        <div className="absolute w-full h-full top-0 bottom-0 right-0 left-0 pointer-events-none">
          {room.players.map((e) => {
            if (room.currentPlayer.id === e.id)
              return (
                <Token
                  blockIndex={room.currentPlayer.currentBlockIndex}
                  color={e.appearance}
                  key={e.id}
                />
              );
            return (
              <Token
                blockIndex={e.currentBlockIndex}
                color={e.appearance}
                key={e.id}
              />
            );
          })}
        </div>
        <div className="center w-full h-full flex items-center justify-center">
          <Dice />
          <StartButton />
        </div>
        <Start />
        <Jail />
        <GoToJail />
        <Vacation />
        {convertBoard(room.map.blocks).map((e, i) => {
          let side = "top";
          switch (i) {
            case 1:
              side = "right";
              break;
            case 2:
              side = "bottom";
              break;
            case 3:
              side = "left";
              break;
          }
          return (
            <div className={`${side} flex justify-evenly`} key={i}>
              {e.map((e, i) => (
                <Block
                  key={i}
                  blockData={e}
                  orientation={side as "left" | "right" | "top" | "bottom"}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
