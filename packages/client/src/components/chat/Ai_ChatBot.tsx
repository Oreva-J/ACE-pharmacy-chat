import { useRef, useState } from 'react'
import Ai_BotInput from './Ai_BotInput'
import axios from 'axios'
import ChatMessages, { type Messages } from './ChatMessages'
import TypingIndicator from './TypingIndicator'
import popSound from '@/assets/pop.mp3';
import notificationSound from '@/assets/notification.mp3';
import AnimatedBackground from './AnimatedBackground'
 import ChatHeader from './ChatHeader'
import WelcomeScreen from './WelcomeScreen'



const popAudio = new Audio(popSound);
popAudio.volume = 0.5;

const notificationAudio = new Audio(notificationSound);
notificationAudio.volume = 0.5;

type ChatResponse = {
  message: string
}

  type FormData = {
  prompt: string;
}

// // Types
// type Messages = {
//   content: string;
//   role: "user" | "bot";
//   timestamp: Date;
// }

// export type Messages = {
//   content: string;
//   role: "user" | "bot";
// };



const Ai_Chatbot = () => {
  const [messages, setMessages] = useState<Messages[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [error, setError] = useState<string>("")
  const conversationId = useRef(crypto.randomUUID())
   const [showWelcome, setShowWelcome] = useState(true);
  // const lastMessageRef = useRef<HTMLDivElement>(null);

  const onSubmit = async ({ prompt }: FormData) => {
    try {
    
      setShowWelcome(false);
    setIsBotTyping(true);
    setError("");
    setMessages(prev => [...prev, { content: prompt, role: "user", timestamp: new Date() }])
    popAudio.play();
    const { data } = await axios.post<ChatResponse>("/api/chat", { prompt, conversationId: conversationId.current })
    setMessages(prev => [...prev, { content: data.message, role: "bot", timestamp: new Date() }])
    notificationAudio.play();
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again.")
    }finally {
      setIsBotTyping(false);
    }
  }

  const handleSuggestedPrompt = (prompt: string) => {
    onSubmit({ prompt });
  };

    const clearChat = () => {
    setMessages([]);
    setShowWelcome(true);
    setError("");
    conversationId.current = crypto.randomUUID();
  };

  return (
    <div className='px-5 flex flex-col h-full ' >
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Header */}
        <ChatHeader onClear={clearChat} messageCount={messages.length} />

      {showWelcome? (
        <WelcomeScreen onSelectPrompt={handleSuggestedPrompt} />
      ): <>

      <div className='flex flex-col flex-1 gap-3 px-10 mb-5 overflow-y-auto'>
        <ChatMessages messages={messages} />
        {isBotTyping && <TypingIndicator />}
        {error && <div className='text-red-500 font-bold'>{error}</div>}
      </div>
      <Ai_BotInput onSubmit={onSubmit} />
      </>}
    </div>
  )
}

export default Ai_Chatbot
