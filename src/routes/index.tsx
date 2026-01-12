import type { RouteObject } from "react-router-dom";
import Login from "@/pages/Login";
import ProtectedRoute from "@/middleware/ProtectedRoute";
import ChatLayout from "@/pages/ChatLayout";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/main-dashboard/:sessionId?",
    element: (
      <ProtectedRoute>
        <ChatLayout />
      </ProtectedRoute>
    ),
  },
];

export default routes;
