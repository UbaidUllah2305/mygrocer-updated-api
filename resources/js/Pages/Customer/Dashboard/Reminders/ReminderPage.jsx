// src/Pages/Customer/ReminderPage.jsx
import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import CustomerDashboardLayout from "@/Layouts/CustomerDashboardLayout";
import RemindersTable from "./RemindersTable";
import AddReminderModal from "./AddReminderModal";
import ViewReminderModal from "./ViewReminderModal";
import DeleteConfirmationModal from "@/Components/DeleteConfirmationModal";

const ReminderPage = ({ auth }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [viewingReminder, setViewingReminder] = useState(null);
  const [deletingReminder, setDeletingReminder] = useState(null);

  const reminders = [
    {
      id: 1,
      title: "Buy Milk",
      description: "Get 1 kg milk from [shop name]",
      date: "26-12-2025 10:30 AM",
      repeatType: "Daily",
      status: "Active",
    },
    {
      id: 2,
      title: "Monthly Groceries",
      description: "Includes all groceries for the month",
      date: "25-12-2025 12:30 PM",
      repeatType: "Monthly",
      status: "Inactive",
    },
    {
      id: 3,
      title: "Weekly Groceries",
      description: "Weekly essentials",
      date: "25-12-2025 12:30 PM",
      repeatType: "Weekly",
      status: "Inactive",
    },
  ];

  return (
    <CustomerDashboardLayout
      auth={auth}
      showFilters={false}
      showLocationBar={false}
      showBreadcrumb={true}
    >
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold text-gray-900" style={{ fontFamily: "'Inter', sans-serif" }}>
          Reminders
        </h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-[#6F9C3D] text-white text-base md:text-lg rounded-lg hover:bg-[#5A7E2F] transition"
        >
          Add a reminder
        </button>
      </div>

      {/* Styled Table */}
      <RemindersTable
        reminders={reminders}
        onView={(reminder) => {
          setViewingReminder(reminder);
          setIsViewModalOpen(true);
        }}
        onDelete={(reminder) => {
          setDeletingReminder(reminder);
          setIsDeleteModalOpen(true);
        }}
      />

      {/* Modals */}
      <AddReminderModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      <ViewReminderModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        reminder={viewingReminder}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          alert(`Deleted reminder: ${deletingReminder?.title}`);
          setIsDeleteModalOpen(false);
          setDeletingReminder(null);
        }}
        reminderTitle={deletingReminder?.title || ""}
      />
    </CustomerDashboardLayout>
  );
};

export default ReminderPage;