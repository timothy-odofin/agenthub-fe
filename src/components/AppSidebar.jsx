import React, { useState } from "react";
import { Plus, MessageCircle, User, CircleHelp, Ellipsis, Share, Edit, Archive, Delete, DeleteIcon, Trash, Trash2 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Separator } from "./ui/separator";

const AppSidebar = ({
  chats,
  activeChat,
  onSelectChat,
  onNewChat,
  ...props
}) => {
  const [hoveredChatId, setHoveredChatId] = useState(null);

  return (
  
    <Sidebar {...props} >
      {/* Sidebar Header */}
      <SidebarHeader className="flex  justify-between bg-white">
        <h1 className="font-extrabold flex items-center text-lg bg-white justify-center"><img src="/bot-logo.png" alt="" className="w-[40px] "/> {" "} BOTMATE</h1>
        <Button onClick={onNewChat} size="sm" className="flex gap-2 mb-2">
          <Plus className="h-4 w-4" />
          <span>New Chat</span>
        </Button>
      </SidebarHeader>

      {/* Chat List */}
      <SidebarContent className="bg-white">
        <SidebarMenu className="gap-3">
          {chats.map((chat) => (
            <SidebarMenuItem key={chat.id}>
              <SidebarMenuButton isActive={activeChat?.id === chat.id} asChild>
                <div
                  className="flex items-center justify-between w-full hover:bg-gray-100"
                  onMouseEnter={() => setHoveredChatId(chat.id)}
                  onMouseLeave={() => setHoveredChatId(null)}
                >
                  <button
                    onClick={() => onSelectChat(chat)}
                    className="flex items-center gap-2  group"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span className="truncate">{chat.title}</span>
                  </button>
                  {hoveredChatId === chat.id && (
                    <Popover>
                      <PopoverTrigger className="">
                        {" "}
                        <Ellipsis className="cursor-pointer ml-2" />
                      </PopoverTrigger >
                      <PopoverContent className="bg-white text-black w-[120px] p-0 m-0 px-2 py-2 border-0 rounded-md">
                       <div className="flex flex-col gap-2 w-full">

                        <Button className="bg-transparent hover:bg-gray-100 justify-start w-full cursor-pointer "   variant="ghost">
                          <Share className="h-4 w-4 mr-2" />
                          Share
                         </Button>

                          <Button className="bg-transparent hover:bg-gray-100 justify-start w-full cursor-pointer "   variant="ghost">
                          <Edit className="h-4 w-4 mr-2" />
                          Rename
                         </Button>

                         {/* <Separator /> */}

                          <Button className="bg-transparent hover:bg-gray-100 justify-start w-full cursor-pointer "   variant="ghost">
                          <Archive className="h-4 w-4 mr-2" />
                          Archive
                         </Button>

                          <Button className="bg-transparent hover:bg-gray-100 justify-start w-full cursor-pointer text-red-400"   variant="ghost">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                         </Button>
                       </div>
                      </PopoverContent>
                    </Popover>
                  )}
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="bg-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button className="flex items-center gap-2 w-full text-left">
                <User className="h-4 w-4" />
                <span>My account</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button className="flex items-center gap-2 w-full text-left">
                <CircleHelp className="h-4 w-4" />
                <span>Help & FAQ</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  
  );
};

export default AppSidebar;
