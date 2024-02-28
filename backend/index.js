import express from "express";
import dotevn from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.route.js";

const app = express();

dotevn.config();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use("/api/auth",authRoutes);

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Database connected");
    })
    .catch((error) => {
        console.log("Mongodb connection error", error);
    });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
