import { useRef, useState } from 'react'
import Ai_BotInput from './Ai_BotInput'
import axios from 'axios'
import ChatMessages, { type Messages } from './ChatMessages'
import TypingIndicator from './TypingIndicator'

type ChatResponse = {
  message: string
}

  type FormData = {
  prompt: string;
}


const Chatbot = () => {
  const [messages, setMessages] = useState<Messages[]>([]);
  const [IsBotTyping, setIsBotTyping] = useState(false);
  const [error, setError] = useState<string>("")
  const conversationId = useRef(crypto.randomUUID())

  const onSubmit = async ({ prompt }: FormData) => {
    try {
    
    setIsBotTyping(true);
    setError("");
    setMessages(prev => [...prev, { content: prompt, role: "user" }])
    // popAudio.play();
    const { data } = await axios.post<ChatResponse>("/api/chat", { prompt, conversationId: conversationId.current })
    setMessages(prev => [...prev, { content: data.message, role: "bot" }])
    // notificationAudio.play();
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again.")
    }finally {
      setIsBotTyping(false);
    }
  }
  return (
    <div className='p-5 flex flex-col h-full' >
      <div className='flex flex-col flex-1 gap-3 px-10 mb-5 overflow-y-auto'>
        <ChatMessages messages={messages} />
        {IsBotTyping && <TypingIndicator />}
        {error && <div className='text-red-500 font-bold'>{error}</div>}
      </div>
      <Ai_BotInput onSubmit={onSubmit} />
    </div>
  )
}

export default Chatbot
