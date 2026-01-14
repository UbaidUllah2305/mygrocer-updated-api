import React from "react";
import { Eye } from "lucide-react";
import { FaFilePdf } from "react-icons/fa";

const TransactionTable = ({ transactions, onViewTransaction }) => {
  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 text-center text-sm text-gray-600">
        No transactions found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-[#6F9C3D4F] text-neutral-800 text-lg font-medium">
            <th className="p-4 text-left pl-10 rounded-tl-xl rounded-bl-xl">#</th>
            <th className="p-4 text-left">Details</th>
            <th className="p-4 text-center">Store Name</th>
            <th className="p-4 text-center">Date</th>
            <th className="p-4 text-center">Valid Till</th>
            <th className="p-4 text-center">Credited Points</th>
            <th className="p-4 text-center rounded-tr-xl rounded-br-xl">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr><td colSpan="7" className="h-2"></td></tr>
        </tbody>
        <tbody>
          {transactions.map((tx, index) => (
            <tr
              key={tx.id}
              className="text-lg font-medium text-neutral-800 bg-[#f7f7f7] border-b border-gray-200 hover:bg-[#f3f3f3]"
            >
              <td className={`p-4 text-left pl-10 ${index === 0 ? "rounded-tl-xl" : ""}`}>
                {tx.id}
              </td>
              <td className="p-4 text-left">{tx.details}</td>
              <td className="p-4 text-center">{tx.storeName}</td>
              <td className="p-4 text-center">{tx.date}</td>
              <td className="p-4 text-center">{tx.validTill || "—"}</td>
              <td className={`p-4 text-center font-bold ${tx.creditedPoints.startsWith("+") ? "text-[#6F9C3D]" : "text-red-700"}`}>
                {tx.creditedPoints}
              </td>
              <td className={`p-4 text-center ${index === 0 ? "rounded-tr-xl" : ""}`}>
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => onViewTransaction(tx)}
                    className="p-2 text-neutral-400 hover:text-neutral-500 transition"
                    aria-label="View details"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    className="p-2 transition"
                    aria-label="Download PDF"
                  >
                    <FaFilePdf size={18} className="text-red-600" />
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

export default TransactionTable;