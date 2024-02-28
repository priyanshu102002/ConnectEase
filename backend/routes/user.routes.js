import express from "express";
import protectedRoutes from "../middleware/protectedRoutes.middleware.js";
import { getUserForSiderbar } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectedRoutes, getUserForSiderbar);

export default router;
