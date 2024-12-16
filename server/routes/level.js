import express from "express";
import { createLevel, getLevelsByChapterId } from "../controller/level.js";

const router = express.Router();

router.post("/", createLevel);
router.get("/:chapterId", getLevelsByChapterId);

export default router;
