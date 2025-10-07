import React, { useRef, useEffect, useState } from "react";
import AppMessage from "./AppMessage";
import InputArea from "./InputArea";

const ChatArea = ({ chat, onSendMessage }) => {
  const messagesEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat?.messages, isTyping]);

  if (!chat) {
    return (
      <div className="flex-1 flex flex-col bg-gray-900">
        <div className="flex-1 flex items-center justify-center text-gray-400">
          Select a conversation or start a new one
        </div>
      </div>
    );
  }

  const isNewChat = chat.messages.length === 0;

  return (
    <div className="flex flex-col h-full">
      {/* Chat messages container (scrollable) */}
      <div
        className={`flex-1 overflow-y-auto px-4 py-3 space-y-2 ${
          isNewChat ? "flex items-center justify-center" : ""
        }`}
      >
        {isNewChat ? (
          <div className="text-gray-400 text-center">
            <h3 className="text-black text-[25px] font-bold">This is Botmate</h3>
            Start the conversation by typing below...
          </div>
        ) : (
          chat.messages.map((message) => (
            <AppMessage key={message.id} message={message} />
          ))
        )}

        {isTyping && (
          <div className="flex justify-start px-4">
            <div className="bg-gray-700 text-gray-100 rounded-bl-none rounded-lg px-4 py-2 animate-pulse">
              AI is typing...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div
        className={`flex-shrink-0 z-10 ${
          isNewChat ? "" : ""
        }`}
      >
        <InputArea
          onSendMessage={(msg) => {
            onSendMessage(msg);
            setIsTyping(true);
            setTimeout(() => setIsTyping(false), 1000);
          }}
        />
      </div>
    </div>
  );
};

export default ChatArea;
