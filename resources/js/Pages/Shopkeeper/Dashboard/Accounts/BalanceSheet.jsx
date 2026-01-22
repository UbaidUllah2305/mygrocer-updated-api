import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

// Collapsible Category Header
const CategoryHeader = ({ title, isOpen, onToggle }) => (
  <button
    onClick={onToggle}
    className="w-full bg-[#6F9C3D4F] text-lg font-medium text-[#3A3E47] px-4 py-3 rounded-lg flex items-center justify-between hover:bg-[#6F9C3D8F] transition"
  >
    <span>{title}</span>
    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
  </button>
);

// Balance Row Component
const BalanceRow = ({ label, value, isTotal = false, indent = false }) => (
  <div className={`flex items-center justify-between px-4 py-3 ${isTotal ? 'bg-gray-50 font-bold' : 'border-b border-gray-200'}`}>
    <span className={`text-gray-700 ${indent ? 'pl-4' : ''}`}>{label}</span>
    <span className="text-gray-700">{value}</span>
  </div>
);

// Balance Section Component
const BalanceSection = ({ title, items, totals }) => {
  const [isOpen, setIsOpen] = useState(true);

  // Don't render section if no items and no totals
  if (items.length === 0 && !totals) return null;

  return (
    <div className="mb-4 shadow-sm rounded-xl">
      <CategoryHeader title={title} isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <div className="bg-white rounded-lg overflow-hidden">
          {items.length > 0 ? (
            items.map((item, idx) => (
              <BalanceRow key={idx} label={item.label} value={item.value} indent={item.indent} />
            ))
          ) : (
            <div className="px-4 py-3 text-gray-500 text-center">No items</div>
          )}
          {totals && <BalanceRow label={totals.label} value={totals.value} isTotal />}
        </div>
      )}
    </div>
  );
};

const BalanceSheet = () => {
  // Assets Data
  const currentAssetsItems = [
    { label: 'Assets', value: '0.00' },
    { label: 'Cash', value: '0.00' },
  ];

  const nonCurrentAssetsItems = [
    { label: 'Special Accounts', value: '-10,000.00' },
  ];

  // Liabilities Data
  const currentLiabilitiesItems = [];
  const nonCurrentLiabilitiesItems = [
    { label: 'None', value: '0.00' },
  ];

  // Equity Data
  const equityItems = [];

  return (
    <>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Comprehensive Balance Sheet
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">
          View your assets, liabilities, and equity
        </p>
      </div>

      {/* Assets Section */}
      <div className="mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-[#6F9C3D] pb-3 mb-4 border-b border-[#00000059]">
          Assets
        </h2>
        <BalanceSection
          title="Current Assets"
          items={currentAssetsItems}
          totals={{ label: 'Sub Total', value: '0.00' }}
        />
        <BalanceSection
          title="Non Current Assets"
          items={nonCurrentAssetsItems}
          totals={{ label: 'Total Non-Current Assets', value: '-10,000.00' }}
        />
      </div>

      {/* Liabilities Section */}
      <div className="mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-[#6F9C3D] pb-3 mb-4 border-b border-[#00000059]">
          Liabilities
        </h2>
        <BalanceSection
          title="Current Liabilities"
          items={currentLiabilitiesItems}
          totals={{ label: 'Sub Total', value: '0.00' }}
        />
        <BalanceSection
          title="Non Current Liabilities"
          items={nonCurrentLiabilitiesItems}
          totals={{ label: 'Total Non-Current Liabilities', value: '0.00' }}
        />
      </div>

      {/* Equity Section */}
      <div className="mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-[#6F9C3D] pb-3 mb-4 border-b border-[#00000059]">
          Equity
        </h2>
        <BalanceSection
          title="Equity"
          items={equityItems}
          totals={{ label: 'Total Equity', value: '0.00' }}
        />
      </div>
    </>
  );
};

export default BalanceSheet;