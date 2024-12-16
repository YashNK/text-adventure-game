import express from "express";
import { createScene } from "../controller/scene.js";

const router = express.Router();

router.post("/:levelId", createScene);

export default router;
