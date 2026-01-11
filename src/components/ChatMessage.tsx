import { Bot } from "lucide-react";

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isBot,
  timestamp
}) => {
  return (
    <div
      className={`flex w-full mb-6 ${
        isBot ? "justify-start" : "justify-end"
      }`}
    >
      <div className={`flex flex-col ${isBot ? "items-start" : "items-end"} max-w-[80%]`}>

        {/* Sender Label */}
        <div className="flex items-center gap-2 mb-1 px-1">
          {isBot ? (
            <>
              <Bot className="w-4 h-4 text-white/40" />
              <span className="text-white/40 text-[11px] font-semibold uppercase tracking-widest">
                AgentHub
              </span>
            </>
          ) : (
            <span className="text-white/40 text-[11px] font-semibold uppercase tracking-widest">
              You
            </span>
          )}
        </div>

        {/* Message Bubble */}
        <div
          className={`
            px-4 py-3 rounded-2xl shadow-sm 
            whitespace-pre-wrap leading-relaxed max-w-xl
            ${
              isBot
                ? "bg-[#2A2A2A] text-white/90 rounded-bl-none"
                : "bg-blue-600 text-white rounded-br-none"
            }
          `}
        >
          {message}
        </div>

        {/* Timestamp */}
        <div className="text-white/30 text-[10px] mt-1 px-1">
          {timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
