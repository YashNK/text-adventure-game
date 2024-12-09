import express from "express";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  setUserCharacter,
} from "../controller/user.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current-user", authenticateToken, getCurrentUser);
router.put("/user-character/:userId", authenticateToken, setUserCharacter);

export default router;
