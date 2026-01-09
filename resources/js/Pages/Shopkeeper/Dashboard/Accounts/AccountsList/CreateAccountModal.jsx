import React, { useState, useRef, useEffect } from "react";

const CreateAccountModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    type: 'Revenue',
    costCenter: '',
    subCostCenter: '',
  });

  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isCostCenterOpen, setIsCostCenterOpen] = useState(false);
  const [isSubCostCenterOpen, setIsSubCostCenterOpen] = useState(false);

  const typeRef = useRef(null);
  const costCenterRef = useRef(null);
  const subCostCenterRef = useRef(null);

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

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (typeRef.current && !typeRef.current.contains(e.target)) setIsTypeOpen(false);
      if (costCenterRef.current && !costCenterRef.current.contains(e.target)) setIsCostCenterOpen(false);
      if (subCostCenterRef.current && !subCostCenterRef.current.contains(e.target)) setIsSubCostCenterOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/30 outline-none transition"
                placeholder="Name"
              />
              <div ref={typeRef} className="relative">
                <div
                  className="relative w-full px-4 py-3 rounded-lg border border-gray-300 cursor-pointer focus-within:border-[#6F9C3D] focus-within:ring-2 focus-within:ring-[#6F9C3D]/30 transition"
                  onClick={() => setIsTypeOpen(!isTypeOpen)}
                >
                  {accountTypes.find(t => t.value === formData.type)?.label || 'Select Type'}
                  <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" width="16" height="16" fill="none" stroke="#2c323c" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
                {isTypeOpen && (
                  <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                    {accountTypes.map((option) => (
                      <div
                        key={option.value}
                        className="px-4 py-2 cursor-pointer hover:bg-[#e5f0d8] transition"
                        onClick={() => {
                          handleChange('type', option.value);
                          setIsTypeOpen(false);
                        }}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Row 2: Account Code + Description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={formData.code}
                onChange={(e) => handleChange('code', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/30 outline-none transition"
                placeholder="Account code"
              />
              <input
                type="text"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/30 outline-none transition"
                placeholder="Description"
              />
            </div>

            {/* Row 3: Cost Center + Sub Cost Center */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div ref={costCenterRef} className="relative">
                <div
                  className="relative w-full px-4 py-3 rounded-lg border border-gray-300 cursor-pointer focus-within:border-[#6F9C3D] focus-within:ring-2 focus-within:ring-[#6F9C3D]/30 transition"
                  onClick={() => setIsCostCenterOpen(!isCostCenterOpen)}
                >
                  {costCenters.find(c => c.value === formData.costCenter)?.label || 'Select Cost Center'}
                  <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" width="16" height="16" fill="none" stroke="#2c323c" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
                {isCostCenterOpen && (
                  <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                    {costCenters.map((option) => (
                      <div
                        key={option.value}
                        className="px-4 py-2 cursor-pointer hover:bg-[#e5f0d8] transition"
                        onClick={() => {
                          handleChange('costCenter', option.value);
                          handleChange('subCostCenter', '');
                          setIsCostCenterOpen(false);
                        }}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div ref={subCostCenterRef} className="relative">
                <div
                  className="relative w-full px-4 py-3 rounded-lg border border-gray-300 cursor-pointer focus-within:border-[#6F9C3D] focus-within:ring-2 focus-within:ring-[#6F9C3D]/30 transition"
                  onClick={() => setIsSubCostCenterOpen(!isSubCostCenterOpen)}
                >
                  {subCostCenters.find(s => s.value === formData.subCostCenter)?.label || 'Select Sub Cost Center'}
                  <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" width="16" height="16" fill="none" stroke="#2c323c" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
                {isSubCostCenterOpen && (
                  <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                    {subCostCenters.map((option) => (
                      <div
                        key={option.value}
                        className="px-4 py-2 cursor-pointer hover:bg-[#e5f0d8] transition"
                        onClick={() => {
                          handleChange('subCostCenter', option.value);
                          setIsSubCostCenterOpen(false);
                        }}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
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