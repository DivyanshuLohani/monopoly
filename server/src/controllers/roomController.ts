import { Socket } from "socket.io";
import { createNewRoom } from "../game/Room";
import { Room, Player, GameState, BlockType } from "../types";
import {
  addPlayerMoney,
  deductPlayerMoney,
  getPlayerFromSocket,
  initializePlayers,
  sendPlayerToJail,
} from "../game/player";
import {
  canBeErected,
  canBeSoldOrMortgaged,
  getRentForBlock,
} from "../game/rent";

export class RoomController {
  private rooms: Map<string, Room> = new Map();

  getRoom(socket: Socket) {
    if (!socket) return null;
    const roomId = Array.from(socket.rooms)[1] as string;
    if (!roomId) return null;
    const room = this.rooms.get(roomId);
    return room;
  }

  createRoom(roomId: string, socket: Socket): Room {
    const room = createNewRoom(roomId, socket);
    this.setRoom(roomId, room);
    return room;
  }

  enterRoom(roomId: string, player: Player): Room | undefined {
    const room = this.rooms.get(roomId);
    if (room) {
      if (room.state !== GameState.Lobby) return undefined;
      if (room.players.length >= room.settings.maxPlayers) return undefined;
      room.players.push(player);
      return room;
    }
    return undefined;
  }

  setRoom(roomId: string, room: Room): void {
    this.rooms.set(roomId, room);
  }

  removeRoom(roomId: string): void {
    this.rooms.delete(roomId);
  }

  startGame(socket: Socket): Room | undefined {
    const room = this.getRoom(socket);
    if (!room) return;
    if (room.host.id !== socket.id) return;
    if (room.players.length < 2) return;
    if (room.state !== GameState.Lobby) return;
    room.state = GameState.Started;
    initializePlayers(room);
    room.currentPlayer = room.players[0];
    this.setRoom(room.id, room);

    return room;
  }

  rollDice(socket: Socket): number[] | null {
    const room = this.getRoom(socket);
    if (!room) return null;
    const player = room.currentPlayer;
    if (getPlayerFromSocket(socket, room) != player) return null;
    // Roll the dices
    room.dices = [
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1,
    ];
    // Change player position
    player.currentBlockIndex += room.dices[0] + room.dices[1];
    if (player.currentBlockIndex >= room.map.blocks.length) {
      player.currentBlockIndex =
        player.currentBlockIndex % room.map.blocks.length;
    }

    // Check for doubles
    if (room.dices[0] === room.dices[1]) {
      room.dobulesInaRow++;
      if (room.dobulesInaRow === 3) {
        sendPlayerToJail(player);
        this.endTurn(socket);
      }
    } else {
      room.dobulesInaRow = 0;
    }

    this.setRoom(room.id, room);
    return room.dices;
  }

  endTurn(socket: Socket): void {
    const room = this.getRoom(socket);
    if (!room) return;
    if (room.currentPlayer.debtTo !== null) return;
    // Update the player in list
    room.players = room.players.map((e) => {
      if (room.currentPlayer.id === e.id) return room.currentPlayer;
      return e;
    });
    room.currentPlayer =
      room.players[
        (room.players.indexOf(room.currentPlayer) + 1) % room.players.length
      ];
    this.setRoom(room.id, room);
  }

  purchaseProperty(socket: Socket) {
    const room = this.getRoom(socket);
    if (!room) return false;
    const player = room.currentPlayer;
    if (getPlayerFromSocket(socket, room) != player) return false;
    const property = room.map.blocks[player.currentBlockIndex];
    if (
      property.type === BlockType.Chance ||
      property.type === BlockType.Start ||
      property.type === BlockType.Jail ||
      property.type === BlockType.Tresure ||
      property.type === BlockType.GoToJail
    )
      return false;
    if (property.owner !== null) return false;
    if (!property.price) return false;
    if (player.money < property.price) return false;
    property.owner = player;
    deductPlayerMoney(player, property.price, "bank");
    this.setRoom(room.id, room);
    return true;
  }

  sellProperty(socket: Socket, blokIndex: number) {
    const room = this.getRoom(socket);
    if (!room) return false;
    // Get the current player
    const player = room.currentPlayer;
    if (getPlayerFromSocket(socket, room) != player) return false;
    ///////////////////////
    //////////////
    const property = room.map.blocks[blokIndex];
    if (property.owner !== player) return false;
    if (!property.price) return false;
    /////////////////

    if (!canBeSoldOrMortgaged(room, blokIndex)) return false;

    property.owner = null;
    if (!property.isMortgaged) addPlayerMoney(player, property.price / 2);
    this.setRoom(room.id, room);
    return true;
  }
  mortgageProperty(socket: Socket, blokIndex: number) {
    const room = this.getRoom(socket);
    if (!room) return false;
    if (!room.settings.mortgage) return false;
    const player = room.currentPlayer;
    if (getPlayerFromSocket(socket, room) != player) return false;
    const property = room.map.blocks[blokIndex];
    if (property.owner !== player) return false;
    if (!property.price) return false;
    if (property.isMortgaged) return false;

    if (!canBeSoldOrMortgaged(room, blokIndex)) return false;

    addPlayerMoney(player, property.price / 2);
    property.isMortgaged = true;

    this.setRoom(room.id, room);
    return true;
  }

  payRent(socket: Socket) {
    const room = this.getRoom(socket);
    if (!room) return false;
    if (
      room.currentPlayer.suspensionLeft > 0 &&
      room.settings.noRentPaymentsWhileInPrison
    )
      return false;
    const block = room.map.blocks[room.currentPlayer.currentBlockIndex];
    if (!block.owner || block.owner.id === room.currentPlayer.id) return false;
    const rent = getRentForBlock(room, room.currentPlayer.currentBlockIndex);
    const player = room.currentPlayer;
    if (player.money < rent) {
      const debt = player.money - rent;
      player.debtTo = block.owner;
      block.owner.money += player.money;
      player.money = debt;
    } else {
      player.money -= rent;
      block.owner.money += rent;
    }
    this.setRoom(room.id, room);
    return true;
  }

  erectHouse(socket: Socket, blokIndex: number) {
    const room = this.getRoom(socket);
    if (!room) return false;
    const property = room.map.blocks[blokIndex];
    const player = getPlayerFromSocket(socket, room);
    if (!property.owner) return;
    if (property.owner.id !== player?.id) return;
    if (!property.price || property.price > player?.money) return;
    if (!canBeErected(room, property)) return;

    let amount =
      property.erections === 4 ? property.hotelPrice : property.housePrice;
    if (!amount)
      throw Error(`This is not expected a block has null price ${property}`);

    deductPlayerMoney(player, amount, "bank");
    property.erections++;
    this.setRoom(room.id, room);
    return true;
  }
}
