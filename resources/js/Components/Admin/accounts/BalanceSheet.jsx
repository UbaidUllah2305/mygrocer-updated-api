import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

// ===== COLLAPSIBLE CATEGORY HEADER =====
const CategoryHeader = ({ title, isOpen, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="w-full bg-[#6F9C3D4F] text-lg font-medium text-[#3A3E47] px-4 py-3 rounded-lg flex items-center justify-between mb-2 hover:bg-[#6F9C3D8F] transition"
    >
      <span className="font-medium">{title}</span>
      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
    </button>
  );
};

const BalanceRow = ({ label, value, isTotal = false, indent = false }) => {
  return (
    <div className={`flex items-center justify-between px-4 py-3 ${isTotal ? 'bg-gray-50 font-medium' : 'border-b border-gray-200'}`}>
      <span className={`text-gray-700 text-lg font-medium ${indent ? 'pl-4' : ''}`}>{label}</span>
      <span className="text-gray-700 text-lg font-medium">{value}</span>
    </div>
  );
};

const BalanceSection = ({ title, items, totals }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mb-4 shadow-sm rounded-xl">
      <CategoryHeader title={title} isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <div className="bg-white rounded-lg overflow-hidden">
          {items.map((item, idx) => (
            <BalanceRow key={idx} label={item.label} value={item.value} indent={item.indent} />
          ))}
          {totals && (
            <BalanceRow label={totals.label} value={totals.value} isTotal className="font-bold"/>
          )}
        </div>
      )}
    </div>
  );
};

const BalanceSheet = ({ onBack }) => {
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

  // Equity Data (empty for now)
  const equityItems = [];

  return (
    <div className="p-4 md:p-6">
      {/* Breadcrumb */}
      <div className="text-gray-500 text-sm mb-2">
        <span className="cursor-pointer hover:text-[#6F9C3D]" onClick={onBack}>Accounts</span> / Balance Sheet
      </div>

      {/* Header */}
      <h1 className="text-2xl font-medium text-gray-800 mb-6">
        Comprehensive Balance Sheet
      </h1>

      {/* Assets Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-[#6F9C3D] pb-4 mb-4 border-b border-[#00000059]">Assets</h2>

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
        <h2 className="text-3xl font-semibold text-[#6F9C3D] pb-4 mb-4 border-b border-[#00000059]">Liabilities</h2>

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
        <h2 className="text-3xl font-semibold text-[#6F9C3D] pb-4 mb-4 border-b border-[#00000059]">Equity</h2>

        <div className="mb-4">
          <button
            className="w-full bg-[#6F9C3D] text-white px-4 py-3 rounded-lg flex items-center justify-between hover:bg-[#5a7d31] transition"
          >
            <span className="font-medium">Equity</span>
            <ChevronUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BalanceSheet;