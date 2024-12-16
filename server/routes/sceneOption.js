import express from "express";
import { createSceneOption } from "../controller/sceneOption.js";

const router = express.Router();

router.post("/:sceneId", createSceneOption);

export default router;
