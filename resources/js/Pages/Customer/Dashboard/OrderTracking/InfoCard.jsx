import React from "react";

const InfoCard = ({ icon, title, children }) => {
  return (
    <div className="bg-[#6F9C3D29] rounded-xl p-4 shadow-sm border border-gray-100 flex-1 min-w-[200px] max-w-[432px]">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-[#6F9C3D] flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-base font-medium mb-1">{title}</p>
          {children}
        </div>
      </div>
    </div>
  );
};

export default InfoCard;