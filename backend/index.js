import express from "express";
import dotevn from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./socket/socket.js";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

dotevn.config();
const PORT = process.env.PORT || 8000;

app.use(cors({ origin: process.env.ORIGIN, credentials: true }));
app.use(express.json()); // req.body se data read krne k liye
app.use(cookieParser()); // req.cookie se data read krne k liye

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/user", userRoutes);

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Database connected");
    })
    .catch((error) => {
        console.log("Mongodb connection error", error);
    });

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
