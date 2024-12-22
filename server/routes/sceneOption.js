import express from "express";
import {
  createSceneOption,
  updateSceneOption,
} from "../controller/sceneOption.js";

const router = express.Router();

router.post("/:sceneId", createSceneOption);
router.put("/:sceneOptionId", updateSceneOption);

export default router;
