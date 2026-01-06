import React, { useState, useEffect } from 'react';
import Header from '../../../Components/Admin/Header';
import Sidebar from '../../../Components/Admin/Sidebar';
import { router } from '@inertiajs/react';
import { Eye, ChevronDown, ChevronUp } from 'lucide-react';

// Floating Label Input Component
const FloatingLabelInput = ({ label, value, onChange, placeholder, type = "text", hasDropdown = false }) => {
  return (
    <fieldset className="border border-[#6F9C3D] rounded-lg px-3 pt-1 pb-2">
      <legend className="text-sm text-[#6F9C3D] px-1">
        {label}
      </legend>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
        />
        {hasDropdown && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col">
            <ChevronUp className="w-4 h-4 text-gray-400" />
            <ChevronDown className="w-4 h-4 text-gray-400 -mt-1" />
          </div>
        )}
      </div>
    </fieldset>
  );
};

// Floating Label Select Component
const FloatingLabelSelect = ({ label, value, onChange, options }) => {
  return (
    <fieldset className="border border-[#6F9C3D] rounded-lg px-3 pt-1 pb-2">
      <legend className="text-sm text-[#6F9C3D] px-1 ">
        {label}
      </legend>
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className="w-full bg-transparent outline-none text-sm text-gray-700 appearance-none pr-6 cursor-pointer"
          style={{ fontFamily: "'Satoshi', sans-serif" }}
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>
    </fieldset>
  );
};

