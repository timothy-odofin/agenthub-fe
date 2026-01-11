interface SidebarProps {
  sessions: any[];
  currentSession: string | null;
  onNewChat: () => void;
  onSelectSession: (id: string) => void;
  isLoading?: boolean;
}

import { History, Info, Loader2, MessageSquare, Plus, Settings } from "lucide-react";

export default function Sidebar({
  sessions,
  currentSession,
  onNewChat,
  onSelectSession,
  isLoading = false,
}: SidebarProps) {
  return (
    <aside className="w-[280px] hidden md:flex flex-col border-r border-gray-200 bg-white h-full shrink-0">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex gap-3 items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-gray-900 text-base font-semibold">
                AgentHub
              </h1>
              <p className="text-gray-500 text-xs">
                AI Assistant
              </p>
            </div>
          </div>
          
          {/* New Chat Button */}
          <button  
            onClick={onNewChat} 
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md group"
          >
            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
            <span className="text-sm font-medium">New Chat</span>
          </button>
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
              Recent Chats
            </div>
            
            <nav className="flex flex-col gap-1">
              {sessions.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">No conversations yet</p>
                </div>
              ) : (
                sessions.map((s) => (
                  <button 
                    className={`flex items-start gap-3 px-3 py-3 rounded-lg hover:bg-gray-100 transition-all text-left group relative ${
                      currentSession === s.session_id 
                        ? "bg-blue-50 hover:bg-blue-100 border-l-2 border-blue-600" 
                        : "hover:border-l-2 hover:border-gray-300"
                    }`}
                    key={s.session_id}
                    onClick={() => onSelectSession(s.session_id)}
                    disabled={isLoading}
                  >
                    <History className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                      currentSession === s.session_id ? "text-blue-600" : "text-gray-400"
                    }`} />
                    
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${
                        currentSession === s.session_id ? "text-blue-900" : "text-gray-700"
                      }`}>
                        {s.title || "Untitled Chat"}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-400">
                          {s.message_count || 0} messages
                        </span>
                        {s.last_message_at && (
                          <>
                            <span className="text-xs text-gray-300">•</span>
                            <span className="text-xs text-gray-400">
                              {new Date(s.last_message_at).toLocaleDateString()}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {isLoading && currentSession === s.session_id && (
                      <Loader2 className="w-4 h-4 text-blue-600 animate-spin flex-shrink-0" />
                    )}
                  </button>
                ))
              )}
            </nav>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-1 border-t border-gray-200 p-4">
          <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700">
            <Settings className="w-4 h-4" />
            <span className="text-sm font-medium">Settings</span>
          </button>
          <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700">
            <Info className="w-4 h-4" />
            <span className="text-sm font-medium">Help & FAQ</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
