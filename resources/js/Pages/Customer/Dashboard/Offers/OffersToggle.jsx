import React from "react";

const OffersToggle = ({ isEnabled, onToggle }) => {
  return (
    <div className="group relative">
      <div className="absolute -top-10 right-0 bg-white border border-gray-200 rounded-lg p-2 text-xs text-[#6F9C3D] shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10 whitespace-nowrap">
        By turning on you will receive offers from all stores.
      </div>

      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={isEnabled}
          onChange={onToggle}
          className="sr-only"
        />
        <div
          className={`relative w-10 h-6 rounded-full transition-colors ${isEnabled ? "bg-[#6F9C3D]" : "bg-[#ABABAB]"}`}
        >
          <div
            className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isEnabled ? "transform translate-x-4" : ""}`}
          ></div>
        </div>
      </label>
    </div>
  );
};

export default OffersToggle;