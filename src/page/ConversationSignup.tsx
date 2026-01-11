import React, { useState, useRef, useEffect } from 'react';
import { Send, Lock, User, Mail, UserCircle, Bot } from 'lucide-react';

interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
}

interface Step {
  id: string;
  icon: React.ReactNode;
  label: string;
  completed: boolean;
  active: boolean;
}

const ConversationalSignup: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "👋 Welcome! Let's create your account. What's your email address?",
      timestamp: new Date()
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const steps: Step[] = [
    { id: 'email', icon: <Mail className="w-5 h-5" />, label: 'Email', completed: false, active: currentStep === 0 },
    { id: 'username', icon: <UserCircle className="w-5 h-5" />, label: 'Username', completed: false, active: currentStep === 1 },
    { id: 'password', icon: <Lock className="w-5 h-5" />, label: 'Password', completed: false, active: currentStep === 2 },
    { id: 'name', icon: <User className="w-5 h-5" />, label: 'Name', completed: false, active: currentStep === 3 }
  ];

  const botResponses = [
    "Great! Now, what username would you like to use?",
    "Perfect! Please create a secure password.",
    "Almost there! What's your full name?"
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    setTimeout(() => {
      if (currentStep < botResponses.length) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: botResponses[currentStep],
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
        setCurrentStep(prev => prev + 1);
      } else {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: "🎉 All set! Your account has been created successfully. Welcome to AgentHub!",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      }
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#0d0f1a] text-white">

      {/* HEADER */}
      <header className="flex items-center justify-between border-b border-[#1f2333] px-6 py-3 bg-[#0d0f1a] z-10 shadow-lg shadow-black/10">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 text-[#4f7bff]">
            <svg fill="none" viewBox="0 0 48 48">
              <path d="M8.5 8.5C5.5 11.5 3.4 15.5 2.6 19.7C1.7 24 2.2 28.3 3.9 32.3C5.5 36.3 8.3 39.7 11.9 42.1C15.5 44.5 19.7 45.8 24 45.8C28.3 45.8 32.5 44.5 36.1 42.1C39.7 39.7 42.5 36.3 44.1 32.3C45.8 28.3 46.3 24 45.4 19.7C44.5 15.5 42.4 11.5 39.4 8.5L24 24L8.5 8.5Z" fill="currentColor"/>
            </svg>
          </div>
          <h2 className="text-lg font-bold tracking-tight">AgentHub</h2>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-[#6b7395]">Live Demo</span>
          <div className="h-4 w-[1px] bg-[#1f2333]"></div>
          <button className="flex items-center justify-center rounded-lg h-9 px-4 bg-[#4f7bff] hover:bg-[#3968ff] transition text-sm font-bold">
            Sign In
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex flex-1 overflow-hidden relative">

        {/* SIDEBAR */}
        <aside className="w-72 border-r border-[#1f2333] bg-[#11131f] hidden md:flex flex-col">
          <div className="p-6 flex flex-col h-full">
            <div className="mb-8">
              <h1 className="text-base font-bold">Signup Progress</h1>
              <p className="text-[#6b7395] text-xs uppercase tracking-wider mt-1">
                Step {currentStep + 1} of 4
              </p>
            </div>

            <nav className="flex flex-col gap-2">
              {steps.map(step => (
                <div
                  key={step.id}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                    step.active
                      ? 'bg-[#1a1d2e] border border-[#4f7bff]/30'
                      : 'text-[#4b5270]'
                  }`}
                >
                  <span className={step.active ? 'text-[#4f7bff]' : ''}>
                    {step.icon}
                  </span>
                  <p className={`text-sm ${step.active ? 'font-bold text-white' : 'font-medium'}`}>
                    {step.label}
                  </p>
                </div>
              ))}
            </nav>

            <div className="mt-auto p-4 rounded-xl bg-[#161927] border border-[#1f2333]">
              <p className="text-xs text-[#6b7395] leading-relaxed">
                Your account is encrypted end-to-end. AgentHub never shares your data.
              </p>
            </div>
          </div>
        </aside>

        {/* CHAT SECTION */}
        <section className="flex-1 flex flex-col relative bg-[#0d0f1a]">

          {/* MESSAGES SCROLL AREA */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 w-full">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex items-end gap-3 ${
                  message.type === 'user' ? 'justify-end' : 'justify-start max-w-[80%]'
                }`}
              >
                {message.type === 'bot' && (
                  <div className="bg-[#1a1d2e] rounded-full p-2 w-10 h-10 flex items-center justify-center border border-[#4f7bff]/20">
                    <Bot className="w-5 h-5 text-[#4f7bff]" />
                  </div>
                )}

                <div className="flex flex-col gap-1 items-start">
                  {message.type === 'bot' && (
                    <p className="text-[#6b7395] text-[11px] ml-1">AgentHub Bot</p>
                  )}

                  <div
                    className={`px-4 py-3 rounded-2xl shadow-md shadow-black/20 text-sm md:text-base leading-relaxed ${
                      message.type === 'bot'
                        ? 'bg-[#161927] text-white rounded-bl-none'
                        : 'bg-[#4f7bff] text-white rounded-br-none'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          {/* INPUT BAR */}
          <div className="p-6 bg-gradient-to-t from-[#0d0f1a] via-[#0d0f1a] to-transparent">
            <div className="max-w-3xl mx-auto">
              <div className="relative flex items-center">
                <input
                  ref={inputRef}
                  className="w-full bg-[#161927] border border-[#1f2333] rounded-xl py-4 pl-5 pr-14 
                             text-white placeholder-[#5a6285] focus:ring-2 focus:ring-[#4f7bff]/50 outline-none"
                  placeholder="Type your response..."
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                />

                <button
                  onClick={handleSendMessage}
                  className="absolute right-3 p-2 bg-[#4f7bff] rounded-lg hover:bg-[#3968ff]
                             shadow-md shadow-[#4f7bff]/20 transition"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>

              <div className="flex justify-between items-center mt-3 px-2 text-[#6b7395] text-[11px]">
                <p>Press Enter to send</p>
                <p>Step {currentStep + 1}/4</p>
              </div>
            </div>
          </div>

        </section>

      </main>

      {/* SOFT BACKGROUND GRID */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(#4f7bff 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />
    </div>
  );
};

export default ConversationalSignup;
