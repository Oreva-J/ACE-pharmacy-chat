import { FaClock, FaPhone, FaPills, FaTruck } from "react-icons/fa";


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
        <div className="inline-block p-4 bg-linear-to-br from-blue-500 to-green-500 rounded-full mb-4">
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
                <div className={`bg-linear-to-br ${prompt.color} p-3 rounded-lg group-hover:scale-110 transition-transform`}>
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


export default WelcomeScreen