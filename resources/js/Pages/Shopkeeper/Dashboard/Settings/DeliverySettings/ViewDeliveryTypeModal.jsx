import React, { useState, useEffect } from "react";

const ViewDeliveryTypeModal = ({ isOpen, onClose, deliveryType, tabType }) => {
  const [formData, setFormData] = useState({
    fee: '',
    minOrder: '',
    maxDistance: '',
    estimatedTime: '',
    status: 'Active',
    freeAbove: '',
  });

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

  const getDescription = (name) => {
    switch (name?.toLowerCase()) {
      case 'standard': return 'Regular delivery within 2-3 business days';
      case 'express': return 'Fast delivery within 1-2 hours';
      case 'scheduled': return 'Delivery at customer selected time';
      default: return 'Delivery service';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="relative bg-white rounded-xl w-full max-w-[580px] max-h-[90vh] overflow-y-auto shadow-xl">
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
          <h2 className="text-xl font-bold text-[#2c323c] mb-1">
            {deliveryType.name} Delivery
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            {getDescription(deliveryType.name)}
          </p>

          <form onSubmit={handleSubmit}>
            {!isFreeDelivery ? (
              <>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    value={formData.fee}
                    onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/30 outline-none transition text-sm"
                    placeholder="Delivery Fee (Rs.)"
                  />
                  <input
                    type="text"
                    value={formData.minOrder}
                    onChange={(e) => setFormData({ ...formData, minOrder: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/30 outline-none transition text-sm"
                    placeholder="Min Order Amount (Rs.)"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    value={formData.maxDistance}
                    onChange={(e) => setFormData({ ...formData, maxDistance: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/30 outline-none transition text-sm"
                    placeholder="Max Distance (Km)"
                  />
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
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/30 outline-none transition text-sm text-gray-500 appearance-none bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <div></div>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    value={formData.fee}
                    onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/30 outline-none transition text-sm"
                    placeholder="Delivery Fee (Rs.)"
                  />
                  <input
                    type="text"
                    value={formData.freeAbove}
                    onChange={(e) => setFormData({ ...formData, freeAbove: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/30 outline-none transition text-sm"
                    placeholder="Free Delivery Above (Rs.)"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/30 outline-none transition text-sm text-gray-500 appearance-none bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <div></div>
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full bg-[#6F9C3D] hover:bg-[#5a7d31] text-white py-3 rounded-lg font-semibold text-base transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ViewDeliveryTypeModal;