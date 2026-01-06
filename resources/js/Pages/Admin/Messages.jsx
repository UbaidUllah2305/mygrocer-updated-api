import React, { useState, useEffect, useRef } from 'react';
import Header from '../../Components/Admin/Header';
import Sidebar from '../../Components/Admin/Sidebar';
import { router } from '@inertiajs/react';
import { Eye, CornerDownLeft, CornerDownRight, Star, Send, ArrowUp } from 'lucide-react';

// Message View Popup Modal (Screen 2)
const MessageViewModal = ({ isOpen, onClose, message, onReply }) => {
  if (!isOpen || !message) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="relative bg-white rounded-lg w-full max-w-[1039px] h-auto max-h-[373px] shadow-xl border border-gray-200">
        {/* Close Button - positioned at top right corner */}
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 z-10"
          aria-label="Close"
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="15" cy="15" r="15" fill="#DF3A3A" />
              <path d="M10 10L20 20M20 10L10 20" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </button>

        <div className="p-5">
          {/* Header text */}
          <p className="md:text-lg text-neutral-900 mb-4" style={{ fontFamily: "'Satoshi'" }}>
            You have received a message from the Customer
          </p>

          {/* Customer Name and Time */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-2xl text-[#2c323c]" style={{ fontFamily: "'Satoshi'" }}>
              Customer Name: {message.customerName}
            </h2>
            <div className="text-sm text-gray-500 flex items-center gap-4" style={{ fontFamily: "'Inter', sans-serif" }}>
              <span>{message.time}</span>
              <span>{message.fullDate}</span>
            </div>
          </div>

          {/* Message Content Box - with border instead of background */}
          <div className="border border-gray-200 rounded-lg p-4 mb-4 flex items-center justify-between bg-white md:h-20">
            <p className="text-xl md:text-2xl text-[#3a3e47] flex-1" style={{ fontFamily: "'Satoshi'" }}>
              {message.fullMessage}
            </p>
            <button className="ml-4 text-gray-300 hover:text-yellow-500 transition shrink-0">
              <Star className="w-5 h-5" />
            </button>
          </div>

          {/* Reply Button - centered, not full width */}
          <div className="flex justify-end md:h-16">
            <button
              onClick={() => onReply(message)}
              className="bg-[#6F9C3D] hover:bg-[#5a7d31] text-white px-16 py-2.5 rounded-lg font-medium text-base md:text-xl transition"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Chat Interface 
const ChatView = ({ conversation, onBack, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation?.messages]);

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!conversation) return null;

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] min-h-[500px]">
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {conversation.messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.isCustomer ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg px-4 py-3 ${msg.isCustomer
                ? 'bg-[#e8f5e0] text-[#3a3e47]'
                : 'bg-gray-100 text-[#3a3e47]'
                }`}
            >
              <p className="text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
                {msg.text}
              </p>
              <p className="text-xs text-gray-400 mt-1 text-right">
                {msg.time}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Area */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Hi, what is the price of this item and do you have any ongoing discounts?"
            className="flex-1 bg-transparent outline-none text-base text-[#3a3e47]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          />
          <button
            onClick={handleSend}
            disabled={!newMessage.trim()}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition ${newMessage.trim()
              ? 'bg-[#6F9C3D] hover:bg-[#5a7d31] text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// New Message Modal
const NewMessageModal = ({ isOpen, onClose, onSend }) => {
  const [recipient, setRecipient] = useState('');
  const [messageType, setMessageType] = useState('');
  const [messageContent, setMessageContent] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (recipient && messageContent) {
      onSend({ recipient, messageType, messageContent });
      setRecipient('');
      setMessageType('');
      setMessageContent('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="relative bg-white rounded-xl w-full max-w-[500px] shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10"
          aria-label="Close"
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="15" cy="15" r="15" fill="#DF3A3A" />
              <path d="M10 10L20 20M20 10L10 20" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </button>

        <div className="p-6">
          <h2 className="text-xl font-bold text-[#2c323c] mb-6" style={{ fontFamily: "'Satoshi', sans-serif" }}>
            New Message
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Customer Name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/30 outline-none transition text-sm"
                style={{ fontFamily: "'Inter', sans-serif" }}
              />
            </div>

            <div className="mb-4">
              <select
                value={messageType}
                onChange={(e) => setMessageType(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/30 outline-none transition text-sm text-gray-500 appearance-none bg-white"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <option value="">Select Message Type</option>
                <option value="Order Update">Order Update</option>
                <option value="Delivery Update">Delivery Update</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Promotion">Promotion</option>
              </select>
            </div>

            <div className="mb-6">
              <textarea
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                placeholder="Type your message..."
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/30 outline-none transition text-sm resize-none"
                style={{ fontFamily: "'Inter', sans-serif" }}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#6F9C3D] hover:bg-[#5a7d31] text-white py-3 rounded-lg font-semibold text-base transition"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const Messages = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [activeConversation, setActiveConversation] = useState(null);

  // Mock data for messages
  const [messages, setMessages] = useState([
    {
      id: 1,
      customerName: 'Fareed Ahmad',
      type: 'New Order',
      briefMsg: 'Plz add eggs in...',
      dateRange: '01-01-2024 to 2024-12-31',
      status: 'Seen',
      time: '3:45 PM',
      fullDate: '19-09-2025',
      fullMessage: 'Please extend the expiry date of subscription.',
      messages: [
        { text: 'Hi! I placed an order a few minutes ago. Can you confirm if it will be delivered today?', isCustomer: true, time: '3:45 PM' },
        { text: 'Hello! Yes, I can check that for you. Can you share your order ID?', isCustomer: false, time: '3:45 PM' },
        { text: "Sure, it's #ORD-1198.", isCustomer: true, time: '3:45 PM' },
        { text: 'Thanks! I just checked. Your order is packed and will be delivered within 45 minutes.', isCustomer: false, time: '3:45 PM' },
        { text: 'Great! One more thing, the tomatoes I received last time were damaged.', isCustomer: true, time: '3:45 PM' },
      ]
    },
    {
      id: 2,
      customerName: 'Alia Ruksar',
      type: 'Order Delivery',
      briefMsg: 'When my order...',
      dateRange: '01-01-2024 to 2024-12-31',
      status: 'Unread',
      time: '3:45 PM',
      fullDate: '19-09-2025',
      fullMessage: 'Hello, can you tell me when my order will be delivered? My Order ID is #12345.',
      messages: [
        { text: 'Hello, can you tell me when my order will be delivered? My Order ID is #12345.', isCustomer: true, time: '3:45 PM' },
      ]
    },
    {
      id: 3,
      customerName: 'Samia',
      type: 'Order Confirmation',
      briefMsg: 'Confirm my order...',
      dateRange: '01-01-2024 to 2024-12-31',
      status: 'Replied',
      time: '3:45 PM',
      fullDate: '19-09-2025',
      fullMessage: 'Can you please confirm my order details? I want to make sure everything is correct.',
      messages: [
        { text: 'Can you please confirm my order details? I want to make sure everything is correct.', isCustomer: true, time: '3:40 PM' },
        { text: 'Sure! Your order #ORD-5567 includes 2kg Apples, 1kg Oranges, and 500g Grapes. Total: Rs. 850.', isCustomer: false, time: '3:42 PM' },
        { text: 'Perfect, thank you!', isCustomer: true, time: '3:45 PM' },
      ]
    },
  ]);

  // Filter messages based on active filter
  const filteredMessages = messages.filter(msg => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return msg.status === 'Unread';
    if (activeFilter === 'recent') return true; // Show last 2 for recent
    return true;
  }).slice(0, activeFilter === 'recent' ? 2 : undefined);

  const getCounts = () => {
    const all = messages.length;
    const unread = messages.filter(m => m.status === 'Unread').length;
    const recent = Math.min(2, messages.length);
    return { all, unread, recent };
  };

  const counts = getCounts();

  // Sidebar toggle logic
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    if (isMobile) setIsSidebarOpen(false);
  };

  const handleSidebarChange = (id) => {
    const paths = {
      dashboard: "/dashboard",
      inventory: "/inventory",
      analytics: "/analytics",
      trends: "/trends",
      adjustments: "/adjustments",
      overheads: "/overheads",
      events: "/events",
      offers: "/offers",
      orders: "/orders",
      messages: "/messages",
      accounts: "/accounts",
      vouchers: "/settings/vouchers",
      delivery: "/settings/deliverysettings",
      subscription: "/settings/subscription",
      "vendor-dashboard": "/settings/vendor-dashboard",
      "help-center": "/settings/help-center",
    };

    if (paths[id]) {
      router.visit(paths[id], {
        preserveScroll: true,
        preserveState: true,
      });
    }

    if (isMobile) {
      closeSidebar();
    }
  };

  const handleViewMessage = (message) => {
    setSelectedMessage(message);
    setShowMessageModal(true);
    // Mark as seen
    setMessages(prev => prev.map(m =>
      m.id === message.id ? { ...m, status: 'Seen' } : m
    ));
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
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
      };

      setMessages(prev => prev.map(m =>
        m.id === activeConversation.id
          ? { ...m, messages: [...m.messages, newMessage], status: 'Replied' }
          : m
      ));

      setActiveConversation(prev => ({
        ...prev,
        messages: [...prev.messages, newMessage]
      }));
    }
  };

  const handleBackToInbox = () => {
    setActiveConversation(null);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Seen':
        return 'text-[#6F9C3D]';
      case 'Unread':
        return 'text-[#ff8b2c] font-semibold';
      case 'Replied':
        return 'text-[#3b82f6]';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#161c2b]">
      {/* Fixed Header */}
      <div className="shrink-0">
        <Header
          isMobile={isMobile}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={toggleSidebar}
        />
      </div>

      {/* Sidebar + Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          active="messages"
          onChange={handleSidebarChange}
          isMobile={isMobile}
          mobileOpen={isMobile ? isSidebarOpen : true}
          onCloseMobile={closeSidebar}
        />

        {/* Main Content */}
        <main
          className={`flex-1 overflow-y-auto p-4 sm:p-6 transition-all duration-300 ${isMobile ? "ml-0" : "ml-64"}`}
          style={{ marginTop: "99px" }}
        >
          {/* Breadcrumb */}
          <div className="text-base sm:text-lg text-gray-500 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
            Dashboard / Messages
          </div>

          {/* Show Chat View or Inbox */}
          {activeConversation ? (
            <>
              {/* Page Title for Chat View */}
              <h1 className="text-2xl sm:text-3xl font-semibold mb-6" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                Messages
              </h1>
              {/* Back Button and Customer Info */}
              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={handleBackToInbox}
                  className="flex items-center gap-2 text-[#6F9C3D] hover:text-[#5a7d31] transition"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <CornerDownLeft className="w-5 h-5 rotate-90" />
                  <span>Back to Messages</span>
                </button>
                <div className="flex-1 text-center">
                  <span className="font-semibold text-[#3a3e47]" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                    {activeConversation.customerName}
                  </span>
                </div>
              </div>
              <ChatView
                conversation={activeConversation}
                onBack={handleBackToInbox}
                onSendMessage={handleSendMessage}
              />
            </>
          ) : (
            <>
              {/* Title, Filters and New Message Button - all on same line */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                {/* Page Title */}
                <h1 className="text-xl sm:text-2xl font-medium">
                  Messages
                </h1>

                {/* Filter Tabs and New Message Button */}
                <div className="flex items-center gap-1 sm:gap-2 h-12">
                  <button
                    onClick={() => setActiveFilter('all')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${activeFilter === 'all'
                      ? 'bg-[#E8EFE0] text-black border border-[#6F9C3D]'
                      : 'text-neutral-400 hover:bg-gray-100 border border-neutral-400'
                      }`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    All ({counts.all})
                  </button>
                  <button
                    onClick={() => setActiveFilter('unread')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${activeFilter === 'unread'
                      ? 'bg-[#E8EFE0] text-black border border-[#6F9C3D]'
                      : 'text-neutral-400 hover:bg-gray-100 border border-neutral-400'
                      }`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Unread ({counts.unread})
                  </button>
                  <button
                    onClick={() => setActiveFilter('recent')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${activeFilter === 'recent'
                      ? 'bg-[#E8EFE0] text-black border border-[#6F9C3D]'
                      : 'text-neutral-400 hover:bg-gray-100 border border-neutral-400'
                      }`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Recent ({counts.recent})
                  </button>
                  <button
                    className="p-2 rounded-lg text-neutral-400 border border-neutral-400 hover:bg-gray-100 transition"
                    title="Filter"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                    </svg>
                  </button>

                  {/* New Message Button */}
                  <button
                    onClick={() => setShowNewMessageModal(true)}
                    className="bg-[#6F9C3D] hover:bg-[#5a7d31] text-white px-6 py-2 rounded-lg text-lg font-medium max-w-46 transition ml-2"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    New Message
                  </button>
                </div>
              </div>

              {/* Messages Table */}
              <div className="overflow-x-auto">
                <div className="min-w-[900px]">
                  {/* Table Header */}
                  <div className="rounded-xl bg-[#E8EFE0] p-4">
                    <div className="grid grid-cols-7 gap-2 text-base lg:text-lg font-medium text-neutral-800" style={{ fontFamily: "'Inter', sans-serif" }}>
                      <div className="text-left ml-9">#</div>
                      <div className="text-left truncate">Customer Name</div>
                      <div className="text-center truncate">Type</div>
                      <div className="text-center truncate">Brief Msg</div>
                      <div className="text-center truncate">Date</div>
                      <div className="text-center truncate">Status</div>
                      <div className="text-center truncate">View</div>
                    </div>
                  </div>

                  {/* Table Rows */}
                  <div className="mt-2 space-y-2">
                    {filteredMessages.map((message, idx) => (
                      <div
                        key={message.id}
                        className="rounded-xl bg-[rgba(216,216,216,0.23)] p-4 hover:bg-[rgba(216,216,216,0.35)] transition cursor-pointer"
                        onClick={() => handleViewMessage(message)}
                      >
                        <div className="grid grid-cols-7 gap-2 items-center text-base lg:text-lg text-[#3a3e47]" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                          <div className="text-left ml-9">{idx + 1}</div>
                          <div className="text-left truncate">{message.customerName}</div>
                          <div className="text-center truncate">{message.type}</div>
                          <div className="text-center truncate">{message.briefMsg}</div>
                          <div className="text-center text-sm">
                            <div>{message.dateRange.split(' to ')[0]}</div>
                            <div>to {message.dateRange.split(' to ')[1]}</div>
                          </div>
                          <div className={`text-center ${getStatusStyle(message.status)}`}>
                            {message.status}
                          </div>
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewMessage(message);
                              }}
                              className="p-2 text-gray-500 hover:text-[#6F9C3D] hover:bg-[#6F9C3D]/10 rounded-lg transition"
                              title="View Message"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleReply(message);
                              }}
                              className="p-2 text-gray-900 hover:text-[#6F9C3D] hover:bg-[#6F9C3D]/10 rounded-lg transition"
                              title="Reply"
                            >
                              <CornerDownRight className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Empty State */}
              {filteredMessages.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg" style={{ fontFamily: "'Inter', sans-serif" }}>
                    No messages found
                  </p>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Message View Modal */}
      <MessageViewModal
        isOpen={showMessageModal}
        onClose={() => setShowMessageModal(false)}
        message={selectedMessage}
        onReply={handleReply}
      />

      {/* New Message Modal */}
      <NewMessageModal
        isOpen={showNewMessageModal}
        onClose={() => setShowNewMessageModal(false)}
        onSend={(msg) => {
          console.log('Sending new message:', msg);
          // Add logic to create new conversation
        }}
      />
    </div>
  );
};

export default Messages;

