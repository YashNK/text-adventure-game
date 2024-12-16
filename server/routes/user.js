import express from "express";
import { registerUser, loginUser, getCurrentUser } from "../controller/user.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current-user", authenticateToken, getCurrentUser);

export default router;
