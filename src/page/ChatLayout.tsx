import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import MainChat from "@/components/MainChatMessage";
import ChatInput from "@/components/MainChatInput";

import {
  createChatSession,
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
  role: "user" | "bot";
  content: string;
  timestamp: string;
}

export default function ChatLayout() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSession, setCurrentSession] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isNewSession, setIsNewSession] = useState<boolean>(true);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    const res = await getChatSessions(1, 20);
    if (res.data?.success) setSessions(res.data.sessions);
  };

  const startNewChat = async () => {
    const res = await createChatSession();
    if (res.data?.success) {
      const id = res.data.session_id;
      setCurrentSession(id);
      setMessages([]);
      setIsNewSession(true);
      return id;
    }
    return null;
  };

  const openSession = async (sessionId: string) => {
    const res = await getSessionMessages(sessionId);
    if (res.data?.success) {
      setCurrentSession(sessionId);
      setMessages(res.data.messages);
      setIsNewSession(false);
    }
  };

  const handleSend = async (text: string) => {
    let sessionId = currentSession;

    if (!sessionId) {
      sessionId = await startNewChat();
      if (!sessionId) return;
    }

    const res = await sendChatMessage({
      message: text,
      session_id: sessionId,
    });

    if (res.data?.success) {
      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          content: text,
          timestamp: new Date().toISOString(),
        },
        {
          role: "bot",
          content: res.data.message,
          timestamp: res.data.timestamp,
        },
      ]);

      if (isNewSession) {
        await loadSessions();
        setIsNewSession(false);
      }
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
      />

      <div className="flex flex-col flex-1 bg-gray-50">

        {/* MAIN MESSAGES */}
        <MainChat messages={messages} userName={userName} />

        {/* INPUT: Center when empty, sticky bottom otherwise */}
        {isEmpty ? (
          <div className="flex justify-center items-center py-10">
            <div className="w-full max-w-3xl px-4">
              <ChatInput onSend={handleSend} isEmpty />
            </div>
          </div>
        ) : (
          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
            <div className="w-full max-w-3xl mx-auto px-4">
              <ChatInput onSend={handleSend} isEmpty={false} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
