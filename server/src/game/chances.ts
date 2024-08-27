export enum ChanceType {
  CREDIT = 1,
  DEBIT,
  PLAYER_DEBIT,
  PLAYER_CREDIT,
  MOVE,
  CITY,
  JAIL,
  GO,
  TAX,
  PARDON_CARD,
}
export const chances = [
  {
    description: "Advance to Illinois Ave. ",
    type: ChanceType.CITY,
  },
  { description: "Go back 3 spaces.", type: ChanceType.MOVE, amount: 3 },
  { description: "Pay poor tax of $15.", type: ChanceType.DEBIT },
  {
    description:
      "Go to Jail. Go directly to Jail, do not pass Go, do not collect $200.",
    type: ChanceType.JAIL,
  },
  {
    description: "Take a trip to Reading Railroad. ",
    type: ChanceType.CITY,
  },
  {
    description: "Your building loan matures. Collect $150.",
    type: ChanceType.CREDIT,
  },
  { description: "Advance to Boardwalk.", type: ChanceType.CITY },
  {
    description:
      "Get out of Jail Free. This card may be kept until needed or traded.",
    type: ChanceType.PARDON_CARD,
  },
];
