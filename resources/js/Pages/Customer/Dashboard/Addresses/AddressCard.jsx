import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Briefcase, Heart, Home, Plus } from "lucide-react";

const AddressCard = ({ address, isSelected, onSelect, onEdit, onDelete }) => {

  const AddressIcon = ({ iconType }) => {
    const iconProps = { className: "text-[#000000]", size: 30 };

    switch (iconType) {
      case "briefcase":
        return <Briefcase {...iconProps} />;
      case "heart":
        return <Heart {...iconProps} />;
      case "home":
        return <Home {...iconProps} />;
      case "plus":
        return <Plus {...iconProps} />;
      default:
        return <Home {...iconProps} />;
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <input
          type="radio"
          name="address"
          value={address.id}
          checked={isSelected}
          onChange={() => onSelect(address.id)}
          className="h-5 w-5 text-[#6F9C3D] border-gray-300"
        />
        <AddressIcon iconType={address.icon} />
      </div>

      <div className="flex-1 ml-4">
        <h3 className="font-medium text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
          {address.type}
        </h3>
        <p className="text-base mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
          {address.address}
        </p>
        <p className="text-base mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
          {address.note}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => onEdit(address.id)}
          className="text-[#6F9C3D] hover:text-green-800 transition"
        >
          <Pencil className="w-5 h-5" />
        </button>
        <button
          onClick={() => onDelete(address.id)}
          className="text-red-600 hover:text-red-800 transition"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default AddressCard;