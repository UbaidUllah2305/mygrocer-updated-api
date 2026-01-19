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
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] shadow-xl relative flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-gray-100 flex justify-between items-start bg-gray-50/50">
          <div className="flex items-start gap-4 pr-8">
            <div className="w-16 h-16 bg-[#D9D9D9] rounded-full flex items-center justify-center shrink-0" />
            <div>
              <h2 className="text-xl font-bold text-neutral-900" style={{ fontFamily: "'Inter', sans-serif" }}>
                Purchase at Main Store
              </h2>
              <div className="text-sm md:text-base text-gray-600 space-y-0.5 mt-1">
                <p>Date : 12-09-2025</p>
                <p>Time : 12:09 pm</p>
                <p className="font-medium text-gray-800">Status : Redeemed</p>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="bg-red-100 p-1.5 rounded-full text-red-600 hover:bg-red-200 transition shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-4 md:p-6 flex-1 min-h-0">
          <div className="bg-[#6F9C3D]/10 rounded-xl p-3 mb-4">
            <h3 className="text-xl font-bold text-[#6F9C3D] text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
              Purchase Details
            </h3>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
            <table className="w-full min-w-[500px] text-sm md:text-base">
              <thead>
                <tr className="bg-[#6F9C3D]/20 text-gray-900 font-semibold">
                  <th className="px-4 py-3 text-left">Category</th>
                  <th className="px-4 py-3 text-center">Item</th>
                  <th className="px-4 py-3 text-right">Price</th>
                  <th className="px-4 py-3 text-center">Loyalty Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-gray-50/50">
                {purchaseDetails.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-3 text-left font-medium">{item.category}</td>
                    <td className="px-4 py-3 text-center text-gray-600">{item.item}</td>
                    <td className="px-4 py-3 text-right font-mono">{item.price}</td>
                    <td className="px-4 py-3 text-center font-bold text-[#6F9C3D]">{item.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 md:p-6 border-t border-gray-100 bg-gray-50/30">
            <div className="flex justify-between items-center bg-[#6F9C3D]/10 rounded-xl px-4 py-3 text-lg font-bold text-[#6F9C3D]">
              <span>Total Points Earned</span>
              <span>+{totalPoints}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTransactionModal;