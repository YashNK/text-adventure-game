import express from "express";
import { createScene, updateScene } from "../controller/scene.js";

const router = express.Router();

router.post("/:levelId", createScene);
router.put("/:sceneId", updateScene);

export default router;
