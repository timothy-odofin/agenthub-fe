import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import MainChat from "@/components/MainChatMessage";
import ChatInput from "@/components/MainChatInput";
import ChatTopbar from "@/components/ChatTopbar";
import EnhancedShareModal from "@/components/EnhancedShareModal";
import AddPeopleModal from "@/components/AddPeopleModal";

import {
  getChatSessions,
  sendChatMessage,
  getSessionMessages,
  updateSessionTitle,
} from "../api/conversationalAuth";

interface ChatSession {
  session_id: string;
  title?: string;
  created_at?: string;
  last_message_at?: string;
  message_count?: number;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  id?: string;
}

export default function ChatLayout() {
  const { sessionId: urlSessionId } = useParams<{ sessionId?: string }>();
  const navigate = useNavigate();
  
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSession, setCurrentSession] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isNewSession, setIsNewSession] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingSession, setIsLoadingSession] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Modal states
  const [shareModalOpen, setShareModalOpen] = useState<boolean>(false);
  const [addPeopleModalOpen, setAddPeopleModalOpen] = useState<boolean>(false);
  const [shareSessionId, setShareSessionId] = useState<string>("");
  const [shareSessionTitle, setShareSessionTitle] = useState<string>("");
  
  // Topbar state
  const [selectedModel, setSelectedModel] = useState<string>("gpt-4-turbo");
  const [isPinned, setIsPinned] = useState<boolean>(false);

  useEffect(() => {
    loadSessions();
  }, []);

  // Load session from URL parameter if present
  useEffect(() => {
    if (urlSessionId && urlSessionId !== currentSession) {
      openSession(urlSessionId);
    }
  }, [urlSessionId]);

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
    
    // Navigate to base dashboard URL (remove session ID from URL)
    navigate('/main-dashboard');
  };

  const openSession = async (sessionId: string) => {
    try {
      setIsLoadingSession(true);
      setError(null);
      
      // Update URL with session ID
      if (sessionId !== urlSessionId) {
        navigate(`/main-dashboard/${sessionId}`, { replace: true });
      }
      
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

  const handleRenameSession = async (sessionId: string, newTitle: string) => {
    try {
      const res = await updateSessionTitle(sessionId, newTitle);
      
      if (res.data?.success) {
        // Update session in local state
        setSessions((prev) =>
          prev.map((s) =>
            s.session_id === sessionId ? { ...s, title: newTitle } : s
          )
        );
      } else {
        setError("Failed to rename session");
      }
    } catch (err) {
      console.error("Failed to rename session:", err);
      setError("Failed to rename conversation. Please try again.");
    }
  };

  const handleShareSession = (sessionId: string) => {
    const session = sessions.find((s) => s.session_id === sessionId);
    if (session) {
      setShareSessionId(sessionId);
      setShareSessionTitle(session.title || "Untitled Chat");
      setShareModalOpen(true);
    }
  };

  // Topbar handlers
  const handleTopbarShare = () => {
    if (currentSession) {
      const session = sessions.find((s) => s.session_id === currentSession);
      if (session) {
        setShareSessionId(currentSession);
        setShareSessionTitle(session.title || "Untitled Chat");
        setShareModalOpen(true);
      }
    }
  };

  const handleAddPeople = () => {
    if (currentSession) {
      const session = sessions.find((s) => s.session_id === currentSession);
      if (session) {
        setShareSessionId(currentSession);
        setShareSessionTitle(session.title || "Untitled Chat");
        setAddPeopleModalOpen(true);
      }
    }
  };

  const handleDelete = () => {
    if (currentSession && confirm("Are you sure you want to delete this conversation?")) {
      // Future: API call to delete session
      console.log("Deleting session:", currentSession);
      setError("Delete functionality pending backend API");
    }
  };

  const handleArchive = () => {
    if (currentSession) {
      // Future: API call to archive session
      console.log("Archiving session:", currentSession);
      setError("Archive functionality pending backend API");
    }
  };

  const handlePin = () => {
    setIsPinned(!isPinned);
    // Future: API call to pin/unpin session
    console.log("Pin toggled:", !isPinned);
  };

  const handleModelChange = (modelId: string) => {
    setSelectedModel(modelId);
    // Future: API call to update model preference
    console.log("Model changed to:", modelId);
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
          const newSessionId = res.data.session_id;
          setCurrentSession(newSessionId);
          
          // Update URL with new session ID
          navigate(`/main-dashboard/${newSessionId}`, { replace: true });
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
        onRenameSession={handleRenameSession}
        onShareSession={handleShareSession}
        isLoading={isLoadingSession}
      />

      {/* Modals */}
      <EnhancedShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        sessionId={shareSessionId}
        sessionTitle={shareSessionTitle}
      />

      <AddPeopleModal
        isOpen={addPeopleModalOpen}
        onClose={() => setAddPeopleModalOpen(false)}
        sessionId={shareSessionId}
        sessionTitle={shareSessionTitle}
      />

      <div className="flex flex-col flex-1 bg-gray-50">
        {/* Topbar - Only show when session is active */}
        {currentSession && (
          <ChatTopbar
            sessionTitle={
              sessions.find((s) => s.session_id === currentSession)?.title || "Untitled Chat"
            }
            selectedModel={selectedModel}
            onModelChange={handleModelChange}
            onShare={handleTopbarShare}
            onAddPeople={handleAddPeople}
            onDelete={handleDelete}
            onArchive={handleArchive}
            onPin={handlePin}
            isPinned={isPinned}
          />
        )}

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
