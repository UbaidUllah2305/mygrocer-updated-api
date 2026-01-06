import React, { useState, useEffect } from 'react';
import Header from '../../Components/Admin/Header';
import Sidebar from '../../Components/Admin/Sidebar';
import AccountsList from '../../Components/Admin/accounts/AccountsList';
import AccountDetails from '../../Components/Admin/accounts/AccountDetails';
import IncomeStatement from '../../Components/Admin/accounts/IncomeStatement';
import IncomeStatementDetails from '../../Components/Admin/accounts/IncomeStatementDetails';
import BalanceSheet from '../../Components/Admin/accounts/BalanceSheet';
import { router } from '@inertiajs/react';

// Summary Card Component
const SummaryCard = ({ value, label }) => {
  return (
    <div className="bg-[#6F9C3D4F] rounded-xl pl-8 py-8 min-w-[180px] h-31">
      <p className="text-2xl font-semibold text-gray-800">{value}</p>
      <p className="text-base font-medium text-gray-600 mt-1">{label}</p>
    </div>
  );
};

// Module Card Component
const ModuleCard = ({ title, subtitle, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-[#6F9C3D] hover:bg-[#5a7d31] h-39 rounded-xl pl-11 py-10 text-left transition-all duration-200 transform hover:scale-[1.02]"
    >
      <h3 className="text-white text-2xl font-medium mb-1">{title}</h3>
      <p className="text-white/80 text-base font-medium">{subtitle}</p>
    </button>
  );
};

const Accounts = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('main');
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedStatement, setSelectedStatement] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    if (isMobile) setIsSidebarOpen(false);
  };

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

  const handleSidebarChange = (id) => {
    const paths = {
      dashboard: "/dashboard",
      inventory: "/inventory",
      analytics: "/analytics",
      trends: "/trends",
      adjustments: "/adjustments",
      overheads: "/overheads",
      events: "/events",
      offers: "/offers",
      orders: "/orders",
      messages: "/messages",
      accounts: "/accounts",
      vouchers: "/settings/vouchers",
      delivery: "/settings/deliverysettings",
      subscription: "/settings/subscription",
      "vendor-dashboard": "/settings/vendor-dashboard",
      "help-center": "/settings/help-center",
    };

    if (paths[id]) {
      router.visit(paths[id], {
        preserveScroll: true,
        preserveState: true,
      });
    }

    if (isMobile) {
      closeSidebar();
    }
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
          <div className="p-4 md:p-6">
            <div className="text-gray-500 text-sm mb-2">Accounts /</div>
            <h1 className="text-2xl font-medium text-gray-800 mb-6">Accounts</h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <SummaryCard value={summaryData.totalRevenue} label="Total Revenue" />
              <SummaryCard value={summaryData.totalExpense} label="Total Expense" />
              <SummaryCard value={summaryData.netProfit} label="Net Profit" />
              <SummaryCard value={summaryData.cashBalance} label="Cash Balance" />
            </div>

            <h2 className="text-2xl font-medium text-gray-800 mb-4">Accounting Modules</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ModuleCard title="Accounts" subtitle="Manage Accounts" onClick={() => handleModuleClick('accounts')} />
              <ModuleCard title="Income Statement" subtitle="Revenue & Expense" onClick={() => handleModuleClick('income')} />
              <ModuleCard title="Balance Sheet" subtitle="Assets & Liabilities" onClick={() => handleModuleClick('balance')} />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#161c2b]">
      <div className="shrink-0">
        <Header
          isMobile={isMobile}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={toggleSidebar}
        />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          active="accounts"
          onChange={handleSidebarChange}
          isMobile={isMobile}
          mobileOpen={isMobile ? isSidebarOpen : true}
          onCloseMobile={closeSidebar}
        />

        <main className={`flex-1 overflow-y-auto transition-all duration-300 ${isMobile ? "ml-0" : "ml-64"}`}>
          <div className="pt-(--header-height) min-h-screen" style={{ background: "linear-gradient(180deg, #e5f0d8 0%, #fff 40%)" }}>
            <div className="bg-white min-h-[calc(100vh-96px)]">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Accounts;