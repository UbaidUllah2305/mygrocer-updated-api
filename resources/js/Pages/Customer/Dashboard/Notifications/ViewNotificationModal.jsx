import React from "react";
import { X, RefreshCcw, Clock } from "lucide-react";
import { Link } from "@inertiajs/react";

const ViewNotificationModal = ({ isOpen, onClose, notification }) => {
  if (!isOpen || !notification) return null;

  // Mock order data (replace with real data in production)
  const orderData = {
    orderId: "ORD-10245",
    items: 6,
    totalAmount: "2,450",
    paymentMethod: "Cash on Delivery",
    placedOn: "15 Sep 2025, 10:32 AM",
    statusMessage: "We are preparing your groceries and will notify you once your order is out for delivery.",
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-4xl p-8 shadow-xl relative overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 bg-red-500 rounded-2xl text-white hover:text-gray-700 transition z-10"
        >
          <X />
        </button>

        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl md:text-2xl font-semibold text-[#6F9C3D]" style={{ fontFamily: "'Inter', sans-serif" }}>
            {notification.type}
          </h2>
          <div className="text-sm text-[#828282] text-right">
            <p>{notification.date.split(' ')[0]}</p>
            <p>{notification.date.split(' ')[1]}</p>
          </div>
        </div>

        {/* Body */}
        <div className="mb-6">
          <p className="text-lg md:text-xl mb-2">Your order has been confirmed!</p>
          <div className="space-y-1 text-lg md:text-xl">
            <p>Order ID: {orderData.orderId}</p>
            <p>Items: {orderData.items} items</p>
            <p>Total Amount: Rs. {orderData.totalAmount}</p>
            <p>Payment Method: {orderData.paymentMethod}</p>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <RefreshCcw className="text-[#6F9C3D] w-5 h-5" />
            <span className="text-lg md:text-xl">{orderData.statusMessage}</span>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <Clock className="text-[#6F9C3D] w-5 h-5" />
            <span className="text-lg md:text-xl">Placed on: {orderData.placedOn}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 justify-end">
          <Link
            href="/customer/ordering-reordering"
            className="py-2 px-4 bg-[#6F9C3D] text-white text-base md:text-lg font-medium rounded-lg hover:bg-[#5A7E2F] transition"
          >
            View Order
          </Link>
          <Link
            href="/customer/order-tracking"
            className="py-2 px-4 bg-[#6F9C3D] text-white text-base md:text-lg font-medium rounded-lg hover:bg-[#5A7E2F] transition"
          >
            View Order Progress
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewNotificationModal;