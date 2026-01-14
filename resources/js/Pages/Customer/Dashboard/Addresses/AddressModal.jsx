import React, { useState, useEffect } from "react";
import { X, MapPin, Plus, Minus } from "lucide-react";

const AddressModal = ({ 
  isOpen, 
  onClose, 
  mode = "add", // 'add' or 'edit'
  initialAddress = "",
  onSubmit 
}) => {
  const [address, setAddress] = useState("");

  // Sync initial address when editing
  useEffect(() => {
    if (isOpen) {
      setAddress(initialAddress || "");
    }
  }, [isOpen, initialAddress]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!address.trim()) {
      alert("Please enter an address.");
      return;
    }
    
    // Call parent handler with mode and data
    onSubmit?.({
      mode,
      address
    });
    
    onClose();
  };

  if (!isOpen) return null;

  // Dynamic content based on mode
  const title = mode === "add" 
    ? "Add New Address" 
    : "What's your exact location?";
    
  const description = mode === "add"
    ? "Enter an address to explore shops around you"
    : "Providing your location enables more accurate search and delivery ETA, seamless order tracking and personalised recommendations.";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-[800px] h-[600px] shadow-xl relative overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 bg-red-500 rounded-2xl text-white hover:text-gray-700 transition z-10"
        >
          <X />
        </button>

        {/* Header */}
        <div className="p-6">
          <h2 className="text-xl md:text-2xl font-bold" style={{ fontFamily: "'Inter', sans-serif" }}>
            {title}
          </h2>
          <p className="text-base md:text-lg text-neutral-900 mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
            {description}
          </p>
        </div>

        {/* Use Current Location (only in add mode) */}
        {mode === "add" && (
          <div className="flex justify-end mr-6">
            <div className="mt-4 flex items-center gap-2">
              <MapPin className="w-6 h-6 font-light" />
              <button
                className="text-neutral-900 font-bold"
                onClick={() => alert("Using current location...")}
              >
                Use my current location
              </button>
            </div>
          </div>
        )}

        {/* Address Input */}
        <div className="px-6 py-4">
          <div className="mb-4 relative">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder=" "
              className="w-full px-4 h-14 md:h-16 border border-[#6F9C3D] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6F9C3D] text-base md:text-lg text-neutral-900 peer"
              style={{ fontFamily: "'Inter', sans-serif'" }}
            />
            <label
              className={`absolute left-4 ${address ? '-top-2.5 text-xs' : 'top-3.5 text-base'
                } text-[#6F9C3D] bg-white px-1 py-1 transition-all duration-200 pointer-events-none`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Enter your address
            </label>
          </div>

          {/* Map Preview */}
          <div className="relative h-[300px] bg-gray-200 rounded-lg overflow-hidden">
            <img
              src="/assets/Assets/Customer/address/map.png"
              alt="Map preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 right-4 flex flex-col gap-2">
              <button className="bg-white text-gray-700 p-2 rounded-md">
                <Plus className="w-5 h-5" />
              </button>
              <button className="bg-white text-gray-700 p-2 rounded-md">
                <Minus className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="px-6 pb-6 flex justify-end">
          <button
            onClick={handleSubmit}
            className="w-full md:max-w-[210px] md:h-14 py-2 bg-[#FF8B29] md:text-lg text-white font-bold rounded-lg hover:bg-[#FF7A1A] transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;