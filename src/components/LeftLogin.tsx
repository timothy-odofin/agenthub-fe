import { Bot } from "lucide-react"

const LeftLogin = () => {
  return (
   <div className="relative hidden lg:flex lg:w-1/2 flex-col pt-16 items-center bg-[#0a0c16] overflow-hidden  border-r border-white/10">
          {/* Glow background */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#1337ec] rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#1337ec]/40 rounded-full blur-[120px]" />
          </div>

          <div className="relative z-10 w-full max-w-lg">
            {/* Logo */}
            <div className="mb-3 flex items-center gap-3">
              <div className="bg-[#1337ec] p-2 rounded-lg">
                <Bot className="w-3 h-3 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                AgentHub
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl font-black leading-tight tracking-[-0.033em] mb-6">
              Empowering your <br />
              <span className="text-[#1337ec]">AI workflows</span>
            </h1>

            {/* Code block */}
            <div className="glass-panel rounded-xl p-6 font-mono text-sm border border-white/10 shadow-xl">
              <div className="flex gap-1.5 mb-4">
                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                <div className="w-2 h-2 rounded-full bg-green-500/50" />
              </div>

              <pre className="text-blue-300/90 overflow-x-auto text-sm">
                {`import { Agent } from '@agenthub/sdk';

// Initialize autonomous workflow
const agent = new Agent({
  role: 'Software Architect',
  model: 'gpt-4-turbo-latest',
  tools: ['github', 'vercel']
});

await agent.execute({
  task: 'Deploy secure infrastructure'
});`}
              </pre>
            </div>

            <p className="mt-8 text-gray-400 text-sm">
              Build, deploy, and scale autonomous AI agents with the world's
              most advanced dev platform.
            </p>
          </div>
        </div>
  )
}

export default LeftLogin