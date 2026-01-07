// resources/js/Pages/Customer/NotificationsPage.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, router } from "@inertiajs/react";
import { Eye, ShoppingCart, X, RefreshCcw, Clock } from "lucide-react";

// Import Admin Components
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";

const NotificationsPage = () => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingNotification, setViewingNotification] = useState(null);

  // Sidebar & Header state
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  // Sidebar toggle logic
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    if (isMobile) setIsSidebarOpen(false);
  };

  const handleSidebarChange = (id) => {
    const paths = {
      dashboard: "/dashboard",
      inventory: "/inventory",
      analytics: "/analytics",
      trends: "/trends",
      adjustments: "/adjustments",
      overheads: "/overheads",
      events: "/events",
      offers: "/offers",
      orders: "/orders",
      messages: "/messages",
      accounts: "/accounts",
      vouchers: "/settings/vouchers",
      delivery: "/settings/delivery-settings",
      subscription: "/settings/subscription",
      "vendor-dashboard": "/settings/vendor-dashboard",
      "help-center": "/settings/help-center",
      reminders: "/settings/reminders",
      notifications: "/notifications",
    };

    if (paths[id]) {
      router.visit(paths[id], {
        preserveScroll: true,
        preserveState: true,
      });
    }

    if (isMobile) {
      closeSidebar();
    }
  };

  const ViewNotificationModal = ({ isOpen, onClose, notification }) => {
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
        <div className="bg-white rounded-xl w-full max-w-4xl p-8 shadow-xl relative overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 bg-red-500 rounded-2xl text-white hover:text-gray-700 transition z-10"
          >
            <X />
          </button>

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
    <div className="flex flex-col min-h-screen bg-white text-[#161c2b]">
      {/* Admin Header */}
      <div className="shrink-0">
        <Header
          isMobile={isMobile}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={toggleSidebar} auth={undefined}        />
      </div>

      {/* Sidebar + Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          active="notifications"
          onChange={handleSidebarChange}
          isMobile={isMobile}
          mobileOpen={isMobile ? isSidebarOpen : true}
          onCloseMobile={closeSidebar}
        />

        {/* Main Content */}
        <main
          className={`flex-1 overflow-y-auto p-6 transition-all duration-300 ${isMobile ? "ml-0" : "ml-64"}`}
          style={{ marginTop: "99px" }}
        >
          {/* Breadcrumb */}
          <div className="text-base md:text-lg mb-6">
            <Link href="/dashboard" className="hover:text-[#6F9C3D] font-normal">
              Dashboard
            </Link>
            <span> / </span>
            <span className="font-medium">Notifications</span>
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
                  <div className="text-left md:ml-7 pl-6 py-2 truncate">#</div>
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
                      <div className="text-left md:ml-7 pl-6 py-2 truncate">{notif.id}</div>
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

                {notifications.length === 0 && (
                  <div className="rounded-xl bg-white p-4 text-center text-sm text-gray-600">
                    No notifications found.
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* View Notification Modal */}
      <ViewNotificationModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        notification={viewingNotification}
      />
    </div>
  );
};

export default NotificationsPage;