import React from "react";
import { Eye, Trash2 } from "lucide-react";

const RemindersTable = ({ reminders, onView, onDelete }) => {
  if (reminders.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 text-center text-sm text-gray-600">
        No reminders found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-[#E8EFE0] text-neutral-800 text-lg font-medium">
            <th className="p-4 text-left pl-6 rounded-tl-xl rounded-bl-xl">#</th>
            <th className="p-4 text-center">Reminder Title</th>
            <th className="p-4 text-center">Description</th>
            <th className="p-4 text-center">Date</th>
            <th className="p-4 text-center">Repeat Type</th>
            <th className="p-4 text-center">Status</th>
            <th className="p-4 text-center rounded-tr-xl rounded-br-xl">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr><td colSpan="7" className="h-2"></td></tr>
        </tbody>
        <tbody>
          {reminders.map((reminder, index) => (
            <tr
              key={reminder.id}
              className="text-lg text-neutral-800 bg-[#f7f7f7] border-b border-gray-200 hover:bg-[#f3f3f3]"
            >
              <td className={`p-4 text-left pl-6 ${index === 0 ? "rounded-tl-xl" : ""}`}>
                {reminder.id}
              </td>
              <td className="p-4 text-center">{reminder.title}</td>
              <td className="p-4 text-center">{reminder.description}</td>
              <td className="p-4 text-center">{reminder.date}</td>
              <td className="p-4 text-center">{reminder.repeatType}</td>
              <td className={`p-4 text-center ${reminder.status === "Active" ? "text-[#6F9C3D]" : "text-red-700"}`}>
                {reminder.status}
              </td>
              <td className={`p-4 text-center ${index === 0 ? "rounded-tr-xl" : ""}`}>
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => onView(reminder)}
                    className="p-1.5 text-neutral-400 hover:text-neutral-600 transition"
                    aria-label="View details"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(reminder)}
                    className="p-1.5 text-red-600 hover:text-red-800 transition"
                    aria-label="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RemindersTable;