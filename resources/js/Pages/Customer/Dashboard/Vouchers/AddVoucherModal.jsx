// src/Components/Customer/AddVoucherModal.jsx
import React, { useState, useRef, useEffect } from "react";

const AddVoucherModal = ({ isOpen, onClose, onAdd }) => {
  const [voucherCode, setVoucherCode] = useState("");
  const modalRef = useRef(null);

  // Close on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleSubmit = () => {
    if (!voucherCode.trim()) {
      alert("Please enter a voucher code.");
      return;
    }
    onAdd(voucherCode);
    setVoucherCode("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-xl px-11 py-13 w-full max-w-[1040px] h-[430px] shadow-xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-0 right-0 bg-red-500 rounded-2xl text-white transition z-10"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="flex justify-between items-center mb-22">
          <h2 className="text-3xl text-[#2C323C]" style={{ fontFamily: "'Inter', sans-serif" }}>
            Add a Voucher
          </h2>
        </div>

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

        <div className="flex justify-center items-center">
          <button
            onClick={handleSubmit}
            className="w-full max-w-[696px] bg-[#FF8B2C] h-16 text-white py-2 rounded-lg font-bold text-xl hover:bg-[#FF7A1A] transition"
          >
            Add Voucher
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddVoucherModal;