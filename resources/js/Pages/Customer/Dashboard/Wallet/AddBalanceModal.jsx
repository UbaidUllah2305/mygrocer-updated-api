import React, { useState } from "react";
import { X } from "lucide-react";

const AddBalanceModal = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      alert("Please enter an amount.");
      return;
    }
    alert(`Balance added: Rs. ${inputValue}`);
    onClose();
    setInputValue("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-xl p-6 md:p-8 shadow-xl relative overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-500 p-1.5 rounded-full text-white hover:bg-red-600 transition z-10"
        >
          <X size={18} />
        </button>

        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6 text-center md:text-left" style={{ fontFamily: "Abyssinica SIL" }}>
          Add Balance
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter Amount"
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6F9C3D] text-lg"
              style={{ fontFamily: "'Inter', sans-serif'" }}
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-[#FF8B29] text-white py-3 rounded-lg font-bold text-lg hover:bg-[#FF7A1A] transition shadow-md"
            >
              Confirm & Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBalanceModal;