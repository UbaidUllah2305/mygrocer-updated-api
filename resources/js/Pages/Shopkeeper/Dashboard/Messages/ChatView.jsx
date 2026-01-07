import React, { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";

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
            placeholder="Type your reply..."
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

export default ChatView;