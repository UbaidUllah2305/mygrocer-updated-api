import React, { useState, useEffect } from "react";
import InputFloating from "@/Components/InputFloating";
import SelectFloating from "@/Components/SelectFloating";
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

  // Handle input change (for InputFloating)
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle select change (for SelectFloating — must mimic native <select> event)
  const handleSelectChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
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
                onChange={(value) => handleInputChange('voucherName', value)}
              />
              <InputFloating
                id="voucherCode"
                label="Voucher Code"
                value={formData.voucherCode}
                onChange={(value) => handleInputChange('voucherCode', value.toUpperCase())}
              />
            </div>

            {/* Row 2: Discount Type & Discount Value */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-4 sm:grid-cols-2">
              <SelectFloating
                id="discountType"
                label="Discount Type"
                value={formData.discountType}
                onChange={handleSelectChange('discountType')}
                options={[
                  { value: "Percentage", label: "Percentage" },
                  { value: "Free Delivery", label: "Free Delivery" },
                  { value: "Fixed Amount", label: "Fixed Amount" }
                ]}
                placeholder="Select Discount Type"
              />
              <InputFloating
                id="discountValue"
                label="Discount Value"
                value={formData.discountValue}
                onChange={(value) => handleInputChange('discountValue', value)}
              />
            </div>

            {/* Row 3: Minimum Purchase & Maximum Discount */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-4 sm:grid-cols-2">
              <InputFloating
                id="minimumPurchase"
                label="Minimum Purchase"
                value={formData.minimumPurchase}
                onChange={(value) => handleInputChange('minimumPurchase', value)}
              />
              <SelectFloating
                id="maximumDiscount"
                label="Maximum Discount"
                value={formData.maximumDiscount}
                onChange={handleSelectChange('maximumDiscount')}
                options={[
                  { value: "Percentage", label: "Percentage" },
                  { value: "Fixed", label: "Fixed" }
                ]}
                placeholder="Select Maximum Discount"
              />
            </div>

            {/* Row 4: Start Date & End Date */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-4 sm:grid-cols-2">
              <InputFloating
                id="startDate"
                label="Start Date"
                type="date"
                value={formData.startDate}
                onChange={(value) => handleInputChange('startDate', value)}
              />
              <InputFloating
                id="endDate"
                label="End Date"
                type="date"
                value={formData.endDate}
                onChange={(value) => handleInputChange('endDate', value)}
              />
            </div>

            {/* Row 5: Voucher Quantity & Description */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-5 sm:grid-cols-2">
              <InputFloating
                id="voucherQuantity"
                label="Voucher Quantity"
                type="number"
                value={formData.voucherQuantity}
                onChange={(value) => handleInputChange('voucherQuantity', value)}
              />
              <InputFloating
                id="description"
                label="Description"
                value={formData.description}
                onChange={(value) => handleInputChange('description', value)}
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