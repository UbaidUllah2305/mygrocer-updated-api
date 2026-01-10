// src/Pages/Admin/HelpCenter.jsx
import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { BellRing } from "lucide-react";
import HelpCard from "./HelpCard";
import AddEditCardModal from "./AddEditCardModal";

const HelpCenter = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [showSettingsSubPage, setShowSettingsSubPage] = useState(false);
  const [isSubCard, setIsSubCard] = useState(false);

  // Main help cards — ONLY CHANGE: register-store link
  const [helpCards, setHelpCards] = useState([
    { id: "register-store", title: "Register Your Store", description: "How to setup accounts Details?", icon: "register", link: "/shopkeeper/register" }, // ✅ CHANGED
    { id: "inventory", title: "Inventory", description: "How to setup inventory & add items?", icon: "inventory", link: "/inventory" },
    { id: "orders", title: "Order Received", description: "How to view and manage orders?", icon: "orders", link: "/orders-received" },
    { id: "analytics", title: "Analytics", description: "How to view the analytics of your business?", icon: "analytics", link: "/analytics" },
    { id: "adjustment", title: "Adjustment", description: "How to make adjustments in the inventory?", icon: "adjustments", link: "/adjustments" },
    { id: "overheads", title: "Overheads", description: "How to add, view, & edit overheads?", icon: "overheads", link: "/overheads" },
    { id: "trends", title: "Trends", description: "How to view customers & items trends?", icon: "trends", link: "/trends" },
    { id: "offers", title: "Offers", description: "How to add new offers & view, edit the added one?", icon: "offers", link: "/offers" },
    { id: "events", title: "Events", description: "How to add new events & view, edit the added events?", icon: "events", link: "/events" },
    { id: "accounts", title: "Accounts", description: "How to add, edit and view the accounts?", icon: "accounts", link: "/accounts" },
    { id: "settings", title: "Settings", description: "View & add Delivery Settings, Vouchers, Subscription.", icon: "settings", link: "/settings" },
  ]);

  // Settings sub-cards
  const [settingsCards, setSettingsCards] = useState([
    {
      id: "delivery-settings",
      title: "Delivery Settings",
      description: "How to setup delivery details?",
      icon: "delivery",
      link: "/settings/delivery-settings"
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
    {
      id: "reminder",
      title: "Reminder",
      description: "How to view reminder?",
      icon: "BellRing",
      link: "/settings/reminder"
    },
  ]);

  // Handlers for main cards
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

  // Handlers for sub-cards
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

  // Save logic for both main and sub-cards
  const handleSaveCard = (newCard, editId, isSub) => {
    if (editId) {
      if (isSub) {
        setSettingsCards(prev => prev.map(c => c.id === editId ? newCard : c));
      } else {
        setHelpCards(prev => prev.map(c => c.id === editId ? newCard : c));
      }
    } else {
      if (isSub) {
        setSettingsCards(prev => [...prev, newCard]);
      } else {
        setHelpCards(prev => [...prev, newCard]);
      }
    }
  };

  // Settings Sub-Page Component
  const SettingsSubPage = () => (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Help Center</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Manage help center content for Settings
          </p>
        </div>
        <button
          onClick={handleAddSubCard}
          className="bg-[#6F9C3D] hover:bg-[#5a7d31] text-white px-6 py-2.5 rounded-lg font-medium text-base transition"
        >
          Add Sub Cards
        </button>
      </div>

      {/* Sub-Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {settingsCards.map((card) => (
          <HelpCard 
            key={card.id} 
            card={card} 
            onEdit={handleEditSubCard} 
          />
        ))}
      </div>
    </div>
  );

  // Render Settings Sub-Page if active
  if (showSettingsSubPage) {
    return <SettingsSubPage />;
  }

  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Help Center</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Manage help center cards
          </p>
        </div>
        <button
          onClick={handleAddCard}
          className="bg-[#6F9C3D] hover:bg-[#5a7d31] text-white px-6 py-2.5 rounded-lg font-medium text-base transition"
        >
          Add Main Card
        </button>
      </div>

      {/* Main Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {helpCards.map((card) => (
          card.id === "settings" ? (
            <HelpCard 
              key={card.id} 
              card={card} 
              onClick={() => setShowSettingsSubPage(true)}
              isSettings={true}
            />
          ) : (
            <HelpCard 
              key={card.id} 
              card={card} 
              onEdit={handleEditCard} 
            />
          )
        ))}
      </div>

      {/* Modal */}
      <AddEditCardModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setIsEditing(false);
          setEditingCard(null);
          setIsSubCard(false);
        }}
        onSave={handleSaveCard}
        editCard={editingCard}
        isSubCard={isSubCard}
      />
    </>
  );
};

export default HelpCenter;