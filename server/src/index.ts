import express from "express";
import http from "http";
import cors from "cors";
import { setupSocket } from "./socket/socketHandler";

const app = express();
const server = http.createServer(app);
app.use(cors());

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
setupSocket(io);

server.listen(5000, function () {
  console.log("listening on *:5000");
});
