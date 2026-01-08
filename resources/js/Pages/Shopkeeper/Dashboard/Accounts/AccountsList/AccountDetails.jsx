import React from "react";
import { ArrowLeft } from "lucide-react";
import { FaFilePdf } from "react-icons/fa";
import { Link } from "@inertiajs/react";

// Mock transaction data
const mockTransactions = [
  { id: 1, date: '09/09/25', reference: 'INV-001', description: 'Sales', debit: '0', credit: '15,000' },
  { id: 2, date: '09/09/25', reference: 'INV-002', description: 'Sales', debit: '0', credit: '15,000' },
  { id: 3, date: '09/09/25', reference: 'INV-003', description: 'Sales', debit: '0', credit: '15,000' },
];

const AccountDetails = ({ account, onBack }) => {
  // Calculate totals
  const totalDebit = mockTransactions.reduce((sum, t) =>
    sum + parseFloat(t.debit.replace(/,/g, '') || 0), 0
  );
  const totalCredit = mockTransactions.reduce((sum, t) =>
    sum + parseFloat(t.credit.replace(/,/g, '') || 0), 0
  );

  const handleExportPDF = (transactionId) => {
    console.log(`Exporting PDF for transaction ${transactionId}`);
    // TODO: Implement actual PDF export
  };

  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {account.name}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            {account.type} • Account Code: {account.code}
          </p>
        </div>
        <button
          onClick={onBack}
          className="px-4 py-3 bg-[#6F9C3D] flex text-white rounded-lg font-medium transition"
        >
          <ArrowLeft />
          Back to Accounts
        </button>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto">
        <table className="w-full rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-[#6F9C3D4F] text-[#3A3E47] text-lg font-medium">
              <th className="p-4 text-center rounded-tl-xl rounded-bl-xl">ID</th>
              <th className="p-4 text-center">Transaction Date</th>
              <th className="p-4 text-center">Reference</th>
              <th className="p-4 text-center">Description</th>
              <th className="p-4 text-center">Debit</th>
              <th className="p-4 text-center">Credit</th>
              <th className="p-4 text-center rounded-tr-xl rounded-br-xl">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr><td colSpan="7" className="h-2"></td></tr>
          </tbody>

          <tbody>
            {mockTransactions.map((transaction, index) => (
              <tr
                key={transaction.id}
                className="text-base text-gray-700 bg-[#f7f7f7] border-b border-gray-200 hover:bg-[#f3f3f3]"
              >
                <td className={`p-4 text-center ${index === 0 ? "rounded-tl-xl" : ""}`}>
                  {transaction.id}
                </td>
                <td className="p-4 text-center">{transaction.date}</td>
                <td className="p-4 text-center">{transaction.reference}</td>
                <td className="p-4 text-center">{transaction.description}</td>
                <td className="p-4 text-center">{transaction.debit}</td>
                <td className="p-4 text-center">{transaction.credit}</td>
                <td className={`p-4 text-center ${index === 0 ? "rounded-tr-xl" : ""}`}>
                  <button
                    type="button"
                    onClick={() => handleExportPDF(transaction.id)}
                    className="inline-flex items-center justify-center rounded-lg p-2 text-gray-500 hover:text-gray-700 transition"
                    title="Export as PDF"
                  >
                    <FaFilePdf size={22} className="text-red-600 hover:text-red-700" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals Section */}
      <div className="flex justify-end mt-8">
        <div className="flex gap-4 border-t-2 border-[#0000008F] pt-4">
          <div className="bg-[#D5E5C4] text-gray-700 px-6 py-4 rounded-lg text-center min-w-[160px]">
            <div className="text-lg">Total Debit</div>
            <div className="text-lg font-semibold">
              {totalDebit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
          <div className="bg-[#D5E5C4] text-gray-700 px-6 py-4 rounded-lg text-center min-w-[160px]">
            <div className="text-lg">Total Credit</div>
            <div className="text-lg font-semibold">
              {totalCredit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountDetails;