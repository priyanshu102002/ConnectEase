import express from "express";
import { sendMessage, getMessages } from "../controllers/message.controller.js";
import protectedRoutes from "../middleware/protectedRoutes.middleware.js";

const router = express.Router();

router.get("/:id", protectedRoutes, getMessages);
router.post("/send/:id", protectedRoutes, sendMessage);

export default router;
