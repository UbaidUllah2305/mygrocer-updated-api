// src/Components/Admin/Accounts/CreateAccountModal.jsx
import React, { useState } from "react";
import InputFloating from "@/Components/InputFloating";
import SelectFloating from "@/Components/SelectFloating";

const CreateAccountModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    type: 'Revenue',
    costCenter: '',
    subCostCenter: '',
  });

  const accountTypes = [
    { value: 'Revenue', label: 'Revenue' },
    { value: 'Assets', label: 'Assets' },
    { value: 'Equity', label: 'Equity' },
    { value: 'Liabilities', label: 'Liabilities' },
    { value: 'Expense', label: 'Expense' },
  ];

  const costCenters = [
    { value: '', label: 'Select Cost Center' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Sales', label: 'Sales' },
    { value: 'Operations', label: 'Operations' },
  ];

  const subCostCentersMap = {
    '': [{ value: '', label: 'Select Sub Cost Center' }],
    Marketing: [
      { value: '', label: 'Select Sub Cost Center' },
      { value: 'Digital', label: 'Digital' },
      { value: 'Print', label: 'Print' },
      { value: 'Events', label: 'Events' },
    ],
    Sales: [
      { value: '', label: 'Select Sub Cost Center' },
      { value: 'Retail', label: 'Retail' },
      { value: 'Wholesale', label: 'Wholesale' },
      { value: 'Online', label: 'Online' },
    ],
    Operations: [
      { value: '', label: 'Select Sub Cost Center' },
      { value: 'Logistics', label: 'Logistics' },
      { value: 'HR', label: 'HR' },
      { value: 'IT', label: 'IT' },
    ],
  };

  // Handle input change (for InputFloating)
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle select change (for SelectFloating — mimics native <select> event)
  const handleSelectChange = (field) => (e) => {
    const value = e.target.value;
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      // Reset subCostCenter when costCenter changes
      if (field === 'costCenter') {
        updated.subCostCenter = '';
      }
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  const subCostCenters = subCostCentersMap[formData.costCenter] || subCostCentersMap[''];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="relative bg-white rounded-xl w-full max-w-[1040px] shadow-lg">
        <button
          onClick={onClose}
          className="absolute -top-1 -right-1 z-10"
          aria-label="Close"
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 30 30" fill="none">
              <circle cx="15" cy="15" r="15" fill="#DF3A3A" />
              <path d="M10 10L20 20M20 10L10 20" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-normal text-gray-800 mb-6" style={{ fontFamily: 'Abyssinica SIL' }}>
            Create a New Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Row 1: Name + Account Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputFloating
                id="accountName"
                label="Name"
                value={formData.name}
                onChange={(value) => handleInputChange('name', value)}
              />
              <SelectFloating
                id="accountType"
                label="Account Type"
                value={formData.type}
                onChange={handleSelectChange('type')}
                options={accountTypes}
                placeholder="Select Type"
              />
            </div>

            {/* Row 2: Account Code + Description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputFloating
                id="accountCode"
                label="Account code"
                value={formData.code}
                onChange={(value) => handleInputChange('code', value)}
              />
              <InputFloating
                id="accountDescription"
                label="Description"
                value={formData.description}
                onChange={(value) => handleInputChange('description', value)}
              />
            </div>

            {/* Row 3: Cost Center + Sub Cost Center */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectFloating
                id="costCenter"
                label="Cost Center"
                value={formData.costCenter}
                onChange={handleSelectChange('costCenter')}
                options={costCenters}
                placeholder="Select Cost Center"
              />
              <SelectFloating
                id="subCostCenter"
                label="Sub Cost Center"
                value={formData.subCostCenter}
                onChange={handleSelectChange('subCostCenter')}
                options={subCostCenters}
                placeholder="Select Sub Cost Center"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-8 flex justify-center">
              <button
                type="submit"
                className="max-w-[696px] w-full bg-[#6F9C3D] hover:bg-[#5a7d31] text-white px-8 py-3 rounded-lg font-medium transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountModal;