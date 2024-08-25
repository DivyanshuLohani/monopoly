import { Server, Socket } from "socket.io";

export function setupSocket(io: Server) {
  io.on("connect", (socket: Socket) => {
    console.log("A user connected:", socket.id);
  });
}
