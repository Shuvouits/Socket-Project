import express from "express";
import authRotes from "./auth.route.js";


const router = express.Router();

router.use("/auth", authRotes);

export default router;