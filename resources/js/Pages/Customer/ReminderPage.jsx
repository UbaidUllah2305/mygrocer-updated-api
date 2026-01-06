// resources/js/Pages/Customer/ReminderPage.jsx

import React, { useState, useRef, useEffect } from "react";
import { Link } from "@inertiajs/react";
import { Eye, Trash2, X, ChevronDown, XCircle } from "lucide-react";
import CustomerHeader from "../../Components/Customer/CustomerHeader";

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
      repeatType: "Monthly", // Note: Should be "Weekly" — fix in real data
      status: "Inactive",
      actions: "view_delete",
    },
  ];

  const AddReminderModal = ({ isOpen, onClose }) => {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [repeatType, setRepeatType] = useState("");
    const [status, setStatus] = useState("");
    const [description, setDescription] = useState("");

    const [isRepeatDropdownOpen, setIsRepeatDropdownOpen] = useState(false);
    const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

    const repeatTypeRef = useRef(null);
    const statusRef = useRef(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (repeatTypeRef.current && !repeatTypeRef.current.contains(event.target)) {
          setIsRepeatDropdownOpen(false);
        }
        if (statusRef.current && !statusRef.current.contains(event.target)) {
          setIsStatusDropdownOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!title.trim()) {
        alert("Please enter a reminder title.");
        return;
      }
      alert(`Reminder added: ${title}`);
      onClose();
      setTitle("");
      setDate("");
      setRepeatType("");
      setStatus("");
      setDescription("");
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl w-full max-w-4xl p-6 shadow-xl relative overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-0 right-0 bg-red-500 rounded-full text-white hover:text-gray-400 transition z-10"
          >
            <X />
          </button>

          {/* Title */}
          <h2
            className="text-xl font-bold text-gray-900 mb-6"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Add a Reminder
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Title & Date Side-by-Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Reminder Title */}
              <div>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Reminder Title"
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6F9C3D] text-base md:text-lg"
                  style={{ fontFamily: "'Inter', sans-serif'" }}
                />
              </div>

              {/* Date */}
              <div>
                <input
                  type="datetime-local"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6F9C3D] text-base md:text-lg"
                  style={{ fontFamily: "'Inter', sans-serif'" }}
                />
              </div>
            </div>

            {/* Repeat Type & Status Side-by-Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Repeat Type */}
              <div ref={repeatTypeRef}>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsRepeatDropdownOpen(!isRepeatDropdownOpen)}
                    className="w-full p-2 py-3 border border-neutral-300 rounded-lg flex items-center justify-between text-left"
                  >
                    <span className="text-sm">
                      {repeatType || "Select Repeat Type"}
                    </span>
                    <ChevronDown className="text-neutral-400 w-5 h-5" />
                  </button>

                  {isRepeatDropdownOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                      <div className="max-h-40 overflow-y-auto">
                        {["Daily", "Weekly", "Monthly", "Yearly"].map((type) => (
                          <div
                            key={type}
                            onClick={() => {
                              setRepeatType(type);
                              setIsRepeatDropdownOpen(false);
                            }}
                            className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${repeatType === type ? "bg-[#D3FFA1AB]" : ""
                              }`}
                          >
                            {type}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Status */}
              <div ref={statusRef}>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                    className="w-full p-2 py-3 border border-neutral-300 rounded-lg flex items-center justify-between text-left"
                  >
                    <span className="text-sm">
                      {status || "Select Status"}
                    </span>
                    <ChevronDown className="text-neutral-400 w-5 h-5" />
                  </button>

                  {isStatusDropdownOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                      <div className="max-h-40 overflow-y-auto">
                        {["Active", "Inactive"].map((stat) => (
                          <div
                            key={stat}
                            onClick={() => {
                              setStatus(stat);
                              setIsStatusDropdownOpen(false);
                            }}
                            className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${status === stat ? "bg-[#D3FFA1AB]" : ""
                              }`}
                          >
                            {stat}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                rows="4"
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6F9C3D] text-base"
                style={{ fontFamily: "'Inter', sans-serif'" }}
              />
            </div>

            {/* Save Button */}
            <div className=" flex justify-center">
              <button
                type="submit"
                className="max-w-[530px] w-full py-3 bg-[#6F9C3D] text-white text-lg font-bold rounded-lg hover:bg-[#5A7E2F] transition"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const ViewReminderModal = ({ isOpen, onClose, reminder }) => {
    if (!isOpen || !reminder) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl w-full max-w-2xl p-6 shadow-xl relative overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-0 right-0 bg-red-500 rounded-full text-white hover:text-gray-400 transition z-10"
          >
            <X />
          </button>

          {/* Title */}
          <h2
            className="text-xl md:text-2xl font-semibold text-[#6F9C3D] mb-6"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            View Reminder Details
          </h2>

          {/* Reminder Details */}
          <div className="space-y-4">
            <div>
              <strong>Reminder Title:</strong> {reminder.title}
            </div>
            <div>
              <strong>Description:</strong> {reminder.description}
            </div>
            <div>
              <strong>Reminder Set Date:</strong> {reminder.date.split(' ')[0]}
            </div>
            <div>
              <strong>Repeat Type:</strong> {reminder.repeatType}
            </div>
            <div>
              <strong>Status:</strong> {reminder.status}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, reminderTitle }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl w-full max-w-sm p-6 shadow-xl relative">
          {/* Warning Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <XCircle className="text-red-500 w-8 h-8" />
            </div>
          </div>

          {/* Title */}
          <h2
            className="text-xl font-bold text-center text-gray-900 mb-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Delete Reminder?
          </h2>

          {/* Message */}
          <p
            className="text-center text-gray-600 mb-6"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Are you sure you want to delete "{reminderTitle}"? This action cannot be undone.
          </p>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-2 bg-[#6F9C3D] text-white rounded-lg hover:bg-[#6F9C3D4A] transition font-medium"
            >
              Delete
            </button>
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
            <span className="font-medium underline">Reminder</span>
          </div>

          {/* Page Title & Add Button */}
          <div className="flex justify-between mb-6">
            <h1
              className="text-xl md:text-2xl font-semibold text-gray-900"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Reminders
            </h1>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 bg-[#6F9C3D] text-white text-base md:text-lg rounded-lg hover:bg-[#5A7E2F] transition"
            >
              Add a reminder
            </button>
          </div>

          {/* Reminders Table */}
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              {/* Table Header */}
              <div className="rounded-xl bg-[#E8EFE0] p-1">
                <div className="grid grid-cols-7 text-lg font-medium text-neutral-800" style={{ fontFamily: "'Inter', sans-serif" }}>
                  <div className="text-left md:ml-10 pl-6 py-2 truncate">#</div>
                  <div className="text-center py-2 truncate">Reminder Title</div>
                  <div className="text-center py-2 truncate">Description</div>
                  <div className="text-center py-2 truncate">Date</div>
                  <div className="text-center py-2 truncate">Repeat Type</div>
                  <div className="text-center py-2 truncate">Status</div>
                  <div className="text-center py-2 truncate">Actions</div>
                </div>
              </div>

              {/* Table Rows */}
              <div className="mt-3 space-y-3">
                {reminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="relative rounded-xl bg-[#f7f7f7] p-1 shadow-sm ring-1 ring-black/5 transition-all hover:bg-[#f3f3f3]"
                  >
                    <div className="grid grid-cols-7 gap-2 items-center text-lg text-neutral-800 font-normal" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                      {/* # */}
                      <div className="text-left md:ml-10 pl-6 py-2 truncate">{reminder.id}</div>
                      {/* Reminder Title */}
                      <div className="text-center py-2 truncate">{reminder.title}</div>
                      {/* Description */}
                      <div className="text-center py-2 truncate">{reminder.description}</div>
                      {/* Date */}
                      <div className="text-center py-2 truncate">{reminder.date}</div>
                      {/* Repeat Type */}
                      <div className="text-center py-2 truncate">{reminder.repeatType}</div>
                      {/* Status */}
                      <div className={`text-center py-2 truncate ${reminder.status === "Active" ? "text-[#6F9C3D]" : "text-red-700"}`}>
                        {reminder.status}
                      </div>
                      {/* Actions */}
                      <div className="text-center py-2 flex items-center justify-center gap-2">
                        <button
                          onClick={() => {
                            setViewingReminder(reminder);
                            setIsViewModalOpen(true);
                          }}
                          className="inline-flex h-5 w-5 items-center justify-center text-neutral-400 hover:text-neutral-600 transition"
                          aria-label="View details"
                        >
                          <Eye />
                        </button>
                        <button
                          onClick={() => {
                            setDeletingReminder(reminder);
                            setIsDeleteModalOpen(true);
                          }}
                          className="inline-flex h-5 w-5 items-center justify-center text-red-600 hover:text-red-800 transition"
                          aria-label="Delete"
                        >
                          <Trash2 />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Empty State */}
                {reminders.length === 0 && (
                  <div className="rounded-xl bg-white p-4 text-center text-sm text-gray-600">
                    No reminders found.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Add Reminder Modal */}
        <AddReminderModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />

        {/* View Reminder Modal */}
        <ViewReminderModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          reminder={viewingReminder}
        />

        {/* Delete Confirmation Modal */}
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
      </main>
    </div>
  );
};

export default ReminderPage;