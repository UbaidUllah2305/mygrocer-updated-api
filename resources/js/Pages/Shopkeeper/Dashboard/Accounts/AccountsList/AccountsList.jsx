import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import AccountsTable from "./AccountsTable";
import CreateAccountModal from "./CreateAccountModal";

// Mock data
const mockAccounts = [
  { id: 1, name: 'Sales', code: '1,000', description: 'Income gener..', type: 'Revenue', debit: '25,000', credit: '15,000', balance: '10,000' },
  // ... other accounts
];

const AccountsList = ({ onBack, onViewAccount }) => {
  const [accounts] = useState(mockAccounts);
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
        {/* Left section */}
        <div className="flex flex-col gap-2">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-800 transition focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-lg w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Accounts
          </button>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
            List of Accounts
          </h1>
        </div>

        {/* Action button */}
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center justify-center bg-[#6F9C3D] hover:bg-[#5a7d31] active:bg-[#4e6c2a]
               text-white px-6 py-3 rounded-xl font-semibold text-base sm:text-lg
               transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#6F9C3D]/50"
        >
          Create New Account
        </button>
      </div>


      {/* Reusable Table */}
      <AccountsTable accounts={accounts} onViewAccount={onViewAccount} />

      {/* Modal */}
      {showCreateModal && (
        <CreateAccountModal onClose={() => setShowCreateModal(false)} />
      )}
    </>
  );
};

export default AccountsList;