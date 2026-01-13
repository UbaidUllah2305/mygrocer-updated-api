import React from "react";
import { ChevronDown } from "lucide-react";

const DeliveryOptionCard = ({
  label,
  sublabel,
  price,
  selected,
  onClick,
  expandable,
}) => (
  <div
    onClick={onClick}
    className={`flex items-center justify-between p-4 h-14 rounded-lg border cursor-pointer transition ${
      selected ? "border-[#6F9C3D]" : "border-[#B9BBBD]"
    }`}
  >
    <div className="flex items-center gap-3">
      <div
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
          selected ? "border-[#6F9C3D]" : "border-gray-300"
        }`}
      >
        {selected && <div className="w-2.5 h-2.5 rounded-full bg-[#6F9C3D]" />}
      </div>
      <div>
        <p className="text-sm font-normal text-gray-800">{label}</p>
        {sublabel && <p className="text-xs text-gray-500">{sublabel}</p>}
      </div>
    </div>
    <div className="flex items-center gap-2">
      {price !== undefined && (
        <span className="text-sm font-medium p-1 px-2 bg-[#6F9C3D4F] text-[#6F9C3D] rounded-2xl">
          {price === 0 ? "FREE" : `Rs. ${price}`}
        </span>
      )}
      {expandable && <ChevronDown className="w-5 h-5 text-gray-400" />}
    </div>
  </div>
);

export default DeliveryOptionCard;