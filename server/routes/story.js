import express from "express";
import {
  createStory,
  getAllStories,
  getStoryById,
  updateStoryById,
} from "../controller/story.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();

router.get("/stories", authenticateToken, getAllStories);
router.get("/:id", authenticateToken, getStoryById);
router.put("/:id", updateStoryById);
router.post("/create-story", createStory);

export default router;
