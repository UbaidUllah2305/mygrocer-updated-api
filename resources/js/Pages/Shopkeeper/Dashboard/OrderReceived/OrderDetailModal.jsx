import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const OrderDetailModal = ({ order, onClose, onAcceptOrder, onRejectOrder }) => {
  const [selectedItems, setSelectedItems] = useState([0]);
  const [selectAll, setSelectAll] = useState(false);

  const items = order.items || [
    { category: "Daily Grocery", item: "Olpear's Milk Pack", quantity: 2, quantityDetail: "(230)", unit: "ml", loyaltyPoints: "00", price: "1,000" },
    { category: "Fresh Food", item: "Apples", quantity: 5, quantityDetail: "(3)", unit: "Kg", loyaltyPoints: "00", price: "500" },
  ];

  const toggleItem = (idx) => {
    setSelectedItems(prev => 
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
    if (isChecked) {
      setSelectedItems(items.map((_, i) => i));
    } else {
      setSelectedItems([]);
    }
  };

  useEffect(() => {
    setSelectAll(items.length > 0 && selectedItems.length === items.length);
  }, [selectedItems, items]);

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
          
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row gap-6 pb-6 mb-6 border-b border-gray-200">
            {/* Avatar */}
            <div className="flex justify-center lg:justify-start shrink-0">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col sm:flex-row gap-8 flex-1">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-[#2c323c] mb-3">Order Details</h2>
                <div className="space-y-1 text-base font-medium text-[#3a3e47]">
                  <p>Order #: {order.orderNumber || "ORD-02"}</p>
                  <p>Date: {order.date || "12-09-2025"}</p>
                  <p>Time: {order.time || "12:09 pm"}</p>
                  <p>Status: {order.status || "New"}</p>
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-[#2c323c] mb-3">Customer Information</h2>
                <div className="space-y-1 text-base font-medium text-[#3a3e47]">
                  <p>Name: {order.customer || "Noor Fatima"}</p>
                  <p>Phone: {order.phone || "0938437637"}</p>
                  <p>Address: {order.address || "House 78, Garden Town, Lahore"}</p>
                  <p>Payment: {order.paymentTerms || "Cash"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Banner */}
          <div className="bg-[#6F9C3D4F] rounded-lg py-2 mb-4 text-center font-semibold text-[#3a3e47]">
            Order Items
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-[#6F9C3D4F] text-[#3a3e47] text-base font-medium">
                  <th className="p-3 w-10 rounded-tl-xl rounded-bl-xl">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 accent-[#6F9C3D]"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="p-3 text-left text-lg">Category</th>
                  <th className="p-3 text-left">Item</th>
                  <th className="p-3 text-center">Quantity</th>
                  <th className="p-3 text-center">Unit</th>
                  <th className="p-3 text-center">Loyalty Points</th>
                  <th className="p-3 text-right rounded-tr-xl rounded-br-xl">Price</th>
                </tr>
              </thead>

              <tbody>
                <tr><td colSpan="7" className="h-2"></td></tr>
              </tbody>

              <tbody>
                {items.map((item, index) => {
                  const isSelected = selectedItems.includes(index);
                  const quantityColor = index === 0 ? 'text-[#6f9c3d]' : 'text-[#df3a3a]';
                  
                  return (
                    <tr
                      key={index}
                      className="text-base text-[#3a3e47] bg-[#D8D8D83B] border-b border-gray-200"
                    >
                      <td className={`p-3 text-center ${index === 0 ? "rounded-tl-xl" : ""}`}>
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 accent-[#6F9C3D]"
                          checked={isSelected}
                          onChange={() => toggleItem(index)}
                        />
                      </td>
                      <td className="p-3 text-left font-bold">{item.category}</td>
                      <td className="p-3 text-left">{item.item}</td>
                      <td className="p-3 text-center">
                        <span className={`font-medium ${quantityColor}`}>{item.quantity}</span>
                        <span className="text-black text-sm ml-1">{item.quantityDetail}</span>
                      </td>
                      <td className="p-3 text-center">{item.unit}</td>
                      <td className="p-3 text-center">{item.loyaltyPoints}</td>
                      <td className={`p-3 text-right ${index === 0 ? "rounded-tr-xl" : ""}`}>{item.price}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end mb-6">
            <div className="text-right space-y-1">
              <p className="text-lg font-medium">Subtotal: Rs. {order.subtotal || "1,500"}</p>
              <p className="text-lg font-medium">Delivery Fee: Rs. {order.deliveryFee || "50"}</p>
              <div className="bg-[#e8efe0] inline-block px-4 py-2 rounded-lg mt-2">
                <span className="text-lg font-medium">Total Amount: Rs. {order.totalAmount || "1,550"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Footer Buttons */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              className="flex-1 bg-[#df3a3a] hover:bg-[#c92f2f] text-white py-3 rounded-xl font-medium text-lg transition sm:min-w-[180px]"
              onClick={() => onRejectOrder?.(order)}
            >
              Reject Order
            </button>
            <button
              className="flex-1 bg-[#6f9c3d] hover:bg-[#5d8a32] text-white py-3 rounded-xl font-medium text-lg transition sm:min-w-[180px]"
              disabled={selectedItems.length === 0}
              onClick={() => {
                if (selectedItems.length === 0) return;
                const accepted = selectedItems.map(i => items[i]);
                onAcceptOrder?.(order, accepted);
              }}
            >
              Accept Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;