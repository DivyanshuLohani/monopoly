export enum TresureType {
  CREDIT = 1,
  DEBIT,
  PLAYER_DEBIT,
  PLAYER_CREDIT,
  MOVE,
  JAIL,
  GO,
  TAX,
}

export const chances = [
  {
    description: "Bank error in your favor. Collect $200.",
    type: TresureType.CREDIT,
    amount: 200, // Added amount for CREDIT type
  },
  {
    description: "Doctor's fee. Pay $50.",
    type: TresureType.DEBIT,
    amount: 50, // Added amount for DEBIT type
  },
  {
    description:
      "Go to Jail. Go directly to jail, do not pass Go, do not collect $200.",
    type: TresureType.JAIL,
  },
  {
    description: "Advance to Go. Collect $200.",
    type: TresureType.GO,
  },
  {
    description: "Your birthday! Collect $10 from each player.",
    type: TresureType.PLAYER_DEBIT,
    amount: 10, // Added amount for PLAYER_DEBIT type
  },
  {
    description: "You have won second prize in a beauty contest. Collect $10.",
    type: TresureType.CREDIT,
    amount: 10, // Added amount for CREDIT type
  },
  {
    description: "Pay school fees of $150.",
    type: TresureType.DEBIT,
    amount: 150, // Added amount for DEBIT type
  },
  {
    description:
      "You are assessed for street repairs. $40 per house, $115 per hotel.",
    type: TresureType.TAX,
    amount: 40, // Assuming $40 per house as the base amount
  },
];
