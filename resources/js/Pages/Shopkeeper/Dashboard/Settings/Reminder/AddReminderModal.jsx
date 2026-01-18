// src/Components/Customer/AddReminderModal.jsx
import React, { useState } from "react";
import { X } from "lucide-react";
import InputFloating from "@/Components/InputFloating";
import SelectFloating from "@/Components/SelectFloating";
import FloatingTextarea from "@/Components/FloatingTextarea";

const AddReminderModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [repeatType, setRepeatType] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  // Handle input change (for InputFloating & FloatingTextarea)
  const handleInputChange = (setter) => (value) => {
    setter(value);
  };

  // Handle select change (for SelectFloating — mimics native <select> event)
  const handleSelectChange = (setter) => (e) => {
    setter(e.target.value);
  };

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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-4xl p-6 shadow-xl relative overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 bg-red-500 rounded-full text-white hover:text-gray-400 transition z-10"
        >
          <X />
        </button>

        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Add a Reminder
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <InputFloating
              id="reminderTitle"
              label="Reminder Title"
              value={title}
              onChange={handleInputChange(setTitle)}
            />
            <InputFloating
              id="reminderDate"
              label="Date & Time"
              type="datetime-local"
              value={date}
              onChange={handleInputChange(setDate)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <SelectFloating
              id="repeatType"
              label="Repeat Type"
              value={repeatType}
              onChange={handleSelectChange(setRepeatType)}
              options={[
                { value: "Daily", label: "Daily" },
                { value: "Weekly", label: "Weekly" },
                { value: "Monthly", label: "Monthly" },
                { value: "Yearly", label: "Yearly" }
              ]}
              placeholder="Select Repeat Type"
            />
            <SelectFloating
              id="status"
              label="Status"
              value={status}
              onChange={handleSelectChange(setStatus)}
              options={[
                { value: "Active", label: "Active" },
                { value: "Inactive", label: "Inactive" }
              ]}
              placeholder="Select Status"
            />
          </div>

          <div className="mb-6">
            <FloatingTextarea
              id="reminderDescription"
              label="Description"
              value={description}
              onChange={handleInputChange(setDescription)}
              rows={4}
            />
          </div>

          <div className="flex justify-center">
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

export default AddReminderModal;