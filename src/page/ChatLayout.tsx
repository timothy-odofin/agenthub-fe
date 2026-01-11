import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import MainChat from "@/components/MainChatMessage";
import ChatInput from "@/components/MainChatInput";

import {
  getChatSessions,
  sendChatMessage,
  getSessionMessages,
} from "../api/conversationalAuth";

interface ChatSession {
  id: string;
  title?: string;
  created_at?: string;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  id?: string;
}

export default function ChatLayout() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSession, setCurrentSession] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isNewSession, setIsNewSession] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingSession, setIsLoadingSession] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      const res = await getChatSessions(0, 20); // Page is 0-based
      if (res.data?.success) {
        setSessions(res.data.sessions);
      }
    } catch (err) {
      console.error("Failed to load sessions:", err);
    }
  };

  const startNewChat = () => {
    // Reset to empty state - session will be created on first message
    setCurrentSession(null);
    setMessages([]);
    setIsNewSession(true);
    setError(null);
  };

  const openSession = async (sessionId: string) => {
    try {
      setIsLoadingSession(true);
      setError(null);
      const res = await getSessionMessages(sessionId);
      
      if (res.data?.success) {
        setCurrentSession(sessionId);
        setMessages(res.data.messages || []);
        setIsNewSession(false);
      } else {
        setError("Failed to load session messages");
      }
    } catch (err) {
      console.error("Failed to load session:", err);
      setError("Failed to load conversation. Please try again.");
    } finally {
      setIsLoadingSession(false);
    }
  };

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    try {
      setIsLoading(true);
      setError(null);

      // Add user message immediately for better UX
      const userMessage: ChatMessage = {
        role: "user",
        content: text,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMessage]);

      // Send message with current session_id (null for first message)
      const res = await sendChatMessage({
        message: text,
        session_id: currentSession,
      });

      if (res.data?.success) {
        // Capture session_id from response (important for first message)
        if (!currentSession && res.data.session_id) {
          setCurrentSession(res.data.session_id);
        }

        // Add AI response
        const aiMessage: ChatMessage = {
          role: "assistant",
          content: res.data.message,
          timestamp: res.data.timestamp,
        };
        setMessages((prev) => [...prev, aiMessage]);

        // Refresh session list if this was a new session
        if (isNewSession) {
          await loadSessions();
          setIsNewSession(false);
        }
      } else {
        // Handle API error response
        const errorMsg = res.data?.errors?.join(", ") || "Failed to send message";
        setError(errorMsg);
        // Remove the optimistically added user message
        setMessages((prev) => prev.slice(0, -1));
      }
    } catch (err: any) {
      console.error("Failed to send message:", err);
      setError(err.response?.data?.detail || "Failed to send message. Please try again.");
      // Remove the optimistically added user message
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = user?.name || "there";

  const isEmpty = messages.length === 0;

  return (
    <div className="flex h-screen">
      <Sidebar
        sessions={sessions}
        currentSession={currentSession}
        onNewChat={startNewChat}
        onSelectSession={openSession}
        isLoading={isLoadingSession}
      />

      <div className="flex flex-col flex-1 bg-gray-50">
        {/* Error Banner */}
        {error && (
          <div className="bg-red-50 border-b border-red-200 px-4 py-3 text-red-800 text-sm">
            <div className="max-w-3xl mx-auto flex items-center justify-between">
              <span>{error}</span>
              <button
                onClick={() => setError(null)}
                className="text-red-600 hover:text-red-800 font-semibold"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* MAIN MESSAGES */}
        <MainChat 
          messages={messages} 
          userName={userName} 
          isLoading={isLoading} 
          isLoadingSession={isLoadingSession}
        />

        {/* INPUT: Center when empty, sticky bottom otherwise */}
        {isEmpty ? (
          <div className="flex justify-center items-center py-10">
            <div className="w-full max-w-3xl px-4">
              <ChatInput onSend={handleSend} isEmpty isLoading={isLoading} />
            </div>
          </div>
        ) : (
          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
            <div className="w-full max-w-3xl mx-auto px-4">
              <ChatInput onSend={handleSend} isEmpty={false} isLoading={isLoading} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
