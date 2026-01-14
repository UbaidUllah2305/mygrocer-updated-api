import React from "react";
import { SquarePen } from "lucide-react";
import {
  User,
  FileText,
  Gift,
  Coins,
  MapPin,
  ClipboardList,
  Bell,
  Clock,
  BookOpen,
  ShoppingBag,
  DollarSign,
  HelpCircle,
} from "lucide-react";
import { 
    FaRegHeart, 
    FaShoppingCart, 
    FaUser, 
    FaBars, 
    FaTimes, 
    FaGlobe, 
    FaChevronDown, 
    FaTicketAlt, 
    FaWallet, 
    FaMapMarkerAlt, 
    FaClipboardList, 
    FaDollarSign,
    FaBell,
    FaClock, 
    FaBookOpen, 
    FaTags, 
    FaQuestionCircle, 
} from "react-icons/fa";

const UserManualCard = ({ card, onEdit }) => {
  // Render Lucide Icon
  const renderIcon = (iconName) => {
    switch (iconName) {
      case "User": return <FaUser className="w-6 h-6 text-[#6F9C3D]" />;
      case "FileText": return <FaShoppingCart className="w-6 h-6 text-[#6F9C3D]" />;
      case "Gift": return <FaTicketAlt className="w-6 h-6 text-[#6F9C3D]" />;
      case "Coins": return <FaWallet className="w-6 h-6 text-[#6F9C3D]" />;
      case "MapPin": return <FaMapMarkerAlt className="w-6 h-6 text-[#6F9C3D]" />;
      case "ClipboardList": return <FaClipboardList className="w-6 h-6 text-[#6F9C3D]" />;
      case "Bell": return <FaBell className="w-6 h-6 text-[#6F9C3D]" />;
      case "Clock": return <FaClock className="w-6 h-6 text-[#6F9C3D]" />;
      case "BookOpen": return <FaBookOpen className="w-6 h-6 text-[#6F9C3D]" />;
      case "ShoppingBag": return <FaTags className="w-6 h-6 text-[#6F9C3D]" />;
      case "DollarSign": return <FaDollarSign className="w-6 h-6 text-[#6F9C3D]" />;
      case "HelpCircle": return <FaQuestionCircle className="w-6 h-6 text-[#6F9C3D]" />;
      default: return <BookOpen className="w-6 h-6 text-[#6F9C3D]" />;
    }
  };

  return (
    <div className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition border border-gray-200">
      <div className="relative flex items-start gap-3">
        <div className="mt-1">{renderIcon(card.icon)}</div>
        <div>
          <h3 className="font-semibold text-lg md:text-xl text-neutral-700">{card.title}</h3>
          <p className="text-sm md:text-base text-neutral-900 mt-1">{card.description}</p>
        </div>
        <div className="absolute right-0 top-1">
          <SquarePen
            className="w-5 h-5 text-[#6F9C3D] cursor-pointer"
            onClick={() => onEdit(card)}
          />
        </div>
      </div>
    </div>
  );
};

export default UserManualCard;