import express from "express";
import {
  CreateCharacter,
  GetCharactersByStoryId,
  UpdateCharacter,
} from "../controller/characters.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();

router.get("/:storyId", authenticateToken, GetCharactersByStoryId);
router.post("/", CreateCharacter);
router.put("/:characterId", UpdateCharacter);

export default router;
