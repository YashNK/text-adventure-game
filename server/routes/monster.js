import express from "express";
import { createMonster, updateMonster } from "../controller/monster.js";

const router = express.Router();

router.post("/", createMonster);
router.put("/:monsterId", updateMonster);

export default router;
