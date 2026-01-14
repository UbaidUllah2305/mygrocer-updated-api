import React from "react";

const WalletStatsCard = ({ title, value }) => (
  <div className="bg-[#6F9C3D29] flex flex-row justify-between rounded-xl p-4">
    <h3 className="text-xl md:text-2xl font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
      {title}
    </h3>
    <span className="text-xl md:text-2xl font-semibold text-[#6F9C3D]">{value}</span>
  </div>
);

export default WalletStatsCard;