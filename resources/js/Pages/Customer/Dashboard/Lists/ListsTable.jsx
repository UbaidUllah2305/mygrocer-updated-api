import React from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";

const ListsTable = ({ lists, onView, onEdit, onDelete }) => {
  if (lists.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 text-center text-sm text-gray-600">
        No lists found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-[#6F9C3D4F] text-neutral-800 text-lg font-medium">
            <th className="p-4 text-left pl-10 rounded-tl-xl">#</th>
            <th className="p-4 text-center">List Name</th>
            <th className="p-4 text-center">Details</th>
            <th className="p-4 text-center rounded-tr-xl">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr><td colSpan="4" className="h-2"></td></tr>
        </tbody>
        <tbody>
          {lists.map((list, index) => (
            <tr
              key={list.id}
              className="text-lg text-neutral-800 bg-[#f7f7f7] border-b border-gray-200 hover:bg-[#f3f3f3]"
            >
              <td className={`p-4 text-left pl-10 ${index === 0 ? "rounded-tl-xl" : ""}`}>
                {list.id}
              </td>
              <td className="p-4 text-center">{list.name}</td>
              <td className="p-4 text-center">{list.details}</td>
              <td className={`p-4 text-center ${index === 0 ? "rounded-tr-xl" : ""}`}>
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => onView(list)}
                    className="p-1.5 text-neutral-400 hover:text-neutral-600 transition"
                    aria-label="View details"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => onEdit(list)}
                    className="p-1.5 text-[#6F9C3D] hover:text-[#5a7d31] transition"
                    aria-label="Edit"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(list)}
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

export default ListsTable;