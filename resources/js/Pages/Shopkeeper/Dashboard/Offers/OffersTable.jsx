// src/Components/Admin/OffersTable.jsx
import React, { useState } from "react";
import { Pencil, Eye } from "lucide-react";

const renderHintBadges = (hintText) => {
  if (!hintText) return null;
  const parts = hintText.split(' ').filter(part => part.trim() !== '');
  return parts.map((part, index) => (
    <span
      key={index}
      className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full mr-1 last:mr-0"
    >
      {part}
    </span>
  ));
};

const OffersTable = ({ offers, onViewOffer, onEditOffer }) => {
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
    if (isChecked) {
      const newSelected = new Set(offers.map((o) => o.id));
      setSelectedRows(newSelected);
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (id, e) => {
    const isChecked = e.target.checked;
    const newSelected = new Set(selectedRows);
    if (isChecked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedRows(newSelected);
    setSelectAll(newSelected.size === offers.length);
  };

  if (offers.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 text-center text-sm text-gray-600">
        No offers found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-[#6F9C3D4F] text-[#3A3E47] text-lg md:text-xl font-medium text-center">
            {/* Checkbox Column */}
            <th className="p-4 w-12 rounded-tl-xl rounded-bl-xl">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 accent-[#6F9C3D] focus:ring-[#6F9C3D]"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th className="p-4 text-left truncate">Offer Details</th>
            <th className="p-4">Status</th>
            <th className="p-4">Category</th>
            <th className="p-4">Performance</th>
            <th className="p-4">Schedule</th>
            <th className="p-4">Revenue</th>
            <th className="p-4 rounded-tr-xl rounded-br-xl">Actions</th>
          </tr>
        </thead>

        {/* Spacer row */}
        <tbody>
          <tr><td colSpan="8" className="h-4"></td></tr>
        </tbody>

        <tbody>
          {offers.map((offer, index) => (
            <tr
              key={offer.id}
              className="text-base md:text-lg bg-[#D8D8D83B] border-b-2"
            >
              {/* Checkbox */}
              <td className={`p-4 text-center ${index === 0 ? "rounded-tl-xl" : ""}`}>
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 accent-[#6F9C3D] focus:ring-[#6F9C3D]"
                  checked={selectedRows.has(offer.id)}
                  onChange={(e) => handleSelectRow(offer.id, e)}
                />
              </td>

              {/* Offer Details */}
              <td className="p-4 text-left min-w-0">
                <div className="font-medium text-[#3a3e47] truncate">{offer.name}</div>
                <div className="text-sm truncate text-[#407D55] leading-tight">{offer.details}</div>
                <div className="mt-1 flex flex-wrap gap-1">
                  {renderHintBadges(offer.hint)}
                </div>
              </td>

              {/* Status */}
              <td className="p-4 text-center">{offer.status}</td>

              {/* Category */}
              <td className="p-4 text-center">{offer.category}</td>

              {/* Performance */}
              <td className="p-4 text-center">{offer.perfomance}</td>

              {/* Schedule */}
              <td className="p-4 text-center">
                <div className="text-base text-gray-600">{offer.schedule.split('\n')[0]}</div>
                <div className="text-sm text-[#407D55]">{offer.schedule.split('\n')[1]}</div>
              </td>

              {/* Revenue */}
              <td className="p-4 text-center">
                <div className="text-[#3a3e47]">${offer.revenue}</div>
                {offer.target && parseFloat(offer.revenue) > 0 && (
                  <div className={`text-sm ${parseFloat(offer.revenue) / parseFloat(offer.target) > 1 ? "text-green-600" : "text-red-600"}`}>
                    {parseFloat(offer.revenue) / parseFloat(offer.target) > 1
                      ? `+${Math.round(((parseFloat(offer.revenue) / parseFloat(offer.target)) - 1) * 100)}% vs target`
                      : `- ${Math.round((1 - parseFloat(offer.revenue) / parseFloat(offer.target)) * 100)}% vs target`}
                  </div>
                )}
              </td>

              {/* Actions */}
              <td className={`p-4 text-center ${index === 0 ? "rounded-tr-xl" : ""}`}>
                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    className="p-1 text-gray-400 hover:text-gray-500 transition"
                    title="View Offer"
                    onClick={() => onViewOffer(offer)}
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    type="button"
                    className="p-1 text-[#6F9C3D] hover:text-[#6F9C4F] transition"
                    title="Edit Offer"
                    onClick={() => onEditOffer(offer)}
                  >
                    <Pencil size={18} />
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

export default OffersTable;