// src/Pages/Admin/Accounts.jsx
import React, { useState } from "react";
import { Link } from "@inertiajs/react";

// Components (already modular)
import AccountsList from "@/Pages/Shopkeeper/Dashboard/Accounts/AccountsList/AccountsList";
import AccountDetails from "@/Pages/Shopkeeper/Dashboard/Accounts/AccountsList/AccountDetails";
import IncomeStatement from "@/Components/Admin/accounts/IncomeStatement";
import IncomeStatementDetails from "@/Components/Admin/accounts/IncomeStatementDetails";
import BalanceSheet from "@/Components/Admin/accounts/BalanceSheet";

// Summary Card Component
const SummaryCard = ({ value, label }) => (
  <div className="bg-[#6F9C3D4F] rounded-xl pl-8 py-8 min-w-[180px] h-31">
    <p className="text-2xl font-semibold text-gray-800">{value}</p>
    <p className="text-base font-medium text-gray-600 mt-1">{label}</p>
  </div>
);

// Module Card Component
const ModuleCard = ({ title, subtitle, onClick }) => (
  <button
    onClick={onClick}
    className="bg-[#6F9C3D] hover:bg-[#5a7d31] h-39 rounded-xl pl-11 py-10 text-left transition-all duration-200 transform hover:scale-[1.02]"
  >
    <h3 className="text-white text-2xl font-medium mb-1">{title}</h3>
    <p className="text-white/80 text-base font-medium">{subtitle}</p>
  </button>
);

const Accounts = () => {
  const [currentScreen, setCurrentScreen] = useState('main');
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedStatement, setSelectedStatement] = useState(null);

  const summaryData = {
    totalRevenue: '$456,250.00',
    totalExpense: '$285,250.00',
    netProfit: '$172,850.00',
    cashBalance: '$95,800.00'
  };

  const handleModuleClick = (module) => {
    if (module === 'accounts') {
      setCurrentScreen('list');
    } else if (module === 'income') {
      setCurrentScreen('income');
    } else if (module === 'balance') {
      setCurrentScreen('balance');
    }
  };

  const handleViewAccount = (account) => {
    setSelectedAccount(account);
    setCurrentScreen('details');
  };

  const handleViewStatementDetails = (statement) => {
    setSelectedStatement(statement);
    setCurrentScreen('incomeDetails');
  };

  const handleBackToMain = () => {
    setCurrentScreen('main');
    setSelectedAccount(null);
    setSelectedStatement(null);
  };

  const handleBackToList = () => {
    setCurrentScreen('list');
    setSelectedAccount(null);
  };

  const handleBackToIncomeStatement = () => {
    setCurrentScreen('income');
    setSelectedStatement(null);
  };

  const renderContent = () => {
    switch (currentScreen) {
      case 'list':
        return <AccountsList onBack={handleBackToMain} onViewAccount={handleViewAccount} />;
      case 'details':
        return <AccountDetails account={selectedAccount} onBack={handleBackToList} />;
      case 'income':
        return <IncomeStatement onBack={handleBackToMain} onViewDetails={handleViewStatementDetails} />;
      case 'incomeDetails':
        return <IncomeStatementDetails statement={selectedStatement} onBack={handleBackToIncomeStatement} />;
      case 'balance':
        return <BalanceSheet onBack={handleBackToMain} />;
      default:
        return (
          <>
            {/* Page Header */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Accounts</h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <SummaryCard value={summaryData.totalRevenue} label="Total Revenue" />
              <SummaryCard value={summaryData.totalExpense} label="Total Expense" />
              <SummaryCard value={summaryData.netProfit} label="Net Profit" />
              <SummaryCard value={summaryData.cashBalance} label="Cash Balance" />
            </div>

            {/* Modules */}
            <h2 className="text-xl font-medium text-gray-900 mb-4">Accounting Modules</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ModuleCard
                title="Accounts"
                subtitle="Manage Accounts"
                onClick={() => handleModuleClick('accounts')}
              />
              <ModuleCard
                title="Income Statement"
                subtitle="Revenue & Expense"
                onClick={() => handleModuleClick('income')}
              />
              <ModuleCard
                title="Balance Sheet"
                subtitle="Assets & Liabilities"
                onClick={() => handleModuleClick('balance')}
              />
            </div>
          </>
        );
    }
  };

  return (
    <div>
      {renderContent()}
    </div>
  );
};

export default Accounts;