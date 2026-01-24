import React from 'react';
import { X } from 'lucide-react';

const OrderProcessingModal = ({ order, selectedItems = [], onClose, onStartProcessing }) => {
  const items = selectedItems.length > 0 
    ? selectedItems 
    : (order.items || [
        { category: "Daily Grocery", item: "Olpear's Milk Pack", quantity: "2", unit: "ml", loyaltyPoints: "00", price: "1,000" },
        { category: "Fresh Food", item: "Apples", quantity: "1 kg", unit: "Kg", loyaltyPoints: "00", price: "500" },
      ]);

  const subtotal = order.subtotal || "1,500";
  const deliveryFee = order.deliveryFee || "150";
  const totalAmount = order.totalAmount || "1,650";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="relative bg-white rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 z-10 bg-[#DF3A3A] rounded-full text-white"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {/* Header */}
          <div className="flex flex-col lg:flex-row gap-6 pb-6 mb-6 border-b border-gray-200">
            <div className="flex justify-center lg:justify-start shrink-0">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 flex-1">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-[#2c323c] mb-3">Order Details</h2>
                <div className="space-y-1 text-base font-medium text-[#3a3e47]">
                  <p>Order #: {order.orderNumber || "ORD-02"}</p>
                  <p>Date: {order.date || "12-09-2025"}</p>
                  <p>Time: {order.time || "12:09 pm"}</p>
                  <p>Status: <span className="text-orange-500">Pending</span></p>
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-[#2c323c] mb-3">Customer Information</h2>
                <div className="space-y-1 text-base font-medium text-[#3a3e47]">
                  <p>Name: {order.customer || "Ahmed"}</p>
                  <p>Phone: {order.phone || "0938437637"}</p>
                  <p>Address: {order.address || "House 78, Garden Town, Lahore"}</p>
                  <p>Payment: {order.paymentTerms || "Cash"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Banner */}
          <div className="bg-[#6F9C3D4F] rounded-xl py-2 mb-4 text-center font-semibold text-[#3a3e47]">
            Order Items
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="w-full rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-[#6F9C3D4F] text-[#3a3e47] text-base font-medium">
                  <th className="p-3 text-left rounded-tl-xl rounded-bl-xl">Category</th>
                  <th className="p-3 text-left">Item</th>
                  <th className="p-3 text-center">Quantity</th>
                  <th className="p-3 text-center">Loyalty Points</th>
                  <th className="p-3 text-right rounded-tr-xl rounded-br-xl">Price</th>
                </tr>
              </thead>

              <tbody>
                <tr><td colSpan="5" className="h-2"></td></tr>
              </tbody>

              <tbody>
                {items.map((item, index) => (
                  <tr
                    key={index}
                    className="text-base text-[#3a3e47] bg-[#D8D8D83B] border-b border-gray-200"
                  >
                    <td className={`p-3 text-left ${index === 0 ? "rounded-tl-xl" : ""}`}>{item.category}</td>
                    <td className="p-3 text-left">{item.item}</td>
                    <td className="p-3 text-center">{item.quantity}</td>
                    <td className="p-3 text-center">{item.loyaltyPoints}</td>
                    <td className={`p-3 text-right ${index === 0 ? "rounded-tr-xl" : ""}`}>{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end mb-6">
            <div className="text-right space-y-1">
              <p className="text-lg font-medium">Subtotal: Rs. {subtotal}</p>
              <p className="text-lg font-medium">Delivery Fee (Express): Rs. {deliveryFee}</p>
              <div className="bg-[#e8efe0] inline-block px-4 py-2 rounded-lg mt-2">
                <span className="text-lg font-medium">Total Amount: Rs. {totalAmount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Footer Button */}
        <div className="border-t border-gray-200 p-6">
          <button
            className="w-full bg-[#6f9c3d] hover:bg-[#5d8a32] text-white py-3 rounded-xl font-medium text-lg transition"
            onClick={() => onStartProcessing?.(order)}
          >
            Start Processing
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderProcessingModal;