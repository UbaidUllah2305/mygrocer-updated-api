import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import VouchersTable from "./VouchersTable";
import GenerateVoucherModal from "./GenerateVoucherModal";
import VoucherDetailsModal from "./VoucherDetailsModal";

const Vouchers = () => {
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  // Mock data for vouchers
  const [vouchers, setVouchers] = useState([
    {
      id: 1,
      name: 'Welcome Bonus',
      code: 'WELCOME50',
      type: 'Percentage',
      discount: '12%',
      validDate: '12-09-2025',
      validTime: 'at 02:30pm',
      quantity: 120,
      used: 2,
      startDate: '12-09-2024',
      endDate: '12-12-2024',
      minimumPurchase: '$100',
      description: 'Welcome bonus for new customers',
      usageHistory: [
        { customerName: 'Fareed Ahmed', date: '12-09-2025', time: 'at 02:30pm', used: 1, remaining: 119 },
        { customerName: 'Asad', date: '12-09-2025', time: 'at 02:30pm', used: 1, remaining: 118 },
      ]
    },
    {
      id: 2,
      name: 'Loyalty Reward',
      code: 'loyalty30',
      type: 'Free Delivery',
      discount: '10%',
      validDate: '15-09-2025',
      validTime: 'at 02:30pm',
      quantity: 1000,
      used: 100,
      startDate: '15-09-2024',
      endDate: '15-12-2024',
      minimumPurchase: '$50',
      description: 'Loyalty reward for returning customers',
      usageHistory: []
    },
  ]);

  const handleViewVoucher = (voucher) => {
    setSelectedVoucher(voucher);
    setShowDetailsModal(true);
  };

  const handleGenerateVoucher = (formData) => {
    const newVoucher = {
      id: vouchers.length + 1,
      name: formData.voucherName,
      code: formData.voucherCode,
      type: formData.discountType,
      discount: formData.discountValue + (formData.discountType === 'Percentage' ? '%' : ''),
      validDate: formData.endDate ? new Date(formData.endDate).toLocaleDateString('en-GB').replace(/\//g, '-') : '',
      validTime: 'at 02:30pm',
      quantity: parseInt(formData.voucherQuantity) || 0,
      used: 0,
      startDate: formData.startDate ? new Date(formData.startDate).toLocaleDateString('en-GB').replace(/\//g, '-') : '',
      endDate: formData.endDate ? new Date(formData.endDate).toLocaleDateString('en-GB').replace(/\//g, '-') : '',
      minimumPurchase: '$' + formData.minimumPurchase,
      description: formData.description,
      usageHistory: []
    };
    setVouchers(prev => [...prev, newVoucher]);
  };

  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Vouchers</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Manage promotional vouchers and discounts
          </p>
        </div>
        <button
          onClick={() => setShowGenerateModal(true)}
          className="bg-[#6F9C3D] hover:bg-[#5a7d31] text-white px-6 py-2.5 rounded-lg font-medium text-base sm:text-lg transition"
        >
          Create New Voucher
        </button>
      </div>

      {/* Table */}
      <VouchersTable vouchers={vouchers} onViewVoucher={handleViewVoucher} />

      {/* Modals */}
      <GenerateVoucherModal
        isOpen={showGenerateModal}
        onClose={() => setShowGenerateModal(false)}
        onGenerate={handleGenerateVoucher}
      />

      <VoucherDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        voucher={selectedVoucher}
      />
    </>
  );
};

export default Vouchers;