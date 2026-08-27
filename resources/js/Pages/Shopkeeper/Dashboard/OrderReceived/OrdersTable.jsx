import React, { useState, useRef, useEffect } from "react";
import { Eye, PhoneCall, Printer, ChevronDown } from "lucide-react";

const OrdersTable = ({ orders, onViewOrder, onCallCustomer, onPrintOrder, onStatusUpdate, getStatusColor }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  // Status options with their colors
  const statusOptions = [
    { value: "New", label: "New", color: "text-black" },
    { value: "Pending", label: "Pending", color: "text-[#C33100]" },
    { value: "Processing", label: "Processing", color: "text-[#E978FF]" },
    { value: "Ready", label: "Ready", color: "text-[#FF8829]" },
    { value: "Dispatched", label: "Dispatched", color: "text-[#2F47FF]" },
    { value: "Delivered", label: "Delivered", color: "text-[#6F9C3D]" },
    { value: "Canceled", label: "Canceled", color: "text-[#FF2121]" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdown && !event.target.closest('.status-dropdown')) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown]);

  const handleStatusChange = (orderId, newStatus) => {
    onStatusUpdate(orderId, newStatus);
    setOpenDropdown(null);
  };
  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 text-center text-sm text-gray-600">
        No orders found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-[#6F9C3D4F] text-[#3A3E47] text-lg md:text-xl font-medium text-center">
            <th className="p-4 rounded-tl-xl rounded-bl-xl">#</th>
            <th className="p-4">Order #</th>
            <th className="p-4">Customer</th>
            <th className="p-4">Phone #</th>
            <th className="p-4">Payment Terms</th>
            <th className="p-4">Total Amount</th>
            <th className="p-4">Status</th>
            <th className="p-4 rounded-tr-xl rounded-br-xl">Order Details</th>
          </tr>
        </thead>

        <tbody>
          <tr><td colSpan="8" className="h-4"></td></tr>
        </tbody>

        <tbody>
          {orders.map((order, index) => (
            <tr
              key={order.id}
              className="text-base md:text-lg bg-[#D8D8D83B] border-b-2 text-center"
            >
              <td className={`p-4 ${index === 0 ? "rounded-tl-xl" : ""}`}>
                {index + 1}
              </td>
              <td className="p-4">{order.orderNumber}</td>
              <td className="p-4">{order.customer}</td>
              <td className="p-4">{order.phone}</td>
              <td className="p-4">{order.paymentTerms}</td>
              <td className="p-4">Rs. {order.totalAmount}</td>
              <td className="p-4">
                <div className="relative status-dropdown">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === order.id ? null : order.id)}
                    className={`w-full px-3 py-2 text-sm border border-gray-300 rounded-md hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6F9C3D] focus:border-transparent flex items-center justify-between transition-colors ${getStatusColor(order.status)}`}
                  >
                    <span>{order.status}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === order.id ? 'rotate-180' : ''}`} />
                  </button>

                  {openDropdown === order.id && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
                      {statusOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleStatusChange(order.id, option.value)}
                          className={`w-full px-3 py-2 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors ${option.color} ${
                            order.status === option.value ? 'bg-[#6F9C3D]/10 font-medium' : ''
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </td>
              <td className={`p-4 ${index === 0 ? "rounded-tr-xl" : ""}`}>
                <div className="flex justify-center items-center gap-2">
                  <button
                    type="button"
                    className="p-1.5 hover:opacity-80 transition"
                    title="View Order"
                    onClick={() => onViewOrder(order)}
                  >
                    <Eye className="w-4.5 h-4.5 text-neutral-400" />
                  </button>
                  <button
                    type="button"
                    className="p-1.5 hover:opacity-80 transition h-7 w-7 rounded-full bg-[#FF8829]"
                    title="Call Customer"
                    onClick={onCallCustomer}
                  >
                    <PhoneCall className="w-4 h-4 text-white" />
                  </button>
                  <button
                    type="button"
                    className="p-1.5 hover:opacity-80 transition"
                    title="Print Order"
                    onClick={onPrintOrder}
                  >
                    <Printer className="w-4.5 h-4.5 text-[#6F9C3D]" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;