import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import IncomeStatement from "./IncomeStatement/IncomeStatement";
import IncomeStatementDetails from "./IncomeStatement/IncomeStatementDetails";

const SummaryCard = ({ value, label }) => (
  <div className="bg-[#6F9C3D4F] rounded-xl pl-8 py-8 min-w-[180px] h-31">
    <p className="text-2xl font-semibold text-gray-800">{value}</p>
    <p className="text-base font-medium text-gray-600 mt-1">{label}</p>
  </div>
);

const ModuleCard = ({ title, subtitle, href }) => (
  <Link
    href={href}
    className="bg-[#6F9C3D] hover:bg-[#5a7d31] h-39 rounded-xl pl-11 py-10 text-left transition-all duration-200 transform hover:scale-[1.02] block"
  >
    <h3 className="text-white text-2xl font-medium mb-1">{title}</h3>
    <p className="text-white/80 text-base font-medium">{subtitle}</p>
  </Link>
);

const Accounts = () => {
  const summaryData = {
    totalRevenue: '$456,250.00',
    totalExpense: '$285,250.00',
    netProfit: '$172,850.00',
    cashBalance: '$95,800.00'
  };

  return (
    <>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Accounts</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <SummaryCard value={summaryData.totalRevenue} label="Total Revenue" />
        <SummaryCard value={summaryData.totalExpense} label="Total Expense" />
        <SummaryCard value={summaryData.netProfit} label="Net Profit" />
        <SummaryCard value={summaryData.cashBalance} label="Cash Balance" />
      </div>
      <h2 className="text-xl font-medium text-gray-900 mb-4">Accounting Modules</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ModuleCard
          title="Accounts"
          subtitle="Manage Accounts"
          href="/list"
        />
        <ModuleCard
          title="Income Statement"
          subtitle="Revenue & Expense"
          href="/income-statement"
        />
        <ModuleCard
          title="Balance Sheet"
          subtitle="Assets & Liabilities"
          href="/balance-sheet"
        />
      </div>
    </>
  );
};

export default Accounts;