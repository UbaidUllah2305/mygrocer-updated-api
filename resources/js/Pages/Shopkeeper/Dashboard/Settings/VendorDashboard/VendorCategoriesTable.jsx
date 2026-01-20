import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const VendorCategoriesTable = ({ categories, onEdit, onDelete }) => {
  if (categories.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 text-center text-sm text-gray-600">
        No categories found. Add your first category!
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-[#D2E0C3] text-[#3A3E47] text-lg font-medium">
            <th className="p-4 text-center rounded-tl-xl rounded-bl-xl">#</th>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Description</th>
            <th className="p-4 text-left">Sub Category</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-center rounded-tr-xl rounded-br-xl">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr><td colSpan="6" className="h-2"></td></tr>
        </tbody>
        <tbody>
          {categories.map((category, index) => (
            <tr
              key={category.id}
              className="text-lg text-gray-700 bg-[#D8D8D83B] border-b border-gray-200 hover:bg-gray-100"
            >
              <td className={`p-4 text-center ${index === 0 ? "rounded-tl-xl" : ""}`}>
                {index + 1}
              </td>
              <td className="p-4 text-left">{category.name}</td>
              <td className="p-4 text-left">{category.description}</td>
              <td className="p-4 text-left">{category.subCategory}</td>
              <td className="p-4 text-left">{category.status}</td>
              <td className={`p-4 text-center ${index === 0 ? "rounded-tr-xl" : ""}`}>
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => onEdit(category)}
                    className="p-1.5 text-[#6F9C3D] hover:text-[#6F9C3D] hover:bg-[#6F9C3D]/10 rounded transition"
                    title="Edit"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(category.id)}
                    className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-500/10 rounded transition"
                    title="Delete"
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

export default VendorCategoriesTable;