import React, { useRef } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { X } from "lucide-react";

const Topbar = () => {
  const dialogRef = useRef(null);
  const openDialog = () => {
   if (dialogSignUpRef.current) dialogSignUpRef.current.close(); // close signup
  if (dialogRef.current) dialogRef.current.showModal(); // open login
  };

  const dialogSignUpRef = useRef(null);

  const openSignupDialog = () => {
  if (dialogRef.current) dialogRef.current.close();  // close login
  if (dialogSignUpRef.current) dialogSignUpRef.current.showModal(); // open signup
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full hidden md:flex items-center justify-between px-6 py-3 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm shrink-0 z-10">
        <h1 className="text-lg font-semibold text-slate-900 dark:text-white tracking-tight">
          Chatbot
        </h1>

        <button
          className="px-5 py-2 text-sm font-medium text-white bg-[#195de6] hover:bg-blue-600 rounded-md cursor-pointer transition-colors shadow-sm"
          onClick={openDialog}
        >
          Login
        </button>
      </header>

      <dialog
        ref={dialogRef}
        className="relative w-full max-h-screen p-0 bg-transparent "
      >
        {/* Background overlay */}
        {/* <div
    className="absolute inset-0 bg-black/50 "
    onClick={() => dialogSignUpRef.current.close()}
  ></div> */}

        {/* Modal Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div
            className="bg-white rounded-2xl p-6 shadow-lg max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="absolute cursor-pointer inset-0 -z-10"
              onClick={() => dialogRef.current.close()}
            ></div>
            <Login openRegisterModal={openSignupDialog} />
          </div>
        </div>
      </dialog>

      <dialog
        ref={dialogSignUpRef}
        className="relative w-full max-h-screen p-0 bg-transparent"
      >
        {/* Background overlay */}

        {/* Modal Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div
            className="bg-white rounded-2xl p-6 shadow-lg max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="absolute cursor-pointer inset-0 -z-10"
              onClick={() => dialogSignUpRef.current.close()}
            ></div>
            <Signup toLogin={openDialog} />
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Topbar;
