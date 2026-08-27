import React from "react";
import { Pencil } from "lucide-react";

const DeliveryPricingTable = ({ deliveryTypes, onToggleStatus, onView, onEdit }) => {
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
            <th className="p-4 text-left">Delivery Type</th>
            <th className="p-4 text-left">Delivery Fee</th>
            <th className="p-4 text-left">Min Order Amount</th>
            <th className="p-4 text-left">Max Distance (Km)</th>
            <th className="p-4 text-left">Estimated Time</th>
            <th className="p-4 text-left">Status</th>
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
              <td className="p-4 text-left">{type.name}</td>
              <td className="p-4 text-left">Rs. {type.fee}</td>
              <td className="p-4 text-left">Rs. {type.minOrder}</td>
              <td className="p-4 text-left">{type.maxDistance}</td>
              <td className="p-4 text-left">{type.estimatedTime}</td>
              <td className="p-4 text-left">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={type.status}
                    onChange={() => onToggleStatus(type.id)}
                  />
                  <div className="relative w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#6F9C3D]/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6F9C3D]"></div>
                </label>
              </td>
              <td className={`p-4 text-center ${index === 0 ? "rounded-tr-xl" : ""}`}>
                <div className="flex items-center justify-center gap-2">
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