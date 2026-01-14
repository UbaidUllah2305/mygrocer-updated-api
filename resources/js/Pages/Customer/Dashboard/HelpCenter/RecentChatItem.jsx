import React from "react";

const RecentChatItem = ({ chat }) => {
  return (
    <div className="flex items-center justify-between p-3 border border-[#00000026] rounded-lg cursor-pointer hover:bg-[#f7f7f7] transition">
      <div className="flex items-center gap-3 flex-1">
        <img
          src={`/assets/Assets/Customer/helpcenter/${chat.vendor.toLowerCase().replace(/\s+/g, '')}.svg`}
          alt={chat.vendor}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <div className="font-semibold">{chat.vendor}</div>
          <div className="text-xs font-light truncate">{chat.message}</div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="inline-flex items-center justify-center w-6 h-6 bg-[#6F9C3D] text-white text-xs rounded-full">
          {chat.badge || "1"}
        </span>
        <span className="text-xs font-light">{chat.time}</span>
      </div>
    </div>
  );
};

export default RecentChatItem;