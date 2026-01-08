import React, { useState } from "react";

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
            <svg width="24" height="24" viewBox="0 0 30 30" fill="none">
              <circle cx="15" cy="15" r="15" fill="#DF3A3A" />
              <path d="M10 10L20 20M20 10L10 20" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </button>

        <div className="p-6">
          <h2 className="text-xl font-bold text-[#2c323c] mb-6">
            {isOfferTab ? 'Add Offers' : 'Add New Delivery Type'}
          </h2>

          <form onSubmit={handleSubmit}>
            {!isOfferTab ? (
              <>
                {/* Row 1: Name | Fee */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/30 outline-none transition text-sm"
                    placeholder="Delivery Type Name"
                  />
                  <input
                    type="text"
                    value={formData.fee}
                    onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/30 outline-none transition text-sm"
                    placeholder="Delivery Fee (Rs.)"
                  />
                </div>

                {/* Row 2: Min Order | Max Distance */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    value={formData.minOrder}
                    onChange={(e) => setFormData({ ...formData, minOrder: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/30 outline-none transition text-sm"
                    placeholder="Minimum Order Amount (Rs.)"
                  />
                  <select
                    value={formData.maxDistance}
                    onChange={(e) => setFormData({ ...formData, maxDistance: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/30 outline-none transition text-sm text-gray-500 appearance-none bg-white"
                  >
                    <option value="" disabled>Max Distance (Km)</option>
                    {[5, 10, 15, 20, 25, 30].map(km => (
                      <option key={km} value={km}>{km} Km</option>
                    ))}
                  </select>
                </div>

                {/* Row 3: Estimated Time */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <select
                    value={formData.estimatedTime}
                    onChange={(e) => setFormData({ ...formData, estimatedTime: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/30 outline-none transition text-sm text-gray-500 appearance-none bg-white"
                  >
                    <option value="" disabled>Select Estimated Time</option>
                    {[
                      "1-2 hours",
                      "2-4 hours",
                      "Same day",
                      "1 Day",
                      "2 Days",
                      "3-5 Days",
                      "Customer selected"
                    ].map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={formData.estimatedTimeUnit}
                    onChange={(e) => setFormData({ ...formData, estimatedTimeUnit: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/30 outline-none transition text-sm"
                    placeholder="Custom Time (if needed)"
                  />
                </div>

                {/* Free Delivery Toggle */}
                <div className="mb-6">
                  <h3 className="text-base font-semibold text-[#2c323c] mb-3">
                    Free Delivery Settings (Optional)
                  </h3>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.enableFreeDelivery}
                      onChange={(e) => setFormData({ ...formData, enableFreeDelivery: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-300 text-[#6F9C3D] focus:ring-[#6F9C3D]/30"
                    />
                    <span className="text-sm text-[#3a3e47]">
                      Enable Free Delivery
                    </span>
                  </label>
                </div>
              </>
            ) : (
              <>
                {/* Offers Form */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <select
                    value={formData.offerType}
                    onChange={(e) => setFormData({ ...formData, offerType: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/30 outline-none transition text-sm text-gray-500 appearance-none bg-white"
                  >
                    <option value="" disabled>Select a Offer</option>
                    {[
                      "Bulk Order",
                      "First Order Free",
                      "Weekend Special",
                      "Holiday Discount",
                      "Loyalty Reward"
                    ].map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={formData.threshold}
                    onChange={(e) => setFormData({ ...formData, threshold: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/30 outline-none transition text-sm"
                    placeholder="Add Threshold Amount"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <input
                    type="text"
                    value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/30 outline-none transition text-sm"
                    placeholder="Discount %"
                  />
                  <div></div>
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full bg-[#6F9C3D] hover:bg-[#5a7d31] text-white py-3 rounded-lg font-semibold text-base transition"
            >
              {isOfferTab ? 'Submit' : 'Add'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDeliveryTypeModal;