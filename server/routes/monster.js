import express from "express";
import { CreateMonster, UpdateMonster } from "../controller/monster.js";

const router = express.Router();

router.post("/", CreateMonster);
router.put("/:monsterId", UpdateMonster);

export default router;
