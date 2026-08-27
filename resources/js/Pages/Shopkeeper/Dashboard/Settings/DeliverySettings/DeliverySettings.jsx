import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import DeliveryPricingTable from "./DeliveryPricingTable";
import FreeDeliveryTable from "./FreeDeliveryTable";
import OffersTable from "./OffersTable";
import AddDeliveryTypeModal from "./AddDeliveryTypeModal";
import ViewDeliveryTypeModal from "./ViewDeliveryTypeModal";
import DeleteConfirmationModal from "@/Components/DeleteConfirmationModal";

const DeliverySettings = () => {
  const [activeTab, setActiveTab] = useState("pricing");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedDeliveryType, setSelectedDeliveryType] = useState(null);
  const [viewTabType, setViewTabType] = useState('pricing');
  const [editingItem, setEditingItem] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Mock data
  const [deliveryTypes, setDeliveryTypes] = useState([
    { id: 1, name: "Standard", fee: 50, minOrder: 500, maxDistance: 15, estimatedTime: "2 Days", status: true },
    { id: 2, name: "Scheduled", fee: 30, minOrder: 300, maxDistance: 20, estimatedTime: "Customer selected", status: false },
    { id: 3, name: "Express", fee: 150, minOrder: 1000, maxDistance: 5, estimatedTime: "1-2 hours", status: true },
  ]);

  const [freeDeliverySettings, setFreeDeliverySettings] = useState([
    { id: 1, name: "Standard", fee: 50, freeAbove: 500, status: true },
    { id: 2, name: "Scheduled", fee: 30, freeAbove: 300, status: true },
    { id: 3, name: "Express", fee: 150, freeAbove: "Disabled", status: false },
  ]);

  const [offers, setOffers] = useState([
    { id: 1, type: "Bulk Order", validFrom: "01-07-2024", validTo: "12-31-2024", threshold: 3000, discount: "10%", status: true },
    { id: 2, type: "First Order Free", validFrom: "01-07-2024", validTo: "12-31-2024", threshold: "N/A", discount: "100%", status: true },
    { id: 3, type: "Weekend Special", validFrom: "01-07-2024", validTo: "12-31-2024", threshold: "N/A", discount: "15%", status: false },
  ]);

  const toggleFreeDeliveryStatus = (id) => {
    setFreeDeliverySettings(prev =>
      prev.map(setting => setting.id === id ? { ...setting, status: !setting.status } : setting)
    );
  };

  const toggleOfferStatus = (id) => {
    setOffers(prev =>
      prev.map(offer => offer.id === id ? { ...offer, status: !offer.status } : offer)
    );
  };

  const toggleDeliveryTypeStatus = (id) => {
    setDeliveryTypes(prev =>
      prev.map(type => type.id === id ? { ...type, status: !type.status } : type)
    );
  };

  const handleAddDeliveryType = () => {
    setEditingItem(null);
    setIsEditMode(false);
    setShowAddModal(true);
  };

  const handleViewDeliveryType = (deliveryType, tabType) => {
    setSelectedDeliveryType(deliveryType);
    setViewTabType(tabType);
    setShowViewModal(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsEditMode(true);
    setShowAddModal(true);
  };

  const handleUpdateDeliveryType = (updatedItem) => {
    if (activeTab === 'pricing') {
      setDeliveryTypes(prev =>
        prev.map(type => type.id === updatedItem.id ? updatedItem : type)
      );
    } else if (activeTab === 'free') {
      setFreeDeliverySettings(prev =>
        prev.map(setting => setting.id === updatedItem.id ? updatedItem : setting)
      );
    } else if (activeTab === 'offers') {
      setOffers(prev =>
        prev.map(offer => offer.id === updatedItem.id ? updatedItem : offer)
      );
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingItem(null);
    setIsEditMode(false);
  };
  const handleDelete = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      if (activeTab === 'offers') {
        setOffers(prev => prev.filter(offer => offer.id !== itemToDelete.id));
      }
      // Add similar logic for other tabs if needed
      setShowDeleteModal(false);
      setItemToDelete(null);
    }
  };

  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Deliveries</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Manage delivery types, free delivery rules, and offers
          </p>
        </div>
        <button
          onClick={handleAddDeliveryType}
          className="bg-[#6F9C3D] hover:bg-[#5a7d31] text-white px-6 py-2.5 rounded-lg font-medium text-base sm:text-lg transition"
        >
          {activeTab === 'offers' ? 'Add Offers' : 'Add Delivery Type'}
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
        {[
          { label: "Total Deliveries", value: "245" },
          { label: "Standard", value: "150" },
          { label: "Express", value: "45" },
          { label: "Scheduled", value: "50" },
          { label: "Free Delivery", value: "78" },
        ].map((card, i) => (
          <div key={i} className="bg-[#e1f6d8] rounded-xl p-3 text-center">
            <span className="text-sm font-medium text-[#3a3e47]">
              {card.label} : {card.value}
            </span>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-medium text-[#3a3e47]">
          {activeTab === "pricing" && "Pricing & Charges"}
          {activeTab === "free" && "Free Delivery Settings"}
          {activeTab === "offers" && "Discounts & Offers"}
        </h2>
        <div className="flex flex-wrap gap-2">
          {["pricing", "free", "offers"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-base font-medium ${
                activeTab === tab
                  ? "bg-[#6F9C3D] text-white"
                  : "bg-[#f0f0f0] text-[#3a3e47] hover:bg-gray-200"
              }`}
            >
              {tab === "pricing" && "Pricing & Charges"}
              {tab === "free" && "Free Delivery"}
              {tab === "offers" && "Offers"}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "pricing" && (
        <DeliveryPricingTable
          deliveryTypes={deliveryTypes}
          onToggleStatus={toggleDeliveryTypeStatus}
          onView={handleViewDeliveryType}
          onEdit={handleEdit}
        />
      )}

      {activeTab === "free" && (
        <FreeDeliveryTable
          settings={freeDeliverySettings}
          onToggleStatus={toggleFreeDeliveryStatus}
          onView={handleViewDeliveryType}
          onEdit={handleEdit}
        />
      )}

      {activeTab === "offers" && (
        <OffersTable
          offers={offers}
          onToggleStatus={toggleOfferStatus}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Modals */}
      <AddDeliveryTypeModal
        isOpen={showAddModal}
        onClose={handleCloseModal}
        activeTab={activeTab}
        isEditMode={isEditMode}
        editingItem={editingItem}
        onUpdate={handleUpdateDeliveryType}
      />

      <ViewDeliveryTypeModal
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setSelectedDeliveryType(null);
        }}
        deliveryType={selectedDeliveryType}
        tabType={viewTabType}
      />

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setItemToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Item"
        message={`Are you sure you want to delete this ${activeTab === 'offers' ? 'offer' : 'item'}? This action cannot be undone.`}
      />
    </>
  );
};

export default DeliverySettings;