import { Server, Socket } from "socket.io";
import { Events } from "../events";
import { JoinRoomData } from "../eventTypes";
import { RoomController } from "../controllers/roomController";
import { initalizePlayer } from "../game/player";
import { GameState } from "../types";

const roomController = new RoomController();
export function setupSocket(io: Server) {
  io.on("connect", (socket: Socket) => {
    console.log("A user connected:", socket.id);

    socket.on(Events.JOIN_ROOM, (data: JoinRoomData) => {
      socket.join(data.roomId);
      let room = roomController.getRoom(socket);
      if (!room) {
        room = roomController.createRoom(data.roomId, socket);
      }
      socket.emit(Events.JOINED_GAME, room);
    });

    socket.on(Events.ENTER_ROOM, (data: any) => {
      const player = initalizePlayer(socket);
      player.name = data.name;
      player.appearance = data.color;
      const room = roomController.enterRoom(data.roomId, player);
      if (!room)
        return socket.emit("error", {
          error:
            "The game you're trying to join either has already started or is full.",
        });
      socket.emit(Events.ENTERED_ROOM, room);
      socket.to(data.roomId).emit(Events.PLAYER_JOINED, player);
    });

    socket.on(Events.START_GAME, () => {
      const room = roomController.startGame(socket);
      if (!room)
        return socket.emit("error", {
          error: "You cannot start the game yet or you're not the host.",
        });
      io.emit(Events.GAME_STARTED, room);
    });

    socket.on(Events.ROLL_DICES, () => {
      const room = roomController.getRoom(socket);
      if (!room) return;

      const dices = roomController.rollDice(socket);
      if (!dices) return;
      io.to(room.id).emit(Events.DICE_ROLLED, dices);
    });

    socket.on(Events.END_TURN, () => {
      roomController.endTurn(socket);
      io.emit(Events.TURN_ENDED);
    });

    socket.on(Events.PURCHASE_PROPERTY, () => {
      if (!roomController.purchaseProperty(socket)) return;
      io.emit(Events.PROPERTY_SUCCESS);
    });

    // socket.on("disconnecting", () => {

    // })
  });
}
