// src/Components/Admin/VoucherDetailsModal.jsx
import React from "react";

const VoucherDetailsModal = ({ isOpen, onClose, voucher }) => {
  if (!isOpen || !voucher) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      {/* ✅ Fixed height — no vertical scroll */}
      <div className="relative bg-white rounded-xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 z-10"
          aria-label="Close"
        >
          <div className="w-7 h-7 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 30 30" fill="none">
              <circle cx="15" cy="15" r="15" fill="#DF3A3A"/>
              <path d="M10 10L20 20M20 10L10 20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </button>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {/* Header */}
          <h2 className="text-xl md:text-2xl font-semibold text-[#6F9C3D] mb-6">
            Voucher Details
          </h2>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-[#f4f4f4] rounded-lg p-4">
              <h3 className="text-[#6F9C3D] font-semibold mb-3">Coupon Details</h3>
              <div className="space-y-2 text-gray-700">
                <p><span className="font-medium">Voucher Name:</span> {voucher.name}</p>
                <p><span className="font-medium">Voucher Code:</span> {voucher.code}</p>
                <p><span className="font-medium">Discount Type:</span> {voucher.type}</p>
                <p><span className="font-medium">Discount Value:</span> {voucher.discount}</p>
                <p><span className="font-medium">Minimum Purchase:</span> {voucher.minimumPurchase}</p>
                <p><span className="font-medium">Quantity:</span> {voucher.quantity?.toLocaleString()}</p>
                <p><span className="font-medium">Used:</span> {voucher.used}</p>
              </div>
            </div>

            <div className="bg-[#f4f4f4] rounded-lg p-4">
              <h3 className="text-[#6F9C3D] font-semibold mb-3">Validity</h3>
              <div className="space-y-2 text-gray-700">
                <p><span className="font-medium">Start Date:</span> {voucher.startDate}</p>
                <p><span className="font-medium">End Date:</span> {voucher.endDate}</p>
              </div>
            </div>
          </div>

          {/* Usage Table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-[#e8efe0] text-gray-700 text-base font-medium">
                  <th className="p-3 text-center rounded-tl-xl">#</th>
                  <th className="p-3 text-center">Customer Name</th>
                  <th className="p-3 text-center">Date</th>
                  <th className="p-3 text-center">Used</th>
                  <th className="p-3 text-center rounded-tr-xl">Remaining</th>
                </tr>
              </thead>
              <tbody>
                <tr><td colSpan="5" className="h-2"></td></tr>
              </tbody>
              <tbody>
                {voucher.usageHistory?.length > 0 ? (
                  voucher.usageHistory.map((usage, index) => (
                    <tr key={index} className="text-base text-gray-700 bg-[#f7f7f7] border-b border-gray-200">
                      <td className={`p-3 text-center ${index === 0 ? "rounded-tl-xl" : ""}`}>
                        {index + 1}
                      </td>
                      <td className="p-3 text-center">{usage.customerName}</td>
                      <td className="p-3 text-center">
                        <div>{usage.date}</div>
                        <div className="text-xs text-gray-500">{usage.time}</div>
                      </td>
                      <td className="p-3 text-center">{usage.used}</td>
                      <td className={`p-3 text-center ${index === 0 ? "rounded-tr-xl" : ""}`}>
                        {usage.remaining}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-6 text-center text-gray-500">
                      No usage history available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Fixed Footer (Close Button) */}
        <div className="border-t border-gray-200 p-6">
          <button
            className="w-full bg-[#6f9c3d] hover:bg-[#5d8a32] text-white py-3 rounded-xl font-medium text-lg transition"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoucherDetailsModal;