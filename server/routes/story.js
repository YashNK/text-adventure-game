import express from "express";
import {
  createStory,
  getAllStories,
  updateStoryById,
} from "../controller/story.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();

router.get("/stories/:userId", authenticateToken, getAllStories);
router.put("/:id", updateStoryById);
router.post("/create-story", createStory);

export default router;
