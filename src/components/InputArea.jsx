import React, { useState, useRef, useEffect } from "react";
import { Plus, Send, SendHorizonal } from "lucide-react";

const InputArea = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSendMessage(message.trim());
    setMessage("");
  };

  const handleKeyPress = (e)=>{
    if (e.key === 'Enter' && !e.shiftKey) {
       e.preventDefault();
      handleSubmit(e);
    }

  }

  return (
    <form
  onSubmit={handleSubmit}
  className="flex items-center gap-2 p-4 sm:px-6 bg-white shadow-md rounded-lg relative"
>
  {/* Plus Icon */}
  <button
    type="button"
    className="absolute left-10 text-gray-400 hover:text-gray-600" aria-label="Attach file"
  >
    <Plus className="h-5 w-5" />
  </button>

  {/* Message Input */}
  <textarea
    ref={textareaRef}
    value={message}
    onChange={(e) => setMessage(e.target.value)}
   onKeyDown={handleKeyPress}
    placeholder="Type a message..."
    className="flex-1 resize-none rounded-xl border border-gray-200 px-14 py-3 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm overflow-y-auto no-scrollbar max-h-40"
    rows={1} // default height
  />

  {/* Send Button */}
  <button
    type="submit"
    className="flex items-center justify-center p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md absolute right-8" aria-label="Send message"
  >
    <SendHorizonal size={20} />
  </button>
</form>

  );
};

export default InputArea;
