// src/Components/Customer/CurrencySelector.jsx
import React, { useState, useRef, useEffect } from "react";

const CurrencySelector = ({ value, onChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currencies = [
    { value: "Dollar", label: "Dollar" },
    { value: "Riyal", label: "Riyal" },
    { value: "Euro", label: "Euro" },
    { value: "USD", label: "USD" },
    { value: "AUD", label: "AUD" },
    { value: "PAK.RS", label: "RS" },
  ];

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

  const handleSelect = (label) => {
    onChange(label);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Toggle */}
      <div
        className="bg-white h-16 rounded-xl p-4 border border-[#B9BBBD] flex items-center justify-between cursor-pointer hover:bg-gray-50 transition"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <span className="text-xl md:text-2xl font-medium text-[#6F9C3D]" style={{ fontFamily: "'Inter', sans-serif" }}>
          {value}
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
                value === currency.label ? "bg-[#6F9C3D] text-white" : "text-neutral-700"
              }`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {currency.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrencySelector;