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
      <div className="bg-white rounded-xl w-full max-w-[1040px] p-6 md:p-11 shadow-xl relative overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 bg-red-500 rounded-2xl text-white hover:text-gray-400 transition z-10"
        >
          <X />
        </button>

        <h2 className="text-2xl md:text-3xl text-neutral-900 mb-9" style={{ fontFamily: "Abyssinica SIL" }}>
          Add Balance
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-16">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter Amount"
              className="w-full px-4 py-2 h-13 md:h-16 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6F9C3D] text-lg"
              style={{ fontFamily: "'Inter', sans-serif'" }}
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full md:max-w-[700px] py-3 bg-[#FF8B29] text-white md:text-lg font-bold rounded-lg hover:bg-[#FF7A1A] transition"
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