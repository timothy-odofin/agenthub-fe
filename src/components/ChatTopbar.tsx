import { useState, useRef, useEffect } from "react";
import { Share2, UserPlus, MoreVertical, ChevronDown, Trash2, Archive, Pin, Sparkles } from "lucide-react";

interface ChatTopbarProps {
  sessionTitle: string;
  selectedModel: string;
  onModelChange: (model: string) => void;
  onShare: () => void;
  onAddPeople: () => void;
  onDelete: () => void;
  onArchive: () => void;
  onPin: () => void;
  isPinned?: boolean;
}

// Static model data (future: fetch from API)
const MODEL_VERSIONS = [
  { id: "gpt-4-turbo", name: "GPT-4 Turbo", description: "Most capable model" },
  { id: "gpt-4", name: "GPT-4", description: "Advanced reasoning" },
  { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo", description: "Fast and efficient" },
  { id: "claude-3-opus", name: "Claude 3 Opus", description: "Anthropic's best" },
  { id: "claude-3-sonnet", name: "Claude 3 Sonnet", description: "Balanced performance" },
];

export default function ChatTopbar({
  sessionTitle,
  selectedModel,
  onModelChange,
  onShare,
  onAddPeople,
  onDelete,
  onArchive,
  onPin,
  isPinned = false,
}: ChatTopbarProps) {
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const modelDropdownRef = useRef<HTMLDivElement>(null);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modelDropdownRef.current &&
        !modelDropdownRef.current.contains(event.target as Node)
      ) {
        setModelDropdownOpen(false);
      }
      if (
        moreMenuRef.current &&
        !moreMenuRef.current.contains(event.target as Node)
      ) {
        setMoreMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentModel = MODEL_VERSIONS.find((m) => m.id === selectedModel) || MODEL_VERSIONS[0];

  const handleModelSelect = (modelId: string) => {
    onModelChange(modelId);
    setModelDropdownOpen(false);
  };

  const handleMoreAction = (action: () => void) => {
    action();
    setMoreMenuOpen(false);
  };

  return (
    <div className="border-b border-gray-200 bg-white px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left: Model Selector */}
        <div className="flex items-center gap-4">
          <div className="relative" ref={modelDropdownRef}>
            <button
              onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors group"
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              <div className="flex flex-col items-start">
                <span className="text-sm font-semibold text-gray-900">
                  {currentModel.name}
                </span>
                <span className="text-xs text-gray-500">
                  {currentModel.description}
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-gray-500 transition-transform ${
                  modelDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Model Dropdown */}
            {modelDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-3 py-2 border-b border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Select Model
                  </p>
                </div>
                {MODEL_VERSIONS.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => handleModelSelect(model.id)}
                    className={`w-full px-3 py-2.5 flex items-start gap-3 hover:bg-gray-50 transition-colors ${
                      selectedModel === model.id ? "bg-blue-50" : ""
                    }`}
                  >
                    <Sparkles
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        selectedModel === model.id ? "text-blue-600" : "text-gray-400"
                      }`}
                    />
                    <div className="flex-1 text-left">
                      <p
                        className={`text-sm font-medium ${
                          selectedModel === model.id ? "text-blue-900" : "text-gray-900"
                        }`}
                      >
                        {model.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {model.description}
                      </p>
                    </div>
                    {selectedModel === model.id && (
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5"></div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Session Title (truncated) */}
          <div className="hidden md:block">
            <h2 className="text-sm font-medium text-gray-700 truncate max-w-md">
              {sessionTitle}
            </h2>
          </div>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Share Button */}
          <button
            onClick={onShare}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
          >
            <Share2 className="w-4 h-4 text-gray-600" />
            <span className="hidden sm:inline text-sm font-medium text-gray-700">
              Share
            </span>
          </button>

          {/* Add People Button */}
          <button
            onClick={onAddPeople}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
          >
            <UserPlus className="w-4 h-4 text-gray-600" />
            <span className="hidden sm:inline text-sm font-medium text-gray-700">
              Add People
            </span>
          </button>

          {/* More Menu */}
          <div className="relative" ref={moreMenuRef}>
            <button
              onClick={() => setMoreMenuOpen(!moreMenuOpen)}
              className="p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
            >
              <MoreVertical className="w-4 h-4 text-gray-600" />
            </button>

            {/* More Dropdown */}
            {moreMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <button
                  onClick={() => handleMoreAction(onPin)}
                  className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                >
                  <Pin className={`w-4 h-4 ${isPinned ? "text-blue-600" : "text-gray-600"}`} />
                  <span className="text-sm text-gray-700">
                    {isPinned ? "Unpin" : "Pin to top"}
                  </span>
                </button>
                <button
                  onClick={() => handleMoreAction(onArchive)}
                  className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                >
                  <Archive className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-700">Archive</span>
                </button>
                <div className="border-t border-gray-100 my-1"></div>
                <button
                  onClick={() => handleMoreAction(onDelete)}
                  className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-red-50 transition-colors text-left"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                  <span className="text-sm text-red-600">Delete</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
