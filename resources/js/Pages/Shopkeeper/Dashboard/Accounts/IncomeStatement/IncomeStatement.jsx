import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import DateInput from "@/Components/Admin/DateInput";
import { Eye } from "lucide-react";
import { FaFileExcel, FaFilePdf } from "react-icons/fa";

// Mock data
const mockStatements = [
  {
    id: 1,
    period: { start: 'Nov 1, 2025', end: 'Dec 1, 2025' },
    totalRevenue: '0.00',
    totalExpense: '10,000.00',
    netIncome: '-10,000.00',
    currentNetAssets: '0',
    finalNetAssets: '-10,000.00',
    vatPaid: '0'
  },
];

const IncomeStatement = () => {
  const [statements] = useState(mockStatements);
  const [fromDate, setFromDate] = useState('01-11-25');
  const [toDate, setToDate] = useState('01-12-25');

  return (
    <>
      {/* Page Header */}
      <div className="mb-6 space-y-4">
        {/* Title + Filters Row */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Title & Subtitle */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Income Statement
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              View revenue, expenses, and net income over time
            </p>
          </div>

          {/* Date Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <DateInput
              label="From"
              value={fromDate}
              onChange={setFromDate}
              className="w-full sm:w-44"
            />
            <DateInput
              label="To"
              value={toDate}
              onChange={setToDate}
              className="w-full sm:w-44"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-[#6F9C3D4F] text-[#3A3E47] text-lg font-medium">
              <th className="p-4 text-center rounded-tl-xl rounded-bl-xl">Period</th>
              <th className="p-4 text-center">Total Revenue</th>
              <th className="p-4 text-center">Total Expense</th>
              <th className="p-4 text-center">Net Income</th>
              <th className="p-4 text-center">Current Net Assets</th>
              <th className="p-4 text-center">Final Net Assets</th>
              <th className="p-4 text-center">VAT Paid</th>
              <th className="p-4 text-center rounded-tr-xl rounded-br-xl">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr><td colSpan="8" className="h-2"></td></tr>
          </tbody>

          <tbody>
            {statements.map((statement, index) => (
              <tr
                key={statement.id}
                className="text-base text-gray-700 bg-[#f7f7f7] border-b border-gray-200 hover:bg-[#f3f3f3]"
              >
                <td className={`p-4 text-center ${index === 0 ? "rounded-tl-xl" : ""}`}>
                  <div>{statement.period.start}</div>
                  <div>- {statement.period.end}</div>
                </td>
                <td className="p-4 text-center">{statement.totalRevenue}</td>
                <td className="p-4 text-center">{statement.totalExpense}</td>
                <td className="p-4 text-center">{statement.netIncome}</td>
                <td className="p-4 text-center">{statement.currentNetAssets}</td>
                <td className="p-4 text-center">{statement.finalNetAssets}</td>
                <td className="p-4 text-center">{statement.vatPaid}</td>
                <td className={`p-4 text-center ${index === 0 ? "rounded-tr-xl" : ""}`}>
                  <div className="flex items-center justify-center gap-2">
                    {/*  Navigate to details page */}
                    <Link
                      href={`/income-statement/details/${statement.id}`}
                      className="p-1.5 text-gray-500 hover:text-gray-700 transition"
                      aria-label="View details"
                    >
                      <Eye size={16} />
                    </Link>
                    <button
                      className="p-1.5 text-red-600 hover:text-red-700 transition"
                      title="Export as PDF"
                    >
                      <FaFilePdf size={16} />
                    </button>
                    <button
                      className="p-1.5 text-green-700 hover:text-green-800 transition"
                      title="Export as Excel"
                    >
                      <FaFileExcel size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default IncomeStatement;