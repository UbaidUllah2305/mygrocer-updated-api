import React from "react";
import { X, RefreshCcw, Clock } from "lucide-react";
import { Link } from "@inertiajs/react";

const NotificationViewModal = ({ isOpen, onClose, notification }) => {
  if (!isOpen || !notification) return null;

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
      <div className="bg-white rounded-xl w-full max-w-4xl p-6 md:p-8 shadow-xl relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 bg-red-500 rounded-full text-white hover:bg-red-600 transition z-10 w-8 h-8 flex items-center justify-center"
        >
          <X size={18} />
        </button>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-6">
          <h2 className="text-xl md:text-2xl font-semibold text-[#6F9C3D]">
            {notification.type}
          </h2>
          <div className="text-sm text-[#828282] text-right sm:text-left">
            <p>{notification.date.split(' ')[0]}</p>
            <p>{notification.date.split(' ')[1]}</p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-lg md:text-xl mb-2">Your order has been confirmed!</p>
          <div className="space-y-1 text-base md:text-lg">
            <p><span className="font-medium">Order ID:</span> {orderData.orderId}</p>
            <p><span className="font-medium">Items:</span> {orderData.items} items</p>
            <p><span className="font-medium">Total Amount:</span> Rs. {orderData.totalAmount}</p>
            <p><span className="font-medium">Payment Method:</span> {orderData.paymentMethod}</p>
          </div>

          <div className="mt-4 flex items-start gap-2">
            <RefreshCcw className="text-[#6F9C3D] w-5 h-5 mt-0.5" />
            <span className="text-base md:text-lg">{orderData.statusMessage}</span>
          </div>

          <div className="mt-4 flex items-start gap-2">
            <Clock className="text-[#6F9C3D] w-5 h-5 mt-0.5" />
            <span className="text-base md:text-lg">Placed on: {orderData.placedOn}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <Link
            href="/customer/orders"
            className="py-2 px-4 bg-[#6F9C3D] text-white text-base font-medium rounded-lg hover:bg-[#5A7E2F] transition"
          >
            View Order
          </Link>
          <Link
            href="/order-tracking"
            className="py-2 px-4 bg-[#6F9C3D] text-white text-base font-medium rounded-lg hover:bg-[#5A7E2F] transition"
          >
            View Order Progress
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotificationViewModal;