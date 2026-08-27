import React, { useState, useEffect } from "react";
import InputFloating from "@/Components/InputFloating";
import SelectFloating from "@/Components/SelectFloating";

const AddDeliveryTypeModal = ({ isOpen, onClose, activeTab, isEditMode = false, editingItem = null, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: '',
    fee: '',
    minOrder: '',
    maxDistance: '',
    estimatedTime: '',
    estimatedTimeUnit: '',
    enableFreeDelivery: false,
    status: true,
    // For offers
    offerType: '',
    validFrom: '',
    validTo: '',
    threshold: '',
    discount: '',
  });

  // Populate form when editing
  useEffect(() => {
    if (isEditMode && editingItem) {
      if (activeTab === 'offers') {
        setFormData({
          offerType: editingItem.type || '',
          validFrom: editingItem.validFrom || '',
          validTo: editingItem.validTo || '',
          threshold: editingItem.threshold || '',
          discount: editingItem.discount || '',
          name: '',
          fee: '',
          minOrder: '',
          maxDistance: '',
          estimatedTime: '',
          estimatedTimeUnit: '',
          enableFreeDelivery: false,
        });
      } else if (activeTab === 'free') {
        setFormData({
          name: editingItem.name || '',
          fee: editingItem.fee || '',
          freeAbove: editingItem.freeAbove || '',
          enableFreeDelivery: true,
          offerType: '',
          validFrom: '',
          validTo: '',
          threshold: '',
          discount: '',
          minOrder: '',
          maxDistance: '',
          estimatedTime: '',
          estimatedTimeUnit: '',
        });
      } else {
        // pricing tab
        setFormData({
          name: editingItem.name || '',
          fee: editingItem.fee || '',
          minOrder: editingItem.minOrder || '',
          maxDistance: editingItem.maxDistance || '',
          estimatedTime: editingItem.estimatedTime || '',
          estimatedTimeUnit: '',
          enableFreeDelivery: false,
          status: editingItem.status !== undefined ? editingItem.status : true,
          offerType: '',
          validFrom: '',
          validTo: '',
          threshold: '',
          discount: '',
        });
      }
    } else {
      // Reset form for add mode
      setFormData({
        name: '',
        fee: '',
        minOrder: '',
        maxDistance: '',
        estimatedTime: '',
        estimatedTimeUnit: '',
        enableFreeDelivery: false,
        status: true,
        offerType: '',
        validFrom: '',
        validTo: '',
        threshold: '',
        discount: '',
      });
    }
  }, [isEditMode, editingItem, activeTab]);

  if (!isOpen) return null;

  const isOfferTab = activeTab === 'offers';

  // Handle input change (for InputFloating)
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle select change (for SelectFloating)
  const handleSelectChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditMode && editingItem) {
      // Update existing item
      const updatedItem = {
        ...editingItem,
        ...(activeTab === 'offers' ? {
          type: formData.offerType,
          validFrom: formData.validFrom,
          validTo: formData.validTo,
          threshold: formData.threshold,
          discount: formData.discount,
        } : activeTab === 'free' ? {
          name: formData.name,
          fee: formData.fee,
          freeAbove: formData.freeAbove,
        } : {
          name: formData.name,
          fee: formData.fee,
          minOrder: formData.minOrder,
          maxDistance: formData.maxDistance,
          estimatedTime: formData.estimatedTime,
        })
      };
      onUpdate(updatedItem);
    } else {
      // Add new item
      console.log('Form submitted:', formData);
    }

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
          {/* Edit Mode - Different Header */}
          {isEditMode && activeTab !== 'offers' ? (
            <>
              <h2 className="text-2xl font-bold text-[#2c323c] mb-1">
                {formData.name}
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                {activeTab === 'free' ? `Free delivery above Rs. ${formData.freeAbove}` : `Regular delivery within ${formData.estimatedTime}`}
              </p>
            </>
          ) : (
            <h2 className="text-xl font-bold text-[#2c323c] mb-6">
              {isOfferTab ? 'Add Offers' : 'Add New Delivery Type'}
            </h2>
          )}

          <form onSubmit={handleSubmit}>
            {/* Edit Mode for Pricing/Free Delivery */}
            {isEditMode && activeTab !== 'offers' ? (
              <>
                {/* Row 1: Fee | Min Order */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <InputFloating
                    id="deliveryFee"
                    label="Delivery Fee (Rs.)"
                    value={formData.fee}
                    onChange={(value) => handleInputChange('fee', value)}
                  />
                  <InputFloating
                    id="minOrder"
                    label="Min Order Amount (Rs.)"
                    value={formData.minOrder}
                    onChange={(value) => handleInputChange('minOrder', value)}
                  />
                </div>

                {/* Row 2: Max Distance | Estimated Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <InputFloating
                    id="maxDistance"
                    label="Max Distance (Km)"
                    value={formData.maxDistance}
                    onChange={(value) => handleInputChange('maxDistance', value)}
                  />
                  <SelectFloating
                    id="estimatedTime"
                    label="Select Estimated Time"
                    value={formData.estimatedTime}
                    onChange={handleSelectChange('estimatedTime')} 
                    options={[
                      { value: "1-2 hours", label: "1-2 hours" },
                      { value: "2-4 hours", label: "2-4 hours" },
                      { value: "Same day", label: "Same day" },
                      { value: "1 Day", label: "1 Day" },
                      { value: "2 Days", label: "2 Days" },
                      { value: "3-5 Days", label: "3-5 Days" },
                      { value: "Customer selected", label: "Customer selected" }
                    ]}
                    placeholder="Select Estimated Time"
                  />
                </div>

                {/* Status Field */}
                <div className="grid grid-cols-1 mb-6">
                  <SelectFloating
                    id="status"
                    label="Status"
                    value={formData.status ? 'active' : 'inactive'}
                    onChange={(e) => handleInputChange('status', e.target.value === 'active')}
                    options={[
                      { value: "active", label: "Active" },
                      { value: "inactive", label: "Inactive" }
                    ]}
                    placeholder="Select Status"
                  />
                </div>
              </>
            ) : !isOfferTab ? (
              <>
                {/* Add Mode */}
                {/* Row 1: Name | Fee */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <InputFloating
                    id="deliveryName"
                    label="Delivery Type Name"
                    value={formData.name}
                    onChange={(value) => handleInputChange('name', value)}
                  />
                  <InputFloating
                    id="deliveryFee"
                    label="Delivery Fee (Rs.)"
                    value={formData.fee}
                    onChange={(value) => handleInputChange('fee', value)}
                  />
                </div>

                {/* Row 2: Min Order | Max Distance */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <InputFloating
                    id="minOrder"
                    label="Minimum Order Amount (Rs.)"
                    value={formData.minOrder}
                    onChange={(value) => handleInputChange('minOrder', value)}
                  />
                  <SelectFloating
                    id="maxDistance"
                    label="Max Distance (Km)"
                    value={formData.maxDistance}
                    onChange={handleSelectChange('maxDistance')} 
                    options={[
                      { value: "5", label: "5 Km" },
                      { value: "10", label: "10 Km" },
                      { value: "15", label: "15 Km" },
                      { value: "20", label: "20 Km" },
                      { value: "25", label: "25 Km" },
                      { value: "30", label: "30 Km" }
                    ]}
                    placeholder="Select Max Distance"
                  />
                </div>

                {/* Row 3: Estimated Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <SelectFloating
                    id="estimatedTime"
                    label="Select Estimated Time"
                    value={formData.estimatedTime}
                    onChange={handleSelectChange('estimatedTime')} 
                    options={[
                      { value: "1-2 hours", label: "1-2 hours" },
                      { value: "2-4 hours", label: "2-4 hours" },
                      { value: "Same day", label: "Same day" },
                      { value: "1 Day", label: "1 Day" },
                      { value: "2 Days", label: "2 Days" },
                      { value: "3-5 Days", label: "3-5 Days" },
                      { value: "Customer selected", label: "Customer selected" }
                    ]}
                    placeholder="Select Estimated Time"
                  />
                  <InputFloating
                    id="customTime"
                    label="Custom Time (if needed)"
                    value={formData.estimatedTimeUnit}
                    onChange={(value) => handleInputChange('estimatedTimeUnit', value)}
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
                      onChange={(e) => handleInputChange('enableFreeDelivery', e.target.checked)}
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <SelectFloating
                    id="offerType"
                    label="Select a Offer"
                    value={formData.offerType}
                    onChange={handleSelectChange('offerType')} 
                    options={[
                      { value: "Bulk Order", label: "Bulk Order" },
                      { value: "First Order Free", label: "First Order Free" },
                      { value: "Weekend Special", label: "Weekend Special" },
                      { value: "Holiday Discount", label: "Holiday Discount" },
                      { value: "Loyalty Reward", label: "Loyalty Reward" }
                    ]}
                    placeholder="Select a Offer"
                  />
                  <InputFloating
                    id="threshold"
                    label="Add Threshold Amount"
                    value={formData.threshold}
                    onChange={(value) => handleInputChange('threshold', value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <InputFloating
                    id="discount"
                    label="Discount %"
                    value={formData.discount}
                    onChange={(value) => handleInputChange('discount', value)}
                  />
                  <div></div>
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full bg-[#6F9C3D] hover:bg-[#5a7d31] text-white py-3 rounded-lg font-semibold text-base transition"
            >
              {isEditMode ? 'Update' : (isOfferTab ? 'Submit' : 'Add')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDeliveryTypeModal;