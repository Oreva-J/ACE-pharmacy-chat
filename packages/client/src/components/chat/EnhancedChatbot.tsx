import { useRef, useState, useEffect } from 'react';
import { FaArrowUp, FaPills, FaClock, FaTruck, FaPhone, FaTimesCircle } from 'react-icons/fa';
import { MdHealthAndSafety } from 'react-icons/md';

// Types
type Message = {
  content: string;
  role: "user" | "bot";
  timestamp: Date;
}

type ChatFormData = {
  prompt: string;
}

// Mock API call - replace with your actual axios call
const sendMessageToAPI = async (prompt: string, conversationId: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  return {
    message: `Thank you for asking about "${prompt}". This is a demo response. In production, this would connect to your backend at /api/chat.`
  };
};

const EnhancedPharmacyChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [error, setError] = useState<string>("");
  const [showWelcome, setShowWelcome] = useState(true);
  const conversationId = useRef(crypto.randomUUID());
  const lastMessageRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onSubmit = async (data: ChatFormData) => {
    if (!data.prompt.trim()) return;

    try {
      setShowWelcome(false);
      setIsBotTyping(true);
      setError("");
      
      // Add user message
      const userMessage: Message = {
        content: data.prompt,
        role: "user",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);

      // Call API
      const response = await sendMessageToAPI(data.prompt, conversationId.current);
      
      // Add bot response
      const botMessage: Message = {
        content: response.message,
        role: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsBotTyping(false);
    }
  };

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
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Main Chat Container */}
      <div className="relative z-10 h-full flex flex-col max-w-4xl mx-auto p-4">
        {/* Header */}
        <ChatHeader onClear={clearChat} messageCount={messages.length} />
        
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto mb-4 px-4 py-6 space-y-4">
          {showWelcome ? (
            <WelcomeScreen onSelectPrompt={handleSuggestedPrompt} />
          ) : (
            <>
              {messages.map((message, index) => (
                <ChatMessage
                  key={index}
                  message={message}
                  ref={index === messages.length - 1 ? lastMessageRef : null}
                />
              ))}
              {isBotTyping && <TypingIndicator />}
              {error && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                  <FaTimesCircle />
                  <span className="font-medium">{error}</span>
                </div>
              )}
            </>
          )}
        </div>
        
        {/* Input Area */}
        <ChatInput onSubmit={onSubmit} disabled={isBotTyping} />
      </div>
    </div>
  );
};

// Animated Pharmacy Background Component
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      {/* Floating Pills */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${15 + Math.random() * 10}s`
          }}
        >
          <FaPills 
            className="text-blue-300"
            size={20 + Math.random() * 30}
            style={{ 
              transform: `rotate(${Math.random() * 360}deg)`,
              opacity: 0.3 + Math.random() * 0.4
            }}
          />
        </div>
      ))}
      
      {/* Floating Medical Crosses */}
      {[...Array(10)].map((_, i) => (
        <div
          key={`cross-${i}`}
          className="absolute animate-float-slow"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${20 + Math.random() * 15}s`
          }}
        >
          <MdHealthAndSafety 
            className="text-green-300"
            size={25 + Math.random() * 35}
            style={{ opacity: 0.2 + Math.random() * 0.3 }}
          />
        </div>
      ))}
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
    </div>
  );
};

// Chat Header Component
const ChatHeader = ({ onClear, messageCount }: { onClear: () => void; messageCount: number }) => {
  return (
    <div className="bg-white/90 backdrop-blur-md shadow-lg rounded-2xl p-4 mb-4 border border-blue-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-500 to-green-500 p-3 rounded-xl">
            <FaPills className="text-white text-2xl" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">ACE Pharmacy Assistant</h1>
            <p className="text-sm text-gray-600">Your trusted health partner</p>
          </div>
        </div>
        {messageCount > 0 && (
          <button
            onClick={onClear}
            className="px-4 py-2 text-sm bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors font-medium"
          >
            Clear Chat
          </button>
        )}
      </div>
    </div>
  );
};

