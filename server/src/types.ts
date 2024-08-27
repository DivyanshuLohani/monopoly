export const GO_INDEX = 0;
export const JAIL_INDEX = 10;
export const VACATION_INDEX = 20;
export const GOTO_JAIL_INDEX = 30;

export interface GameMap {
  id: string;
  blocks: Block[];
  goReward: GoReward;
  treasures: TreasureDeck;
  surprises: SurpriseDeck;
}

export interface GameRoomSettings {
  isPrivate: boolean;
  maxPlayers: number;
  shufflePlayerOrder: boolean;
  payDoubleRentWhenOwnFullSet: boolean;
  vacationCash: boolean;
  auction: boolean;
  noRentPaymentsWhileInPrison: boolean;
  mortgage: boolean;
  startingCash: number;
  evenBuild: boolean;
}

export interface GameStats {
  turnsCount: number;
  doublesCount: number;
  heatMap: number[] | null;
  chatMessagesCount: number;
  tradesCount: number;
  prisonVisits: number;
}

export interface Auction {
  propertyIndex: number;
  bidAmount: number;
  bidder: Player;
  state: ["idle", "running", "ended"];
  endsAt: Date;
}

export interface Mortgage {
  propertyIndex: number;
  backAmount: number;
}

export interface Room {
  id: string;
  host: Player | null;
  map: GameMap;
  players: Player[];
  dices: [number, number];
  currentPlayer: Player;
  state: GameState;
  dobulesInaRow: number;
  settings: GameRoomSettings;
  stats: GameStats;
  vacationCash: number;
  auction: Auction | null;
  mortgage: Mortgage[];
  participantsOrder: Player[] | null;
}

export interface Player {
  id: string;
  name: string;
  appearance: string;
  currentBlockIndex: number;
  money: number;
  bankruptedAt: Date | null;
  isBot: boolean;
  debtTo: Player | null | "bank";
  suspensionLeft: number; // For jail // Max 3 // Min 0
}

export interface Block {
  name: string;
  type: BlockType;
  price?: number;
  owner?: Player | null;
  isMortgaged: boolean;
  country: Country;
  level?: number;
  housePrice?: number;
  hotelPrice?: number;
  blockType?: BlockType;
  category?: number; // For special properties
  playersInJail: Player[]; // For jail
  jailAmount?: number; // For Jail
  payments: number[]; // Contains base rent // 1 house // 2 house // 3 house // 4 house // Hotel
  erections: number;
}

export interface Country {
  name: string;
  id: string;
}

export interface GoReward {
  land: number;
  pass: number;
}

export interface TreasureDeck {
  stack: number;
  bonuses: Bonus[];
  currentIndex: number;
  pardonCardHolder: Player | null;
}

export interface SurpriseDeck {
  stack: number;
  bonuses: Bonus[];
}

export interface Bonus {
  event: BonusEvent;
  message: string;
}

export interface BonusEvent {
  _type: number;
  paymentType?: number;
  amount?: number;
  method?: number;
  stack?: number;
  blockIndex?: number;
  shouldGetGoReward?: boolean;
  amountPerHouse?: number;
  amountPerHotel?: number;
  category?: number;
}

export enum BlockType {
  Start = 1,
  Property,
  Transport,
  Railway,
  Airport,
  LuxuryTax,
  IncomeTax,
  Chance,
  Tresure,
  GoToJail,
  Jail,
  Vacation,
}

export enum GameState {
  Lobby,
  Started,
  Ended,
}
