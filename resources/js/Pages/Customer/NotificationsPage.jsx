// resources/js/Pages/Customer/NotificationsPage.jsx

import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { Eye, ShoppingCart, X, RefreshCcw, Clock } from "lucide-react";
import CustomerHeader from "../../Components/Customer/CustomerHeader";

const NotificationsPage = () => {

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingNotification, setViewingNotification] = useState(null);

  const notifications = [
    {
      id: 1,
      type: "Order Confirmed",
      title: "Your order #ORD123 has been confirmed",
      date: "26-12-2025 10:30 AM",
      status: "Read",
      actions: "view_cart",
    },
    {
      id: 2,
      type: "12% Off on Groceries",
      title: "Enjoy 12% off on fruits till tonight!",
      date: "25-12-2025 12:30 PM",
      status: "Unread",
      actions: "view_cart",
    },
  ];

  const ViewNotificationModal = ({ isOpen, onClose, notification }) => {
    if (!isOpen || !notification) return null;

    // Mock order data for demo (replace with real data later)
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
            <h2
              className="text-xl md:text-2xl font-semibold text-[#6F9C3D]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
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
              href="/customer/orders"
              className="py-2 px-4 bg-[#6F9C3D] text-white text-base md:text-lg font-medium rounded-lg hover:bg-[#5A7E2F] transition"
            >
              View Order
            </Link>
            <Link
              href="/order-tracking"
              className="py-2 px-4 bg-[#6F9C3D] text-white text-base md:text-lg font-medium rounded-lg hover:bg-[#5A7E2F] transition"
            >
              View Order Progress
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <CustomerHeader />

      <main className="pt-20 px-4 sm:px-6 lg:px-8 pb-10">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div
            className="flex items-center gap-2 text-base md:text-lg mb-6 mt-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <Link href="/" className="hover:text-[#6F9C3D]">
              Go to home
            </Link>
            <span></span>
            <Link href="/customer/dashboard" className="hover:text-[#6F9C3D] font-medium">
              Dashboard
            </Link>
            <span>/</span>
            <span className="font-medium underline">Notifications</span>
          </div>

          {/* Page Title */}
          <h1
            className="text-xl md:text-2xl font-semibold text-gray-900 mb-6"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Notifications
          </h1>

          {/* Notifications Table */}
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              {/* Table Header */}
              <div className="rounded-xl bg-[#E8EFE0] p-1">
                <div className="grid grid-cols-6 text-lg font-medium text-neutral-800" style={{ fontFamily: "'Inter', sans-serif" }}>
                  <div className="text-left ml-7 py-2 truncate">#</div>
                  <div className="text-center py-2 truncate">Type</div>
                  <div className="text-center py-2 truncate">Title</div>
                  <div className="text-center py-2 truncate">Date</div>
                  <div className="text-center py-2 truncate">Status</div>
                  <div className="text-center py-2 truncate">Actions</div>
                </div>
              </div>

              {/* Table Rows */}
              <div className="mt-3 space-y-3">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="relative rounded-xl bg-[#f7f7f7] p-1 shadow-sm ring-1 ring-black/5 transition-all hover:bg-[#f3f3f3]"
                  >
                    <div className="grid grid-cols-6 gap-2 items-center text-lg text-neutral-800 font-normal" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                      {/* # */}
                      <div className="text-left ml-7 py-2 truncate">{notif.id}</div>
                      {/* Type */}
                      <div className="text-center py-2 truncate">{notif.type}</div>
                      {/* Title */}
                      <div className="text-center py-2 truncate">{notif.title}</div>
                      {/* Date */}
                      <div className="text-center py-2 truncate">{notif.date}</div>
                      {/* Status */}
                      <div className="text-center py-2 truncate">{notif.status}</div>
                      {/* Actions */}
                      <div className="text-center py-2 flex items-center justify-center gap-2">
                        <button
                          onClick={() => {
                            setViewingNotification(notif);
                            setIsViewModalOpen(true);
                          }}
                          className="inline-flex h-5 w-5 items-center justify-center"
                          aria-label="View details"
                        >
                          <Eye className="text-neutral-400" />
                        </button>
                        {notif.actions === "view_cart" && (
                          <button
                            className="inline-flex h-5 w-5 items-center justify-center"
                            aria-label="Add to cart"
                          >
                            <ShoppingCart className="text-[#6F9C3D]" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Empty State */}
                {notifications.length === 0 && (
                  <div className="rounded-xl bg-white p-4 text-center text-sm text-gray-600">
                    No notifications found.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* View Notification Modal */}
        <ViewNotificationModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          notification={viewingNotification}
        />
      </main>
    </div>
  );
};

export default NotificationsPage;