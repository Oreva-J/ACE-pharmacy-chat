import { Router, type Request, type Response } from "express";
import { control } from "../controllers/chatController.js";

const {chatControl} = control
const router = Router()

router.post('/api/chat', chatControl)

export default router