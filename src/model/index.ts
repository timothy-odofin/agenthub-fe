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

export interface LoginData{
  identifer: string;
  password: string;
}

 export interface SendChatMessagePayload {
  message: string;
  session_id: string;
}
