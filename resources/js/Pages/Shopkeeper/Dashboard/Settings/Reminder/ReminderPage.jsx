import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import RemindersTable from "./RemindersTable";
import AddReminderModal from "./AddReminderModal";
import ViewReminderModal from "./ViewReminderModal";
import DeleteConfirmationModal from "@/Components/DeleteConfirmationModal";

const ReminderPage = () => {
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
      actions: "view_delete",
    },
    {
      id: 2,
      title: "Monthly Groceries",
      description: "Includes all groceries for the month",
      date: "25-12-2025 12:30 PM",
      repeatType: "Monthly",
      status: "Inactive",
      actions: "view_delete",
    },
    {
      id: 3,
      title: "Weekly Groceries",
      description: "Weekly essentials",
      date: "25-12-2025 12:30 PM",
      repeatType: "Weekly",
      status: "Inactive",
      actions: "view_delete",
    },
  ];

  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Reminders</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Manage your personal reminders
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#6F9C3D] hover:bg-[#5a7d31] text-white px-6 py-2.5 rounded-lg font-medium text-base transition"
        >
          Add a reminder
        </button>
      </div>

      {/* Table */}
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
          alert(`Deleted reminder: ${deletingReminder.title}`);
          setIsDeleteModalOpen(false);
          setDeletingReminder(null);
        }}
        reminderTitle={deletingReminder?.title || ""}
      />
    </>
  );
};

export default ReminderPage;