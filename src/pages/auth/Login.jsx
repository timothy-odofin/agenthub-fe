import React from "react";
import { Button } from "@/components/ui/button";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#ECF3FF] items-center justify-center ">
      <div className="w-full flex flex-col justify-center items-center mt-5">
        <h1 className="font-extrabold flex items-center"><img src="/bot-logo.png" alt="" className="w-[40px] "/> {" "} BOTMATE</h1>
        <div className="bg-white w-full max-w-[500px] shadow-md rounded-[20px] p-8 max-sm:p-4 flex flex-col items-center mx-5 mt-3 mb-6">
          {/* <div className="title text-center mb-5">
           
            <h2 className="text-[25px]">Create an Account</h2>
            <p className="text-sm text-gray-400">
             
              Join us today and get started with your journey
            </p>
          </div> */}

          <form action="" className="w-full">
            <div className="flex flex-col gap-4 w-full">
              <div className="input-group flex flex-col gap-2 relative">
                <label htmlFor="">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border-1 outline-0 border-zinc-200 rounded-sm h-[40px] px-3 text-[15px] placeholder:text-[15px]"
                  placeholder="Enter your email address"
                />
              </div>
              <div className="input-group flex flex-col gap-2 relative">
                <label htmlFor="">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border-1 outline-0 border-zinc-200 rounded-sm h-[40px] px-3 text-[15px] placeholder:text-[15px]"
                  placeholder="Create a strong password"
                />
              </div>

              <Button className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white h-[35px] mt-2">
                Create Account
              </Button>
            </div>
          </form>

          <div className="divider flex items-center w-full my-4 mb-3">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-2 text-gray-400">or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <div className="google-btn w-full mb-3">
            <Button
              variant="outline"
              className="w-full cursor-pointer border-gray-100 hover:shadow-sm flex items-center justify-center"
            >
              <img
                src="/google.png"
                alt="Google Logo"
                className="w-5 h-5 mr-2"
              />
              <p> Sign up with Google</p>
            </Button>
          </div>

          <p className="text-sm text-gray-400 text-center">
            Don&apos;t have an account yet?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
