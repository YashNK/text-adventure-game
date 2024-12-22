import express from "express";
import {
  createLevel,
  getLevelsByChapterId,
  updateLevel,
} from "../controller/level.js";

const router = express.Router();

router.post("/:chapterId", createLevel);
router.get("/:chapterId", getLevelsByChapterId);
router.put("/:levelId", updateLevel);

export default router;
