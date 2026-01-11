import React from "react";

const LandingGetStarted = () => {
  return (
    <section className="py-24 bg-white/[0.02]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-black mb-6">
              Getting Started is Simple
            </h2>
            <div className="space-y-8">
              {[
                {
                  num: "1",
                  title: "Install the Core SDK",
                  desc: "Use pip to install the AgentHub framework and all necessary dependencies.",
                  active: true,
                },
                {
                  num: "2",
                  title: "Configure your Environment",
                  desc: "Set up your API keys and define your agent's personality and tools.",
                  active: false,
                },
                {
                  num: "3",
                  title: "Launch your Agent",
                  desc: "Deploy locally or to your favorite cloud provider with a single command.",
                  active: false,
                },
              ].map((step, idx) => (
                <div key={idx} className="flex gap-4">
                  <div
                    className={`flex-none w-10 h-10 rounded-full ${
                      step.active
                        ? "bg-[#1337ec] text-white"
                        : "border border-[#232948] text-slate-400"
                    } flex items-center justify-center font-bold`}
                  >
                    {step.num}
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{step.title}</h4>
                    <p className="text-slate-400 text-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#0d0d0d] rounded-xl border border-[#232948] overflow-hidden shadow-2xl">
            <div className="flex items-center px-4 py-3 bg-white/5 border-b border-[#232948]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/20" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                <div className="w-3 h-3 rounded-full bg-green-500/20" />
              </div>
              <div className="mx-auto text-xs font-mono text-slate-500">
                terminal — bash
              </div>
            </div>
            <div className="p-6 font-mono text-sm space-y-4">
              <div className="flex gap-4">
                <span className="text-slate-600 select-none">1</span>
                <span className="text-slate-300">
                  pip install{" "}
                  <span className="text-[#1337ec]">agenthub-core</span>
                </span>
              </div>
              <div className="flex gap-4">
                <span className="text-slate-600 select-none">2</span>
                <span className="text-slate-300">
                  agenthub init{" "}
                  <span className="text-yellow-400">my-first-agent</span>
                </span>
              </div>
              <div className="flex gap-4">
                <span className="text-slate-600 select-none">3</span>
                <span className="text-slate-300">cd my-first-agent</span>
              </div>
              <div className="flex gap-4">
                <span className="text-slate-600 select-none">4</span>
                <span className="text-slate-600">
                  # Start the development server
                </span>
              </div>
              <div className="flex gap-4">
                <span className="text-slate-600 select-none">5</span>
                <span className="text-slate-300">agenthub dev</span>
              </div>
              <div className="mt-4 pt-4 border-t border-[#232948]">
                <div className="text-green-400">
                  ✓ Successfully initialized!
                </div>
                <div className="text-slate-400">
                  Dashboard running at{" "}
                  <span className="text-[#1337ec] underline">
                    http://localhost:8080
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingGetStarted;
