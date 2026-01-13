// src/Pages/Customer/VouchersAndOffersPage.jsx
import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import CustomerDashboardLayout from "@/Layouts/CustomerDashboardLayout";
import VoucherCard from "./VoucherCard";
import SortDropdown from "./SortDropdown";
import AddVoucherModal from "./AddVoucherModal";

const VouchersAndOffersPage = ({ auth }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedDefault, setSelectedDefault] = useState("Default");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddVoucher = (code) => {
    alert(`Voucher "${code}" added successfully!`);
    setIsModalOpen(false);
  };

  const vouchers = [
    {
      id: 1,
      title: "Voucher only valid for Mastercard!",
      amount: "Rs.300.00",
      code: "mc300",
      remaining: 3,
      minOrder: "Rs. 1500.00",
      expiry: "31 Dec 2025",
      category: "shops"
    },
    {
      id: 2,
      title: "Get Rs 250 off on your order!",
      amount: "Rs.250.00",
      code: "jcdays",
      remaining: 2,
      minOrder: "Rs. 1500.00",
      expiry: "31 Dec 2025",
      category: "marts"
    },
    {
      id: 3,
      title: "Free delivery on orders above Rs. 500",
      amount: "Free Delivery",
      code: "FREEDLV",
      remaining: 10,
      minOrder: "Rs. 500.00",
      expiry: "15 Jan 2026",
      category: "shopping-center"
    },
    {
      id: 4,
      title: "Extra 10% off at Main Store",
      amount: "10%",
      code: "EXTRA10",
      remaining: 5,
      minOrder: "Rs. 800.00",
      expiry: "30 Nov 2025",
      category: "shops"
    }
  ];

  // Filter logic
  const filteredVouchers = activeTab === "all"
    ? vouchers
    : vouchers.filter(voucher => voucher.category === activeTab);

  return (
    <CustomerDashboardLayout
      auth={auth}
      showFilters={false}
      showLocationBar={false}
      showBreadcrumb={true}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-semibold text-gray-900" style={{ fontFamily: "'Inter', sans-serif" }}>
          Vouchers & Offers
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center h-13 gap-2 px-4 py-2 border border-gray-300 rounded-lg text-lg md:text-xl text-[#686868] hover:bg-gray-50 transition"
        >
          <img
            src="/assets/Assets/Customer/storepreview/voucher1.svg"
            alt="voucher"
            className="w-4 h-4"
          />
          Add a Voucher
        </button>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <nav className="flex space-x-8 md:space-x-20">
          {[
            { key: "all", label: "All Vouchers" },
            { key: "shops", label: "Shops" },
            { key: "marts", label: "Marts" },
            { key: "shopping-center", label: "Shopping Center" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-2 font-normal text-sm transition ${activeTab === tab.key
                  ? "border-b-2 border-[#6F9C3D] text-[#6F9C3D]"
                  : "text-gray-500 hover:text-gray-700"
                }`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Sort Dropdown */}
      <div className="mb-4">
        <SortDropdown
          value={selectedDefault}
          onChange={setSelectedDefault}
          options={["Default", "None", "Auto-apply", "Most Discount"]}
        />
      </div>

      {/* Voucher List */}
      <div className="space-y-3">
        {filteredVouchers.length > 0 ? (
          filteredVouchers.map((voucher) => (
            <VoucherCard
              key={voucher.id}
              voucher={voucher}
              onUse={() => alert(`Using voucher: ${voucher.code}`)}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center py-8">No vouchers found in this category.</p>
        )}
      </div>

      <AddVoucherModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddVoucher}
      />
    </CustomerDashboardLayout>
  );
};

export default VouchersAndOffersPage;