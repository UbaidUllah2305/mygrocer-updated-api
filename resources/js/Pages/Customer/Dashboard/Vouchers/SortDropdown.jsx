import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
const SortDropdown = ({ value, onChange, options = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full max-w-[688px] relative" ref={dropdownRef}>
      <div
        className="bg-white h-16 rounded-xl p-4 border border-[#B9BBBD] flex items-center justify-between cursor-pointer hover:bg-gray-50 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-xl font-medium text-neutral-700" style={{ fontFamily: "'Inter', sans-serif" }}>
          {value}
        </span>
        <ChevronDown className={`shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#B9BBBD] rounded-xl shadow-lg z-20 max-h-60 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`px-4 py-3 text-xl font-medium border-b border-[#0000001F] cursor-pointer hover:bg-gray-50 transition ${
                value === option ? "text-[#6F9C3D]" : "text-neutral-700"
              }`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;