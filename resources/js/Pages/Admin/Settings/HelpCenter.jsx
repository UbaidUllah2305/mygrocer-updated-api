// resources/js/Pages/Admin/HelpCenter.jsx
import React, { useState, useEffect } from "react";
import { Link, router } from "@inertiajs/react";
import { SquarePen, X } from "lucide-react";

import RegisterIcon from '../../../../assets/icons/register.svg?react';
import InventoryIcon from '../../../../assets/icons/inventory.svg?react';
import OrdersIcon from '../../../../assets/icons/orders.svg?react';
import AnalyticsIcon from '../../../../assets/icons/analytics.svg?react';
import AdjustmentsIcon from '../../../../assets/icons/adjustments.svg?react';
import OverheadsIcon from '../../../../assets/icons/overheads.svg?react';
import TrendsIcon from '../../../../assets/icons/trends.svg?react';
import OffersIcon from '../../../../assets/icons/offers.svg?react';
import EventsIcon from '../../../../assets/icons/events.svg?react';
import AccountsIcon from '../../../../assets/icons/accounts.svg?react';
import SettingsIcon from '../../../../assets/icons/settings.svg?react';

import DeliveryIcon from '../../../../assets/icons/delivery.svg?react';
import VouchersIcon from '../../../../assets/icons/vouchers.svg?react';
import SubscriptionIcon from '../../../../assets/icons/subscription.svg?react';

// Import components
import Header from '../../../Components/Admin/Header';
import Sidebar from '../../../Components/Admin/Sidebar';

// Helper: render icon component by name
const renderIconComponent = (iconName) => {
  switch (iconName) {
    case 'register': return <RegisterIcon className="w-6 h-6 text-[#6F9C3D]" />;
    case 'inventory': return <InventoryIcon className="w-6 h-6 text-[#6F9C3D]" />;
    case 'orders': return <OrdersIcon className="w-6 h-6 text-[#6F9C3D]" />;
    case 'analytics': return <AnalyticsIcon className="w-6 h-6 text-[#6F9C3D]" />;
    case 'adjustments': return <AdjustmentsIcon className="w-6 h-6 text-[#6F9C3D]" />;
    case 'overheads': return <OverheadsIcon className="w-6 h-6 text-[#6F9C3D]" />;
    case 'trends': return <TrendsIcon className="w-6 h-6 text-[#6F9C3D]" />;
    case 'offers': return <OffersIcon className="w-6 h-6 text-[#6F9C3D]" />;
    case 'events': return <EventsIcon className="w-6 h-6 text-[#6F9C3D]" />;
    case 'accounts': return <AccountsIcon className="w-6 h-6 text-[#6F9C3D]" />;
    case 'settings': return <SettingsIcon className="w-6 h-6 text-[#6F9C3D]" />;
    case 'delivery': return <DeliveryIcon className="w-6 h-6 text-[#6F9C3D]" />;
    case 'vouchers': return <VouchersIcon className="w-6 h-6 text-[#6F9C3D]" />;
    case 'subscription': return <SubscriptionIcon className="w-6 h-6 text-[#6F9C3D]" />;
    default: return <SettingsIcon className="w-6 h-6 text-[#6F9C3D]" />;
  }
};

const HelpCenter = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [showSettingsSubPage, setShowSettingsSubPage] = useState(false);
  const [isSubCard, setIsSubCard] = useState(false); // ✅ Track if editing a sub-card

  const [helpCards, setHelpCards] = useState([
    { id: "register-store", title: "Register Your Store", description: "How to setup accounts Details?", icon: "register", link: "/register" },
    { id: "inventory", title: "Inventory", description: "How to setup inventory & add items?", icon: "inventory", link: "/inventory" },
    { id: "orders", title: "Order Received", description: "How to view and manage orders?", icon: "orders", link: "/orders" },
    { id: "analytics", title: "Analytics", description: "How to view the analytics of your business?", icon: "analytics", link: "/analytics" },
    { id: "adjustment", title: "Adjustment", description: "How to make adjustments in the inventory?", icon: "adjustments", link: "/adjustments" },
    { id: "overheads", title: "Overheads", description: "How to add, view, & edit overheads?", icon: "overheads", link: "/overheads" },
    { id: "trends", title: "Trends", description: "How to view customers & items trends?", icon: "trends", link: "/trends" },
    { id: "offers", title: "Offers", description: "How to add new offers & view, edit the added one?", icon: "offers", link: "/offers" },
    { id: "events", title: "Events", description: "How to add new events & view, edit the added events?", icon: "events", link: "/events" },
    { id: "accounts", title: "Accounts", description: "How to add, edit and view the accounts?", icon: "accounts", link: "/accounts" },
    { id: "settings", title: "Settings", description: "View & add Delivery Settings, Vouchers, Subscription.", icon: "settings", link: "/settings" },
  ]);

  // ✅ Add state for sub-cards
  const [settingsCards, setSettingsCards] = useState([
    {
      id: "delivery-settings",
      title: "Delivery Settings",
      description: "How to setup delivery details?",
      icon: "delivery",
      link: "/settings/deliverysettings"
    },
    {
      id: "vouchers",
      title: "Vouchers",
      description: "How to view and add new vouchers?",
      icon: "vouchers",
      link: "/settings/vouchers"
    },
    {
      id: "subscription",
      title: "Subscription",
      description: "How to buy a subscription plan?",
      icon: "subscription",
      link: "/settings/subscription"
    },
  ]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    if (isMobile) setIsSidebarOpen(false);
  };

  const handleSidebarChange = (id) => {
    const paths = {
      dashboard: "/dashboard",
      inventory: "/inventory",
      analytics: "/analytics",
      trends: "/trends",
      adjustments: "/adjustments",
      overheads: "/overheads",
      events: "/events",
      offers: "/offers",
      orders: "/orders",
      messages: "/messages",
      accounts: "/accounts",
      vouchers: "/settings/vouchers",
      delivery: "/settings/deliverysettings",
      subscription: "/settings/subscription",
      "vendor-dashboard": "/settings/vendor-dashboard",
      "help-center": "/settings/help-center",
    };

    if (paths[id]) {
      router.visit(paths[id], {
        preserveScroll: true,
        preserveState: true,
      });
    }

    if (isMobile) closeSidebar();
  };

  // Updated Modal: Handles both main and sub-cards
  const AddEditCardModal = ({ isOpen, onClose, isSubCard }) => {
    const [cardName, setCardName] = useState("");
    const [description, setDescription] = useState("");
    const [selectedIcon, setSelectedIcon] = useState("settings");
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
        setSelectedIcon(isSubCard ? "delivery" : "settings");
        setIconFile(null);
        setIconPreview(null);
      }
    }, [isOpen, isEditing, editingCard, isSubCard]);

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
        link: isSubCard ? `/settings/${selectedIcon}` : "/settings",
        isCustomIcon: !!iconFile,
      };

      if (isEditing) {
        if (isSubCard) {
          setSettingsCards(prev => prev.map(c => c.id === editingCard.id ? newCard : c));
        } else {
          setHelpCards(prev => prev.map(c => c.id === editingCard.id ? newCard : c));
        }
        alert("Card updated successfully!");
      } else {
        if (isSubCard) {
          setSettingsCards(prev => [...prev, newCard]);
        } else {
          setHelpCards(prev => [...prev, newCard]);
        }
        alert("Card added successfully!");
      }

      onClose();
      setIsEditing(false);
      setEditingCard(null);
      setIsSubCard(false);
    };

    if (!isOpen) return null;

    const previewContent = iconPreview ? (
      <img src={iconPreview} alt="Custom Icon" className="w-16 h-16 object-contain" />
    ) : (
      renderIconComponent(selectedIcon)
    );

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="relative bg-white rounded-xl w-full max-w-[580px] shadow-xl">
          <button onClick={onClose} className="absolute top-0 right-0 bg-red-500 rounded-full text-white z-10" aria-label="Close">
            <X className="w-6 h-6" />
          </button>
          <div className="p-6">
            <h2 className="text-xl md:text-2xl font-semibold text-neutral-900 mb-6" style={{ fontFamily: "'Satoshi', sans-serif" }}>
              {isEditing ? "Edit " : "Add "} {isSubCard ? "Sub-Card" : "Main Card"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="Card Name"
                  className="w-full px-4 py-3 rounded-lg border border-[#00000033] focus:border-[#6F9C3D] focus:ring-1 focus:ring-[#6F9C3D]/30 outline-none transition md:text-lg"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  required
                />
              </div>
              <div className="mb-4">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write description here"
                  className="w-full px-4 py-3 rounded-lg border border-[#00000033] focus:border-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/30 outline-none transition"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  rows="3"
                  required
                />
              </div>
              <div className="mb-6">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-20 h-20 border border-[#00000033] rounded-lg flex items-center justify-center">
                    {previewContent}
                  </div>
                  <div className="flex items-center gap-3 border border-[#00000033] rounded-lg">
                    <label
                      htmlFor="icon-upload"
                      className="px-4 py-2 bg-[#6F9C3D] text-white rounded-lg hover:bg-[#5a7d31] transition cursor-pointer"
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
                    <span className="text-sm text-gray-500 pr-3">
                      {iconFile ? iconFile.name : "No file chosen"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full max-w-[350px] bg-[#6F9C3D] hover:bg-[#5a7d31] text-white py-3 rounded-lg font-semibold text-base md:text-lg transition"
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

  // Settings Sub-Page with Add/Edit Sub-Cards
  const SettingsSubPage = () => {
    const handleAddSubCard = () => {
      setIsEditing(false);
      setEditingCard(null);
      setIsSubCard(true);
      setShowAddModal(true);
    };

    const handleEditSubCard = (card) => {
      setIsEditing(true);
      setEditingCard(card);
      setIsSubCard(true);
      setShowAddModal(true);
    };

    return (
      <div className="p-6">
        <div className="text-lg md:text-xl mb-2">Help Center / Settings</div>
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-xl md:text-2xl font-medium">Help Center</h1>
          <button
            onClick={handleAddSubCard} // ✅ Add handler
            className="px-4 py-2 bg-[#6F9C3D] text-white rounded-lg hover:bg-[#5A7E2F] transition"
          >
            Add Sub Cards
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {settingsCards.map((card) => (
            <div
              key={card.id}
              className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition border border-gray-200"
            >
              <div className="relative flex items-start gap-3">
                <div className="mt-1">{renderIconComponent(card.icon)}</div>
                <div>
                  <h3 className="font-semibold text-lg md:text-xl text-neutral-700">{card.title}</h3>
                  <p className="text-sm md:text-base text-neutral-900 mt-1">{card.description}</p>
                </div>
                <div className="absolute right-0 top-1">
                  <SquarePen
                    className="w-5 h-5 text-[#6F9C3D] cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditSubCard(card); // ✅ Edit handler
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handleAddCard = () => {
    setIsEditing(false);
    setEditingCard(null);
    setIsSubCard(false);
    setShowAddModal(true);
  };

  const handleEditCard = (card) => {
    setIsEditing(true);
    setEditingCard(card);
    setIsSubCard(false);
    setShowAddModal(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#161c2b]">
      <div className="shrink-0">
        <Header
          isMobile={isMobile}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={toggleSidebar}
        />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          active="help-center"
          onChange={handleSidebarChange}
          isMobile={isMobile}
          mobileOpen={isMobile ? isSidebarOpen : true}
          onCloseMobile={closeSidebar}
        />

        <main
          className={`flex-1 overflow-y-auto p-6 transition-all duration-300 ${isMobile ? "ml-0" : "ml-64"}`}
          style={{ marginTop: "99px" }}
        >
          {showSettingsSubPage ? (
            <SettingsSubPage />
          ) : (
            <>
              <div className="text-lg md:text-xl mb-2">Help Center /</div>
              <div className="flex items-center justify-between mb-5">
                <h1 className="text-xl md:text-2xl font-medium">Help Center</h1>
                <button onClick={handleAddCard} className="px-4 py-2 bg-[#6F9C3D] text-white rounded-lg hover:bg-[#5A7E2F] transition">
                  Add Main Card
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {helpCards.map((card) => (
                  card.id === "settings" ? (
                    <div
                      key={card.id}
                      onClick={() => setShowSettingsSubPage(true)}
                      className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition border border-gray-200 cursor-pointer"
                    >
                      <div className="relative flex items-start gap-3">
                        <div className="mt-1">{renderIconComponent(card.icon)}</div>
                        <div>
                          <h3 className="font-semibold text-lg md:text-xl text-neutral-700">{card.title}</h3>
                          <p className="text-sm md:text-base text-neutral-900 mt-1">{card.description}</p>
                        </div>
                        <div className="absolute right-0 top-1">
                          <SquarePen className="w-5 h-5 text-[#6F9C3D]" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      key={card.id}
                      className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition border border-gray-200"
                    >
                      <div className="relative flex items-start gap-3">
                        <div className="mt-1">{renderIconComponent(card.icon)}</div>
                        <div>
                          <h3 className="font-semibold text-lg md:text-xl text-neutral-700">{card.title}</h3>
                          <p className="text-sm md:text-base text-neutral-900 mt-1">{card.description}</p>
                        </div>
                        <div className="absolute right-0 top-1">
                          <SquarePen
                            className="w-5 h-5 text-[#6F9C3D] cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditCard(card);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </>
          )}

          {showAddModal && (
            <AddEditCardModal
              isOpen={showAddModal}
              onClose={() => {
                setShowAddModal(false);
                setIsEditing(false);
                setEditingCard(null);
                setIsSubCard(false);
              }}
              isSubCard={isSubCard} // ✅ Pass isSubCard
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default HelpCenter;