import express from "express";
import { RegisterUser, LoginUser, GetCurrentUser } from "../controller/user.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.get("/current-user", authenticateToken, GetCurrentUser);

export default router;
