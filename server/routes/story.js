import express from "express";
import {
  createStory,
  getAllStories,
  getStoryById,
} from "../controller/story.js";

const router = express.Router();

router.get("/stories", getAllStories);
router.get("/:id", getStoryById);
router.post("/create-story", createStory);

export default router;
