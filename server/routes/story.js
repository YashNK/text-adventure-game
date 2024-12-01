import express from "express";
import { getAllStories, getStoryById } from "../controller/story.js";

const router = express.Router();

router.get("/stories", getAllStories);
router.get("/story/:id", getStoryById);

export default router;