// Welcome Screen Component
const WelcomeScreen = ({ onSelectPrompt }: { onSelectPrompt: (prompt: string) => void }) => {
  const suggestedPrompts = [
    { icon: FaClock, text: "What are your operating hours?", color: "from-blue-500 to-blue-600" },
    { icon: FaTruck, text: "How does prescription delivery work?", color: "from-green-500 to-green-600" },
    { icon: FaPills, text: "Tell me about your OTC products", color: "from-purple-500 to-purple-600" },
    { icon: FaPhone, text: "How can I contact a pharmacist?", color: "from-orange-500 to-orange-600" },
  ];

  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-12">
      {/* Welcome Message */}
      <div className="text-center space-y-4 max-w-2xl">
        <div className="inline-block p-4 bg-gradient-to-br from-blue-500 to-green-500 rounded-full mb-4">
          <FaPills className="text-white text-5xl" />
        </div>
        <h2 className="text-4xl font-bold text-gray-800">Welcome to ACE Pharmacy</h2>
        <p className="text-lg text-gray-600">
          I'm here to help you with prescriptions, medications, health advice, and all our pharmacy services.
        </p>
        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Available 24/7
        </div>
      </div>

      {/* Suggested Prompts */}
      <div className="w-full max-w-2xl">
        <p className="text-center text-gray-600 mb-4 font-medium">Quick questions to get started:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {suggestedPrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => onSelectPrompt(prompt.text)}
              className="group bg-white/80 backdrop-blur-sm hover:bg-white border-2 border-gray-200 hover:border-blue-300 rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                <div className={`bg-gradient-to-br ${prompt.color} p-3 rounded-lg group-hover:scale-110 transition-transform`}>
                  <prompt.icon className="text-white text-lg" />
                </div>
                <span className="text-left text-gray-700 font-medium group-hover:text-gray-900">
                  {prompt.text}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-3 gap-4 text-center text-sm text-gray-600 max-w-xl">
        <div>
          <div className="font-semibold text-gray-800">Safe & Secure</div>
          <div>HIPAA Compliant</div>
        </div>
        <div>
          <div className="font-semibold text-gray-800">Fast Response</div>
          <div>Instant Answers</div>
        </div>
        <div>
          <div className="font-semibold text-gray-800">Expert Help</div>
          <div>24/7 Support</div>
        </div>
      </div>
    </div>
  );
};

// Chat Message Component
const ChatMessage = ({ message, ref }: { message: Message; ref?: React.Ref<HTMLDivElement> }) => {
  const isUser = message.role === "user";
  const time = message.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <div
      ref={ref}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fadeIn`}
    >
      <div className={`flex gap-3 max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        {!isUser && (
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
            <FaPills className="text-white text-sm" />
          </div>
        )}
        
        {/* Message Content */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div
            className={`px-4 py-3 rounded-2xl ${
              isUser
                ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
                : 'bg-white/90 backdrop-blur-sm text-gray-800 shadow-md border border-gray-100'
            }`}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
          </div>
          <span className="text-xs text-gray-500 mt-1 px-2">{time}</span>
        </div>
      </div>
    </div>
  );
};

// Typing Indicator Component
const TypingIndicator = () => {
  return (
    <div className="flex justify-start animate-fadeIn">
      <div className="flex gap-3 items-end">
        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
          <FaPills className="text-white text-sm" />
        </div>
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-md border border-gray-100">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Chat Input Component
const ChatInput = ({ onSubmit, disabled }: { onSubmit: (data: ChatFormData) => void; disabled: boolean }) => {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !disabled) {
      onSubmit({ prompt });
      setPrompt("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl border-2 border-gray-200 focus-within:border-blue-400 transition-colors">
      <div className="flex items-end gap-2 p-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="Ask me anything about medications, prescriptions, or pharmacy services..."
          className="flex-1 resize-none outline-none bg-transparent text-gray-800 placeholder-gray-400 max-h-32 min-h-[60px]"
          rows={2}
          maxLength={500}
        />
        <button
          type="submit"
          disabled={!prompt.trim() || disabled}
          className="flex-shrink-0 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-xl p-3 transition-all duration-300 disabled:cursor-not-allowed hover:shadow-lg disabled:hover:shadow-none"
        >
          <FaArrowUp className="text-lg" />
        </button>
      </div>
      <div className="px-4 pb-3 flex items-center justify-between text-xs text-gray-500">
        <span>Press Enter to send, Shift+Enter for new line</span>
        <span>{prompt.length}/500</span>
      </div>
    </form>
  );
};

export default EnhancedPharmacyChatbot;

// // Add these animations to your global CSS or Tailwind config
// const style = document.createElement('style');
// style.textContent = `
//   @keyframes float {
//     0%, 100% { transform: translateY(0px) rotate(0deg); }
//     50% { transform: translateY(-20px) rotate(10deg); }
//   }
  
//   @keyframes float-slow {
//     0%, 100% { transform: translateY(0px) rotate(0deg); }
//     50% { transform: translateY(-30px) rotate(-10deg); }
//   }
  
//   @keyframes blob {
//     0%, 100% { transform: translate(0px, 0px) scale(1); }
//     33% { transform: translate(30px, -50px) scale(1.1); }
//     66% { transform: translate(-20px, 20px) scale(0.9); }
//   }
  
//   @keyframes fadeIn {
//     from { opacity: 0; transform: translateY(10px); }
//     to { opacity: 1; transform: translateY(0); }
//   }
  
//   .animate-float {
//     animation: float 15s ease-in-out infinite;
//   }
  
//   .animate-float-slow {
//     animation: float-slow 20s ease-in-out infinite;
//   }
  
//   .animate-blob {
//     animation: blob 20s ease-in-out infinite;
//   }
  
//   .animation-delay-2000 {
//     animation-delay: 2s;
//   }
  
//   .animation-delay-4000 {
//     animation-delay: 4s;
//   }
  
//   .animate-fadeIn {
//     animation: fadeIn 0.3s ease-out;
//   }
// `;
// document.head.appendChild(style);