import { MessageSquare } from "lucide-react";

/**
 * LeftLogin - Branding panel for login/signup pages
 * Displays app logo, tagline, and visual design element
 */
export default function LeftLogin() {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#1337ec] to-[#0a1f7a] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center w-full px-12">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
            <MessageSquare className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Tagline */}
        <h1 className="text-4xl font-bold text-white text-center mb-4">
          AgentHub
        </h1>
        <p className="text-xl text-white/80 text-center max-w-md">
          Your intelligent AI assistant for seamless conversations
        </p>

        {/* Features */}
        <div className="mt-12 space-y-4">
          <div className="flex items-center gap-3 text-white/70">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <span>Powered by advanced AI models</span>
          </div>
          <div className="flex items-center gap-3 text-white/70">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <span>Secure & private conversations</span>
          </div>
          <div className="flex items-center gap-3 text-white/70">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <span>Multi-session chat management</span>
          </div>
        </div>
      </div>
    </div>
  );
}
