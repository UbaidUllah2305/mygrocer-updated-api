// resources/js/Pages/Customer/WalletPage.jsx

import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { Eye, X, } from "lucide-react";
import CustomerHeader from "../../Components/Customer/CustomerHeader";

const ViewTransactionModal = ({ isOpen, onClose, transaction }) => {
  if (!isOpen || !transaction) return null;

  // Mock purchase details (you can replace with real data later)
  const purchaseDetails = [
    { category: "Daily Grocery", item: "Olper's Milk Pack", price: "220.00", points: "+10" },
    { category: "Fresh Food", item: "Apples", price: "490.89", points: "+20" },
  ];

  const totalPoints = purchaseDetails.reduce((sum, item) => {
    const num = parseInt(item.points.replace("+", "")) || 0;
    return sum + num;
  }, 0);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-4 w-full max-w-[800px] h-[600px] shadow-xl relative overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 bg-red-500 rounded-2xl text-white hover:text-gray-400 transition z-10"
        >
          <X />
        </button>

        {/* Header */}
        <div className="p-6 border-b border-neutral-300">
          <div className="flex items-start gap-4">
            <div className="w-33 h-33 bg-[#D9D9D9] rounded-full flex items-center justify-center">
            </div>
            <div>
              <h2
                className="text-xl font-bold text-neutral-900"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Purchase at Main Store
              </h2>
              <p className="text-lg text-neutral-800 mt-1">Date : 12-09-2025</p>
              <p className="text-lg text-neutral-800">Time : 12:09 pm</p>
              <p className="text-lg text-neutral-800 mt-1">Status : Redeemed</p>
            </div>
          </div>
        </div>

        {/* Purchase Details */}
        <div className="py-4">
          {/* Title Bar */}
          <div className="bg-[#6F9C3D4F] rounded-xl p-4">
            <h3
              className="text-2xl font-bold text-neutral-800 text-center"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Purchase Details
            </h3>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto py-4">
          <div className="min-w-[600px]">
            {/* Table Header */}
            <div className="rounded-xl bg-[#6F9C3D29] px-4 py-3 mb-1">
              <div className="grid grid-cols-4 gap-4 text-lg font-medium text-gray-900">
                <div>Category</div>
                <div className="text-center">Item</div>
                <div>Price</div>
                <div>Loyalty Points</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="bg-gray-100 rounded-xl">
              <div className="divide-y divide-gray-200">
                {purchaseDetails.map((item, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-3 grid grid-cols-4 gap-4 text-lg"
                  >
                    <div className="truncate">{item.category}</div>
                    <div className="truncate text-center">{item.item}</div>
                    <div>{item.price}</div>
                    <div className="text-center">{item.points}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Total Points Earned */}
        <div className="pb-6 flex justify-end">
          <div className="bg-[#6F9C3D29] rounded-xl p-4 md:max-w-[324px]">
            <div className="flex justify-between items-center text-lg font-medium">
              <span>Total Points Earned :</span>
              <span>+{totalPoints}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AddBalanceModal = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      alert("Please enter an amount.");
      return;
    }
    alert(`Balance added: Rs. ${inputValue}`);
    onClose();
    setInputValue("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-[1040px] p-6 md:p-11 shadow-xl relative overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 bg-red-500 rounded-2xl text-white hover:text-gray-400 transition z-10"
        >
          <X />
        </button>

        {/* Title */}
        <h2
          className=" text-2xl md:text-3xl text-neutral-900 mb-9"
          style={{ fontFamily: "Abyssinica SIL" }}
        >
          Add Balance
        </h2>

        {/* Amount Input */}
        <form onSubmit={handleSubmit}>
          <div className="mb-16">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter Amount"
              className="w-full px-4 py-2 h-13 md:h-16 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6F9C3D] text-lg"
              style={{ fontFamily: "'Inter', sans-serif'" }}
            />
          </div>

          {/* Confirm Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full md:max-w-[700px] py-3 bg-[#FF8B29] text-white md:text-lg font-bold rounded-lg hover:bg-[#FF7A1A] transition"
            >
              Confirm & Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const WalletPage = () => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
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
    <div className="min-h-screen bg-[#FAFAFA]">
      <CustomerHeader />

      <main className="pt-20 px-4 sm:px-6 lg:px-8 pb-10">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div
            className="flex items-center gap-2 text-base md:text-lg mb-6 mt-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <Link href="/" className="hover:text-[#6F9C3D]">
              Go to home
            </Link>
            <span>/</span>
            <Link href="/customer/dashboard" className="hover:text-[#6F9C3D] font-medium">
              Dashboard
            </Link>
            <span>/</span>
            <span className="font-medium underline">My Grocer Wallet</span>
          </div>

          {/* Page Title */}
          <h1
            className="text-xl md:text-2xl font-semibold mb-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            My Wallet
          </h1>
          <p
            className="text-sm md:text-base mb-6"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Use your wallet balance to pay for orders instantly.
          </p>

          {/* Available Balance Card */}
          <div className="bg-[#6F9C3D4F] rounded-xl p-6 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h2
                  className="text-xl md:text-2xl font-medium mb-1"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Available Balance
                </h2>
                <div className="flex items-baseline flex-col gap-1">
                  <span className="text-3xl md:text-4xl font-semibold text-[#6F9C3D]">{wallet.balance}</span>
                  <span className="text-sm md:text-base font-medium">Worth {wallet.worth}</span>
                </div>
              </div>
              <button
                onClick={() => setIsAddBalanceModalOpen(true)}
                className="px-4 py-2 mt-13 md:w-[174px] md:h-12 bg-[#6F9C3D] text-white text-lg md:text-xl rounded-lg hover:bg-[#5A7E2F] transition"
              >
                Add Balance
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-[#6F9C3D29] flex flex-row justify-between rounded-xl p-4">
              <h3
                className="text-xl md:text-2xl font-medium"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Total Purchased
              </h3>
              <span className="text-xl md:text-2xl font-semibold text-[#6F9C3D]">{wallet.totalPurchased}</span>
            </div>
            <div className="bg-[#6F9C3D29] flex flex-row justify-between rounded-xl p-4">
              <h3
                className="text-xl md:text-2xl font-medium"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Total Earned
              </h3>
              <span className="text-xl md:text-2xl font-semibold text-[#6F9C3D]">{wallet.totalEarned}</span>
            </div>
            <div className="bg-[#6F9C3D29] flex flex-row justify-between rounded-xl p-4">
              <h3
                className="text-xl md:text-2xl font-medium"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Total Consumed
              </h3>
              <span className="text-xl md:text-2xl font-semibold text-[#6F9C3D]">{wallet.totalConsumed}</span>
            </div>
          </div>

          {/* Transaction History */}
          <h2
            className="text-xl md:text-2xl font-semibold mb-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Transaction History
          </h2>

          {/* Transaction History Table */}
          <div className="overflow-x-auto mt-6">
            <div className="min-w-[900px]">
              {/* Table Header */}
              <div className="rounded-xl bg-[#6f9c3d4f] h-16 p-4">
                <div className="grid grid-cols-7 text-lg font-medium text-neutral-800" style={{ fontFamily: "'Inter', sans-serif" }}>
                  <div className="text-left ml-7 truncate">#</div>
                  <div className="text-center truncate">Details</div>
                  <div className="text-center truncate">Store Name</div>
                  <div className="text-center truncate">Date</div>
                  <div className="text-center truncate">Valid Till</div>
                  <div className="text-center truncate">Credited Points</div>
                  <div className="text-center truncate">Actions</div>
                </div>
              </div>

              {/* Table Rows */}
              <div className="mt-3 space-y-3">
                {transactions.map((tx, idx) => (
                  <div
                    key={tx.id}
                    className="relative rounded-xl bg-[#f7f7f7] h-16 p-1 shadow-sm ring-1 ring-black/5 transition-all hover:bg-[#f3f3f3]"
                  >
                    <div className="grid grid-cols-7 items-center text-lg font-medium text-neutral-800" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                      {/* # */}
                      <div className="text-left ml-10 truncate">{tx.id}</div>
                      {/* Details */}
                      <div className="text-left truncate">{tx.details}</div>
                      {/* Store Name */}
                      <div className="text-center truncate">{tx.storeName}</div>
                      {/* Date */}
                      <div className="text-center truncate">{tx.date}</div>
                      {/* Valid Till */}
                      <div className="text-center truncate">{tx.validTill || "—"}</div>
                      {/* Credited Points */}
                      <div
                        className={`text-center truncate font-bold ${tx.creditedPoints.startsWith("+")
                          ? "text-[#6F9C3D]"
                          : "text-red-700"
                          }`}
                      >
                        {tx.creditedPoints}
                      </div>
                      {/* Actions */}
                      <div className="text-center py-2 flex items-center justify-center gap-2">
                        <button
                          onClick={() => {
                            setViewingTransaction(tx);
                            setIsViewModalOpen(true);
                          }}
                          className="inline-flex h-10 w-10 items-center justify-center text-neutral-400 hover:text-neutral-500 transition"
                          aria-label="View details"
                        >
                          <Eye />
                        </button>
                        <button
                          className="inline-flex h-10 w-10 items-center justify-center transition"
                          aria-label="Delete"
                        >
                          <img src="/assets/Assets/pdf.svg" alt="" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Replace the empty state with: */}
                {transactions.length === 0 && (
                  <div className="rounded-xl bg-white p-4 text-center text-sm text-gray-600">
                    No transactions found.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Total Available Points */}
          <div className="mt-6 flex justify-center">
            <div className="bg-[#6F9C3D35] px-6 py-3 rounded-xl">
              <span
                className="text-xl font-semibold"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Total Available Points : <span className="text-[#6F9C3D]">{wallet.availablePoints}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Add Balance Modal */}
        <AddBalanceModal
          isOpen={isAddBalanceModalOpen}
          onClose={() => setIsAddBalanceModalOpen(false)}
        />

        {/* View Transaction Modal */}
        <ViewTransactionModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          transaction={viewingTransaction}
        />
      </main>
    </div>
  );
};

export default WalletPage;