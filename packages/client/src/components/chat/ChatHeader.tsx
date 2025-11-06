import { FaPills } from "react-icons/fa";



// Chat Header Component
const ChatHeader = ({ onClear, messageCount }: { onClear: () => void; messageCount: number }) => {
  return (
    <div className="bg-white/90 backdrop-blur-md shadow-lg rounded-2xl p-4 mb-4 border border-blue-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-linear-to-br from-blue-500 to-green-500 p-3 rounded-xl">
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

export default ChatHeader;