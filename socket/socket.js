import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Handle socket connections
io.on("connection", (socket) => {
  console.log("🔌 A user connected:", socket.id);

  socket.on("sendMessage", (message) => {
    console.log("Message received:", message);
    socket.broadcast.emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("🔌 A user disconnected:", socket.id);
  });
});

export { app, server };
