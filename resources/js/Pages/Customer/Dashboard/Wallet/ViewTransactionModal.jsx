import React from "react";
import { X } from "lucide-react";

const ViewTransactionModal = ({ isOpen, onClose, transaction }) => {
  if (!isOpen || !transaction) return null;

  const purchaseDetails = [
    { category: "Daily Grocery", item: "Olper's Milk Pack", price: "220.00", points: "+10" },
    { category: "Fresh Food", item: "Apples", price: "490.89", points: "+20" },
  ];

  const totalPoints = purchaseDetails.reduce((sum, item) => {
    const num = parseInt(item.points.replace("+", "")) || 0;
    return sum + num;
  }, 0);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-4 w-full max-w-[800px] h-[600px] shadow-xl relative overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 bg-red-500 rounded-2xl text-white hover:text-gray-400 transition z-10"
        >
          <X />
        </button>

        <div className="p-6 border-b border-neutral-300">
          <div className="flex items-start gap-4">
            <div className="w-33 h-33 bg-[#D9D9D9] rounded-full flex items-center justify-center" />
            <div>
              <h2 className="text-xl font-bold text-neutral-900" style={{ fontFamily: "'Inter', sans-serif" }}>
                Purchase at Main Store
              </h2>
              <p className="text-lg text-neutral-800 mt-1">Date : 12-09-2025</p>
              <p className="text-lg text-neutral-800">Time : 12:09 pm</p>
              <p className="text-lg text-neutral-800 mt-1">Status : Redeemed</p>
            </div>
          </div>
        </div>

        <div className="py-4">
          <div className="bg-[#6F9C3D4F] rounded-xl p-4">
            <h3 className="text-2xl font-bold text-neutral-800 text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
              Purchase Details
            </h3>
          </div>
        </div>

        <div className="overflow-x-auto py-4">
          <div className="min-w-[600px]">
            <div className="rounded-xl bg-[#6F9C3D29] px-4 py-3 mb-1">
              <div className="grid grid-cols-4 gap-4 text-lg font-medium text-gray-900">
                <div>Category</div>
                <div className="text-center">Item</div>
                <div>Price</div>
                <div>Loyalty Points</div>
              </div>
            </div>

            <div className="bg-gray-100 rounded-xl">
              <div className="divide-y divide-gray-200">
                {purchaseDetails.map((item, idx) => (
                  <div key={idx} className="px-4 py-3 grid grid-cols-4 gap-4 text-lg">
                    <div className="truncate">{item.category}</div>
                    <div className="truncate text-center">{item.item}</div>
                    <div>{item.price}</div>
                    <div className="text-center">{item.points}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pb-6 flex justify-end">
          <div className="bg-[#6F9C3D29] rounded-xl p-4 md:max-w-[324px]">
            <div className="flex justify-between items-center text-lg font-medium">
              <span>Total Points Earned :</span>
              <span>+{totalPoints}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTransactionModal;