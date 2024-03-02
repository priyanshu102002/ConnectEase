import http from "http";
import { Server } from "socket.io";
import express from "express";
import dotevn from "dotenv";

dotevn.config();
const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.ORIGIN,
        methods: ["GET", "POST"],
    },
});

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

// client se userId aaya hai
const userSocketMap = {};
console.log("userSocketMap", userSocketMap);

io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    // Client se userId receive krna hai jo hmne query me pass kia hai
    const userId = socket.handshake.query.userId;
    if (userId !== "undefined") {
        userSocketMap[userId] = socket.id;
    }

    // io.emit() sends to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);
        delete userSocketMap[userId];
    });
});

export { app, server, io };
