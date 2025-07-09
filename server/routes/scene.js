import express from "express";
import { CreateScene, UpdateScene } from "../controller/scene.js";

const router = express.Router();

router.post("/:levelId", CreateScene);
router.put("/:sceneId", UpdateScene);

export default router;
