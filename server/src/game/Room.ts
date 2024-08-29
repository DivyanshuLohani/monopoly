import {
  Room,
  Player,
  GameMap,
  GameState,
  GameRoomSettings,
  GameStats,
  Auction,
  Mortgage,
} from "../types";
import { Socket } from "socket.io";
import { initalizePlayer } from "./player";
import path from "path";
import * as fs from "fs";

const loadMapData = (filename: string) => {
  try {
    const filePath = path.join(__dirname, filename);
    const data = fs.readFileSync(filePath, "utf8");
    const parsedData = JSON.parse(data);

    if (!Array.isArray(parsedData)) {
      throw new Error("Invalid data format: Expected an array.");
    }

    return parsedData;
  } catch (error) {
    console.error(error);
    throw new Error(`Error loading map`);
  }
};

// Assuming default settings, stats, and game map initialization
const defaultGameMap: GameMap = {
  id: "map-id",
  blocks: loadMapData("map.json"),
  goReward: { land: 300, pass: 200 },
  treasures: { stack: 0, bonuses: [], currentIndex: 0, pardonCardHolder: null },
  surprises: { stack: 0, bonuses: [] },
};

const defaultGameRoomSettings: GameRoomSettings = {
  isPrivate: true,
  maxPlayers: 4,
  shufflePlayerOrder: true,
  payDoubleRentWhenOwnFullSet: false,
  vacationCash: true,
  auction: true,
  noRentPaymentsWhileInPrison: false,
  mortgage: true,
  startingCash: 1500,
  evenBuild: true,
};

const defaultGameStats: GameStats = {
  turnsCount: 0,
  doublesCount: 0,
  heatMap: null,
  chatMessagesCount: 0,
  tradesCount: 0,
  prisonVisits: 0,
};

export function createNewRoom(roomId: string, socket: Socket): Room {
  const player = initalizePlayer(socket);
  return {
    id: roomId, // Generate a random ID
    host: player,
    map: defaultGameMap,
    players: [],
    dices: [1, 1],
    currentPlayer: player,
    state: GameState.Lobby,
    dobulesInaRow: 0,
    settings: defaultGameRoomSettings,
    stats: defaultGameStats,
    vacationCash: 0,
    auction: null,
    mortgage: [],
    participantsOrder: null,
  };
}
