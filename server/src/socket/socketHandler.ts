import { Server, Socket } from "socket.io";
import { Events } from "../events";
import { JoinRoomData } from "../eventTypes";

export function setupSocket(io: Server) {
  io.on("connect", (socket: Socket) => {
    console.log("A user connected:", socket.id);

    socket.on(Events.JOIN_ROOM, (data: JoinRoomData) => {
      socket.join(data.roomId);
      socket.emit(Events.JOINED_GAME);
    });
    socket.on(Events.ENTER_ROOM, (data: any) => {
      socket.emit(Events.ENTERED_ROOM);
    });
  });
}
