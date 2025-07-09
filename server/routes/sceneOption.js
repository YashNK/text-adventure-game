import express from "express";
import {
  CreateSceneOption,
  UpdateSceneOption,
} from "../controller/sceneOption.js";

const router = express.Router();

router.post("/:sceneId", CreateSceneOption);
router.put("/:sceneOptionId", UpdateSceneOption);

export default router;
