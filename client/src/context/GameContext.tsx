import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
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
import { socket } from "../socket/socket";
import { Events } from "../types/events";
import { toast } from "react-toastify";

// Define the shape of the context
interface GameContextType {
  room: Room;
  setRoom: (room: Room) => void;
  updatePlayer: (player: Player) => void;
  startAuction: (auction: Auction) => void;
  endAuction: () => void;
  addMortgage: (mortgage: Mortgage) => void;
  removeMortgage: (propertyIndex: number) => void;
  isMyTurn: boolean;
  rolled: boolean;
}

// Create a default context
const GameContext = createContext<GameContextType | undefined>(undefined);

// Create a provider component
export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [room, setRoom] = useState<Room>({
    id: "id",
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
  const [rolled, setRolled] = useState(false);
  const [isMyTurn, setIsMyTurn] = useState<boolean>(false);

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

  const updateTurn = useCallback(() => {
    setRoom({
      ...room,
      currentPlayer:
        room.players[
          (room.players.indexOf(room.currentPlayer) + 1) % room.players.length
        ],
    });
    setIsMyTurn(room.currentPlayer.id === socket.id);
    setRolled(false);
  }, [room]);

  const handleRoomJoin = useCallback((room: Room) => {
    setRoom(room);
  }, []);

  const showError = (error: { error: string }) => {
    toast.error(error.error, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handlePlayerJoin = useCallback(
    (player: Player) => {
      setRoom({
        ...room,
        players: [...room.players, player],
      });
    },
    [room]
  );

  const handleDiceRoll = useCallback(
    (dices: [number, number]) => {
      if (dices[0] === dices[1]) setRolled(false);
      else setRolled(true);
      const player = room.currentPlayer;
      // Chance block position
      player.currentBlockIndex += dices[0] + dices[1];
      console.log(
        room.map.blocks.length,
        player.currentBlockIndex >= room.map.blocks.length
      );
      if (player.currentBlockIndex >= room.map.blocks.length) {
        player.currentBlockIndex =
          player.currentBlockIndex % room.map.blocks.length;
      }
      // update player in room list and also the current player
      setRoom({
        ...room,
        currentPlayer: player,
        dices,
        players: room.players.map((e) => {
          if (e.id === room.currentPlayer.id) return room.currentPlayer;
          return e;
        }),
      });
    },
    [room]
  );

  useEffect(() => {
    socket.on(Events.JOINED_GAME, handleRoomJoin);
    socket.on(Events.ENTERED_ROOM, setRoom);
    socket.on(Events.TURN_ENDED, updateTurn);
    socket.on(Events.GAME_STARTED, setRoom);
    socket.on(Events.PLAYER_JOINED, handlePlayerJoin);
    socket.on(Events.DICE_ROLLED, handleDiceRoll);
    socket.on("error", showError);

    return () => {
      socket.off(Events.JOINED_GAME, handleRoomJoin);
      socket.off(Events.ENTERED_ROOM, setRoom);
      socket.off(Events.TURN_ENDED, updateTurn);
      socket.off(Events.GAME_STARTED, setRoom);
      socket.off(Events.PLAYER_JOINED, handlePlayerJoin);
      socket.off(Events.DICE_ROLLED, handleDiceRoll);
      socket.off("error", showError);
    };
  }, [handleDiceRoll, handlePlayerJoin, handleRoomJoin, updateTurn]);

  useEffect(() => {
    setIsMyTurn(room.currentPlayer.id === socket.id);
    setRolled(false);
  }, [room.currentPlayer]);

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
        isMyTurn,
        rolled,
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
