// src/Components/Admin/DeliveryPricingTable.jsx
import React from "react";
import { Pencil, Eye } from "lucide-react";

const DeliveryPricingTable = ({ deliveryTypes, onView, onEdit }) => {
  if (deliveryTypes.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 text-center text-sm text-gray-600">
        No delivery types found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-[#6F9C3D4F] text-[#3A3E47] text-lg font-medium">
            <th className="p-4 text-center rounded-tl-xl rounded-bl-xl">#</th>
            <th className="p-4 text-center">Delivery Type</th>
            <th className="p-4 text-center">Delivery Fee</th>
            <th className="p-4 text-center">Min Order Amount</th>
            <th className="p-4 text-center">Max Distance (Km)</th>
            <th className="p-4 text-center">Estimated Time</th>
            <th className="p-4 text-center">Status</th>
            <th className="p-4 text-center rounded-tr-xl rounded-br-xl">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr><td colSpan="8" className="h-2"></td></tr>
        </tbody>
        <tbody>
          {deliveryTypes.map((type, index) => (
            <tr
              key={type.id}
              className="text-base text-[#3a3e47] bg-[#f7f7f7] border-b border-gray-200"
            >
              <td className={`p-4 text-center ${index === 0 ? "rounded-tl-xl" : ""}`}>
                {index + 1}
              </td>
              <td className="p-4 text-center">{type.name}</td>
              <td className="p-4 text-center">Rs. {type.fee}</td>
              <td className="p-4 text-center">Rs. {type.minOrder}</td>
              <td className="p-4 text-center">{type.maxDistance}</td>
              <td className="p-4 text-center">{type.estimatedTime}</td>
              <td className={`p-4 text-center font-medium ${type.status === "Active" ? "text-[#6F9C3D]" : "text-[#df3a3a]"}`}>
                {type.status}
              </td>
              <td className={`p-4 text-center ${index === 0 ? "rounded-tr-xl" : ""}`}>
                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    className="p-1.5 text-gray-500 hover:text-blue-600 transition"
                    title="View"
                    onClick={() => onView(type, 'pricing')}
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    type="button"
                    className="p-1.5 text-[#6F9C3D] hover:text-[#5a7d31] transition"
                    title="Edit"
                    onClick={() => onEdit(type)}
                  >
                    <Pencil size={16} />
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

export default DeliveryPricingTable;