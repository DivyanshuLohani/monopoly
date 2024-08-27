import { Server, Socket } from "socket.io";
import { Events } from "../events";

export function setupSocket(io: Server) {
  io.on("connect", (socket: Socket) => {
    console.log("A user connected:", socket.id);

    socket.on(Events.JOIN_ROOM, (roomId: string) => {
      socket.join(roomId);
      socket.emit(Events.JOINED_GAME);
    });
    socket.on(Events.ENTER_ROOM, (data: any) => {
      console.log(data);
      socket.emit(Events.ENTERED_ROOM);
    });
  });
}
