import express from "express";
import {
  createCharacter,
  getCharactersByStoryId,
} from "../controller/characters.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();

router.get("/:storyId", authenticateToken, getCharactersByStoryId);
router.post("/:storyId", createCharacter);

export default router;
