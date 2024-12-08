import express from "express";
import authRotes from "./auth.route.js";
import ConversationRoutes from "./conversation.route.js";


const router = express.Router();

router.use("/auth", authRotes);
router.use("/conversation", ConversationRoutes);

export default router;