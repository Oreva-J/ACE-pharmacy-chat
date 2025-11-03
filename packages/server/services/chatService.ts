
import fs from "fs";
import path from "path";
import { conversationRepository } from "../db/chatRepository.js";
import { llmClient } from "../llm/client.js";
import template from '../prompts/chatbot_instructions.txt'

const aceInfo_db = fs.readFileSync(path.join(__dirname, "..", "prompts", "pharmacy_info.md"), "utf-8")
 const instructions = template.replace('{{aceInfo}}', aceInfo_db)

const sendMessage = async(prompt: string, conversationId: string)=>{
    const previousResponseId = conversationRepository.getLastResponseId(conversationId)
    const response = await llmClient({prompt, instructions, previousResponseId})
    conversationRepository.setLastResponseId(conversationId, response.id)

    return ({id: response.id, message: response.text});

}

export const chatService ={
    sendMessage
}