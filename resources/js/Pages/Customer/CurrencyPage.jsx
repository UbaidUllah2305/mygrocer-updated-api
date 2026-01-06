// resources/js/Pages/Customer/CurrencyPage.jsx

import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import CustomerHeader from "../../Components/Customer/CustomerHeader";

const CurrencyPage = () => {
  const [selectedCurrency, setSelectedCurrency] = useState("Dollars");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currencies = [
    { value: "Dollar", label: "Dollar" },
    { value: "Riyal", label: "Riyal" },
    { value: "Euro", label: "Euro" },
    { value: "USD", label: "USD" },
    { value: "AUD", label: "AUD" },
    { value: "PAK.RS", label: "RS" },
  ];

  const handleSelect = (currency) => {
    setSelectedCurrency(currency);
    setIsDropdownOpen(false);
  };

  const handleUpdate = () => {
    alert(`Currency updated to: ${selectedCurrency}`);
    // Here you'd send to backend via Inertia or API
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
            <span className="font-medium underline">Currency</span>
          </div>

          {/* Page Title */}
          <h1
            className="text-xl md:text-2xl font-semibold text-gray-900 mb-6"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Change Currency
          </h1>

          {/* Currency Selector */}
          <div className="mb-6 w-full max-w-[1336px] relative">
            {/* Dropdown Toggle */}
            <div
              className="bg-white h-16 rounded-xl p-4 border border-[#B9BBBD] flex items-center justify-between cursor-pointer hover:bg-gray-50 transition"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span
                className="text-xl md:text-2xl font-medium text-[#6F9C3D]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {selectedCurrency}
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

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#B9BBBD] rounded-xl shadow-lg z-20 max-h-60 overflow-y-auto">
                {currencies.map((currency) => (
                  <div
                    key={currency.value}
                    onClick={() => handleSelect(currency.label)}
                    className={`px-4 py-3 text-xl font-medium cursor-pointer hover:bg-gray-50 transition ${
                      selectedCurrency === currency.label ? "bg-[#6F9C3D] text-white" : "text-neutral-700"
                    }`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {currency.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Update Button */}
          <div className="flex justify-end mt-8">
            <button
              onClick={handleUpdate}
              className="px-6 py-3 md:max-w-[200px] md:w-full bg-[#FF8B29] text-white text-base md:text-lg font-bold rounded-lg hover:bg-[#FF7A1A] transition"
            >
              Update
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CurrencyPage;