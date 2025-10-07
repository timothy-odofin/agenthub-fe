import React, { useState, useEffect } from "react";
import AppSidebar from "@/components/AppSidebar";
import ChatArea from "@/components/ChatArea";
import {sampleChats} from "../data/chats"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  // Load sample chats on mount
  useEffect(() => {
    const initialChat = {
      id: Date.now().toString(),
      title: "New conversation",
      messages: [],
      createdAt: new Date(),
    };
    setChats([initialChat, ...sampleChats]); // new chat always first
    setActiveChat(initialChat);
  }, []);

  // Handlers
  const handleSelectChat = (chat) => setActiveChat(chat);

  const handleNewChat = () => {
    const newChat = {
      id: Date.now().toString(),
      title: "New conversation",
      messages: [],
      createdAt: new Date(),
    };
    setChats([newChat, ...chats]);
    setActiveChat(newChat);
  };

  const handleSendMessage = (content) => {
    if (!activeChat) return;

    const newMessage = {
      id: `${activeChat.id}-${Date.now()}`,
      sender: "user",
      content,
      timestamp: new Date(),
    };

    const updatedChat = {
      ...activeChat,
      messages: [...activeChat.messages, newMessage],
    };

    setActiveChat(updatedChat);
    setChats((prev) =>
      prev.map((chat) => (chat.id === activeChat.id ? updatedChat : chat))
    );

    // Simulated AI response
    setTimeout(() => {
      const aiResponse = {
        id: `${activeChat.id}-${Date.now()}-ai`,
        sender: "assistant",
        content: `Thanks for your message: "${content}". This is a demo response.`,
        timestamp: new Date(),
      };

      const updatedChatWithAI = {
        ...updatedChat,
        messages: [...updatedChat.messages, aiResponse],
      };

      setActiveChat(updatedChatWithAI);
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === activeChat.id ? updatedChatWithAI : chat
        )
      );
    }, 1000);
  };

  //const isNewChat = activeChat.messages.length === 0;

  const showShareButton = activeChat && activeChat.messages.length > 0;
  return (
    <SidebarProvider>
      {/* Sidebar */}
      <AppSidebar
        chats={chats}
        activeChat={activeChat}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
      />

      {/* Main content */}
      <SidebarInset className="flex-1 flex flex-col  h-screen">
        {/* Top bar */}
        <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4 z-30 ">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-6" />
          {/* <h1 className="text-lg font-semibold">
            {activeChat ? activeChat.title : "Select a chat"}
          </h1> */}

          <div className="flex justify-between items-center w-full">
            <Select defaultValue="botmate">
              <SelectTrigger className="w-[180px] border-0 shadow-none focus:ring-0 text-lg">
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent className="bg-white text-black ">
                <SelectGroup>
                  {/* <SelectLabel>Model</SelectLabel> */}
                  <SelectItem value="botmate">Botmate</SelectItem>
                  <SelectItem value="banana">Botmate 2.0</SelectItem>
                  <SelectItem value="blueberry">Botmate Pro</SelectItem>
                </SelectGroup>
              </SelectContent>

              {/* <div className="flex gap-2 items-center">
             
            </div> */}
            </Select>

            {showShareButton ? (
              <Button
                variant="ghost"
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-md"
              >
                <Share className="h-4 w-4" />
                Share
              </Button>
            ): 
              // Just for reference Still going to update it
             <Button
              variant="outline"
              className="flex items-center gap-2 cursor-pointer opacity-50 rounded-md" >
               <a href="/login">
               Login
               </a>
              </Button>
            }
           
             

             
          </div>
        </header>

        {/* Chat area */}
        <main className="flex-1 flex flex-col overflow-hidden ">
          <ChatArea chat={activeChat} onSendMessage={handleSendMessage} />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Home;
