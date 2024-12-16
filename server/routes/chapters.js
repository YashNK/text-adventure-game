import express from "express";
import authenticateToken from "../middleware/auth.js";
import { createChapter, getChapters } from "../controller/chapters.js";

const router = express.Router();

router.get("/story/:storyId", authenticateToken, getChapters);
// router.get("/chapter/:chapterId", authenticateToken, getChaptersById);
router.post("/:storyId", createChapter);

export default router;
