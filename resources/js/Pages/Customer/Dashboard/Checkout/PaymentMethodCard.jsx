import React from "react";

const PaymentMethodCard = ({
  iconSrc,
  label,
  price,
  isSelected,
  onClick,
  actionLabel,
  isExpanded,
  onAddDetailsClick,
}) => (
  <div
    onClick={onClick}
    className={`flex items-center w-full justify-between p-4 rounded-lg border cursor-pointer transition ${isSelected
        ? "border-[#6F9C3D] bg-[#6F9C3D08]"
        : "border-gray-200 hover:border-gray-300"
      }`}
  >
    <div className="flex items-center gap-3">
      {iconSrc ? (
        <img src={iconSrc} alt={label} className="w-6 h-6 object-contain" />
      ) : (
        <span className="text-lg">💳</span>
      )}
      <span className="text-sm font-medium text-gray-800">{label}</span>
    </div>
    <div className="flex items-center gap-2">
      {price && !isExpanded && (
        <span className="text-sm text-gray-600">Rs.{price}</span>
      )}
      {actionLabel && isExpanded && (
        <button
          className="px-3 py-1 bg-[#6F9C3D] text-white text-xs rounded-md hover:bg-[#5d8a32] transition"
          onClick={(e) => {
            e.stopPropagation(); 
            onAddDetailsClick?.();
          }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  </div>
);

export default PaymentMethodCard;