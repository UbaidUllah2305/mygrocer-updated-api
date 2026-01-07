import React from "react";
import { Eye, CornerDownRight } from "lucide-react";

const getStatusStyle = (status) => {
  switch (status) {
    case "Seen": return "text-[#6F9C3D]";
    case "Unread": return "text-[#ff8b2c] font-semibold";
    case "Replied": return "text-[#3b82f6]";
    default: return "text-gray-500";
  }
};

const MessagesTable = ({ messages, onView, onReply }) => {
  if (messages.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 text-center text-sm text-gray-600">
        No messages found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-[#E8EFE0] text-neutral-800 text-base lg:text-lg font-medium">
            <th className="p-4 rounded-tl-xl rounded-bl-xl">#</th>
            <th className="p-4">Customer Name</th>
            <th className="p-4">Type</th>
            <th className="p-4">Brief Msg</th>
            <th className="p-4">Date</th>
            <th className="p-4">Status</th>
            <th className="p-4 rounded-tr-xl rounded-br-xl">Actions</th>
          </tr>
        </thead>

        {/* Spacer row */}
        <tbody>
          <tr><td colSpan="7" className="h-2"></td></tr>
        </tbody>

        <tbody>
          {messages.map((message, index) => (
            <tr
              key={message.id}
              className="text-base lg:text-lg text-[#3a3e47] bg-[rgba(216,216,216,0.23)] border-b border-gray-200 hover:bg-[rgba(216,216,216,0.35)] transition"
              // ✅ REMOVED onClick from row
            >
              <td className={`p-4 pl-8 ${index === 0 ? "rounded-tl-xl" : ""}`}>
                {index + 1}
              </td>
              <td className="p-4 text-center">{message.customerName}</td>
              <td className="p-4 text-center">{message.type}</td>
              <td className="p-4 text-center">{message.briefMsg}</td>
              <td className="p-4 text-center text-sm">
                <div>{message.dateRange.split(' to ')[0]}</div>
                <div>to {message.dateRange.split(' to ')[1]}</div>
              </td>
              <td className={`p-4 text-center ${getStatusStyle(message.status)}`}>
                {message.status}
              </td>
              <td className={`p-4 text-center ${index === 0 ? "rounded-tr-xl" : ""}`}>
                <div className="flex items-center justify-center gap-2">
                  {/* ✅ Only Eye button opens view modal */}
                  <button
                    onClick={() => onView(message)} // ✅ No stopPropagation needed now
                    className="p-1.5 text-gray-500 hover:text-[#6F9C3D] hover:bg-[#6F9C3D]/10 rounded transition"
                    title="View Message"
                  >
                    <Eye size={19} />
                  </button>
                  <button
                    onClick={() => onReply(message)}
                    className="p-1.5 text-gray-900 hover:text-[#6F9C3D] hover:bg-[#6F9C3D]/10 rounded transition"
                    title="Reply"
                  >
                    <CornerDownRight size={19} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MessagesTable;