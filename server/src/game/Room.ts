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

// Assuming default settings, stats, and game map initialization
const defaultGameMap: GameMap = {
  id: "default-map-id",
  blocks: [],
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

export function createNewRoom(roomId: string, player: Player): Room {
  return {
    id: roomId, // Generate a random ID
    host: player,
    map: defaultGameMap,
    players: [player],
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