// Generate Voucher Modal
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
      <div className="relative bg-white rounded-xl w-full max-w-[1160px] max-h-[740px] shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 z-10"
          aria-label="Close"
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="15" cy="15" r="15" fill="#DF3A3A" />
              <path d="M10 10L20 20M20 10L10 20" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </button>

        <div className="p-6 pt-5">
          {/* Header */}
          <h2 className="text-xl font-semibold text-[#6F9C3D] mb-5" style={{ fontFamily: "'Satoshi', sans-serif" }}>
            Generate Voucher <span className="text-[#6F9C3D] font-normal">(Add Details)</span>
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Row 1: Voucher Name & Voucher Code */}
            <div className="grid grid-cols-2 gap-6 mb-4">
              <FloatingLabelInput
                label="Voucher Name"
                value={formData.voucherName}
                onChange={(e) => handleChange('voucherName', e.target.value)}
                placeholder="Welcome Bonus"
              />
              <FloatingLabelInput
                label="Voucher Code"
                value={formData.voucherCode}
                onChange={(e) => handleChange('voucherCode', e.target.value.toUpperCase())}
                placeholder="WELCOME50"
              />
            </div>

            {/* Row 2: Discount Type & Discount Value */}
            <div className="grid grid-cols-2 gap-6 mb-4">
              <FloatingLabelSelect
                label="Discount Type"
                value={formData.discountType}
                onChange={(e) => handleChange('discountType', e.target.value)}
                options={[
                  { value: 'Percentage', label: 'Percentage' },
                  { value: 'Free Delivery', label: 'Free Delivery' },
                  { value: 'Fixed Amount', label: 'Fixed Amount' }
                ]}
              />
              <FloatingLabelInput
                label="Discount Value"
                value={formData.discountValue}
                onChange={(e) => handleChange('discountValue', e.target.value)}
                placeholder="50%"
              />
            </div>

            {/* Row 3: Minimum Purchase & Maximum Discount */}
            <div className="grid grid-cols-2 gap-6 mb-4">
              <FloatingLabelInput
                label="Minimum Purchase"
                value={formData.minimumPurchase}
                onChange={(e) => handleChange('minimumPurchase', e.target.value)}
                placeholder="100"
                hasDropdown={true}
              />
              <FloatingLabelSelect
                label="Maximum Discount"
                value={formData.maximumDiscount}
                onChange={(e) => handleChange('maximumDiscount', e.target.value)}
                options={[
                  { value: 'Percentage', label: 'Percentage' },
                  { value: 'Fixed', label: 'Fixed' }
                ]}
              />
            </div>

            {/* Row 4: Start Date & End Date */}
            <div className="grid grid-cols-2 gap-6 mb-4">
              <FloatingLabelInput
                label="Start Date"
                value={formData.startDate}
                onChange={(e) => handleChange('startDate', e.target.value)}
                placeholder="mm/dd/yyyy"
                type="date"
              />
              <FloatingLabelInput
                label="End Date"
                value={formData.endDate}
                onChange={(e) => handleChange('endDate', e.target.value)}
                placeholder="mm/dd/yyyy"
                type="date"
              />
            </div>

            {/* Row 5: Voucher Quantity & Description */}
            <div className="grid grid-cols-2 gap-6 mb-5">
              <FloatingLabelInput
                label="Voucher Quantity"
                value={formData.voucherQuantity}
                onChange={(e) => handleChange('voucherQuantity', e.target.value)}
                placeholder="120"
                type="number"
              />
              <FloatingLabelInput
                label="Description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Brief description of what this voucher offers"
              />
            </div>

            {/* Generate Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#6F9C3D] hover:bg-[#5a7d31] text-white px-8 py-2.5 rounded-xl font-normal text-lg transition w-36 h-12"
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

// Voucher Details Modal
const VoucherDetailsModal = ({ isOpen, onClose, voucher }) => {
  if (!isOpen || !voucher) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="relative bg-white rounded-xl w-full max-w-[800px] shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10"
          aria-label="Close"
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="15" cy="15" r="15" fill="#DF3A3A" />
              <path d="M10 10L20 20M20 10L10 20" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </button>

        <div className="p-6">
          {/* Header */}
          <h2 className="text-xl md:text-2xl font-semibold text-[#6F9C3D] mb-6" style={{ fontFamily: "'Satoshi', sans-serif" }}>
            Voucher Details
          </h2>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Coupon Details */}
            <div className="bg-[#F4F4F4] rounded-lg p-4 pl-6">
              <h3 className="text-[#6F9C3D] font-semibold md:text-lg mb-3">Coupon Details</h3>
              <div className="space-y-2 md:text-lg text-gray-700">
                <p><span className="font-medium">Voucher Name :</span> {voucher.name}</p>
                <p><span className="font-medium">Voucher Code :</span> {voucher.code}</p>
                <p><span className="font-medium">Discount Type :</span> {voucher.type}</p>
                <p><span className="font-medium">Discount Value :</span> {voucher.discount}</p>
                <p><span className="font-medium">Minimum Purchase :</span> {voucher.minimumPurchase}</p>
                <p><span className="font-medium">Quantity :</span> {voucher.quantity?.toLocaleString()}</p>
                <p><span className="font-medium">Used :</span> {voucher.used}</p>
              </div>
            </div>

            {/* Validity */}
            <div className="bg-[#F4F4F4] rounded-lg px-16 md:px-18 py-6 h-40">
              <h3 className="text-[#6F9C3D] md:text-lg font-semibold mb-3">Validity</h3>
              <div className="space-y-2 lg:text-lg text-gray-700">
                <p><span className="font-medium">Start Date :</span> {voucher.startDate}</p>
                <p><span className="font-medium">End Date :</span> {voucher.endDate}</p>
              </div>
            </div>
          </div>

          {/* Usage Table */}
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              {/* Table Header */}
              <div className="rounded-xl bg-[#E8EFE0] p-4">
                <div className="grid grid-cols-5 gap-2 md:text-lg font-medium text-gray-700">
                  <div className="text-center">#</div>
                  <div className="text-center truncate">Customer Name</div>
                  <div className="text-center">Date</div>
                  <div className="text-center">Used</div>
                  <div className="text-center">Remaining</div>
                </div>
              </div>

              {/* Table Rows */}
              <div className="mt-2 space-y-2">
                {voucher.usageHistory?.map((usage, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl bg-gray-50 p-4"
                  >
                    <div className="grid grid-cols-5 gap-2 items-center md:text-lg text-gray-700">
                      <div className="text-center">{idx + 1}</div>
                      <div className="text-center">{usage.customerName}</div>
                      <div className="text-center">
                        <div>{usage.date}</div>
                        <div className="text-xs">{usage.time}</div>
                      </div>
                      <div className="text-center">{usage.used}</div>
                      <div className="text-center">{usage.remaining}</div>
                    </div>
                  </div>
                ))}
                {(!voucher.usageHistory || voucher.usageHistory.length === 0) && (
                  <div className="text-center py-8 text-gray-500">
                    No usage history available
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Vouchers = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

  // Sidebar toggle logic
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    if (isMobile) setIsSidebarOpen(false);
  };

  const handleSidebarChange = (id) => {
    const paths = {
      dashboard: "/dashboard",
      inventory: "/inventory",
      analytics: "/analytics",
      trends: "/trends",
      adjustments: "/adjustments",
      overheads: "/overheads",
      events: "/events",
      offers: "/offers",
      orders: "/orders",
      messages: "/messages",
      accounts: "/accounts",
      vouchers: "/settings/vouchers",
      delivery: "/settings/deliverysettings",
      subscription: "/settings/subscription",
      "vendor-dashboard": "/settings/vendor-dashboard",
      "help-center": "/settings/help-center",
    };

    if (paths[id]) {
      router.visit(paths[id], {
        preserveScroll: true,
        preserveState: true,
      });
    }

    if (isMobile) {
      closeSidebar();
    }
  };

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
      validDate: formData.endDate ? new Date(formData.endDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-') : '',
      validTime: 'at 02:30pm',
      quantity: parseInt(formData.voucherQuantity) || 0,
      used: 0,
      startDate: formData.startDate ? new Date(formData.startDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-') : '',
      endDate: formData.endDate ? new Date(formData.endDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-') : '',
      minimumPurchase: '$' + formData.minimumPurchase,
      description: formData.description,
      usageHistory: []
    };
    setVouchers(prev => [...prev, newVoucher]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#161c2b]">
      {/* Fixed Header */}
      <div className="shrink-0">
        <Header
          isMobile={isMobile}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={toggleSidebar}
        />
      </div>

      {/* Sidebar + Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          active="vouchers"
          onChange={handleSidebarChange}
          isMobile={isMobile}
          mobileOpen={isMobile ? isSidebarOpen : true}
          onCloseMobile={closeSidebar}
        />

        {/* Main Content */}
        <main
          className={`flex-1 overflow-y-auto p-4 sm:p-6 transition-all duration-300 ${isMobile ? "ml-0" : "ml-64"}`}
          style={{ marginTop: "99px" }}
        >
          {/* Breadcrumb */}
          <div className="text-base sm:text-lg text-gray-500 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
            Dashboard / Vouchers
          </div>

          {/* Title and Button Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            {/* Page Title */}
            <h1 className="text-xl sm:text-2xl font-medium" style={{ fontFamily: "'Satoshi', sans-serif" }}>
              Vouchers
            </h1>

            {/* Create New Voucher Button */}
            <button
              onClick={() => setShowGenerateModal(true)}
              className="bg-[#6F9C3D] hover:bg-[#5a7d31] h-12 max-w-60 text-white px-6 py-2 rounded-lg text-lg font-medium transition"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Create New Voucher
            </button>
          </div>

          {/* Vouchers Table */}
          <div className="overflow-x-auto">
            <div className="min-w-[1000px]">
              {/* Table Header */}
              <div className="rounded-xl bg-[#E8EFE0] p-4">
                <div className="grid grid-cols-9 gap-2 text-base md:text-lg font-medium text-neutral-800 -ml-10" style={{ fontFamily: "'Inter', sans-serif" }}>
                  <div className="text-center">#</div>
                  <div className="text-center truncate">Voucher Name</div>
                  <div className="text-center truncate">Voucher Code</div>
                  <div className="text-center truncate">Type</div>
                  <div className="text-center truncate">Discount</div>
                  <div className="text-left truncate">Valid Date</div>
                  <div className="text-center truncate">Quantity</div>
                  <div className="text-center truncate">Used</div>
                  <div className="text-center truncate">Actions</div>
                </div>
              </div>

              {/* Table Rows */}
              <div className="mt-2 space-y-2">
                {vouchers.map((voucher, idx) => (
                  <div
                    key={voucher.id}
                    className="rounded-xl bg-gray-50 shadow-sm p-4 hover:bg-gray-100 transition"
                  >
                    <div className="grid grid-cols-9 gap-2 items-center text-base md:text-lg text-gray-700 -ml-10" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                      <div className="text-center">{idx + 1}</div>
                      <div className="text-center truncate">{voucher.name}</div>
                      <div className="text-center truncate">{voucher.code}</div>
                      <div className="text-center truncate">{voucher.type}</div>
                      <div className="text-center truncate">{voucher.discount}</div>
                      <div className="text-left truncate">
                        <div>{voucher.validDate}</div>
                        <div className="text-sm">{voucher.validTime}</div>
                      </div>
                      <div className="text-center truncate">{voucher.quantity}</div>
                      <div className="text-center">{voucher.used}</div>
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => handleViewVoucher(voucher)}
                          className="p-2 text-gray-500 hover:text-[#6F9C3D] hover:bg-[#6F9C3D]/10 rounded-lg transition"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {vouchers.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg" style={{ fontFamily: "'Inter', sans-serif" }}>
                    No vouchers found. Create your first voucher!
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Generate Voucher Modal */}
      <GenerateVoucherModal
        isOpen={showGenerateModal}
        onClose={() => setShowGenerateModal(false)}
        onGenerate={handleGenerateVoucher}
      />

      {/* Voucher Details Modal */}
      <VoucherDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        voucher={selectedVoucher}
      />
    </div>
  );
};

export default Vouchers;

