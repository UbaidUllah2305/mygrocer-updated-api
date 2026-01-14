import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import CustomerDashboardLayout from "@/Layouts/CustomerDashboardLayout";
import NotificationsTable from "./NotificationsTable";
import ViewNotificationModal from "./ViewNotificationModal";

const NotificationsPage = ({ auth }) => {
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

  return (
    <CustomerDashboardLayout
      auth={auth}
      showFilters={false}
      showLocationBar={false}
      showBreadcrumb={true}
    >
      {/* Page Title */}
      <h1 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
        Notifications
      </h1>

      {/* Styled Table */}
      <NotificationsTable
        notifications={notifications}
        onView={(notification) => {
          setViewingNotification(notification);
          setIsViewModalOpen(true);
        }}
      />

      {/* Modal */}
      <ViewNotificationModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        notification={viewingNotification}
      />
    </CustomerDashboardLayout>
  );
};

export default NotificationsPage;