import { useEffect, useRef } from "react";
import { Bot, User } from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  id?: string;
}

interface MainChatProps {
  messages: ChatMessage[];
  userName: string;
  isLoading?: boolean;
  isLoadingSession?: boolean;
}

export default function MainChat({ 
  messages, 
  userName, 
  isLoading = false,
  isLoadingSession = false 
}: MainChatProps) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Format timestamp
  const formatTime = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } catch {
      return '';
    }
  };

  // Loading skeleton for session history
  if (isLoadingSession) {
    return (
      <div className="flex-1 overflow-y-auto px-4 py-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                i % 2 === 0 ? 'self-end ml-auto' : 'self-start'
              }`}>
                <div className="h-4 bg-gray-200 rounded w-48 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-32"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center text-center px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Bot className="w-10 h-10 text-white" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          Hello, {userName}! 👋
        </h1>
        <p className="text-lg text-gray-600 max-w-md mb-8">
          How can I help you today?
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl">
          <div className="p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
            <p className="text-sm text-gray-700">💡 Explain a concept</p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
            <p className="text-sm text-gray-700">🔍 Help me research</p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
            <p className="text-sm text-gray-700">✍️ Write something</p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
            <p className="text-sm text-gray-700">🤔 Brainstorm ideas</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        {messages.map((msg, i) => (
          <div
            key={msg.id || i}
            className={`flex gap-3 animate-fadeIn ${
              msg.role === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {/* Avatar */}
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
              msg.role === "user" 
                ? "bg-blue-600 text-white" 
                : "bg-gradient-to-br from-purple-500 to-blue-600 text-white"
            }`}>
              {msg.role === "user" ? (
                <User className="w-4 h-4" />
              ) : (
                <Bot className="w-4 h-4" />
              )}
            </div>

            {/* Message Content */}
            <div className={`flex flex-col max-w-[70%] ${
              msg.role === "user" ? "items-end" : "items-start"
            }`}>
              <div className={`px-4 py-3 rounded-2xl shadow-sm ${
                msg.role === "user"
                  ? "bg-blue-600 text-white rounded-tr-sm"
                  : "bg-white text-gray-900 border border-gray-200 rounded-tl-sm"
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                  {msg.content}
                </p>
              </div>
              {msg.timestamp && (
                <span className="text-xs text-gray-400 mt-1 px-1">
                  {formatTime(msg.timestamp)}
                </span>
              )}
            </div>
          </div>
        ))}

        {/* AI Typing Indicator */}
        {isLoading && (
          <div className="flex gap-3 animate-fadeIn">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white">
              <Bot className="w-4 h-4" />
            </div>
            <div className="px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm bg-white border border-gray-200">
              <div className="flex gap-1.5 items-center">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
