import express from "express";
import authRotes from "./auth.route.js";
import userRoutes from "./user.route.js";
import ConversationRoutes from "./conversation.route.js";
import MessageRoutes from "./message.route.js";


const router = express.Router();

router.use("/auth", authRotes);
router.use("/user", userRoutes);
router.use("/conversation", ConversationRoutes);
router.use("/message", MessageRoutes);

export default router;