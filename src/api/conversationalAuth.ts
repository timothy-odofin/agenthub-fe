import api from "./axiosConfig";
import type { SendChatMessagePayload } from "@/model";


export const login = (payload: any) =>
  api.post("/api/v1/auth/login", payload);

export const startConversationAuth = () =>
  api.get("/api/v1/auth/signup/conversation/start");

export const conversationalAuth = (payload: any) =>
  api.post("/api/v1/auth/signup/conversation", payload);


export const createChatSession = (title?: string) =>
  api.post("/api/v1/chat/sessions", { title });


export const getChatSessions = (page: number = 1, limit: number = 20) =>
  api.get(`/api/v1/chat/sessions?page=${page}&limit=${limit}`);

export const sendChatMessage = (payload: SendChatMessagePayload) =>
  api.post("/api/v1/chat/message", payload);

// 4. Get chat messages for a specific session
export const getSessionMessages = (sessionId: string, limit: number = 50) =>
  api.get(`/api/v1/chat/sessions/${sessionId}/messages?limit=${limit}`);
