// src/Pages/Customer/ViewReminderModal.jsx
import React from "react";
import { X } from "lucide-react";

const ViewReminderModal = ({ isOpen, onClose, reminder }) => {
  if (!isOpen || !reminder) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl p-6 shadow-xl relative overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 bg-red-500 rounded-full text-white hover:text-gray-400 transition z-10"
        >
          <X />
        </button>

        <h2 className="text-xl md:text-2xl font-semibold text-[#6F9C3D] mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
          View Reminder Details
        </h2>

        <div className="space-y-4">
          <div><strong>Reminder Title:</strong> {reminder.title}</div>
          <div><strong>Description:</strong> {reminder.description}</div>
          <div><strong>Reminder Set Date:</strong> {reminder.date.split(' ')[0]}</div>
          <div><strong>Repeat Type:</strong> {reminder.repeatType}</div>
          <div><strong>Status:</strong> {reminder.status}</div>
        </div>
      </div>
    </div>
  );
};

export default ViewReminderModal;