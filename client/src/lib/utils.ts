import { Block } from "../types";

// To be changed
export function convertBoard(board: Block[]) {
  const ret = [];
  for (let i = 0; i < 4; i++) {
    // ret.push(board[i * 10]);
    const l = [];
    for (let j = 0; j < 9; j++) {
      l.push(board[i * 10 + 1 + j]);
    }
    ret.push(l);
  }
  return ret;
}

export function convertIndexToCoords(index: number) {
  if (index < 0 || index > 39) {
    throw new Error("Index out of bounds");
  }

  if (index >= 0 && index <= 10) {
    // TOP
    return { row: 0, col: index };
  } else if (index >= 11 && index <= 20) {
    // RIGHT
    return { row: index - 10, col: 10 };
  } else if (index >= 21 && index <= 30) {
    // BOTTOM
    return { row: 10, col: 30 - index };
  } else if (index >= 31 && index <= 39) {
    // LEFT
    return { row: 40 - index, col: 0 };
  }
  return { row: 0, col: 0 };
}

export function generateNewRoomID(length: number = 6) {
  const characters = "abcdefghijklmnopqrstuvwxyz";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}

export function generateRandomPlayerName() {
  const adjectives = [
    "Swift",
    "Mighty",
    "Brave",
    "Clever",
    "Bold",
    "Fierce",
    "Gentle",
    "Nimble",
    "Wise",
    "Cunning",
  ];

  const nouns = [
    "Lion",
    "Falcon",
    "Wizard",
    "Knight",
    "Panther",
    "Dragon",
    "Wolf",
    "Titan",
    "Shadow",
    "Viper",
  ];

  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${randomAdjective} ${randomNoun}`;
}
