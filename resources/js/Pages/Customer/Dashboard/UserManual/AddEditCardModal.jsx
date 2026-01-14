import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
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

const AddEditCardModal = ({ 
  isOpen, 
  onClose, 
  isEditing = false, 
  editingCard = null, 
  onSave 
}) => {
  const [cardName, setCardName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("User");
  const [iconFile, setIconFile] = useState(null);
  const [iconPreview, setIconPreview] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isOpen && isEditing && editingCard) {
      setCardName(editingCard.title || "");
      setDescription(editingCard.description || "");
      setSelectedIcon(editingCard.icon || "User");
      setIconFile(null);
      setIconPreview(null);
    } else if (isOpen && !isEditing) {
      setCardName("");
      setDescription("");
      setSelectedIcon("User");
      setIconFile(null);
      setIconPreview(null);
    }
  }, [isOpen, isEditing, editingCard]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setIconFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setIconPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCard = {
      id: isEditing ? editingCard.id : Date.now().toString(),
      title: cardName.trim(),
      description: description.trim(),
      icon: iconFile || selectedIcon,
      link: "/customer/settings",
      isCustomIcon: !!iconFile,
    };
    onSave(newCard, isEditing ? editingCard.id : null);
    onClose();
  };

  if (!isOpen) return null;

  // Render preview icon
  const renderPreviewIcon = () => {
    if (iconPreview) {
      return <img src={iconPreview} alt="Custom Icon" className="w-16 h-16 object-contain" />;
    }
    
    const iconMap = {
      User: <User className="w-6 h-6 text-[#6F9C3D]" />,
      FileText: <FileText className="w-6 h-6 text-[#6F9C3D]" />,
      Gift: <Gift className="w-6 h-6 text-[#6F9C3D]" />,
      Coins: <Coins className="w-6 h-6 text-[#6F9C3D]" />,
      MapPin: <MapPin className="w-6 h-6 text-[#6F9C3D]" />,
      ClipboardList: <ClipboardList className="w-6 h-6 text-[#6F9C3D]" />,
      Bell: <Bell className="w-6 h-6 text-[#6F9C3D]" />,
      Clock: <Clock className="w-6 h-6 text-[#6F9C3D]" />,
      BookOpen: <BookOpen className="w-6 h-6 text-[#6F9C3D]" />,
      ShoppingBag: <ShoppingBag className="w-6 h-6 text-[#6F9C3D]" />,
      DollarSign: <DollarSign className="w-6 h-6 text-[#6F9C3D]" />,
      HelpCircle: <HelpCircle className="w-6 h-6 text-[#6F9C3D]" />,
    };
    return iconMap[selectedIcon] || iconMap.BookOpen;
  };

  const iconOptions = [
    "User", "FileText", "Gift", "Coins", "MapPin", "ClipboardList",
    "Bell", "Clock", "BookOpen", "ShoppingBag", "DollarSign", "HelpCircle"
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="relative bg-white rounded-xl w-full max-w-[580px] shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 bg-red-500 rounded-full text-white z-10"
          aria-label="Close"
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <X />
          </div>
        </button>

        <div className="p-6">
          <h2 className="text-xl md:text-2xl font-semibold text-neutral-900 mb-6" style={{ fontFamily: "'Satoshi', sans-serif" }}>
            {isEditing ? "Edit Main Card" : "Add Main Card"}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="Card Name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/30 outline-none transition text-sm"
                style={{ fontFamily: "'Inter', sans-serif" }}
                required
              />
            </div>

            <div className="mb-4">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write description here"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/30 outline-none transition text-sm"
                style={{ fontFamily: "'Inter', sans-serif" }}
                rows="3"
                required
              />
            </div>

            <div className="mb-6">
              <div className="flex flex-col items-center gap-3">
                <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  {renderPreviewIcon()}
                </div>
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="icon-upload"
                    className="px-4 py-2 bg-[#6F9C3D] text-white rounded-lg hover:bg-[#5a7d31] transition"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Choose File
                  </label>
                  <input
                    id="icon-upload"
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <span className="text-sm text-gray-500">
                    {iconFile ? iconFile.name : "No file chosen"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full bg-[#6F9C3D] hover:bg-[#5a7d31] text-white py-3 rounded-lg font-semibold text-base md:text-lg transition"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {isEditing ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditCardModal;