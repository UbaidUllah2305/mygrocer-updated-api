import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import NotificationsTable from "./NotificationsTable";
import NotificationViewModal from "./NotificationViewModal";

const Notifications = () => {
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

  const handleViewNotification = (notification) => {
    setViewingNotification(notification);
    setIsViewModalOpen(true);
  };

  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            View your latest updates and alerts
          </p>
        </div>
      </div>

      {/* Reusable Table */}
      <NotificationsTable
        notifications={notifications}
        onView={handleViewNotification}
      />

      {/* Reusable Modal */}
      <NotificationViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        notification={viewingNotification}
      />
    </>
  );
};

export default Notifications;