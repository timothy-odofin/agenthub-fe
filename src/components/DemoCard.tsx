const DemoCard: React.FC = () => {
  return (
    <div className="bg-[#161616] border border-[#232948] rounded-xl shadow-xl">
      <div className="p-6 space-y-4 text-sm">
        <div className="bg-white/5 p-3 rounded-xl">
          👋 Hi! Ready to create your AI agent?
        </div>
        <div className="bg-[#1337ec] p-3 rounded-xl text-right">
          Yes, let's build a multi-agent system.
        </div>
      </div>
    </div>
  );
};

export default DemoCard;
