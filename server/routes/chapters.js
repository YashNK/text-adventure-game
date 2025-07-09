import express from "express";
import authenticateToken from "../middleware/auth.js";
import {
  CreateChapter,
  GetChapters,
  UpdateChapter,
} from "../controller/chapters.js";

const router = express.Router();

router.get("/story/:storyId", authenticateToken, GetChapters);
router.post("/:storyId", CreateChapter);
router.put("/:chapterId", UpdateChapter);

export default router;
