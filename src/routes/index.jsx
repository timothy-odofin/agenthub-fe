import App from "@/App";
import Home from "@/pages/Home";
import HomeChat from "@/pages/HomeChat";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      
    ],
  },
  {
    path:"/homechat", element:<HomeChat/>
  }
];

export default routes;
