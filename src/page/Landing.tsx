import React, { useState } from 'react';
import { Github, Twitter, Send, Star, Terminal, Database, Zap, Shield, Cloud, Brain, MessageSquare, Bot, Heart, Settings, Code } from 'lucide-react';
import LandingGetStarted from '@/components/LandingGetStarted';

const AgentHubLanding: React.FC = () => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-100 font-sans">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-[#232948]/50 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-[#1337ec]">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" fill="currentColor" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight">AgentHub</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a className="text-sm font-medium hover:text-[#1337ec] transition-colors" href="#features">Features</a>
              <a className="text-sm font-medium hover:text-[#1337ec] transition-colors" href="#tech">Tech Stack</a>
              <a className="text-sm font-medium hover:text-[#1337ec] transition-colors" href="#use-cases">Use Cases</a>
              <a className="text-sm font-medium hover:text-[#1337ec] transition-colors" href="#docs">Docs</a>
            </nav>
            <div className="flex items-center gap-4">
              <button className="hidden lg:flex items-center gap-2 px-4 py-2 bg-[#1337ec] rounded-lg text-sm font-bold hover:bg-[#1337ec]/90 transition-all">
                <Star className="w-4 h-4" />
                Star on GitHub
              </button>
              <button className="px-4 py-2 border border-[#232948] rounded-lg text-sm font-bold hover:bg-white/5 transition-all">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
          <div className="absolute inset-0 opacity-40" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(19, 55, 236, 0.1) 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }} />
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(19, 55, 236, 0.15) 0%, transparent 70%)'
          }} />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col gap-8 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1337ec]/10 border border-[#1337ec]/20 text-[#1337ec] text-xs font-bold uppercase tracking-wider w-fit">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1337ec] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1337ec]" />
                  </span>
                  v2.4.0 is now live
                </div>
                <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight text-white">
                  Build Intelligent AI Agents in <span className="text-[#1337ec]">Minutes</span>, Not Months
                </h1>
                <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
                  The open-source framework for orchestrating multi-provider LLM agents with native Python support, Redis caching, and persistent memory.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="px-8 py-4 bg-[#1337ec] text-white rounded-lg font-bold text-lg hover:shadow-[0_0_20px_rgba(19,55,236,0.4)] transition-all">
                    Try Live Demo
                  </button>
                  <button className="px-8 py-4 bg-transparent border border-[#232948] text-white rounded-lg font-bold text-lg hover:bg-white/5 transition-all">
                    View on GitHub
                  </button>
                </div>
              </div>

              {/* Interactive Demo Card */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#1337ec] to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
                <div className="relative bg-[#161616] border border-[#232948] rounded-xl overflow-hidden shadow-2xl">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-[#232948] bg-white/5">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                      <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                    </div>
                    <span className="text-xs font-mono text-slate-500">Agent Interface - Localhost:3000</span>
                  </div>
                  <div className="p-6 h-[320px] overflow-y-auto space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#1337ec]/20 flex items-center justify-center text-[#1337ec]">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="bg-white/5 border border-[#232948] p-3 rounded-r-xl rounded-bl-xl text-sm max-w-[80%]">
                        👋 Hi there! I'm your AgentHub concierge. Ready to create your account or initialize a new project?
                      </div>
                    </div>
                    <div className="flex items-start gap-3 justify-end">
                      <div className="bg-[#1337ec] p-3 rounded-l-xl rounded-br-xl text-sm max-w-[80%]">
                        I'd like to set up a new multi-agent swarm using Claude 3.
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#1337ec]/20 flex items-center justify-center text-[#1337ec]">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="bg-white/5 border border-[#232948] p-3 rounded-r-xl rounded-bl-xl text-sm max-w-[80%]">
                        Excellent choice. I've initialized the framework. Which environment variables should I configure for Anthropic?
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-t border-[#232948] bg-white/5">
                    <div className="relative">
                      <input
                        className="w-full bg-[#0a0a0a] border border-[#232948] rounded-lg px-4 py-3 text-sm focus:border-[#1337ec] focus:outline-none"
                        placeholder="Type a command..."
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <button
                        onClick={handleSendMessage}
                        className="absolute right-2 top-2 p-1.5 bg-[#1337ec] rounded-md hover:bg-[#1337ec]/90 transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section id="tech" className="py-12 border-y border-[#232948] bg-white/[0.02]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm font-bold text-slate-500 uppercase tracking-[0.2em] mb-8">
              Powering the world's most intelligent agents
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
              <div className="flex items-center gap-2 font-bold text-xl">
                <Terminal className="text-[#1337ec]" /> Python
              </div>
              <div className="flex items-center gap-2 font-bold text-xl">
                <Database className="text-green-500" /> MongoDB
              </div>
              <div className="flex items-center gap-2 font-bold text-xl">
                <Zap className="text-red-500" /> Redis
              </div>
              <div className="flex items-center gap-2 font-bold text-xl">
                <Brain className="text-blue-400" /> OpenAI
              </div>
              <div className="flex items-center gap-2 font-bold text-xl">
                <Code className="text-orange-400" /> Anthropic
              </div>
              <div className="flex items-center gap-2 font-bold text-xl">
                <Cloud className="text-purple-400" /> AWS
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl lg:text-5xl font-black text-white">Engineered for Performance</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                AgentHub provides a battle-tested framework to scale your AI workforce from prototype to production in record time.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <MessageSquare className="w-6 h-6" />,
                  title: 'Natural Language Signup',
                  description: 'Let your users onboard using fluid natural language. Our agents handle data validation and extraction automatically.'
                },
                {
                  icon: <Bot className="w-6 h-6" />,
                  title: 'Multi-Provider LLM',
                  description: 'Switch between OpenAI, Anthropic, and Llama 3 with a single configuration line. No provider lock-in.'
                },
                {
                  icon: <Shield className="w-6 h-6" />,
                  title: 'Enterprise Security',
                  description: 'Built-in RBAC, encryption at rest, and secure vault integration for managing sensitive provider API keys.'
                },
                {
                  icon: <Database className="w-6 h-6" />,
                  title: 'Persistent Storage',
                  description: 'Agents never forget. Native MongoDB integration stores session history and long-term memory contexts.'
                },
                {
                  icon: <Settings className="w-6 h-6" />,
                  title: 'Developer SDK',
                  description: 'A clean, Pythonic SDK designed for high-performance engineering teams. Native async support throughout.'
                },
                {
                  icon: <Zap className="w-6 h-6" />,
                  title: 'Redis Caching',
                  description: 'Reduce latency and costs with built-in semantic caching. Never pay for the same completion twice.'
                }
              ].map((feature, idx) => (
                <div key={idx} className="group p-8 rounded-xl bg-[#161616] border border-[#232948] hover:border-[#1337ec]/50 transition-all">
                  <div className="w-12 h-12 rounded-lg bg-[#1337ec]/10 flex items-center justify-center text-[#1337ec] mb-6 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Getting Started */}
        <LandingGetStarted/>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#1337ec] opacity-5" />
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative">
            <div className="p-12 lg:p-16 rounded-[2rem] bg-gradient-to-br from-[#1337ec] to-blue-700 text-center text-white relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-black/20 rounded-full blur-3xl" />
              <h2 className="text-4xl lg:text-6xl font-black mb-6 relative z-10">Ready to build the future?</h2>
              <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto relative z-10">
                Join 10,000+ developers building the next generation of autonomous AI systems with AgentHub.
              </p>
              <div className="flex flex-wrap justify-center gap-4 relative z-10">
                <button className="px-8 py-4 bg-white text-[#1337ec] rounded-lg font-bold text-lg hover:bg-blue-50 transition-all">
                  Get Started Now
                </button>
                <button className="px-8 py-4 bg-[#1337ec]/20 border border-white/30 backdrop-blur-sm rounded-lg font-bold text-lg hover:bg-[#1337ec]/30 transition-all">
                  Talk to Sales
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] border-t border-[#232948] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 lg:gap-8">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="text-[#1337ec]">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" fill="currentColor" />
                  </svg>
                </div>
                <span className="text-xl font-bold tracking-tight">AgentHub</span>
              </div>
              <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
                The world's leading open-source framework for autonomous LLM agents. Built by developers, for developers.
              </p>
              <div className="flex gap-4 mt-6">
                <a className="w-10 h-10 rounded-lg border border-[#232948] flex items-center justify-center hover:bg-white/5 transition-all" href="#">
                  <Github className="w-5 h-5" />
                </a>
                <a className="w-10 h-10 rounded-lg border border-[#232948] flex items-center justify-center hover:bg-white/5 transition-all" href="#">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div>
              <h5 className="font-bold mb-4">Platform</h5>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a className="hover:text-[#1337ec] transition-colors" href="#">Framework</a></li>
                <li><a className="hover:text-[#1337ec] transition-colors" href="#">SDKs</a></li>
                <li><a className="hover:text-[#1337ec] transition-colors" href="#">Integrations</a></li>
                <li><a className="hover:text-[#1337ec] transition-colors" href="#">CLI Tool</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Resources</h5>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a className="hover:text-[#1337ec] transition-colors" href="#">Documentation</a></li>
                <li><a className="hover:text-[#1337ec] transition-colors" href="#">API Reference</a></li>
                <li><a className="hover:text-[#1337ec] transition-colors" href="#">Community</a></li>
                <li><a className="hover:text-[#1337ec] transition-colors" href="#">Examples</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Company</h5>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a className="hover:text-[#1337ec] transition-colors" href="#">About Us</a></li>
                <li><a className="hover:text-[#1337ec] transition-colors" href="#">Careers</a></li>
                <li><a className="hover:text-[#1337ec] transition-colors" href="#">Blog</a></li>
                <li><a className="hover:text-[#1337ec] transition-colors" href="#">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-[#232948] text-center">
            <p className="text-xs text-slate-600">© 2024 AgentHub Framework. All rights reserved. Distributed under MIT License.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AgentHubLanding;