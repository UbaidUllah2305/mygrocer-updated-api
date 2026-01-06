import React from 'react';

// Mock transaction data
const mockTransactions = [
  { id: 1, date: '09/09/25', reference: 'INV-001', description: 'Sales', debit: '0', credit: '15,000' },
  { id: 2, date: '09/09/25', reference: 'INV-002', description: 'Sales', debit: '0', credit: '15,000' },
  { id: 3, date: '09/09/25', reference: 'INV-003', description: 'Sales', debit: '0', credit: '15,000' },
];

const AccountDetails = ({ account, onBack }) => {
  // Calculate totals
  const totalDebit = mockTransactions.reduce((sum, t) =>
    sum + parseFloat(t.debit.replace(/,/g, '') || 0), 0
  );
  const totalCredit = mockTransactions.reduce((sum, t) =>
    sum + parseFloat(t.credit.replace(/,/g, '') || 0), 0
  );

  // Handle PDF export (you can implement actual logic later)
  const handleExportPDF = (transactionId) => {
    console.log(`Exporting PDF for transaction ${transactionId}`);
    // TODO: Trigger PDF download or API call
  };

  return (
    <div className="p-4 md:p-6">
      {/* Breadcrumb */}
      <div className="text-gray-500 text-sm mb-2" style={{ fontFamily: "'Satoshi', sans-serif" }}>
        <span className="cursor-pointer hover:text-[#6F9C3D]" onClick={onBack}>Accounts</span> /
      </div>

      {/* Header */}
      <h1 className="text-2xl font-medium text-gray-800 mb-6" style={{ fontFamily: "'Satoshi', sans-serif" }}>
        {account.name} <span className="text-2xl font-medium">({account.type})</span>
      </h1>

      {/* Table */}
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Table Header */}
          <div className="rounded-xl bg-[#6f9c3d4f] p-4">
            <div className="grid grid-cols-7 text-lg font-medium text-[#3a3e47]" style={{ fontFamily: "'Inter', sans-serif" }}>
              <div className="text-center py-2 truncate">ID</div>
              <div className="text-center py-2 truncate">Transaction Date</div>
              <div className="text-center py-2 truncate">Reference</div>
              <div className="text-center py-2 truncate">Description</div>
              <div className="text-center py-2 truncate">Debit</div>
              <div className="text-center py-2 truncate">Credit</div>
              <div className="text-center py-2 truncate">Actions</div>
            </div>
          </div>

          {/* Table Rows */}
          <div className="mt-3 space-y-3">
            {mockTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="rounded-xl bg-[#f7f7f7] p-4 shadow-sm ring-1 ring-black/5 transition-all hover:bg-[#f3f3f3]"
              >
                <div className="grid grid-cols-7 gap-2 items-center text-lg font-normal" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                  <div className="text-center py-2 truncate text-gray-700">{transaction.id}</div>
                  <div className="text-center py-2 truncate text-gray-700">{transaction.date}</div>
                  <div className="text-center py-2 truncate text-gray-700">{transaction.reference}</div>
                  <div className="text-center py-2 truncate text-gray-700">{transaction.description}</div>
                  <div className="text-center py-2 truncate text-gray-700">{transaction.debit}</div>
                  <div className="text-center py-2 truncate text-gray-700">{transaction.credit}</div>
                  <div className="text-center py-2 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => handleExportPDF(transaction.id)}
                      className="inline-flex items-center justify-center rounded-lg p-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-[#6F9C3D]/30"
                      title="Export as PDF"
                      style={{ width: "44px", height: "44px" }}
                    >
                      <img
                        src="/assets/Assets/pdf.svg"
                        alt="Export as PDF"
                        className="h-8 w-8"
                        loading="lazy"
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Totals */}
      <div className="flex justify-end mt-45 text-xl font-medium">
        <div className='flex gap-4 border-t-2 border-[#0000008F] pt-3'>
          <div className="bg-[#D5E5C4] text-gray-700 px-8 py-5 rounded-lg text-center h-17 min-w-[180px]" style={{ fontFamily: "'Satoshi', sans-serif" }}>
            {totalDebit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="bg-[#D5E5C4] text-gray-700 px-8 py-5 rounded-lg text-center h-17 min-w-[180px]" style={{ fontFamily: "'Satoshi', sans-serif" }}>
            {totalCredit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;