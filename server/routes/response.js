import express from "express";
import { CreateResponse, UpdateResponse } from "../controller/response.js";

const router = express.Router();

router.post("/", CreateResponse);
router.put("/:responseId", UpdateResponse);

export default router;
