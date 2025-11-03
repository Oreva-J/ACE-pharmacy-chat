import { conversationRepository } from "../db/chatRepository.js"
import { llmClient } from "../llm/client.js"

const instructions = "Hello"

const sendMessage = async(prompt: string, conversationId: string)=>{
    const previousResponseId = conversationRepository.getLastResponseId(conversationId)
    const response = await llmClient({prompt, instructions, previousResponseId})
    conversationRepository.setLastResponseId(conversationId, response.id)

    return ({id: response.id, message: response.text});

}

export const chatService ={
    sendMessage
}