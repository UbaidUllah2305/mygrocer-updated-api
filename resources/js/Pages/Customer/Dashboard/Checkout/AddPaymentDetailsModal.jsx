import React, { useState } from "react";
import { X } from "lucide-react";

const AddPaymentDetailsModal = ({ isOpen, onClose }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [saveCard, setSaveCard] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Card added: ${cardNumber} - ${cardholderName}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-[580px] shadow-xl relative p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-10"
          aria-label="Close"
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 30 30" fill="none">
              <circle cx="15" cy="15" r="15" fill="#DF3A3A" />
              <path d="M10 10L20 20M20 10L10 20" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </button>

        <h2 className="text-xl font-semibold text-gray-900 mb-6">Add a credit or debit card</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="Card number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/30 outline-none transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              placeholder="MM/YY"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/30 outline-none transition"
            />
            <input
              type="text"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              placeholder="CVC"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/30 outline-none transition"
            />
          </div>

          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value)}
                placeholder=" "
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/30 outline-none transition"
              />
              <label
                htmlFor="cardholderName"
                className={`absolute left-4 px-1 text-xs bg-white transition-all duration-200 pointer-events-none ${
                  cardholderName ? '-top-2.5 text-xs' : 'top-3.5 text-lg'
                } text-[#9B9DA2]`}
              >
                Name of Credit card holder
              </label>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <input
              type="checkbox"
              id="saveCard"
              checked={saveCard}
              onChange={(e) => setSaveCard(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/30"
            />
            <label htmlFor="saveCard" className="text-sm text-gray-700">
              Save this card for a faster checkout next time
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#FF8829] hover:bg-[#FF7711] text-white py-3 rounded-lg font-medium transition"
          >
            Done
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPaymentDetailsModal;