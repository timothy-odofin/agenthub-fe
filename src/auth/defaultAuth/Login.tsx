import React, { useState } from "react";
import { Bot, Github, Chrome, Rss } from "lucide-react";
import LeftLogin from "@/components/LeftLogin";
import type { LoginData } from "@/model";
import { login } from "@/api/conversationalAuth";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loginData, setLoginData] = useState<LoginData | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const payload = { identifier, password };
    const response = await login(payload);

    const { access_token, refresh_token, user } = response.data;

    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    localStorage.setItem("user", JSON.stringify(user));

    navigate("/main-dashboard");

  } catch (error: any) {
    alert(error.response?.data?.message || "Invalid credentials");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className=" bg-[#101322] text-white min-h-screen">
      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* ================= LEFT SIDE ================= */}
        <LeftLogin />

        {/* ================= RIGHT SIDE ================= */}
        <div className="flex flex-1 flex-col  items-center pt-16  lg:px-24  bg-[#101322]">
          <div className="w-full max-w-[440px] space-y-8">
            {/* Header */}
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold  text-white">Welcome back</h2>
              <p className="mt-2 text-sm text-[#929bc9]">
                Please enter your details to sign in.
              </p>
            </div>

            {/* Social auth */}
            <div className="flex flex-col gap-3">
              <button className="flex items-center justify-center text-sm gap-3 w-full py-2  px-5 bg-[#191e33] cursor-pointer border border-[#323b67] rounded-2xl text-white font-bold hover:bg-[#232948] transition-colors">
                <Github className="w-5 h-5" />
                Continue with GitHub
              </button>

              <button className="flex  text-sm items-center justify-center gap-3 w-full py-2 px-5 bg-[#191e33] cursor-pointer border border-[#323b67] rounded-2xl text-white font-bold hover:bg-[#232948] transition-colors">
                <Chrome className="w-5 h-5" />
                Continue with Google
              </button>
            </div>

            {/* Divider */}
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-[#323b67]" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className=" bg-[#101322] px-2 text-[#929bc9]">
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-white">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full h-10 rounded-lg border border-[#323b67] bg-[#191e33] px-3 text-sm text-white outline-none focus:border-[#1337ec]"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-white ">
                    Password
                  </label>
                  <a
                    className="text-xs text-[#1337ec] hover:underline"
                    href="#"
                  >
                    Forgot password?
                  </a>
                </div>
                <input
                  type="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-10 text-sm rounded-lg border border-[#323b67] bg-[#191e33] px-3 text-white outline-none focus:border-[#1337ec]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2  bg-[#1337ec] hover:bg-[#1337ec]/90 text-white font-bold rounded-2xl shadow-lg shadow-[#1337ec]/20 text-sm "
              >
                Sign In
              </button>
            </form>

            {/* Footer */}
            <p className="text-sm text-center text-[#929bc9]">
              Don&apos;t have an account?{" "}
              <a className="text-[#1337ec] font-bold hover:underline" href="#">
                Sign up
              </a>
            </p>

            <div className="pt-6 flex justify-center gap-6 text-[10px] uppercase tracking-widest text-[#929bc9]/60">
              <a className="hover:text-[#1337ec]" href="#">
                Terms
              </a>
              <a className="hover:text-[#1337ec]" href="#">
                Privacy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
