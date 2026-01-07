// src/Components/Admin/AdjustmentsTable.jsx
import React from "react";
import { Pencil, Trash2, Package } from "lucide-react";

const AdjustmentsTable = ({ items, loading, onEdit, onDelete }) => {
  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block w-8 h-8 border-4 border-[#6F9C3D] border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-gray-600 text-sm">Loading adjustments...</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-[#6F9C3D4F] text-[#3A3E47] text-lg md:text-xl font-medium text-center">
            <th className="p-4 rounded-tl-xl rounded-bl-xl">Main Category</th>
            <th className="p-4">Sub Category</th>
            <th className="p-4">Code</th>
            <th className="p-4">Product Name</th>
            <th className="p-4">BP</th>
            <th className="p-4">SP</th>
            <th className="p-4">Quantity</th>
            <th className="p-4">Unit</th>
            <th className="p-4">Image</th>
            <th className="p-4 rounded-tr-xl rounded-br-xl">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td colSpan="10" className="h-4"></td>
          </tr>
        </tbody>

        <tbody>
          {items.length > 0 ? (
            items.map((item, index) => (
              <tr
                key={`adjustment-${item.code}-${index}`}
                className="text-base md:text-lg bg-[#D8D8D83B] border-b-2 text-center"
              >
                <td className={`p-4 ${index === 0 ? "rounded-tl-xl" : ""}`}>
                  {item.main}
                </td>
                <td className="p-4">{item.sub}</td>
                <td className="p-4">{item.code}</td>
                <td className="p-4">{item.name}</td>
                <td className="p-4">{item.bp}</td>
                <td className="p-4">{item.sp}</td>
                <td className="p-4">
                  <span
                    className={`font-medium ${parseInt(item.qty) < 100
                        ? "text-red-600"
                        : parseInt(item.qty) < 500
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}
                  >
                    {item.qty}
                  </span>
                </td>
                <td className="p-4">{item.unit}</td>
                <td className="p-4">
                  <div className="flex justify-center">
                    <div
                      className="h-10 w-10 rounded-lg border-2 border-gray-300 bg-gray-100 overflow-hidden"
                      title="Product image"
                    >
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-5 h-5 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className={`p-4 ${index === 0 ? "rounded-tr-xl" : ""}`}>
                  <div className="flex justify-center items-center flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(item)}
                      className="transition-colors group"
                      title="Edit Adjustment"
                    >
                      <Pencil className="w-5 h-5 text-[#6F9C3D] group-hover:scale-110 transition-transform" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(item)}
                      className="transition-colors group"
                      title="Delete Adjustment"
                    >
                      <Trash2 className="w-5 h-5 text-red-600 group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="p-4 text-center text-[#1B75BB]">
                No Adjustments available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdjustmentsTable;