import React, { useState, useEffect } from 'react';
import Header from '../../../Components/Admin/Header';
import Sidebar from '../../../Components/Admin/Sidebar';
import { router } from '@inertiajs/react';
import { Pencil, Trash2, Eye } from 'lucide-react';

// Add Delivery Type / Offer Modal Component
const AddDeliveryTypeModal = ({ isOpen, onClose, activeTab }) => {
  const [formData, setFormData] = useState({
    name: '',
    fee: '',
    minOrder: '',
    maxDistance: '',
    estimatedTime: '',
    estimatedTimeUnit: '',
    enableFreeDelivery: false,
    // For offers
    offerType: '',
    validFrom: '',
    validTo: '',
    threshold: '',
    discount: '',
  });

  if (!isOpen) return null;

  const isOfferTab = activeTab === 'offers';

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="relative bg-white rounded-xl w-full max-w-[580px] max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10"
          aria-label="Close"
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="15" cy="15" r="15" fill="#DF3A3A" />
              <path d="M10 10L20 20M20 10L10 20" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </button>

        <div className="p-6">
          {/* Modal Title */}
          <h2 className="text-xl font-bold text-[#2c323c] mb-6" style={{ fontFamily: "'Satoshi', sans-serif" }}>
            {isOfferTab ? 'Add Offers' : 'Add New Delivery Type'}
          </h2>

          <form onSubmit={handleSubmit}>
            {!isOfferTab ? (
              <>
                {/* Row 1: Delivery Type Name | Delivery Fee */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/30 outline-none transition text-sm"
                      placeholder="Delivery Type Name"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={formData.fee}
                      onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/30 outline-none transition text-sm"
                      placeholder="Delivery Fee (Rs.)"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                  </div>
                </div>

                {/* Row 2: Min Order Amount | Max Distance */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <input
                      type="text"
                      value={formData.minOrder}
                      onChange={(e) => setFormData({ ...formData, minOrder: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/30 outline-none transition text-sm"
                      placeholder="Minimum Order Amount (Rs.)"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                  </div>
                  <div>
                    <select
                      value={formData.maxDistance}
                      onChange={(e) => setFormData({ ...formData, maxDistance: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/30 outline-none transition text-sm text-gray-500 appearance-none bg-white bg-size-[12px] bg-position-[right_16px_center] bg-no-repeat"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      <option value="" disabled>Max Distance (Km)</option>
                      <option value="5">5 Km</option>
                      <option value="10">10 Km</option>
                      <option value="15">15 Km</option>
                      <option value="20">20 Km</option>
                      <option value="25">25 Km</option>
                      <option value="30">30 Km</option>
                    </select>
                  </div>
                </div>

                {/* Row 3: Estimated Time (dropdown) | Estimated Time (input) */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <select
                      value={formData.estimatedTime}
                      onChange={(e) => setFormData({ ...formData, estimatedTime: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/30 outline-none transition text-sm text-gray-500 appearance-none bg-white bg-size-[12px] bg-position-[right_16px_center] bg-no-repeat"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      <option value="" disabled>Select Estimated Time</option>
                      <option value="1-2 hours">1-2 hours</option>
                      <option value="2-4 hours">2-4 hours</option>
                      <option value="Same day">Same day</option>
                      <option value="1 Day">1 Day</option>
                      <option value="2 Days">2 Days</option>
                      <option value="3-5 Days">3-5 Days</option>
                      <option value="Customer selected">Customer selected</option>
                    </select>
                  </div>
                  <div>
                    <input
                      type="text"
                      value={formData.estimatedTimeUnit}
                      onChange={(e) => setFormData({ ...formData, estimatedTimeUnit: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/30 outline-none transition text-sm"
                      placeholder="Select Estimated Time"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                  </div>
                </div>

                {/* Free Delivery Settings Section */}
                <div className="mb-6">
                  <h3 className="text-base font-semibold text-[#2c323c] mb-3" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                    Free Delivery Settings (Optional)
                  </h3>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.enableFreeDelivery}
                      onChange={(e) => setFormData({ ...formData, enableFreeDelivery: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-300 text-[#6F9C3D] focus:ring-[#6F9C3D]/30"
                    />
                    <span className="text-sm text-[#3a3e47]" style={{ fontFamily: "'Inter', sans-serif" }}>
                      Enable Free Delivery
                    </span>
                  </label>
                </div>
              </>
            ) : (
              <>
                {/* Row 1: Select a Offer (dropdown) | Add Threshold Amount (input) */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <select
                      value={formData.offerType}
                      onChange={(e) => setFormData({ ...formData, offerType: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/30 outline-none transition text-sm text-gray-500 appearance-none bg-white bg-size-[12px] bg-position-[right_16px_center] bg-no-repeat"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      <option value="" disabled>Select a Offer</option>
                      <option value="Bulk Order">Bulk Order</option>
                      <option value="First Order Free">First Order Free</option>
                      <option value="Weekend Special">Weekend Special</option>
                      <option value="Holiday Discount">Holiday Discount</option>
                      <option value="Loyalty Reward">Loyalty Reward</option>
                    </select>
                  </div>
                  <div>
                    <input
                      type="text"
                      value={formData.threshold}
                      onChange={(e) => setFormData({ ...formData, threshold: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/30 outline-none transition text-sm"
                      placeholder="Add Threshold Amount"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                  </div>
                </div>

                {/* Row 2: Discount % (only left column) */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <input
                      type="text"
                      value={formData.discount}
                      onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/30 outline-none transition text-sm"
                      placeholder="Discount %"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                  </div>
                  <div></div>
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#6F9C3D] hover:bg-[#5a7d31] text-white py-3 rounded-lg font-semibold text-base transition"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {isOfferTab ? 'Submit' : 'Add'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// View Delivery Type Modal Component
const ViewDeliveryTypeModal = ({ isOpen, onClose, deliveryType, tabType }) => {
  const [formData, setFormData] = useState({
    fee: '',
    minOrder: '',
    maxDistance: '',
    estimatedTime: '',
    status: 'Active',
    freeAbove: '',
  });

  // Update form data when deliveryType changes
  useEffect(() => {
    if (deliveryType) {
      if (tabType === 'free') {
        setFormData({
          fee: deliveryType.fee || '',
          minOrder: '',
          maxDistance: '',
          estimatedTime: '',
          status: deliveryType.status ? 'Active' : 'Inactive',
          freeAbove: deliveryType.freeAbove || '',
        });
      } else {
        setFormData({
          fee: deliveryType.fee || '',
          minOrder: deliveryType.minOrder || '',
          maxDistance: deliveryType.maxDistance || '',
          estimatedTime: deliveryType.estimatedTime || '',
          status: deliveryType.status || 'Active',
          freeAbove: '',
        });
      }
    }
  }, [deliveryType, tabType]);

  if (!isOpen || !deliveryType) return null;

  const isFreeDelivery = tabType === 'free';

  // Get description based on delivery type
  const getDescription = (name) => {
    switch (name?.toLowerCase()) {
      case 'standard':
        return 'Regular delivery within 2-3 business days';
      case 'express':
        return 'Fast delivery within 1-2 hours';
      case 'scheduled':
        return 'Delivery at customer selected time';
      default:
        return 'Delivery service';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="relative bg-white rounded-xl w-full max-w-[580px] max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10"
          aria-label="Close"
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="15" cy="15" r="15" fill="#DF3A3A" />
              <path d="M10 10L20 20M20 10L10 20" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </button>

        <div className="p-6">
          {/* Modal Title */}
          <h2 className="text-xl font-bold text-[#2c323c] mb-1" style={{ fontFamily: "'Satoshi', sans-serif" }}>
            {deliveryType.name} Delivery
          </h2>
          <p className="text-sm text-gray-500 mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
            {getDescription(deliveryType.name)}
          </p>

          <form onSubmit={handleSubmit}>
            {!isFreeDelivery ? (
              <>
                {/* Row 1: Delivery Fee | Min Order Amount */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <input
                      type="text"
                      value={formData.fee}
                      onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/30 outline-none transition text-sm"
                      placeholder="Delivery Fee (Rs.)"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={formData.minOrder}
                      onChange={(e) => setFormData({ ...formData, minOrder: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/30 outline-none transition text-sm"
                      placeholder="Min Order Amount (Rs.)"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                  </div>
                </div>

                {/* Row 2: Max Distance | Estimated Time */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <input
                      type="text"
                      value={formData.maxDistance}
                      onChange={(e) => setFormData({ ...formData, maxDistance: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/30 outline-none transition text-sm"
                      placeholder="Max Distance (Km)"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                  </div>
                  <div>
                    <select
                      value={formData.estimatedTime}
                      onChange={(e) => setFormData({ ...formData, estimatedTime: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/30 outline-none transition text-sm text-gray-500 appearance-none bg-white bg-size-[12px] bg-position-[right_16px_center] bg-no-repeat"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      <option value="" disabled>Select Estimated Time</option>
                      <option value="1-2 hours">1-2 hours</option>
                      <option value="2-4 hours">2-4 hours</option>
                      <option value="Same day">Same day</option>
                      <option value="1 Day">1 Day</option>
                      <option value="2 Days">2 Days</option>
                      <option value="3-5 Days">3-5 Days</option>
                      <option value="Customer selected">Customer selected</option>
                    </select>
                  </div>
                </div>

                {/* Row 3: Status (only left column) */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/30 outline-none transition text-sm text-gray-500 appearance-none bg-white bg-size-[12px] bg-position-[right_16px_center] bg-no-repeat"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div></div>
                </div>
              </>
            ) : (
              <>
                {/* Free Delivery Tab - Row 1: Delivery Fee | Free Above */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <input
                      type="text"
                      value={formData.fee}
                      onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/30 outline-none transition text-sm"
                      placeholder="Delivery Fee (Rs.)"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={formData.freeAbove}
                      onChange={(e) => setFormData({ ...formData, freeAbove: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/30 outline-none transition text-sm"
                      placeholder="Free Delivery Above (Rs.)"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                  </div>
                </div>

                {/* Row 2: Status (only left column) */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/30 outline-none transition text-sm text-gray-500 appearance-none bg-white bg-size-[12px] bg-position-[right_16px_center] bg-no-repeat"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div></div>
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#6F9C3D] hover:bg-[#5a7d31] text-white py-3 rounded-lg font-semibold text-base transition"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const DeliverySettings = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("pricing"); // "pricing", "free", "offers"

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedDeliveryType, setSelectedDeliveryType] = useState(null);
  const [viewTabType, setViewTabType] = useState('pricing');

  // Mock data for Delivery Types
  const [deliveryTypes, setDeliveryTypes] = useState([
    { id: 1, name: "Standard", fee: 50, minOrder: 500, maxDistance: 15, estimatedTime: "2 Days", status: "Active" },
    { id: 2, name: "Scheduled", fee: 30, minOrder: 300, maxDistance: 20, estimatedTime: "Customer selected", status: "Inactive" },
    { id: 3, name: "Express", fee: 150, minOrder: 1000, maxDistance: 5, estimatedTime: "1-2 hours", status: "Active" },
  ]);

  // Mock data for Free Delivery Settings
  const [freeDeliverySettings, setFreeDeliverySettings] = useState([
    { id: 1, name: "Standard", fee: 50, freeAbove: 500, status: true },
    { id: 2, name: "Scheduled", fee: 30, freeAbove: 300, status: true },
    { id: 3, name: "Express", fee: 150, freeAbove: "Disabled", status: false },
  ]);

  // Mock data for Discounts & Offers
  const [offers, setOffers] = useState([
    { id: 1, type: "Bulk Order", validFrom: "01-07-2024", validTo: "12-31-2024", threshold: 3000, discount: "10%", status: true },
    { id: 2, type: "First Order Free", validFrom: "01-07-2024", validTo: "12-31-2024", threshold: "N/A", discount: "100%", status: true },
    { id: 3, type: "Weekend Special", validFrom: "01-07-2024", validTo: "12-31-2024", threshold: "N/A", discount: "15%", status: false },
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

  const toggleFreeDeliveryStatus = (id) => {
    setFreeDeliverySettings(prev =>
      prev.map(setting =>
        setting.id === id ? { ...setting, status: !setting.status } : setting
      )
    );
  };

  const toggleOfferStatus = (id) => {
    setOffers(prev =>
      prev.map(offer =>
        offer.id === id ? { ...offer, status: !offer.status } : offer
      )
    );
  };

  // Add delivery type / offer function
  const handleAddDeliveryType = () => {
    setShowAddModal(true);
  };

  // View delivery type function
  const handleViewDeliveryType = (deliveryType, tabType) => {
    setSelectedDeliveryType(deliveryType);
    setViewTabType(tabType);
    setShowViewModal(true);
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
          active="delivery-settings"
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
            Settings / Delivery Settings
          </div>

          {/* Page Title and Add Button in a single line */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h1 className="text-xl sm:text-2xl font-medium" style={{ fontFamily: "'Satoshi', sans-serif" }}>
              Deliveries
            </h1>
            <button
              onClick={handleAddDeliveryType}
              className="bg-[#6F9C3D] hover:bg-[#5a7d31] text-white w-60 h-12 px-4 py-2 rounded-lg text-xl font-medium transition"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {activeTab === 'offers' ? 'Add Offers' : 'Add Delivery Type'}
            </button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6">
            <div className="bg-[#e1f6d8] rounded-xl p-3 sm:p-4 flex items-center justify-center">
              <span className="text-sm sm:text-base lg:text-lg font-medium text-[#3a3e47] text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
                Total Deliveries : 245
              </span>
            </div>
            <div className="bg-[#e1f6d8] rounded-xl p-3 sm:p-4 flex items-center justify-center">
              <span className="text-sm sm:text-base lg:text-lg font-medium text-[#3a3e47] text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
                Standard : 150
              </span>
            </div>
            <div className="bg-[#e1f6d8] rounded-xl p-3 sm:p-4 flex items-center justify-center">
              <span className="text-sm sm:text-base lg:text-lg font-medium text-[#3a3e47] text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
                Express : 45
              </span>
            </div>
            <div className="bg-[#e1f6d8] rounded-xl p-3 sm:p-4 flex items-center justify-center">
              <span className="text-sm sm:text-base lg:text-lg font-medium text-[#3a3e47] text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
                Scheduled : 50
              </span>
            </div>
            <div className="bg-[#e1f6d8] rounded-xl p-3 sm:p-4 flex items-center justify-center col-span-2 sm:col-span-1">
              <span className="text-sm sm:text-base lg:text-lg font-medium text-[#3a3e47] text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
                Free Delivery : 78
              </span>
            </div>
          </div>

          {/* Dynamic Heading and Tabs in a single line */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            {/* Dynamic Heading */}
            <div>
              {activeTab === "pricing" && (
                <h2 className="text-lg sm:text-xl font-medium text-[#3a3e47]" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                  Pricing & Charges
                </h2>
              )}
              {activeTab === "free" && (
                <h2 className="text-lg sm:text-xl font-medium text-[#3a3e47]" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                  Free Delivery Settings
                </h2>
              )}
              {activeTab === "offers" && (
                <h2 className="text-lg sm:text-xl font-medium text-[#3a3e47]" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                  Discounts & Offers
                </h2>
              )}
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <button
                onClick={() => setActiveTab("pricing")}
                className={`px-4 w-58 h-12 sm:px-6 py-2 sm:py-3 rounded-lg text-base sm:text-lg font-medium transition ${activeTab === "pricing"
                  ? "bg-[#6F9C3D] text-white"
                  : "bg-[#f0f0f0] text-[#3a3e47] hover:bg-gray-200"
                  }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Pricing & Charges
              </button>
              <button
                onClick={() => setActiveTab("free")}
                className={`px-4 w-58 h-12 sm:px-6 py-2 sm:py-3 rounded-lg text-base sm:text-lg font-medium transition ${activeTab === "free"
                  ? "bg-[#6F9C3D] text-white"
                  : "bg-[#f0f0f0] text-[#3a3e47] hover:bg-gray-200"
                  }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Free Delivery Settings
              </button>
              <button
                onClick={() => setActiveTab("offers")}
                className={`px-4 w-58 h-12 sm:px-6 py-2 sm:py-3 rounded-lg text-base sm:text-lg font-medium transition ${activeTab === "offers"
                  ? "bg-[#6F9C3D] text-white"
                  : "bg-[#f0f0f0] text-[#3a3e47] hover:bg-gray-200"
                  }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Discounts & Offers
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "pricing" && (
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                {/* Table Header */}
                <div className="rounded-xl bg-[rgba(111,156,61,0.31)] p-4">
                  <div className="grid grid-cols-8 text-lg font-medium text-[#3a3e47]" style={{ fontFamily: "'Inter', sans-serif" }}>
                    <div className="text-center">#</div>
                    <div className="text-center truncate">Delivery Type</div>
                    <div className="text-center truncate">Delivery Fee</div>
                    <div className="text-center truncate">Min Order Amount</div>
                    <div className="text-center truncate">Max Distance (Km)</div>
                    <div className="text-center truncate">Estimated Time</div>
                    <div className="text-center truncate">Status</div>
                    <div className="text-center truncate">Action</div>
                  </div>
                </div>

                {/* Table Rows */}
                <div className="mt-2 space-y-2">
                  {deliveryTypes.map((type, idx) => (
                    <div
                      key={type.id}
                      className="rounded-xl bg-[rgba(216,216,216,0.23)] p-4"
                    >
                      <div className="grid grid-cols-8 gap-2 items-center text-lg text-[#3a3e47]" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                        <div className="text-center">{idx + 1}</div>
                        <div className="text-center">{type.name}</div>
                        <div className="text-center">Rs. {type.fee}</div>
                        <div className="text-center">Rs. {type.minOrder}</div>
                        <div className="text-center">{type.maxDistance}</div>
                        <div className="text-center">{type.estimatedTime}</div>
                        <div className={`text-center font-medium ${type.status === "Active" ? "text-[#6F9C3D]" : "text-[#df3a3a]"}`}>
                          {type.status}
                        </div>
                        <div className="flex items-center justify-center gap-1">
                          <button
                            type="button"
                            className="p-2 text-gray-500 hover:bg-blue-100 rounded-lg transition text-lg"
                            title="View Delivery Type"
                            onClick={() => handleViewDeliveryType(type, 'pricing')}
                          >
                            <Eye size={20} />
                          </button>
                          <button
                            type="button"
                            className="p-2 text-[#6F9C3D] hover:bg-[#6F9C3D]/10 rounded-lg transition text-lg"
                            title="Edit Delivery Type"
                            onClick={() => console.log("Edit", type.id)}
                          >
                            <Pencil size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "free" && (
            <div className="overflow-x-auto">
              <div className="min-w-[600px]">
                {/* Table Header */}
                <div className="rounded-xl bg-[rgba(111,156,61,0.31)] p-4">
                  <div className="grid grid-cols-6 gap-2 text-lg font-medium text-[#3a3e47]" style={{ fontFamily: "'Inter', sans-serif" }}>
                    <div className="text-center">#</div>
                    <div className="text-center truncate">Delivery Type</div>
                    <div className="text-center truncate">Delivery Fee</div>
                    <div className="text-center truncate">Free Delivery Above</div>
                    <div className="text-center">Status</div>
                    <div className="text-center">Action</div>
                  </div>
                </div>

                {/* Table Rows */}
                <div className="mt-2 space-y-2">
                  {freeDeliverySettings.map((setting, idx) => (
                    <div
                      key={setting.id}
                      className="rounded-xl bg-[rgba(216,216,216,0.23)] p-4"
                    >
                      <div className="grid grid-cols-6 gap-2 items-center text-lg text-[#3a3e47]" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                        <div className="text-center">{idx + 1}</div>
                        <div className="text-center">{setting.name}</div>
                        <div className="text-center">Rs. {setting.fee}</div>
                        <div className="text-center">
                          {typeof setting.freeAbove === 'number' ? `Rs. ${setting.freeAbove}` : setting.freeAbove}
                        </div>
                        <div className="flex items-center justify-center">
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={setting.status}
                              onChange={() => toggleFreeDeliveryStatus(setting.id)}
                            />
                            <div className="relative w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#6F9C3D]/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6F9C3D]"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-center gap-1">
                          <button
                            type="button"
                            className="p-2 text-gray-500 hover:bg-blue-100 rounded-lg transition text-lg"
                            title="View Free Delivery Setting"
                            onClick={() => handleViewDeliveryType(setting, 'free')}
                          >
                            <Eye size={20} />
                          </button>
                          <button
                            type="button"
                            className="p-2 text-[#6F9C3D] hover:bg-[#6F9C3D]/10 rounded-lg transition text-lg"
                            title="Edit Free Delivery Setting"
                            onClick={() => console.log("Edit", setting.id)}
                          >
                            <Pencil size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "offers" && (
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                {/* Table Header */}
                <div className="rounded-xl bg-[rgba(111,156,61,0.31)] p-4">
                  <div className="grid grid-cols-7 gap-2 text-lg font-medium text-[#3a3e47]" style={{ fontFamily: "'Inter', sans-serif" }}>
                    <div className="text-center">#</div>
                    <div className="text-center truncate">Offer Type</div>
                    <div className="text-center truncate">Valid Period</div>
                    <div className="text-center truncate">Threshold Amount</div>
                    <div className="text-center truncate">Discount %</div>
                    <div className="text-center truncate">Status</div>
                    <div className="text-center truncate">Action</div>
                  </div>
                </div>

                {/* Table Rows */}
                <div className="mt-2 space-y-2">
                  {offers.map((offer, idx) => (
                    <div
                      key={offer.id}
                      className="rounded-xl bg-[rgba(216,216,216,0.23)] p-4"
                    >
                      <div className="grid grid-cols-7 gap-2 items-center text-lg text-[#3a3e47]" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                        <div className="text-center">{idx + 1}</div>
                        <div className="text-center">{offer.type}</div>
                        <div className="text-center text-sm">{offer.validFrom} to {offer.validTo}</div>
                        <div className="text-center">
                          {typeof offer.threshold === 'number' ? `Rs. ${offer.threshold}` : offer.threshold}
                        </div>
                        <div className="text-center">{offer.discount}</div>
                        <div className="flex items-center justify-center">
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={offer.status}
                              onChange={() => toggleOfferStatus(offer.id)}
                            />
                            <div className="relative w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#6F9C3D]/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6F9C3D]"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-center gap-1">
                          <button
                            type="button"
                            className="p-2 text-[#6F9C3D] hover:bg-[#6F9C3D]/10 rounded-lg transition text-lg"
                            title="Edit Offer"
                            onClick={() => console.log("Edit", offer.id)}
                          >
                            <Pencil size={20} />
                          </button>
                          <button
                            type="button"
                            className="p-2 text-[#df3a3a] hover:bg-red-100 rounded-lg transition text-lg"
                            title="Delete Offer"
                            onClick={() => console.log("Delete", offer.id)}
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add Delivery Type / Offer Modal */}
      <AddDeliveryTypeModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        activeTab={activeTab}
      />

      {/* View Delivery Type Modal */}
      <ViewDeliveryTypeModal
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setSelectedDeliveryType(null);
        }}
        deliveryType={selectedDeliveryType}
        tabType={viewTabType}
      />
    </div>
  );
};

export default DeliverySettings;