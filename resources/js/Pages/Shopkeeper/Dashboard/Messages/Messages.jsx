import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { CornerDownLeft } from "lucide-react";

// Components
import MessagesTable from "./MessagesTable";
import MessageViewModal from "./MessageViewModal";
import ChatView from "./ChatView";
import NewMessageModal from "./NewMessageModal";

const Messages = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [activeConversation, setActiveConversation] = useState(null);

  // Mock data
  const [messages, setMessages] = useState([
    {
      id: 1,
      customerName: "Fareed Ahmad",
      type: "New Order",
      briefMsg: "Plz add eggs in...",
      dateRange: "01-01-2024 to 2024-12-31",
      status: "Seen",
      time: "3:45 PM",
      fullDate: "19-09-2025",
      fullMessage: "Please extend the expiry date of subscription.",
      messages: [
        { text: "Hi! I placed an order a few minutes ago. Can you confirm if it will be delivered today?", isCustomer: true, time: "3:45 PM" },
        { text: "Hello! Yes, I can check that for you. Can you share your order ID?", isCustomer: false, time: "3:45 PM" },
        { text: "Sure, it's #ORD-1198.", isCustomer: true, time: "3:45 PM" },
        { text: "Thanks! I just checked. Your order is packed and will be delivered within 45 minutes.", isCustomer: false, time: "3:45 PM" },
        { text: "Great! One more thing, the tomatoes I received last time were damaged.", isCustomer: true, time: "3:45 PM" },
      ]
    },
    {
      id: 2,
      customerName: "Alia Ruksar",
      type: "Order Delivery",
      briefMsg: "When my order...",
      dateRange: "01-01-2024 to 2024-12-31",
      status: "Unread",
      time: "3:45 PM",
      fullDate: "19-09-2025",
      fullMessage: "Hello, can you tell me when my order will be delivered? My Order ID is #12345.",
      messages: [
        { text: "Hello, can you tell me when my order will be delivered? My Order ID is #12345.", isCustomer: true, time: "3:45 PM" },
      ]
    },
    {
      id: 3,
      customerName: "Samia",
      type: "Order Confirmation",
      briefMsg: "Confirm my order...",
      dateRange: "01-01-2024 to 2024-12-31",
      status: "Replied",
      time: "3:45 PM",
      fullDate: "19-09-2025",
      fullMessage: "Can you please confirm my order details? I want to make sure everything is correct.",
      messages: [
        { text: "Can you please confirm my order details? I want to make sure everything is correct.", isCustomer: true, time: "3:40 PM" },
        { text: "Sure! Your order #ORD-5567 includes 2kg Apples, 1kg Oranges, and 500g Grapes. Total: Rs. 850.", isCustomer: false, time: "3:42 PM" },
        { text: "Perfect, thank you!", isCustomer: true, time: "3:45 PM" },
      ]
    },
  ]);

  // Filter logic
  const filteredMessages = messages.filter((msg) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "unread") return msg.status === "Unread";
    if (activeFilter === "recent") return true;
    return true;
  }).slice(0, activeFilter === "recent" ? 2 : undefined);

  const counts = {
    all: messages.length,
    unread: messages.filter((m) => m.status === "Unread").length,
    recent: Math.min(2, messages.length),
  };

  const handleViewMessage = (message) => {
    setSelectedMessage(message);
    setShowMessageModal(true);
    setMessages((prev) =>
      prev.map((m) => (m.id === message.id ? { ...m, status: "Seen" } : m))
    );
  };

  const handleReply = (message) => {
    setShowMessageModal(false);
    setActiveConversation(message);
  };

  const handleSendMessage = (text) => {
    if (activeConversation) {
      const newMessage = {
        text,
        isCustomer: false,
        time: new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
      };

      setMessages((prev) =>
        prev.map((m) =>
          m.id === activeConversation.id
            ? { ...m, messages: [...m.messages, newMessage], status: "Replied" }
            : m
        )
      );

      setActiveConversation((prev) => ({
        ...prev,
        messages: [...prev.messages, newMessage],
      }));
    }
  };

  const handleBackToInbox = () => {
    setActiveConversation(null);
  };

  const handleSendNewMessage = (msgData) => {
    // Optional: Add real logic to create new conversation
    console.log("New message sent:", msgData);
    setShowNewMessageModal(false);
  };

  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Messages</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Manage customer conversations
          </p>
        </div>
      </div>

      {/* Chat View or Inbox */}
      {activeConversation ? (
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={handleBackToInbox}
              className="flex items-center gap-2 text-[#6F9C3D] hover:text-[#5a7d31]"
            >
              <CornerDownLeft className="w-5 h-5 rotate-90" />
              <span>Back to Messages</span>
            </button>
            <div className="flex-1 text-center">
              <span className="font-semibold text-[#3a3e47]">
                {activeConversation.customerName}
              </span>
            </div>
          </div>
          <ChatView
            conversation={activeConversation}
            onBack={handleBackToInbox}
            onSendMessage={handleSendMessage}
          />
        </div>
      ) : (
        <>
          {/* Filters + New Message */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <h2 className="text-xl md:text-2xl font-medium">Messages</h2>
            <div className="flex items-center gap-2">
              {["all", "unread", "recent"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium ${activeFilter === filter
                      ? "bg-[#E8EFE0] text-black border border-[#6F9C3D]"
                      : "text-neutral-400 hover:bg-gray-100 border border-neutral-400"
                    }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)} ({counts[filter]})
                </button>
              ))}
              <button
                onClick={() => setShowNewMessageModal(true)}
                className="bg-[#6F9C3D] hover:bg-[#5a7d31] text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                New Message
              </button>
            </div>
          </div>

          {/* Table */}
          <MessagesTable
            messages={filteredMessages}
            onView={handleViewMessage}
            onReply={handleReply}
          />
        </>
      )}

      {/* Modals */}
      <MessageViewModal
        isOpen={showMessageModal}
        onClose={() => setShowMessageModal(false)}
        message={selectedMessage}
        onReply={handleReply}
      />

      <NewMessageModal
        isOpen={showNewMessageModal}
        onClose={() => setShowNewMessageModal(false)}
        onSend={handleSendNewMessage}
      />
    </>
  );
};

export default Messages;