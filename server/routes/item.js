import express from "express";
import authenticateToken from "../middleware/auth.js";
import { CreateItem, UpdateItem } from "../controller/item.js";

const router = express.Router();

router.post("/", CreateItem);
router.put("/:itemId", UpdateItem);

export default router;
