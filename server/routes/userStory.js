import express from "express";
import authenticateToken from "../middleware/auth.js";
import {
  getUserCharacterForStory,
  getUserStoriesForUser,
  setUserCharacter,
} from "../controller/userStory.js";

const router = express.Router();

router.post("/user/:userId/set-character", setUserCharacter);
router.get("/user/:userId", getUserStoriesForUser);
router.get(
  "/users/:userId/stories/:storyId/character",
  getUserCharacterForStory
);

export default router;
