import React from "react";
import { Button } from "./ui/button";

const Login = ({openRegisterModal}) => {
  return (
    <div className="flex justify-center min-w-full">
      <div className="w-full">
        <div className="flex flex-col text-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-700">Welcome Back!</h2>
          <p className="text-gray-400">Login to continue your wonderful </p>
        </div>

        <div className="google-btn w-full mb-4">
          <Button
            variant="outline"
            className="w-full cursor-pointer  border-1 bg-transparent border-gray-700 py-2 flex items-center justify-center rounded-3xl"
          >
            <img src="/google.png" alt="Google Logo" className="w-5 h-5 mr-2" />
            <p>Continue with Google</p>
          </Button>
        </div>

        <div className="divider flex items-center w-full my-4 mb-4">
          <hr className="flex-grow border-t border-gray-700" />
          <span className="mx-2 text-gray-700">or</span>
          <hr className="flex-grow border-t border-gray-700" />
        </div>

        <form action="">
          <div className="w-full input-email-box mb-4">
            <input
              type="text"
              placeholder="Email address"
              className="w-full border-1 border-gray-700 rounded-3xl h-10 pl-3"
            />
          </div>

          <div className="btn-continue w-full mb-4">
            <button className="w-full py-2 bg-gray-700 text-white rounded-3xl cursor-pointer">
              Continue
            </button>
          </div>
        </form>

        <div className="">
          <p className="text-sm text-gray-700 text-center">
            Don&apos;t have an account yet?{" "}
            <a  onClick={openRegisterModal} className="text-blue-600 hover:underline cursor-pointer">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
