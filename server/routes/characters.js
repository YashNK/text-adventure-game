import express from "express";
import {
  createCharacter,
  getCharactersByStoryId,
} from "../controller/characters.js";

const router = express.Router();

router.get("/:storyId", getCharactersByStoryId);
router.post("/:storyId", createCharacter);

export default router;
