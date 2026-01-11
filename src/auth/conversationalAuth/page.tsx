import { useState, useRef, useEffect } from "react";
import type { SignupState, Message } from "../../model";
import {
  conversationalAuth,
  startConversationAuth,
} from "../../api/conversationalAuth";

import ChatMessage from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { SignupProgress } from "@/components/SignupProgress";

const ConversationalAuth = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [state, setState] = useState<SignupState>({
    sessionId: null,
    currentStep: null,
    progress: 0,
    fieldsRemaining: 5,
    isComplete: false,
    accessToken: null,
  });

  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  /* Auto-scroll */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addBotMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      { text, isBot: true, timestamp: new Date() },
    ]);
  };

  const addUserMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      { text, isBot: false, timestamp: new Date() },
    ]);
  };

  const handleSignupComplete = (accessToken: string, refreshToken: string) => {
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);

    setTimeout(() => {
      window.location.href = "/landing";
    }, 2000);
  };

  /* Start conversation (ONCE) */
  useEffect(() => {
    const startConversation = async () => {
      setIsBootstrapping(true);
      try {
        const response = await startConversationAuth();
        const data = response.data;

        addBotMessage(data.message);

        setState({
          sessionId: data.session_id,
          currentStep: data.next_step,
          progress: data.progress_percentage,
          fieldsRemaining: data.fields_remaining,
          isComplete: false,
          accessToken: null,
        });
      } catch (err) {
        setError("Failed to start conversation. Please refresh the page.");
        console.error("Start conversation error:", err);
      } finally {
        setIsBootstrapping(false);
      }
    };

    startConversation();
  }, []);

  const handleSubmit = async (message: string) => {
    if (!state.sessionId || state.isComplete || isSending) return;

    addUserMessage(message);
    setIsSending(true);
    setError(null);

    try {
      const response = await conversationalAuth({
        message,
        session_id: state.sessionId,
        current_step: state.currentStep,
      });

      const data = response.data;
      addBotMessage(data.message);

      setState({
        sessionId: data.session_id,
        currentStep: data.next_step,
        progress: data.progress_percentage,
        fieldsRemaining: data.fields_remaining,
        isComplete: data.next_step === "complete",
        accessToken: data.access_token,
      });

      if (data.next_step === "complete" && data.access_token) {
        handleSignupComplete(data.access_token, data.refresh_token);
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.detail || "Something went wrong. Please try again.";
      setError(errorMessage);
      addBotMessage(`❌ ${errorMessage}`);
      console.error("Send message error:", err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="">
      {/* Header */}
      {!state ? (
        <div className="shrink-0 p-6 text-center border-b border-white/10">
          <h2 className="text-3xl font-bold text-gray-100 mb-2">
            Create Your Account
          </h2>
          <p className="text-gray-500 text-sm">
            Chat with our AI assistant to complete your signup — no forms
            required!
          </p>
        </div>
      ) : (
        <div className="h-screen bg-[#050505] flex flex-col">
          {/* Progress Bar (Fixed Top) */}
          {!state.isComplete && (
            <div className="shrink-0 p-4 border-b border-white/10">
              <SignupProgress
                progress={state.progress}
                fieldsRemaining={state.fieldsRemaining}
                currentStep={state.currentStep || ""}
              />
            </div>
          )}

          {/* Messages (Scrollable) */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {messages.map((msg, index) => (
              <ChatMessage
                key={index}
                message={msg.text}
                isBot={msg.isBot}
                timestamp={msg.timestamp}
              />
            ))}

            {(isBootstrapping || isSending) && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl px-4 py-2">
                  <div className="flex space-x-2">
                    <div className="w-1 h-1 bg-[#929bc9] rounded-full animate-bounce" />
                    <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce delay-100" />
                    <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Error */}
          {error && (
            <div className="shrink-0 bg-red-50 border-t border-red-200 text-red-700 px-4 py-3">
              {error}
            </div>
          )}

          {/* Input (Fixed Bottom) */}
          <div className="shrink-0 p-4 border-t border-white/10 bg-[#050505]">
            {!state.isComplete ? (
              <ChatInput
                onSend={handleSubmit}
                disabled={isBootstrapping || isSending}
                placeholder={
                  isBootstrapping
                    ? "Starting conversation..."
                    : "Type your response..."
                }
              />
            ) : (
              <div className="text-center py-4">
                <div className="text-green-600 font-semibold mb-2">
                  ✅ Signup Complete!
                </div>
                <div className="text-gray-500">Redirecting to dashboard...</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationalAuth;
