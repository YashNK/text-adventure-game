import express from "express";
import { createMonster } from "../controller/monster.js";

const router = express.Router();

router.post("/", createMonster);

export default router;
