import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import CustomerDashboardLayout from "@/Layouts/CustomerDashboardLayout";
import UserManualCard from "./UserManualCard";
import AddEditCardModal from "./AddEditCardModal";

const UserManualPage = ({ auth }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

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

  const handleSaveCard = (newCard, editId) => {
    if (editId) {
      setHelpCards(prev => prev.map(c => c.id === editId ? newCard : c));
    } else {
      setHelpCards(prev => [...prev, newCard]);
    }
  };

  return (
    <CustomerDashboardLayout
      auth={auth}
      showFilters={false}
      showLocationBar={false}
      showBreadcrumb={true}
    >
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold text-gray-900" style={{ fontFamily: "'Inter', sans-serif" }}>
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
          <UserManualCard
            key={card.id}
            card={card}
            onEdit={handleEditCard}
          />
        ))}
      </div>

      {/* Modal */}
      <AddEditCardModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setIsEditing(false);
          setEditingCard(null);
        }}
        isEditing={isEditing}
        editingCard={editingCard}
        onSave={handleSaveCard}
      />
    </CustomerDashboardLayout>
  );
};

export default UserManualPage;