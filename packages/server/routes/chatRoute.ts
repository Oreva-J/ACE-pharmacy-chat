import { Router, type Request, type Response } from "express";
import { control } from "../controllers/chatController.js";

const {chatControl} = control
const router = Router()

router.post('/api/test', chatControl)

export default router