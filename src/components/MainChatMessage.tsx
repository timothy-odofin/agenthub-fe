import { useEffect, useRef } from "react";

interface ChatMessage {
  role: "user" | "bot";
  content: string;
  timestamp: string;
}

interface MainChatProps {
  messages: ChatMessage[];
  userName: string;
}

export default function MainChat({ messages, userName }: MainChatProps) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Hello {userName} 👋
        </h1>
        <p className="text-lg text-gray-600 max-w-md">
          How can I help you today?
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6">
      <div className="max-w-3xl mx-auto flex flex-col gap-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-sm ${
              msg.role === "user"
                ? "bg-blue-600 text-white self-end"
                : "bg-white text-gray-900 self-start border border-gray-200"
            }`}
          >
            {msg.content}
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
