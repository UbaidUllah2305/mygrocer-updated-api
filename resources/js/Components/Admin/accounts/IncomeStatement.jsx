import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import DateInput from '../DateInput'; 

// Mock data for income statements
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

const IncomeStatement = ({ onBack, onViewDetails }) => {
  const [statements] = useState(mockStatements);
  const [fromDate, setFromDate] = useState('01-11-25');
  const [toDate, setToDate] = useState('01-12-25');

  return (
    <div className="p-4 md:p-6">
      {/* Breadcrumb */}
      <div className="text-gray-500 text-lg mb-2" style={{ fontFamily: "'Satoshi', sans-serif" }}>
        <span className="cursor-pointer hover:text-[#6F9C3D]" onClick={onBack}>Accounts</span> / Income Statement
      </div>

      {/* Header with Date Filters */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-medium text-gray-800" style={{ fontFamily: "'Satoshi', sans-serif" }}>
          Income Statement
        </h1>
        <div className="flex items-center gap-4">
          <DateInput
            label="From"
            value={fromDate}
            onChange={setFromDate}
            className="w-44" 
          />
          <DateInput
            label="To"
            value={toDate}
            onChange={setToDate}
            className="w-44"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <div className="min-w-[900px]">
          {/* Table Header */}
          <div className="rounded-xl bg-[#6f9c3d4f] p-4">
            <div className="grid grid-cols-8 text-lg font-medium text-[#3a3e47]" style={{ fontFamily: "'Inter', sans-serif" }}>
              <div className="text-center py-2 truncate -ml-10">Period</div>
              <div className="text-center py-2 truncate">Total Revenue</div>
              <div className="text-center py-2 truncate">Total Expense</div>
              <div className="text-center py-2 truncate">Net Income</div>
              <div className="text-center py-2 truncate">Current Net Assets</div>
              <div className="text-center py-2 truncate">Final Net Assets</div>
              <div className="text-center py-2 truncate">VAT Paid</div>
              <div className="text-center py-2 truncate">Actions</div>
            </div>
          </div>

          {/* Table Rows */}
          <div className="mt-3 space-y-3">
            {statements.map((statement) => (
              <div
                key={statement.id}
                className="rounded-xl bg-[#f7f7f7] p-4 shadow-sm ring-1 ring-black/5 transition-all hover:bg-[#f3f3f3]"
              >
                <div className="grid grid-cols-8 gap-2 items-center text-lg font-normal" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                  {/* Period */}
                  <div className="text-center py-2 text-sm -ml-">
                    <div>{statement.period.start}</div>
                    <div>- {statement.period.end}</div>
                  </div>
                  <div className="text-center py-2 text-gray-700">{statement.totalRevenue}</div>
                  <div className="text-center py-2 text-gray-700">{statement.totalExpense}</div>
                  <div className="text-center py-2 text-gray-700">{statement.netIncome}</div>
                  <div className="text-center py-2 text-gray-700">{statement.currentNetAssets}</div>
                  <div className="text-center py-2 text-gray-700">{statement.finalNetAssets}</div>
                  <div className="text-center py-2 text-gray-700">{statement.vatPaid}</div>
                  <div className="text-center py-2 flex items-center justify-center gap-2">
                    {/* View Details */}
                    <button
                      onClick={() => onViewDetails(statement)}
                      className="p-1.5 hover:bg-gray-100 rounded transition"
                      aria-label="View details"
                    >
                      <Eye className="w-4 h-4 text-gray-500" />
                    </button>
                    {/* Export PDF */}
                    <button
                      className="inline-flex items-center justify-center rounded-lg p-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-[#6F9C3D]/30"
                      title="Export as PDF"
                      style={{ width: "44px", height: "44px" }}
                    >
                      <img
                        src="/assets/Assets/pdf.svg"
                        alt="Export as PDF"
                        className="h-6 w-4.5"
                        loading="lazy"
                      />
                    </button>
                    {/* Export XLS */}
                    <button
                      className="inline-flex items-center justify-center rounded-lg p-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-[#6F9C3D]/30"
                      title="Export as XLS"
                      style={{ width: "44px", height: "44px" }}
                    >
                      <img
                        src="/assets/Assets/xls.svg"
                        alt="Export as XLS"
                        className="h-6 w-4.5"
                        loading="lazy"
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeStatement;