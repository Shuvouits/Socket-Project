import express from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
import trimRequest from "trim-request";

const router = express.Router();

router.route("/register").post(trimRequest.all, register);
router.route('login').post(login);
router.route("/logout").post(logout);

export default router;