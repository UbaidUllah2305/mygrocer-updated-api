import React from "react";
import { Eye, Star } from "lucide-react";

const MessageViewModal = ({ isOpen, onClose, message, onReply }) => {
  if (!isOpen || !message) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="relative bg-white rounded-lg w-full max-w-[1039px] h-auto max-h-[373px] shadow-xl border border-gray-200">
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 z-10"
          aria-label="Close"
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 30 30" fill="none">
              <circle cx="15" cy="15" r="15" fill="#DF3A3A" />
              <path d="M10 10L20 20M20 10L10 20" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </button>

        <div className="p-5">
          <p className="md:text-lg text-neutral-900 mb-4" style={{ fontFamily: "'Satoshi'" }}>
            You have received a message from the Customer
          </p>

          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-2xl text-[#2c323c]" style={{ fontFamily: "'Satoshi'" }}>
              Customer Name: {message.customerName}
            </h2>
            <div className="text-sm text-gray-500 flex items-center gap-4" style={{ fontFamily: "'Inter', sans-serif" }}>
              <span>{message.time}</span>
              <span>{message.fullDate}</span>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 mb-4 flex items-center justify-between bg-white md:h-20">
            <p className="text-xl md:text-2xl text-[#3a3e47] flex-1" style={{ fontFamily: "'Satoshi'" }}>
              {message.fullMessage}
            </p>
            <button className="ml-4 text-gray-300 hover:text-yellow-500 transition shrink-0">
              <Star className="w-5 h-5" />
            </button>
          </div>

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

export default MessageViewModal;