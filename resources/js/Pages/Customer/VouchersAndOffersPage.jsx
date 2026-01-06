// resources/js/Pages/Customer/VouchersAndOffersPage.jsx

import React, { useState, useRef, useEffect } from "react";
import { Link } from "@inertiajs/react";
import CustomerHeader from "../../Components/Customer/CustomerHeader";

const VouchersAndOffersPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedDefault, setSelectedDefault] = useState("Default");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // 👈 New state for modal
  const [voucherCode, setVoucherCode] = useState("");   // 👈 State for input

  const dropdownRef = useRef(null);
  const modalRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close modal when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isModalOpen]);

  // Dropdown options
  const defaultOptions = ["Default", "None", "Auto-apply", "Most Discount"];

  const handleSelect = (option) => {
    setSelectedDefault(option);
    setIsDropdownOpen(false);
  };

  const handleAddVoucher = () => {
    if (!voucherCode.trim()) {
      alert("Please enter a voucher code.");
      return;
    }
    // Here you can send the code to backend or validate it
    alert(`Voucher "${voucherCode}" added successfully!`);
    setVoucherCode("");
    setIsModalOpen(false);
  };

  // Mock vouchers data
  const vouchers = [
    {
      id: 1,
      title: "Voucher only valid for Mastercard!",
      amount: "Rs.300.00",
      code: "mc300",
      remaining: 3,
      minOrder: "Rs. 1500.00",
      expiry: "31 Dec 2025",
    },
    {
      id: 2,
      title: "Get Rs 250 off on your order!",
      amount: "Rs.250.00",
      code: "jcdays",
      remaining: 2,
      minOrder: "Rs. 1500.00",
      expiry: "31 Dec 2025",
    },
    {
      id: 3,
      title: "Free delivery on orders above Rs. 500",
      amount: "Free Delivery",
      code: "FREEDLV",
      remaining: 10,
      minOrder: "Rs. 500.00",
      expiry: "15 Jan 2026",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <CustomerHeader />

      <main className="pt-20 px-4 sm:px-6 lg:px-8 pb-10">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div
            className="flex items-center gap-2 text-sm text-gray-500 mb-6 mt-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <Link href="/" className="hover:text-[#6F9C3D]">
              Go to home
            </Link>
            <span>/</span>
            <span className="text-gray-800 font-medium underline">Vouchers & Offers</span>
          </div>

          {/* Page Title and Add Button in one line */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h1
              className="text-3xl font-semibold text-gray-900"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
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

          {/* Dropdown for "Default" */}
          <div className="mb-4 w-full max-w-[688px] relative" ref={dropdownRef}>
            {/* Dropdown Toggle */}
            <div
              className="bg-white h-16 rounded-xl p-4 border border-[#B9BBBD] flex items-center justify-between cursor-pointer hover:bg-gray-50 transition"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span
                className="text-xl font-medium text-neutral-700"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {selectedDefault}
              </span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`shrink-0 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>

            {/* Dropdown Menu — ABSOLUTELY POSITIONED OVERLAY */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#B9BBBD] rounded-xl shadow-lg z-20 max-h-60 overflow-y-auto">
                {defaultOptions.map((option) => (
                  <div
                    key={option}
                    onClick={() => handleSelect(option)}
                    className={`px-4 py-3 text-xl font-medium cursor-pointer hover:bg-gray-50 transition ${selectedDefault === option ? "text-[#6F9C3D]" : "text-neutral-700"
                      }`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Voucher List */}
          <div className="space-y-3">
            {vouchers.map((voucher) => (
              <div
                key={voucher.id}
                className="bg-white w-full max-w-[688px] rounded-xl p-4 border border-[#00000059] flex items-start justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src="/assets/Assets/Customer/storepreview/voucher.svg"
                      alt="voucher"
                      className="w-5 h-5"
                    />
                    <h3 className="text-base">{voucher.title}</h3>
                  </div>

                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-base">{voucher.amount}</span>
                    <span className="px-2 py-0.5 text-base">
                      {voucher.code}
                    </span>
                    <span className="px-2 py-0.5 bg-[#6F9C3D29] text-xs rounded-full">
                      {voucher.remaining} left
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-xs px-3 py-1 border border-[#0000003B] rounded-2xl w-[268px]">
                    <span>Min. order {voucher.minOrder}</span>
                    <span>-</span>
                    <span>Use by {voucher.expiry}</span>
                  </div>
                </div>

                <button className="ml-4 px-3 py-1.5 text-base text-[#6F9C3D] font-medium hover:bg-[#6F9C3D]/10 rounded transition">
                  Use now
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Add Voucher Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div
            ref={modalRef}
            className="bg-white rounded-xl px-11 py-13 w-full max-w-[1040px] h-[430px] shadow-xl relative"
          >
            {/* Close Button - Top Right Corner */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-0 right-0 bg-red-500 rounded-2xl text-white transition z-10"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Header */}
            <div className="flex justify-between items-center mb-22">
              <h2
                className="text-3xl text-[#2C323C]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Add a Voucher
              </h2>
            </div>

            {/* Input Field */}
            <div className="mb-19">
              <input
                type="text"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
                placeholder="Enter your voucher code"
                className="w-full px-4 py-2 h-16 border border-[#B9BBBD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6F9C3D] text-xl"
                style={{ fontFamily: "'Inter', sans-serif'" }}
              />
            </div>

            {/* Add Button */}
            <div className="flex justify-center items-center">
              <button
                onClick={handleAddVoucher}
                className="w-full max-w-[696px] bg-[#FF8B2C] h-16 text-white py-2 rounded-lg font-bold text-xl hover:bg-[#FF7A1A] transition"
              >
                Add Voucher
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VouchersAndOffersPage;