import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import CustomerDashboardLayout from "@/Layouts/CustomerDashboardLayout";
import AddressCard from "./AddressCard";
import AddressModal from "./AddressModal";
import DeleteConfirmationModal from "@/Components/DeleteConfirmationModal";

const AddressesPage = ({ auth }) => {
  const [selectedAddress, setSelectedAddress] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add' or 'edit'
  const [editingAddress, setEditingAddress] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);

  const addresses = [
    {
      id: 1,
      type: "Work",
      icon: "briefcase",
      address: "365 Link ATI Main Road Lahore",
      note: "Note to rider : none",
      isDefault: true,
    },
    {
      id: 2,
      type: "Home",
      icon: "home",
      address: "365 Link ATI Main Road Lahore",
      note: "Note to rider : none",
      isDefault: false,
    },
    {
      id: 3,
      type: "Mom's house",
      icon: "heart",
      address: "Eden garden Road Lahore",
      note: "Note to rider : none",
      isDefault: false,
    },
    {
      id: 4,
      type: "In-laws' house",
      icon: "home",
      address: "Street 3 Gulberg Road Lahore",
      note: "Note to rider : none",
      isDefault: false,
    },
    {
      id: 5,
      type: "Wicky (Kids friend) house",
      icon: "plus",
      address: "365 Link ATI Main Road Lahore",
      note: "Note to rider : none",
      isDefault: false,
    },
  ];

  const handleSelect = (id) => setSelectedAddress(id);

  const handleAddAddress = () => {
    setModalMode("add");
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const handleEdit = (id) => {
    const address = addresses.find((a) => a.id === id);
    setModalMode("edit");
    setEditingAddress(address);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setAddressToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleModalSubmit = ({ mode, address }) => {
    if (mode === "add") {
      alert(`New address added: ${address}`);
    } else {
      alert(`Address updated: ${address}`);
    }
  };

  const confirmDelete = () => {
    alert(`Deleted address ${addressToDelete}`);
    setIsDeleteModalOpen(false);
    setAddressToDelete(null);
  };

  return (
    <CustomerDashboardLayout
      auth={auth}
      showFilters={false}
      showLocationBar={false}
      showBreadcrumb={true}
    >
      <h1 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
        Addresses
      </h1>

      <div className="space-y-4">
        {addresses.map((address) => (
          <AddressCard
            key={address.id}
            address={address}
            isSelected={selectedAddress === address.id}
            onSelect={handleSelect}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={handleAddAddress}
          className="w-full md:max-w-[1138px] py-3 bg-[#FF8B29] text-white text-lg font-bold rounded-lg hover:bg-[#FF7A1A] transition"
        >
          Add a new address
        </button>
      </div>

      {/* Single Unified Modal */}
      <AddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        initialAddress={editingAddress?.address || ""}
        onSubmit={handleModalSubmit}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </CustomerDashboardLayout>
  );
};

export default AddressesPage;