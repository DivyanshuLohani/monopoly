export enum Events {
  // Rooms
  ENTER_ROOM = "enter-room",
  ENTERED_ROOM = "entered-room",

  PLAYER_JOINED = "player-joined",

  // Join Rooms
  JOIN_ROOM = "join-room",
  JOINED_GAME = "joined-game",

  GAME_STARTED = "game-started",
  START_GAME = "start-game",
  GAME_ENDED = "game-ended",

  // Dices
  ROLL_DICES = "roll-dices",
  DICE_ROLLED = "dice-rolled",

  // Property
  PURCHASE_PROPERTY = "purchase-property",
  PROPERTY_SUCCESS = "property-success",

  // Game Room
  UPDATE_GAME_ROOM = "update-game-room",
  GAME_ROOM_UPDATED = "game-room-updated",

  // Hotels
  CITY_LEVEL_CHANGED = "city-level-changed",

  END_TURN = "end-turn",
  TURN_ENDED = "turn-ended",
}
