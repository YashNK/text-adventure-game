import express from "express";
import { insertGameData } from "../controller/gameData.js";

const router = express.Router();

router.post("/insertGameData", insertGameData);

export default router;
