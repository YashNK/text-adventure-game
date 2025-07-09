import express from "express";
import authenticateToken from "../middleware/auth.js";
import {
  CreateUserStory,
  GetUserCharacter,
  SetUserCharacter,
} from "../controller/userStory.js";

const router = express.Router();

router.post("/user/:userId/set-character", authenticateToken, SetUserCharacter);
router.get(
  "/users/:userId/story/:storyId/character",
  authenticateToken,
  GetUserCharacter
);
router.post("/user/:userId", authenticateToken, CreateUserStory);

export default router;
