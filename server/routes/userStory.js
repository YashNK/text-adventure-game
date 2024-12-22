import express from "express";
import authenticateToken from "../middleware/auth.js";
import { getUserCharacter, setUserCharacter } from "../controller/userStory.js";

const router = express.Router();

router.post("/user/:userId/set-character", authenticateToken, setUserCharacter);
router.get(
  "/users/:userId/story/:storyId/character",
  authenticateToken,
  getUserCharacter
);

export default router;
