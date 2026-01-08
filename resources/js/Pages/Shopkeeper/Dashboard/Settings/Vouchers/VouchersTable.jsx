// src/Components/Admin/VouchersTable.jsx
import React from "react";
import { Eye } from "lucide-react";

const VouchersTable = ({ vouchers, onViewVoucher }) => {
  if (vouchers.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 text-center text-sm text-gray-600">
        No vouchers found. Create your first voucher!
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-[#6F9C3D4F] text-[#3A3E47] text-lg md:text-xl font-medium">
            <th className="p-4 text-center rounded-tl-xl">#</th>
            <th className="p-4 text-center">Voucher Name</th>
            <th className="p-4 text-center">Voucher Code</th>
            <th className="p-4 text-center">Type</th>
            <th className="p-4 text-center">Discount</th>
            <th className="p-4 text-left">Valid Date</th>
            <th className="p-4 text-center">Quantity</th>
            <th className="p-4 text-center">Used</th>
            <th className="p-4 text-center rounded-tr-xl">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr><td colSpan="9" className="h-2"></td></tr>
        </tbody>
        <tbody>
          {vouchers.map((voucher, index) => (
            <tr
              key={voucher.id}
              className="text-base md:text-lg bg-[#D8D8D83B] border-b-2"
            >
              <td className={`p-4 text-center ${index === 0 ? "rounded-tl-xl" : ""}`}>
                {index + 1}
              </td>
              <td className="p-4 text-center">{voucher.name}</td>
              <td className="p-4 text-center">{voucher.code}</td>
              <td className="p-4 text-center">{voucher.type}</td>
              <td className="p-4 text-center">{voucher.discount}</td>
              <td className="p-4 text-left">
                <div>{voucher.validDate}</div>
                <div className="text-sm">{voucher.validTime}</div>
              </td>
              <td className="p-4 text-center">{voucher.quantity}</td>
              <td className="p-4 text-center">{voucher.used}</td>
              <td className={`p-4 text-center ${index === 0 ? "rounded-tr-xl" : ""}`}>
                <button
                  onClick={() => onViewVoucher(voucher)}
                  className="p-2 text-gray-500 hover:text-[#6F9C3D] hover:bg-[#6F9C3D]/10 rounded transition"
                  title="View Details"
                >
                  <Eye className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VouchersTable;