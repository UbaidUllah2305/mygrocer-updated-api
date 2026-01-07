// resources/js/Pages/Customer/UserManualPage.jsx
import React, { useState, useEffect } from "react";
import { Link, router } from "@inertiajs/react";
import { SquarePen, X } from "lucide-react";

// Import Lucide Icons
import { User, FileText, Gift, Coins, MapPin, ClipboardList, Bell, Clock, BookOpen, ShoppingBag, DollarSign, HelpCircle } from 'lucide-react';

// Import Customer Header Only
import CustomerHeader from "../../Components/Customer/CustomerHeader";

const UserManualPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  // Mock help cards data using Lucide icons
  const [helpCards, setHelpCards] = useState([
    { id: "profile", title: "Profile", description: "How to view and edit your profile?", icon: "User", link: "/customer/profile" },
    { id: "orders-reordering", title: "Orders & Reordering", description: "How to view past orders and reorder?", icon: "FileText", link: "/customer/orders-reordering" },
    { id: "vouchers", title: "Vouchers", description: "How to view and redeem vouchers?", icon: "Gift", link: "/customer/vouchers" },
    { id: "loyalty-wallet", title: "Loyalty Wallet", description: "How to earn and spend loyalty points?", icon: "Coins", link: "/customer/loyalty-wallet" },
    { id: "addresses", title: "Addresses", description: "How to add, edit, or delete delivery addresses?", icon: "MapPin", link: "/customer/addresses" },
    { id: "my-list", title: "My List", description: "How to create and manage your shopping lists?", icon: "ClipboardList", link: "/customer/my-list" },
    { id: "notifications", title: "Notifications", description: "How to manage push & email notifications?", icon: "Bell", link: "/customer/notifications" },
    { id: "reminders", title: "Reminders", description: "How to set up product reminders?", icon: "Clock", link: "/customer/reminders" },
    { id: "user-manual", title: "User Manual", description: "How to use the app features?", icon: "BookOpen", link: "/customer/user-manual" },
    { id: "offers", title: "Offers", description: "How to browse and claim offers?", icon: "ShoppingBag", link: "/customer/offers" },
    { id: "select-currency", title: "Select Currency", description: "How to change your preferred currency?", icon: "DollarSign", link: "/customer/select-currency" },
    { id: "help-center", title: "Help Center", description: "How to get support or report issues?", icon: "HelpCircle", link: "/customer/help-center" },
  ]);

  // Header mobile handling
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    // No-op since sidebar is removed
  };

  // Modal Component: Add/Edit Card
  const AddEditCardModal = ({ isOpen, onClose }) => {
    const [cardName, setCardName] = useState("");
    const [description, setDescription] = useState("");
    const [selectedIcon, setSelectedIcon] = useState("User");
    const [iconFile, setIconFile] = useState(null);
    const [iconPreview, setIconPreview] = useState(null);

    useEffect(() => {
      if (isOpen && isEditing && editingCard) {
        setCardName(editingCard.title);
        setDescription(editingCard.description);
        setSelectedIcon(editingCard.icon);
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
      const file = e.target.files[0];
      if (file) {
        setIconFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setIconPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      const newCard = {
        id: isEditing ? editingCard.id : Date.now().toString(),
        title: cardName,
        description: description,
        icon: iconFile ? iconFile : selectedIcon,
        link: "/customer/settings",
        isCustomIcon: !!iconFile,
      };

      if (isEditing) {
        setHelpCards(prev => prev.map(card => card.id === editingCard.id ? newCard : card));
        alert("Card updated successfully!");
      } else {
        setHelpCards(prev => [...prev, newCard]);
        alert("Card added successfully!");
      }

      onClose();
      setIsEditing(false);
      setEditingCard(null);
    };

    if (!isOpen) return null;

    // Render Lucide Icon
    const renderLucideIcon = (iconName) => {
      switch (iconName) {
        case 'User': return <User className="w-6 h-6 text-[#6F9C3D]" />;
        case 'FileText': return <FileText className="w-6 h-6 text-[#6F9C3D]" />;
        case 'Gift': return <Gift className="w-6 h-6 text-[#6F9C3D]" />;
        case 'Coins': return <Coins className="w-6 h-6 text-[#6F9C3D]" />;
        case 'MapPin': return <MapPin className="w-6 h-6 text-[#6F9C3D]" />;
        case 'ClipboardList': return <ClipboardList className="w-6 h-6 text-[#6F9C3D]" />;
        case 'Bell': return <Bell className="w-6 h-6 text-[#6F9C3D]" />;
        case 'Clock': return <Clock className="w-6 h-6 text-[#6F9C3D]" />;
        case 'BookOpen': return <BookOpen className="w-6 h-6 text-[#6F9C3D]" />;
        case 'ShoppingBag': return <ShoppingBag className="w-6 h-6 text-[#6F9C3D]" />;
        case 'DollarSign': return <DollarSign className="w-6 h-6 text-[#6F9C3D]" />;
        case 'HelpCircle': return <HelpCircle className="w-6 h-6 text-[#6F9C3D]" />;
        default: return <BookOpen className="w-6 h-6 text-[#6F9C3D]" />;
      }
    };

    const previewContent = iconPreview ? (
      <img src={iconPreview} alt="Custom Icon" className="w-16 h-16 object-contain" />
    ) : (
      renderLucideIcon(selectedIcon)
    );

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
                    {previewContent}
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

              <div className="flex justify-center" >
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

  const handleAddCard = () => {
    setIsEditing(false);
    setEditingCard(null);
    setShowAddModal(true);
  };

  const handleEditCard = (card) => {
    setIsEditing(true);
    setEditingCard(card);
    setShowAddModal(true);
  };

  // Render icon for card
  const renderCardIcon = (card) => {
    if (card.isCustomIcon && typeof card.icon !== 'string') {
      return <img src={URL.createObjectURL(card.icon)} alt={card.title} className="w-6 h-6" />;
    } else {
      const renderLucideIcon = (iconName) => {
        switch (iconName) {
          case 'User': return <User className="w-6 h-6 text-[#6F9C3D]" />;
          case 'FileText': return <FileText className="w-6 h-6 text-[#6F9C3D]" />;
          case 'Gift': return <Gift className="w-6 h-6 text-[#6F9C3D]" />;
          case 'Coins': return <Coins className="w-6 h-6 text-[#6F9C3D]" />;
          case 'MapPin': return <MapPin className="w-6 h-6 text-[#6F9C3D]" />;
          case 'ClipboardList': return <ClipboardList className="w-6 h-6 text-[#6F9C3D]" />;
          case 'Bell': return <Bell className="w-6 h-6 text-[#6F9C3D]" />;
          case 'Clock': return <Clock className="w-6 h-6 text-[#6F9C3D]" />;
          case 'BookOpen': return <BookOpen className="w-6 h-6 text-[#6F9C3D]" />;
          case 'ShoppingBag': return <ShoppingBag className="w-6 h-6 text-[#6F9C3D]" />;
          case 'DollarSign': return <DollarSign className="w-6 h-6 text-[#6F9C3D]" />;
          case 'HelpCircle': return <HelpCircle className="w-6 h-6 text-[#6F9C3D]" />;
          default: return <BookOpen className="w-6 h-6 text-[#6F9C3D]" />;
        }
      };
      return renderLucideIcon(card.icon);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Fixed Customer Header */}
      <CustomerHeader
        isMobile={isMobile}
        isSidebarOpen={false} // Sidebar is gone
        onToggleSidebar={toggleSidebar} // No-op
      />

      {/* Main Content — Full Width */}
      <main className="pt-20 px-4 sm:px-6 lg:px-8 pb-10">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div
            className="flex items-center gap-2 text-base md:text-lg mb-6 mt-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <Link href="/customer/dashboard" className="hover:text-[#6F9C3D]">
              Dashboard
            </Link>
            <span>/</span>
            <span className="font-medium underline">User Manual</span>
          </div>

          {/* Page Title & Add Button */}
          <div className="flex justify-between mb-6">
            <h1
              className="text-xl md:text-2xl font-semibold text-gray-900"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              User Manual
            </h1>
            <button
              onClick={handleAddCard}
              className="px-4 py-2 bg-[#6F9C3D] text-white text-base md:text-lg rounded-lg hover:bg-[#5A7E2F] transition"
            >
              Add Main Card
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {helpCards.map((card) => (
              <div
                key={card.id}
                className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition border border-gray-200"
              >
                <div className="relative flex items-start gap-3">
                  <div className="mt-1">
                    {renderCardIcon(card)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg md:text-xl text-neutral-700">{card.title}</h3>
                    <p className="text-sm md:text-base text-neutral-900 mt-1">{card.description}</p>
                  </div>
                  <div className="absolute right-0 top-1">
                    <SquarePen
                      className="w-5 h-5 text-[#6F9C3D] cursor-pointer"
                      onClick={() => handleEditCard(card)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Render Modal */}
          {showAddModal && (
            <AddEditCardModal
              isOpen={showAddModal}
              onClose={() => {
                setShowAddModal(false);
                setIsEditing(false);
                setEditingCard(null);
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default UserManualPage;