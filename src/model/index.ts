export interface SignupState {
  sessionId: string | null;
  currentStep: string | null;
  progress: number;
  fieldsRemaining: number;
  isComplete: boolean;
  accessToken: string | null;
}

export interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export interface LoginData {
  identifier: string;
  password: string;
}

export interface SendChatMessagePayload {
  message: string;
  session_id: string | null;
}

export interface ChatSession {
  session_id: string;
  title: string;
  created_at?: string;
  last_message_at?: string;
  message_count?: number;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  id?: string;
}

