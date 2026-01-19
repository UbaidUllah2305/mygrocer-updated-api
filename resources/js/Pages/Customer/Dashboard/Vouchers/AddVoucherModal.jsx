import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";

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
        className="bg-white rounded-xl p-6 md:p-10 w-full max-w-lg shadow-xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-500 p-1.5 rounded-full text-white transition z-10 hover:bg-red-600"
        >
          <X size={18} />
        </button>

        <div className="mb-8 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2C323C]" style={{ fontFamily: "'Inter', sans-serif" }}>
            Add a Voucher
          </h2>
        </div>

        <div className="mb-8">
          <input
            type="text"
            value={voucherCode}
            onChange={(e) => setVoucherCode(e.target.value)}
            placeholder="Enter your voucher code"
            className="w-full px-4 py-3 border border-[#B9BBBD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6F9C3D] text-lg"
            style={{ fontFamily: "'Inter', sans-serif'" }}
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="w-full bg-[#FF8B2C] py-3 text-white rounded-lg font-bold text-lg hover:bg-[#FF7A1A] transition shadow-md"
          >
            Add Voucher
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddVoucherModal;