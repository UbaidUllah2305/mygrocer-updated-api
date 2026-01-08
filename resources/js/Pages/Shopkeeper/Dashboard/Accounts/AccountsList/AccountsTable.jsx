import React from "react";
import { Pencil, ChevronRight } from "lucide-react";

const AccountsTable = ({ accounts, onViewAccount }) => {
  if (accounts.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 text-center text-sm text-gray-600">
        No accounts found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-[#6F9C3D4F] text-[#3A3E47] text-lg font-medium">
            <th className="p-4 text-center rounded-tl-xl rounded-bl-xl">ID</th>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-center">Account Code</th>
            <th className="p-4 text-left">Description</th>
            <th className="p-4 text-center">Type</th>
            <th className="p-4 text-center">Debit</th>
            <th className="p-4 text-center">Credit</th>
            <th className="p-4 text-center">Balance</th>
            <th className="p-4 text-center rounded-tr-xl rounded-br-xl">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr><td colSpan="9" className="h-2"></td></tr>
        </tbody>

        <tbody>
          {accounts.map((account, index) => (
            <tr
              key={account.id}
              className="text-base text-neutral-800 bg-[#f7f7f7] border-b border-gray-200 hover:bg-[#f3f3f3] transition"
            >
              <td className={`p-4 text-center ${index === 0 ? "rounded-tl-xl" : ""}`}>
                {account.id}
              </td>
              <td className="p-4 text-left">{account.name}</td>
              <td className="p-4 text-center">{account.code}</td>
              <td className="p-4 text-left">{account.description}</td>
              <td className="p-4 text-center">{account.type}</td>
              <td className="p-4 text-center">{account.debit}</td>
              <td className="p-4 text-center">{account.credit}</td>
              <td className="p-4 text-center">{account.balance}</td>
              <td className={`p-4 text-center ${index === 0 ? "rounded-tr-xl" : ""}`}>
                <div className="flex items-center justify-center gap-2">
                  <button
                    className="p-1.5 hover:bg-gray-100 rounded transition"
                    aria-label="Edit account"
                  >
                    <Pencil className="w-4 h-4 text-[#6F9C3D]" />
                  </button>
                  <button
                    onClick={() => onViewAccount(account)}
                    className="p-1.5 hover:bg-gray-100 rounded transition"
                    aria-label="View account details"
                  >
                    <ChevronRight className="w-5 h-6 text-[#B2B2B2]" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountsTable;