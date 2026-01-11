import React from "react";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";

const App = () => {
  return (
   
    <div className="min-h-screen">
      
        <Outlet />
     
    </div>
     
  );
};

export default App;
