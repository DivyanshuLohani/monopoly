import React, { createContext, useContext, useState, useCallback } from "react";
import {
  Room,
  Player,
  GameMap,
  GameRoomSettings,
  GameStats,
  Auction,
  Mortgage,
  GameState,
} from "../types/index";

// Define the shape of the context
interface GameContextType {
  room: Room;
  setRoom: (room: Room) => void;
  updatePlayer: (player: Player) => void;
  startAuction: (auction: Auction) => void;
  endAuction: () => void;
  addMortgage: (mortgage: Mortgage) => void;
  removeMortgage: (propertyIndex: number) => void;
}

// Create a default context
const GameContext = createContext<GameContextType | undefined>(undefined);

// Create a provider component
export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [room, setRoom] = useState<Room>({
    id: "1", // default id for initialization
    host: null,
    map: {} as GameMap, // set default map as an empty object with type GameMap
    players: [],
    dices: [0, 0],
    currentPlayer: {} as Player,
    state: GameState.Lobby,
    dobulesInaRow: 0,
    settings: {} as GameRoomSettings,
    stats: {} as GameStats,
    vacationCash: 0,
    auction: null,
    mortgage: [],
    participantsOrder: null,
  });

  // Function to update a player in the game
  const updatePlayer = useCallback((player: Player) => {
    setRoom((prevRoom) => {
      const updatedPlayers = prevRoom.players.map((p) =>
        p.id === player.id ? { ...p, ...player } : p
      );
      return { ...prevRoom, players: updatedPlayers };
    });
  }, []);

  // Function to start an auction
  const startAuction = useCallback((auction: Auction) => {
    setRoom((prevRoom) => ({ ...prevRoom, auction }));
  }, []);

  // Function to end the current auction
  const endAuction = useCallback(() => {
    setRoom((prevRoom) => ({ ...prevRoom, auction: null }));
  }, []);

  // Function to add a mortgage
  const addMortgage = useCallback((mortgage: Mortgage) => {
    setRoom((prevRoom) => ({
      ...prevRoom,
      mortgage: [...prevRoom.mortgage, mortgage],
    }));
  }, []);

  // Function to remove a mortgage by property index
  const removeMortgage = useCallback((propertyIndex: number) => {
    setRoom((prevRoom) => ({
      ...prevRoom,
      mortgage: prevRoom.mortgage.filter(
        (m) => m.propertyIndex !== propertyIndex
      ),
    }));
  }, []);

  return (
    <GameContext.Provider
      value={{
        room,
        setRoom,
        updatePlayer,
        startAuction,
        endAuction,
        addMortgage,
        removeMortgage,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

// Custom hook for consuming the GameContext
// eslint-disable-next-line react-refresh/only-export-components
export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
