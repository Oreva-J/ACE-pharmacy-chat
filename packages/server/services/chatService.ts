import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { conversationRepository } from "../db/chatRepository.js";
import { llmClient } from "../llm/client.js";
import template from '../prompts/chatbot_instructions.txt'

// Fix for ES modules and Vercel
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load files at module initialization (not at request time)
let aceInfo_db: string = "";
let instructions: string ="";

try {
  // Try multiple paths for local dev and Vercel deployment
  const possiblePaths = [
    path.join(__dirname, "..", "prompts", "pharmacy_info.md"),
    path.join(process.cwd(), "packages", "server", "prompts", "pharmacy_info.md"),
    path.join(process.cwd(), "prompts", "pharmacy_info.md"),
  ];

  let loaded = false;
  for (const filePath of possiblePaths) {
    try {
      aceInfo_db = fs.readFileSync(filePath, "utf-8");
      console.log("✅ Loaded pharmacy_info.md from:", filePath);
      loaded = true;
      break;
    } catch (err) {
      // Try next path
      continue;
    }
  }

  if (!loaded || !aceInfo_db) {
    throw new Error("Could not find pharmacy_info.md in any expected location");
  }

  instructions = template.replace('{{aceInfo}}', aceInfo_db);
  console.log("✅ Instructions template loaded successfully");
  
} catch (error) {
  console.error("❌ CRITICAL: Failed to load pharmacy info or instructions:", error);
  throw error;
}

const sendMessage = async(prompt: string, conversationId: string) => {
    const previousResponseId = conversationRepository.getLastResponseId(conversationId);
    const response = await llmClient({prompt, instructions, previousResponseId});
    conversationRepository.setLastResponseId(conversationId, response.id);

    return ({id: response.id, message: response.text});
}

export const chatService = {
    sendMessage
}






// import fs from "fs";
// import path from "path";
// import { conversationRepository } from "../db/chatRepository.js";
// import { llmClient } from "../llm/client.js";
// import template from '../prompts/chatbot_instructions.txt'

// const aceInfo_db = fs.readFileSync(path.join(__dirname, "..", "prompts", "pharmacy_info.md"), "utf-8")
//  const instructions = template.replace('{{aceInfo}}', aceInfo_db)

// const sendMessage = async(prompt: string, conversationId: string)=>{
//     const previousResponseId = conversationRepository.getLastResponseId(conversationId)
//     const response = await llmClient({prompt, instructions, previousResponseId})
//     conversationRepository.setLastResponseId(conversationId, response.id)

//     return ({id: response.id, message: response.text});

// }

// export const chatService ={
//     sendMessage
// }