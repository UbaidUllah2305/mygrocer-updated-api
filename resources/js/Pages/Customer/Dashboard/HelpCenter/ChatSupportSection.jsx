import React, { useState } from "react";
import RecentChatItem from "./RecentChatItem";

const ChatSupportSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data
  const recentChats = [
    { id: 1, vendor: "Fresh Mart", message: "Thanks for ordering...", time: "2m", badge: "3" },
    { id: 2, vendor: "Al Fateh", message: "Let me know if you want to confirm it...", time: "2w", badge: "1" },
    { id: 3, vendor: "Al Saeed", message: "Thank you for your co-operation...", time: "2w", badge: "1" },
  ];

  const chatMessages = [
    { id: 1, sender: "vendor", text: "Hello! Welcome to Fresh Mart. How can I assist you today?", time: "3:22 PM" },
    { id: 2, sender: "user", text: "Hi! I ordered vegetables yesterday but have not received any delivery updates yet. Can you help me check the status?", time: "3:47 PM" },
    { id: 3, sender: "vendor", text: "Of course! Let me check that for you right away. Could you please share your order number? You can find it in the orders section of your account.", time: "3:45 PM" },
    { id: 4, sender: "user", text: "Thank you for your Co-operation.", time: "3:50 PM" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left: Recent Chats */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="bg-[#6F9C3D] p-4 rounded-t-xl">
          <h2 className="text-lg font-semibold text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
            Recent Chat
          </h2>
        </div>
        <div className="p-4">
          <input
            type="text"
            placeholder="Search vendors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6F9C3D] text-base"
            style={{ fontFamily: "'Inter', sans-serif'" }}
          />
        </div>
        <div className="p-4 space-y-3">
          {recentChats.map((chat) => (
            <RecentChatItem key={chat.id} chat={chat} />
          ))}
        </div>
      </div>

      {/* Right: Chat Window */}
      <div className="md:col-span-2 bg-white rounded-xl shadow-sm">
        <div className="bg-[#D2E0C3] p-4 rounded-t-xl flex items-center gap-3">
          <img
            src="/assets/Assets/Customer/helpcenter/fresh-mart.svg"
            alt="Fresh Mart"
            className="w-13 h-13 rounded-full"
          />
          <h3 className="text-lg md:text-xl font-semibold text-gray-900" style={{ fontFamily: "'Inter', sans-serif" }}>
            Fresh Mart
          </h3>
        </div>

        <div className="p-4 h-[400px] overflow-y-auto space-y-4">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`p-3 rounded-lg text-neutral-900 font-medium max-w-[80%] ${msg.sender === "vendor"
                ? "bg-[#D8D8D83B] ml-auto"
                : "bg-[#E8EFE0] mr-auto"
                }`}
            >
              <p className="text-sm">{msg.text}</p>
              <div className="text-xs text-gray-500 text-right mt-1">{msg.time}</div>
            </div>
          ))}
        </div>

        <div className="p-4">
          <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-2xl">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 text-base"
              style={{ fontFamily: "'Inter', sans-serif'" }}
            />
            <button className="p-1 bg-[#6F9C3D] text-white rounded-full hover:bg-[#5A7E2F] transition">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSupportSection;