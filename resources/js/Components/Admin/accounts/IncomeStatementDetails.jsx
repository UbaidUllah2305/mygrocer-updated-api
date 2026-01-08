import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
      {isOpen && (
        <div className="bg-white rounded-xl overflow-hidden">
          {children}
        </div>
      )}
    </div>
  );
};

const SummaryTable = ({ headers, data, emptyMessage, subTotalValue = '0.00' }) => {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[500px]">
        {/* Table Header */}
        <div className="rounded-xl bg-[#E8EFE0] p-4">
          <div className="grid grid-cols-3 text-lg font-medium text-gray-700" style={{ fontFamily: "'Inter', sans-serif" }}>
            {headers.map((header, idx) => (
              <div key={idx} className="text-center py-2 truncate">{header}</div>
            ))}
          </div>
        </div>

        {/* Table Rows */}
        <div className="mt-3 space-y-3">
          {data.length === 0 ? (
            <div className="rounded-xl bg-white p-4 text-center text-sm text-gray-500">
              {emptyMessage}
            </div>
          ) : (
            data.map((row, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-[#f7f7f7] p-4 ring-1 ring-black/5 transition-all hover:bg-[#f3f3f3]"
              >
                <div className="grid grid-cols-3 gap-2 items-center text-lg font-normal" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                  <div className="text-center py-2 truncate">{row.reference}</div>
                  <div className="text-center py-2 truncate">{row.accountName}</div>
                  <div className="text-center py-2 truncate">{row.amount}</div>
                </div>
              </div>
            ))
          )}

          {/* Sub Total */}
          <div className="rounded-xl bg-[#00000013] p-4 shadow-sm ring-1 ring-black/5">
            <div className="grid grid-cols-3 gap-2 items-center text-lg font-medium" style={{ fontFamily: "'Satoshi', sans-serif" }}>
              <div className="text-center py-2">Sub Total</div>
              <div className="text-center py-2"></div>
              <div className="text-center py-2">{subTotalValue}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NetAssetsTable = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[650px]">
        {/* Table Header */}
        <div className="rounded-xl bg-[#E8EFE0] p-4">
          <div className="grid grid-cols-4 text-lg font-medium text-gray-700" style={{ fontFamily: "'Inter', sans-serif" }}>
            <div className="text-center py-2 truncate">Net Assets Summary</div>
            <div className="text-center py-2 truncate">Regular Funds</div>
            <div className="text-center py-2 truncate">Restricted Funds</div>
            <div className="text-center py-2 truncate">Total</div>
          </div>
        </div>

        {/* Table Rows */}
        <div className="mt-3 space-y-3">
          {data.map((row, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-[#f7f7f7] p-4 ring-1 ring-black/5 transition-all hover:bg-[#f3f3f3]"
            >
              <div className="grid grid-cols-4 gap-2 items-center text-lg font-normal" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                <div className="text-center py-2 truncate">{row.label}</div>
                <div className="text-center py-2 truncate">{row.regularFunds}</div>
                <div className="text-center py-2 truncate">{row.restrictedFunds}</div>
                <div className="text-center py-2 truncate">{row.total}</div>
              </div>
            </div>
          ))}

          {/* Sub Total */}
          <div className="rounded-xl bg-[#00000013] p-4 shadow-sm ring-1 ring-black/5">
            <div className="grid grid-cols-4 gap-2 items-center text-lg font-medium" style={{ fontFamily: "'Satoshi', sans-serif" }}>
              <div className="text-center py-2">Sub Total</div>
              <div className="text-center py-2">-10,000.00</div>
              <div className="text-center py-2">0.00</div>
              <div className="text-center py-2">-10,000.00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const IncomeStatementDetails = ({ statement, onBack }) => {
  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <h1 className="text-2xl font-medium text-gray-800 mb-1">
        Income Statement Details
      </h1>
      <p className="text-[#6F9C3D] text-lg font-semibold mb-6">
        Nov 1, 2025 - Dec 1, 2025
      </p>

      {/* Revenue Summary */}
      <Section title="Revenue Summary">
        <SummaryTable
          headers={['Reference', 'Account Name', 'Total Amount']}
          data={mockRevenueData}
          emptyMessage="No revenue transactions found"
          subTotalValue="40,000.00"
        />
      </Section>

      {/* Expenses Summary */}
      <Section title="Expenses Summary">
        <SummaryTable
          headers={['Reference', 'Account Name', 'Total Amount']}
          data={mockExpensesData}
          emptyMessage="No expense transactions found"
          subTotalValue="15,500.00"
        />
      </Section>

      {/* Assets Summary */}
      <Section title="Assets Summary">
        <SummaryTable
          headers={['Reference', 'Account Name', 'Total Amount']}
          data={mockAssetsData}
          emptyMessage="No assets transactions found"
          subTotalValue="57,000.00"
        />
      </Section>

      {/* VAT Paid Summary */}
      <Section title="VAT Paid Summary">
        <SummaryTable
          headers={['Reference', 'Account Name', 'Total Amount']}
          data={mockVatPaidData}
          emptyMessage="No VAT Paid transactions found"
          subTotalValue="7,300.00"
        />
      </Section>

      {/* Net Assets Summary */}
      <Section title="Net Assets Summary">
        <NetAssetsTable data={mockNetAssetsData} />
      </Section>
    </div>
  );
};

export default IncomeStatementDetails;