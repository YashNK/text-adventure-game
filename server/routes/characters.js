import express from "express";
import {
  createCharacter,
  getCharactersByStoryId,
  updateCharacter,
} from "../controller/characters.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();

router.get("/:storyId", authenticateToken, getCharactersByStoryId);
router.post("/", createCharacter);
router.put("/:characterId", updateCharacter);

export default router;
