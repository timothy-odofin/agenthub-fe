import { Plus, SendHorizonal } from "lucide-react";
import React, { useRef, useState } from "react";

interface ChatInputProps {
  onSend: (msg: string) => void;
  isEmpty: boolean;
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const MAX_HEIGHT = 160;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, MAX_HEIGHT) + "px";
    }
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    onSend(input.trim());
    setInput("");

    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  return (
    <div className="flex flex-col gap-3 border border-gray-200 rounded-xl p-3 shadow-sm bg-white">
      
      <textarea
        ref={textareaRef}
        value={input}
        onChange={handleChange}
        placeholder="Type a message..."
        rows={1}
        className="w-full resize-none border-none outline-none px-2 py-2 rounded-lg overflow-y-auto max-h-[160px]"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
          }
        }}
      />

      <div className="flex justify-between items-center">
        <button
          type="button"
          className="bg-gray-200 text-gray-600 rounded-full p-3 hover:bg-gray-300 transition"
        >
          <Plus size={16} />
        </button>

        <button
          onClick={sendMessage}
          disabled={!input.trim()}
          className="bg-blue-600 text-white rounded-full p-3 hover:bg-blue-700 disabled:bg-gray-400 transition"
        >
          <SendHorizonal size={16} />
        </button>
      </div>
    </div>
  );
}
