import { Send, Lock, User, Mail, UserCircle, Bot } from "lucide-react";

interface SignupProgressProps {
  progress: number;
  fieldsRemaining: number;
  currentStep: string;
}

interface Step {
  id: string;
  icon: React.ReactNode;
  label: string;
}

export const SignupProgress: React.FC<SignupProgressProps> = ({
  progress,
  fieldsRemaining,
  currentStep,
}) => {
  const steps: Step[] = [
    { id: "email", icon: <Mail className="w-5 h-5" />, label: "Email" },
    {
      id: "username",
      icon: <UserCircle className="w-5 h-5" />,
      label: "Username",
    },
    { id: "password", icon: <Lock className="w-5 h-5" />, label: "Password" },
    { id: "first", icon: <User className="w-5 h-5" />, label: "Name" },
  ];

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-4">
        <span className="text-white/40 text-[11px] font-bold uppercase tracking-[0.2em]">Signup Progress</span>
        <div>
          {steps
            .filter((step) => step.id === currentStep)
            .map((step) => (
              <div
                key={step.id}
                className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1 rounded-full"
              >
               <span className=" text-blue-600 text-sm">{step.icon}</span> 
                <span className="text-white text-[10px] font-bold tracking-widest uppercase">{step.label}</span>
              </div>
            ))}
        </div>

        <span className="text-white/40 text-[11px] font-bold uppercase tracking-[0.2em]">{fieldsRemaining} fields remaining</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
