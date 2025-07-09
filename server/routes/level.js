import express from "express";
import {
  CreateLevel,
  GetLevelsByChapterId,
  UpdateLevel,
} from "../controller/level.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();

router.get("/:chapterId", authenticateToken, GetLevelsByChapterId);
router.post("/:chapterId", CreateLevel);
router.put("/:levelId", UpdateLevel);

export default router;
