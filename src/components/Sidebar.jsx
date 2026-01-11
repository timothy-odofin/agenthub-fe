import { History, Info, Plus, Settings } from "lucide-react";
import React from "react";

const Sidebar = () => {
  return (
    <aside className="w-[280px] hidden md:flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 h-full shrink-0">
      <div className="flex flex-col h-full justify-between p-4">
        <div className="flex flex-col gap-6">
          <div className="flex gap-3 items-center px-2">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-slate-200 dark:border-slate-700 bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuDqbWFf_XzxFb3KHnWF4K-yBWWL16Ogegu6BeGaB-ViJVnSqzmxpcFdPGYiIpI4twq0TNdjNSczIzNf-0EbtkbEv_TtPO0aD3Iz7oDwDy1rUhcxzYRCuFa5ym-P1Z0F8Wliqeu4YP16lF4GaPWUA_0BH_RpYCRb2tpCqoueriIEtdxnHR4wxHaNrJypa3ySA8KCWpXtWBWCwko3TGliCAgfHMtrGKklxVyvtHbXLiPLANPK0QgVig21UR-waacXKki1gEDD1JaqHxU')]"
              data-alt="Abstract gradient avatar representing the AI bot"
              
            ></div>
            <div className="flex flex-col">
              <h1 className="text-slate-900 dark:text-white text-base font-semibold leading-normal">
                My Chatbot
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-normal leading-normal">
                Pro Plan
              </p>
            </div>
          </div>
            {/* TOP Bar */}
          <nav className="flex flex-col gap-2">
            <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary dark:text-blue-400 hover:bg-primary/20 transition-colors group">
              <span
                className=" group-hover:scale-110 transition-transform text-[24px]"
               
              >
                <Plus/>
              </span>
              <span className="text-sm font-medium leading-normal">New Chat</span>
            </button>
            <div className="pt-4 pb-2 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Recents
            </div>
            <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300">
              <span
                className=" text-slate-400 text-[24px]"
                
              >
                <History/>
              </span>
              <span className="text-sm font-medium leading-normal truncate">
                React Component help
              </span>
            </button>
            <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300">
              <span
                className=" text-slate-400 text-[20px]"
                
              >
                <History/>
              </span>
              <span className="text-sm font-medium leading-normal truncate">
                Python script debugging
              </span>
            </button>
          </nav>
        </div>

        <div className="flex flex-col gap-2 border-t border-slate-200 dark:border-slate-800 pt-4">
          <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300">
            <span className=" text-[24px]" >
              <Settings/>
            </span>
            <span className="text-sm font-medium leading-normal">Settings</span>
          </button>
          <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300">
            <span className=" text-[24px]" >
              <Info/>
            </span>
            <span className="text-sm font-medium leading-normal">Help & FAQ</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
