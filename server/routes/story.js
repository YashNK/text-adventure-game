import express from "express";
import {
  CreateStory,
  GetAllStories,
  GetStoryById,
  UpdateStoryById,
} from "../controller/story.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();

router.get("/stories/:userId", authenticateToken, GetAllStories);
router.get("/:id", authenticateToken, GetStoryById);
router.put("/:id", UpdateStoryById);
router.post("/create-story", CreateStory);

export default router;
