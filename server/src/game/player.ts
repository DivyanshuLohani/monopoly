import { Socket } from "socket.io";
import { JAIL_INDEX, Player, Room } from "../types";

export function getPlayerFromSocket(socket: Socket, room: Room) {
  const players = room.players;
  const player = players.find((p) => p.id === socket.id);
  return player;
}

export function initializePlayers(room: Room) {
  if (room.settings.shufflePlayerOrder)
    room.players = room.players.sort(() => Math.random() - 0.5);
  room.players.forEach((player) => {
    player.money = room.settings.startingCash;
    player.bankruptedAt = null;
    player.currentBlockIndex = 0;
  });
}

export function addPlayerMoney(player: Player, amount: number) {
  if (player.money < 0 && player.debtTo) {
    const remainingDebt = player.money + amount;
    if (remainingDebt < 0) {
      if (player.debtTo !== "bank") player.debtTo.money += amount;
      player.money = remainingDebt;
    } else {
      // Repay the debt fully
      if (player.debtTo !== "bank")
        player.debtTo.money += Math.abs(player.money);

      player.money = remainingDebt;

      player.debtTo = null;
    }
  } else {
    player.money += amount;
  }
}
export function deductPlayerMoney(
  player: Player,
  amount: number,
  source: Player | "bank"
) {
  player.money -= amount;
  if (player.money < 0) {
    player.debtTo = source;
  }
}
export function sendPlayerToJail(player: Player) {
  player.suspensionLeft = 3;
  player.currentBlockIndex = JAIL_INDEX;
}
