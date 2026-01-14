import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import CustomerDashboardLayout from "@/Layouts/CustomerDashboardLayout";
import WalletStatsCard from "./WalletStatsCard";
import TransactionTable from "./TransactionTable";
import ViewTransactionModal from "./ViewTransactionModal";
import AddBalanceModal from "./AddBalanceModal";

const WalletPage = ({ auth }) => {
  const [isAddBalanceModalOpen, setIsAddBalanceModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingTransaction, setViewingTransaction] = useState(null);

  const wallet = {
    balance: 2435,
    worth: "$24.35 in rewards",
    totalPurchased: 1000,
    totalEarned: 350,
    totalConsumed: 350,
    availablePoints: 250,
  };

  const transactions = [
    {
      id: 1,
      details: "Balance Added",
      storeName: "--",
      date: "12-11-2025",
      validTill: "--",
      creditedPoints: "+1,000",
      actions: "add",
    },
    {
      id: 2,
      details: "INV-004",
      storeName: "AL-Fateh",
      date: "12-11-2025",
      validTill: "--",
      creditedPoints: "+100",
      actions: "add",
    },
    {
      id: 3,
      details: "Refund - INV-003 (Out of Stock)",
      storeName: "Saeed Mart",
      date: "12-11-2025",
      validTill: "--",
      creditedPoints: "+125",
      actions: "add",
    },
    {
      id: 4,
      details: "INV-002",
      storeName: "Local Store",
      date: "12-11-2025",
      validTill: "12-03-2026",
      creditedPoints: "+500",
      actions: "add",
    },
    {
      id: 5,
      details: "INV-002",
      storeName: "Local Store",
      date: "12-11-2025",
      validTill: "--",
      creditedPoints: "-1,000",
      actions: "remove",
    },
  ];

  return (
    <CustomerDashboardLayout
      auth={auth}
      showFilters={false}
      showLocationBar={false}
      showBreadcrumb={true}
    >
      {/* Page Title */}
      <h1 className="text-2xl font-semibold mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
        My Wallet
      </h1>
      <p className="text-base mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
        Use your wallet balance to pay for orders instantly.
      </p>

      {/* Available Balance Card */}
      <div className="bg-[#6F9C3D4F] rounded-xl p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-medium mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
              Available Balance
            </h2>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold text-[#6F9C3D]">{wallet.balance}</span>
              <span className="text-base font-medium">Worth {wallet.worth}</span>
            </div>
          </div>
          <button
            onClick={() => setIsAddBalanceModalOpen(true)}
            className="px-4 py-2 w-full sm:w-auto bg-[#6F9C3D] text-white text-lg rounded-lg hover:bg-[#5A7E2F] transition"
          >
            Add Balance
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <WalletStatsCard title="Total Purchased" value={wallet.totalPurchased} />
        <WalletStatsCard title="Total Earned" value={wallet.totalEarned} />
        <WalletStatsCard title="Total Consumed" value={wallet.totalConsumed} />
      </div>

      {/* Transaction History */}
      <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
        Transaction History
      </h2>

      <TransactionTable
        transactions={transactions}
        onViewTransaction={(tx) => {
          setViewingTransaction(tx);
          setIsViewModalOpen(true);
        }}
      />

      {/* Total Available Points */}
      <div className="mt-6 flex justify-center">
        <div className="bg-[#6F9C3D35] px-6 py-3 rounded-xl">
          <span className="text-xl font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
            Total Available Points :{" "}
            <span className="text-[#6F9C3D]">{wallet.availablePoints}</span>
          </span>
        </div>
      </div>

      <AddBalanceModal
        isOpen={isAddBalanceModalOpen}
        onClose={() => setIsAddBalanceModalOpen(false)}
      />
      <ViewTransactionModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        transaction={viewingTransaction}
      />
    </CustomerDashboardLayout>
  );
};

export default WalletPage;