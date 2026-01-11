import { Plus, SendHorizonal } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const DUMMY_REPLIES = [
  "That's an interesting question 🤔",
  "Let me think about that for a second...",
  "Here’s a simple explanation:",
  "Sure! I can help you with that.",
];

const MainChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const textareaRef = useRef(null);
  const MAX_HEIGHT = 160;

  const handleInput = (e) => {
    setInput(e.target.value);

    const textarea = textareaRef.current;
    textarea.style.height = "auto";

    textarea.style.height = Math.min(textarea.scrollHeight, MAX_HEIGHT) + "px";
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    textareaRef.current.style.height = "auto";

    // Simulate bot reply
    setTimeout(() => {
      const botMessage = {
        id: crypto.randomUUID(),
        role: "bot",
        content:
          DUMMY_REPLIES[Math.floor(Math.random() * DUMMY_REPLIES.length)],
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 800);
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col bg-gray-50 h-screen relative">

      {/* Scrollable Messages Area */}
      <div
      className={`flex-1 px-4 py-6 ${
    messages.length === 0 ? "overflow-hidden" : "overflow-y-auto"
  }`}
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center  mx-auto mt-20 ">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              How can I help you today?
            </h1>
            <p className="text-base md:text-lg text-gray-600">
              I'm your AI assistant. Ask me anything about code, writing, or
              learning concepts.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 max-w-3xl mx-auto w-full pt-13">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-[70%] px-4 py-3 rounded-2xl shadow-sm ${
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
        )}
      </div>

      {/* Fixed Input at Bottom */}
      <div
        className={`absolute left-0 right-0 transition-all duration-300 ${
          messages.length === 0 ? "top-1/2 -translate-y-1/2" : "bottom-4"
        }`}
      >
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex flex-col gap-3 border border-gray-200 rounded-xl p-3 bg-white shadow-sm">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInput}
              placeholder="Type a message..."
              rows={1}
              className="
          w-full resize-none
          border-none outline-none
          rounded-xl px-2 py-2
          overflow-y-auto
          transition-[height] duration-150
          max-h-[160px]
        "
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />

            <div className="flex justify-between items-center">
              <button className="bg-gray-200 text-gray-700 rounded-full p-3 hover:bg-gray-300 transition">
                <Plus size={15} />
              </button>

              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className="bg-blue-600 text-white rounded-full p-3 hover:bg-blue-700 disabled:bg-gray-400 transition"
              >
                <SendHorizonal size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainChat;
