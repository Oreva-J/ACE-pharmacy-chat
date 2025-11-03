import { Request, Response } from "express"
import z from "zod";
import { chatService } from "../services/chatService.js";


// implementation details
const chatSchema = z.object({
    prompt: z.string()
    .trim()
    .min(1, "Prompt is required")
    .max(1000, "Prompt is too long"),
    conversationId: z.uuid(),
});

const chatControl = async (req: Request, res: Response) => {
    try {
                console.log(req.body)
                // validate request body
                const parseResult = chatSchema.safeParse(req.body);
                if (!parseResult.success) {
                    return res.status(400).json(parseResult.error.format());
                }
                const { prompt, conversationId } = req.body;
                const response = await chatService?.sendMessage(prompt, conversationId);
                res.json({ message: response.message });
            } catch (error) {
                res.status(500).json({ error: "input a valid prompt" });
                console.error("Error:", error);
                
            }
    
}

export const control = {
    chatControl
}