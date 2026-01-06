// resources/js/Pages/Customer/AddressesPage.jsx

import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import {
  Briefcase,
  Heart,
  Home,
  Plus,
  Pencil,
  Trash2,
  X,
  MapPin,
  Minus,
  XCircle,
} from "lucide-react";
import CustomerHeader from "../../Components/Customer/CustomerHeader";

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl relative">
        {/* Warning Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <XCircle className="text-red-600 w-7 h-7" />
          </div>
        </div>

        {/* Title */}
        <h2
          className="text-xl font-bold text-center text-gray-900 mb-2"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Delete Address?
        </h2>

        {/* Message */}
        <p
          className="text-center text-gray-600 mb-6"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Are you sure you want to delete this address? This action cannot be undone.
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 bg-[#FF8B29] text-white rounded-lg hover:bg-[#FF7A1A] transition font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const AddressModal = ({ isOpen, onClose, title, initialAddress = "", isEditing = false }) => {
  const [address, setAddress] = useState(initialAddress);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!address.trim()) {
      alert("Please enter an address.");
      return;
    }
    alert(`Address saved: ${address}`);
    onClose();
    setAddress("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-[800px] h-[600px] shadow-xl relative overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 bg-red-500 rounded-2xl text-white hover:text-gray-700 transition z-10"
        >
          <X />
        </button>

        {/* Header */}
        <div className="p-6">
          <h2
            className="text-xl md:text-2xl font-bold"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {title}
          </h2>
          <p
            className="text-base md:text-lg text-neutral-900 mt-1"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {isEditing
              ? "Providing your location enables more accurate search and delivery ETA, seamless order tracking and personalised recommendations."
              : "Enter an address to explore shops around you"}
          </p>
        </div>

        {/* Use Current Location */}
        <div className="flex justify-end mr-6">
          {!isEditing && (
            <div className="mt-4 flex items-center gap-2">
              <MapPin className="w-6 h-6 font-light" />
              <button
                className="text-neutral-900 font-bold"
                onClick={() => alert("Using current location...")}
              >
                Use my current location
              </button>
            </div>
          )}
        </div>

        {/* Address Input */}
        <div className="px-6 py-4">
          <div className="mb-4 relative">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 h-14 md:h-16 border border-[#6F9C3D] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6F9C3D] text-base md:text-lg text-neutral-900 peer"
              style={{ fontFamily: "'Inter', sans-serif'" }}
            />
            <label
              className={`absolute left-4 ${address ? '-top-2.5 text-xs' : 'top-3.5 text-base'
                } text-[#6F9C3D] bg-white px-1 py-1 transition-all duration-200 pointer-events-none`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Enter your address
            </label>
          </div>

          {/* Map Preview */}
          <div className="relative h-[300px] bg-gray-200 rounded-lg overflow-hidden">
            <img
              src="/assets/Assets/Customer/address/map.png" // Replace with real map or use Google Maps API later
              alt="Map preview"
              className="w-full h-full object-cover"
            />
            {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-800 text-white px-4 py-2 rounded-lg text-sm">
              We'll deliver here
            </div> */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2">
              <button className="bg-white text-gray-700 p-2 rounded-md">
                <Plus className="w-5 h-5" />
              </button>
              <button className="bg-white text-gray-700 p-2 rounded-md">
                <Minus className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="px-6 pb-6 flex justify-end">
          <button
            onClick={handleSubmit}
            className="w-full md:max-w-[210px] md:h-14 py-2 bg-[#FF8B29] md:text-lg text-white font-bold rounded-lg hover:bg-[#FF7A1A] transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

const AddressesPage = () => {
  const [selectedAddress, setSelectedAddress] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null); // For edit modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);

  const handleDeleteClick = (id) => {
    setAddressToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    // Here you'd call your backend to delete
    alert(`Deleted address ${addressToDelete}`);
    setIsDeleteModalOpen(false);
    setAddressToDelete(null);
  };

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

  const getIcon = (iconType, className = "text-[#000000]") => {
    switch (iconType) {
      case "briefcase":
        return <Briefcase className={className} md:size={40} size={30}  />;
      case "heart":
        return <Heart className={className} md:size={40} size={30} />;
      case "home":
        return <Home className={className} md:size={40} size={30} />;
      case "plus":
        return <Plus className={className} md:size={40} size={30} />;
      default:
        return <Home className={className} md:size={40} size={30} />;
    }
  };

  const handleSelect = (id) => {
    setSelectedAddress(id);
  };

  const handleAddAddress = () => {
    setIsAddModalOpen(true);
  };

  const handleEdit = (id) => {
    const address = addresses.find((a) => a.id === id);
    setEditingAddress(address);
    setIsEditModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <CustomerHeader />

      <main className="pt-20 px-4 sm:px-6 lg:px-8 pb-10">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div
            className="flex items-center gap-2 text-base md:text-lg mb-6 mt-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <Link href="/" className="hover:text-[#6F9C3D]">
              Go to home
            </Link>
            <span></span>
            <Link href="/customer/dashboard" className="hover:text-[#6F9C3D] font-medium">
              Dashboard
            </Link>
            <span>/</span>
            <span className="font-medium underline">Addresses</span>
          </div>

          {/* Page Title */}
          <h1
            className="text-xl md:text-2xl font-semibold text-gray-900 mb-6"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Addresses
          </h1>

          {/* Address List */}
          <div className="space-y-4">
            {addresses.map((address) => (
              <div
                key={address.id}
                className="bg-white rounded-xl p-4 border border-gray-200 flex items-center justify-between"
              >
                {/* Left: Radio + Icon */}
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="address"
                    value={address.id}
                    checked={selectedAddress === address.id}
                    onChange={() => handleSelect(address.id)}
                    className="h-5 w-5 text-[#6F9C3D] border-gray-300"
                  />
                  {getIcon(address.icon, "text-[#000000]")}
                </div>

                {/* Center: Address Info */}
                <div className="flex-1 ml-4">
                  <h3
                    className="font-medium text-base"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {address.type}
                  </h3>
                  <p
                    className="text-base mt-1"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {address.address}
                  </p>
                  <p
                    className="text-base mt-1"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {address.note}
                  </p>
                </div>

                {/* Right: Edit & Delete Icons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleEdit(address.id)}
                    className="text-[#6F9C3D] hover:text-green-800 transition"
                  >
                    <Pencil className="w-5 h-5 " />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(address.id)}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add New Address Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleAddAddress}
              className="w-full md:max-w-[1138px] py-3 bg-[#FF8B29] text-white text-lg md:text-xl font-bold rounded-lg hover:bg-[#FF7A1A] transition"
            >
              Add a new address
            </button>
          </div>
        </div>

        {/* Add Address Modal */}
        <AddressModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add New Address"
          isEditing={false}
        />

        {/* Edit Address Modal */}
        <AddressModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="What's your exact location?"
          initialAddress={editingAddress?.address || ""}
          isEditing={true}
        />

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
        />
      </main>
    </div>
  );
};

export default AddressesPage;