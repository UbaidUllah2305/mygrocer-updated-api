// src/Components/Admin/GenerateVoucherModal.jsx
import React, { useState, useEffect } from "react";
import InputFloating from "@/Components/InputFloating";
import { X } from "lucide-react";

const GenerateVoucherModal = ({ isOpen, onClose, onGenerate, editVoucher = null }) => {
  const [formData, setFormData] = useState({
    voucherName: '',
    voucherCode: '',
    discountType: 'Percentage',
    discountValue: '',
    minimumPurchase: '',
    maximumDiscount: 'Percentage',
    startDate: '',
    endDate: '',
    voucherQuantity: '',
    description: ''
  });

  useEffect(() => {
    if (editVoucher) {
      setFormData({
        voucherName: editVoucher.name || '',
        voucherCode: editVoucher.code || '',
        discountType: editVoucher.type || 'Percentage',
        discountValue: editVoucher.discount?.replace('%', '') || '',
        minimumPurchase: editVoucher.minimumPurchase?.replace('$', '') || '',
        maximumDiscount: 'Percentage',
        startDate: editVoucher.startDate || '',
        endDate: editVoucher.endDate || '',
        voucherQuantity: editVoucher.quantity?.toString() || '',
        description: editVoucher.description || ''
      });
    } else {
      setFormData({
        voucherName: '',
        voucherCode: '',
        discountType: 'Percentage',
        discountValue: '',
        minimumPurchase: '',
        maximumDiscount: 'Percentage',
        startDate: '',
        endDate: '',
        voucherQuantity: '',
        description: ''
      });
    }
  }, [editVoucher, isOpen]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      {/* Responsive width: full on mobile, max-w-4xl on desktop */}
      <div className="relative bg-white rounded-xl w-full max-w-4xl max-h-[90vh] shadow-xl overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 z-10 bg-red-600 rounded-full text-white"
          aria-label="Close"
        >
          <X />
        </button>

        <div className="p-4 sm:p-6">
          {/* Header */}
          <h2 className="text-lg sm:text-xl font-semibold text-[#6F9C3D] mb-4 sm:mb-5">
            Generate Voucher <span className="text-[#6F9C3D] font-normal">(Add Details)</span>
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Row 1: Voucher Name & Voucher Code */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4">
              <InputFloating
                id="voucherName"
                label="Voucher Name"
                value={formData.voucherName}
                onChange={(e) => handleChange('voucherName', e.target.value)}
              />
              <InputFloating
                id="voucherCode"
                label="Voucher Code"
                value={formData.voucherCode}
                onChange={(e) => handleChange('voucherCode', e.target.value.toUpperCase())}
              />
            </div>

            {/* Row 2: Discount Type & Discount Value */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-4 sm:grid-cols-2">
              <div className="relative">
                <select
                  id="discountType"
                  value={formData.discountType}
                  onChange={(e) => handleChange('discountType', e.target.value)}
                  className="peer w-full px-3 py-3 sm:px-4 sm:py-4 text-sm sm:text-base rounded-xl border-2 border-[#B9BBBD] bg-white transition-all duration-200 focus:outline-none focus:border-[#6F9C3D] focus:ring-1 focus:ring-[#6F9C3D]"
                >
                  <option value="Percentage">Percentage</option>
                  <option value="Free Delivery">Free Delivery</option>
                  <option value="Fixed Amount">Fixed Amount</option>
                </select>
                <label
                  htmlFor="discountType"
                  className="absolute left-3 px-1 text-xs bg-white transition-all duration-200 pointer-events-none text-[#9B9DA2] top-3 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#6F9C3D] peer-focus:font-medium sm:left-4 sm:px-2 sm:text-sm sm:top-4 sm:peer-focus:-top-2.5 sm:peer-focus:text-sm"
                >
                  Discount Type
                </label>
              </div>
              <InputFloating
                id="discountValue"
                label="Discount Value"
                value={formData.discountValue}
                onChange={(e) => handleChange('discountValue', e.target.value)}
              />
            </div>

            {/* Row 3: Minimum Purchase & Maximum Discount */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-4 sm:grid-cols-2">
              <InputFloating
                id="minimumPurchase"
                label="Minimum Purchase"
                value={formData.minimumPurchase}
                onChange={(e) => handleChange('minimumPurchase', e.target.value)}
              />
              <div className="relative">
                <select
                  id="maximumDiscount"
                  value={formData.maximumDiscount}
                  onChange={(e) => handleChange('maximumDiscount', e.target.value)}
                  className="peer w-full px-3 py-3 sm:px-4 sm:py-4 text-sm sm:text-base rounded-xl border-2 border-[#B9BBBD] bg-white transition-all duration-200 focus:outline-none focus:border-[#6F9C3D] focus:ring-1 focus:ring-[#6F9C3D]"
                >
                  <option value="Percentage">Percentage</option>
                  <option value="Fixed">Fixed</option>
                </select>
                <label
                  htmlFor="maximumDiscount"
                  className="absolute left-3 px-1 text-xs bg-white transition-all duration-200 pointer-events-none text-[#9B9DA2] top-3 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#6F9C3D] peer-focus:font-medium sm:left-4 sm:px-2 sm:text-sm sm:top-4 sm:peer-focus:-top-2.5 sm:peer-focus:text-sm"
                >
                  Maximum Discount
                </label>
              </div>
            </div>

            {/* Row 4: Start Date & End Date */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-4 sm:grid-cols-2">
              <InputFloating
                id="startDate"
                label="Start Date"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleChange('startDate', e.target.value)}
              />
              <InputFloating
                id="endDate"
                label="End Date"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleChange('endDate', e.target.value)}
              />
            </div>

            {/* Row 5: Voucher Quantity & Description */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-5 sm:grid-cols-2">
              <InputFloating
                id="voucherQuantity"
                label="Voucher Quantity"
                type="number"
                value={formData.voucherQuantity}
                onChange={(e) => handleChange('voucherQuantity', e.target.value)}
              />
              <InputFloating
                id="description"
                label="Description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
              />
            </div>

            {/* Generate Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#6F9C3D] hover:bg-[#5a7d31] text-white px-6 py-2.5 rounded-xl font-medium text-base sm:text-lg transition w-full sm:w-auto sm:min-w-[144px] h-12"
              >
                Generate
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GenerateVoucherModal;