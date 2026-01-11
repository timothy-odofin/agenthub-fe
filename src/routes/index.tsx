import type { RouteObject } from "react-router-dom";
import App from "../App"
import ConversationalAuth from "../auth/conversationalAuth/page";

import AgentHubLanding from "@/page/Landing";
import ConversationalSignup from "@/page/ConversationSignup";
import Login from "@/auth/defaultAuth/Login";
import ProtectedRoute from "@/middleware/ProtectedRoute";
import ChatLayout from "@/page/ChatLayout";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Login/>
  },
  {
    path: "/app",
    element: <App/>,
    children: [
      {index: true , element: <ConversationalAuth/>},
      // {path: "/chat", element: <MainChat/>}
    ],
  },
  {
    path: "/landing", element: <AgentHubLanding/>
  },

  {
    path: "/sign", element: <ConversationalSignup/>
  },
  {
    path: "/login", element: <Login/>
  },
  {
    path: "/main-dashboard",
    element: (
      <ProtectedRoute>
        <ChatLayout />
      </ProtectedRoute>
    ),
  },
  {
    path: "/main-dashboard/:sessionId",
    element: (
      <ProtectedRoute>
        <ChatLayout />
      </ProtectedRoute>
    ),
  }
];
