import React, { useState } from "react";
import { Link } from "@inertiajs/react";
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">List of Accounts</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-[#6F9C3D] hover:bg-[#5a7d31] text-white px-6 py-2.5 rounded-xl font-medium text-base sm:text-lg transition"
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