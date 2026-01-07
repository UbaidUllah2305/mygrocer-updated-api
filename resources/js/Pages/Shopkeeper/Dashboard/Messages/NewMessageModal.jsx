import React, { useState } from "react";

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

export default NewMessageModal;