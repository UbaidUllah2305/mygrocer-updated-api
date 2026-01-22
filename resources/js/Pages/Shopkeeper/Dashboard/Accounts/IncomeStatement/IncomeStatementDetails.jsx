import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

// Mock data
const mockRevenueData = [
  { reference: "INV-101", accountName: "Product Sales", amount: "25,000.00" },
  { reference: "INV-102", accountName: "Service Revenue", amount: "15,000.00" },
];
const mockExpensesData = [
  { reference: "EXP-201", accountName: "Rent", amount: "5,000.00" },
  { reference: "EXP-202", accountName: "Utilities", amount: "2,500.00" },
  { reference: "EXP-203", accountName: "Salaries", amount: "8,000.00" },
];
const mockAssetsData = [
  { reference: "AST-301", accountName: "Office Equipment", amount: "12,000.00" },
  { reference: "AST-302", accountName: "Vehicles", amount: "45,000.00" },
];
const mockVatPaidData = [
  { reference: "VAT-401", accountName: "Q3 VAT Filing", amount: "3,200.00" },
  { reference: "VAT-402", accountName: "Q4 VAT Filing", amount: "4,100.00" },
];
const mockNetAssetsData = [
  { label: "Change in Net Assets", regularFunds: "-10,000.00", restrictedFunds: "0.00", total: "-10,000.00" },
  { label: "Net Assets, Beginning of Year", regularFunds: "0.00", restrictedFunds: "0.00", total: "0.00" },
];

// Collapsible Section Component
const Section = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-gray-800 font-medium text-lg mb-3 hover:text-[#6F9C3D] transition"
      >
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        {title}
      </button>
      {isOpen && <div className="bg-white rounded-xl overflow-hidden">{children}</div>}
    </div>
  );
};

// Generic Summary Table (3 columns)
const SummaryTable = ({ headers, data, emptyMessage, subTotalValue = '0.00' }) => {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 text-center text-sm text-gray-600">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-[#E8EFE0] text-gray-700 text-lg font-medium">
            {headers.map((header, idx) => (
              <th key={idx} className="p-4 text-center">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr><td colSpan="3" className="h-2"></td></tr>
        </tbody>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className="text-base text-gray-700 bg-[#f7f7f7] border-b border-gray-200 hover:bg-[#f3f3f3]"
            >
              <td className="p-4 text-center rounded-tl-xl rounded-bl-xl">{row.reference}</td>
              <td className="p-4 text-center">{row.accountName}</td>
              <td className="p-4 text-center rounded-tr-xl rounded-br-xl">{row.amount}</td>
            </tr>
          ))}
          {/* Subtotal Row */}
          <tr className="text-base font-medium text-gray-700 bg-[#00000013]">
            <td className="p-4 text-center">Sub Total</td>
            <td className="p-4 text-center"></td>
            <td className="p-4 text-center">{subTotalValue}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

// Net Assets Table (4 columns)
const NetAssetsTable = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-[#E8EFE0] text-gray-700 text-lg font-medium">
            <th className="p-4 text-center rounded-tl-xl rounded-bl-xl">Net Assets Summary</th>
            <th className="p-4 text-center">Regular Funds</th>
            <th className="p-4 text-center">Restricted Funds</th>
            <th className="p-4 text-center rounded-tr-xl rounded-br-xl">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr><td colSpan="4" className="h-2"></td></tr>
        </tbody>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className="text-base text-gray-700 bg-[#f7f7f7] border-b border-gray-200 hover:bg-[#f3f3f3]"
            >
              <td className="p-4 text-center rounded-tl-xl rounded-bl-xl">{row.label}</td>
              <td className="p-4 text-center">{row.regularFunds}</td>
              <td className="p-4 text-center">{row.restrictedFunds}</td>
              <td className="p-4 text-center rounded-tr-xl rounded-br-xl">{row.total}</td>
            </tr>
          ))}
          {/* Subtotal Row */}
          <tr className="text-base font-medium text-gray-700 bg-[#00000013]">
            <td className="p-4 text-center">Sub Total</td>
            <td className="p-4 text-center">-10,000.00</td>
            <td className="p-4 text-center">0.00</td>
            <td className="p-4 text-center">-10,000.00</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const IncomeStatementDetails = ({ statementId }) => {
  // In real app, fetch statement by ID
  const statement = {
    id: parseInt(statementId),
    period: { start: 'Nov 1, 2025', end: 'Dec 1, 2025' }
  };

  return (
    <>
      <div className="mb-6 space-y-4">
        {/* Title Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Income Statement Details
            </h1>
            <p className="text-lg font-semibold text-[#6F9C3D] mt-1">
              {statement.period.start} – {statement.period.end}
            </p>
          </div>
        </div>
      </div>

      {/* Sections */}
      <Section title="Revenue Summary">
        <SummaryTable
          headers={['Reference', 'Account Name', 'Total Amount']}
          data={mockRevenueData}
          emptyMessage="No revenue transactions found"
          subTotalValue="40,000.00"
        />
      </Section>

      <Section title="Expenses Summary">
        <SummaryTable
          headers={['Reference', 'Account Name', 'Total Amount']}
          data={mockExpensesData}
          emptyMessage="No expense transactions found"
          subTotalValue="15,500.00"
        />
      </Section>

      <Section title="Assets Summary">
        <SummaryTable
          headers={['Reference', 'Account Name', 'Total Amount']}
          data={mockAssetsData}
          emptyMessage="No assets transactions found"
          subTotalValue="57,000.00"
        />
      </Section>

      <Section title="VAT Paid Summary">
        <SummaryTable
          headers={['Reference', 'Account Name', 'Total Amount']}
          data={mockVatPaidData}
          emptyMessage="No VAT Paid transactions found"
          subTotalValue="7,300.00"
        />
      </Section>

      <Section title="Net Assets Summary">
        <NetAssetsTable data={mockNetAssetsData} />
      </Section>
    </>
  );
};

export default IncomeStatementDetails;