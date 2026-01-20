import React, { useState } from "react";
import { X, MapPin, Plus, Minus } from "lucide-react";

const LocationEditModal = ({ isOpen, onClose, currentAddress, onSubmit }) => {
  const [address, setAddress] = useState(currentAddress || "365 Link AIT Main Road Lahore");

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit(address);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 w-7 h-7 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center z-10 transition-colors"
        >
          <X className="w-4 h-4 text-white" strokeWidth={2.5} />
        </button>

        <div className="p-6">
          {/* Header */}
          <div className="flex items-start gap-3 mb-3">
            <div className="w-6 h-6 flex items-center justify-center mt-0.5">
              <MapPin className="w-6 h-6 text-gray-700" />
            </div>
            <h2
              className="text-xl md:text-2xl font-bold text-gray-900"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              What's your exact location?
            </h2>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-base md:text-lg mb-6 ml-9">
            Providing your location enables more accurate search and delivery ETA, seamless
            order tracking and personalised recommendations.
          </p>

          {/* Address Input */}
          <div className="mb-4">
            <div className="relative">
              <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#6F9C3D]">
                Enter your address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg text-base text-gray-800 outline-none focus:border-[#6F9C3D] transition"
                placeholder="Enter your address"
              />
            </div>
          </div>

          {/* Map Container */}
          <div className="relative max-w-[874] h-[500px] bg-gray-100 mb-6 overflow-hidden">
            {/* Map Image/Placeholder */}
            <div className="absolute inset-0 ">
              <img
                src="https://maps.googleapis.com/maps/api/staticmap?center=31.5097,74.3436&zoom=16&size=800x400&maptype=roadmap&style=feature:all|saturation:-100&key=YOUR_API_KEY"
                alt="Map"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              {/* Fallback map background */}
              <div className="absolute inset-0 bg-[#E8E4D9]">
                {/* Simplified map illustration */}
                <div className="absolute inset-0 opacity-60">
                  <svg className="w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
                    {/* Roads */}
                    <line x1="0" y1="200" x2="800" y2="200" stroke="#fff" strokeWidth="8" />
                    <line x1="400" y1="0" x2="400" y2="400" stroke="#fff" strokeWidth="8" />
                    <line x1="0" y1="100" x2="800" y2="100" stroke="#fff" strokeWidth="4" />
                    <line x1="0" y1="300" x2="800" y2="300" stroke="#fff" strokeWidth="4" />
                    <line x1="200" y1="0" x2="200" y2="400" stroke="#fff" strokeWidth="4" />
                    <line x1="600" y1="0" x2="600" y2="400" stroke="#fff" strokeWidth="4" />
                    {/* Park/Garden area */}
                    <rect x="320" y="220" width="160" height="100" fill="#C5E1A5" rx="8" />
                  </svg>
                </div>

                {/* Location Labels */}
                <div className="absolute top-4 left-4 text-xs text-gray-600 bg-white/80 px-2 py-1 rounded">
                  Iqbal town
                </div>
                <div className="absolute top-4 right-4 text-xs text-gray-600 bg-white/80 px-2 py-1 rounded">
                  Arabian Shop &
                </div>
                <div className="absolute bottom-20 left-4 text-xs text-gray-600 bg-white/80 px-2 py-1 rounded">
                  KFC - Allama Iqbal Town
                </div>
                <div className="absolute bottom-12 left-4 text-xs text-gray-600 bg-white/80 px-2 py-1 rounded">
                  Al Fatah - Allama Iqbal Town
                </div>
                <div className="absolute bottom-20 right-20 text-xs text-gray-600 bg-white/80 px-2 py-1 rounded">
                  Waris Nihari
                </div>
                <div className="absolute top-1/3 left-1/4 text-xs text-gray-500">
                  Sarfraz A Shah Rd
                </div>
                <div className="absolute top-1/2 left-1/3 text-xs text-gray-600 bg-white/80 px-2 py-1 rounded">
                  Botanical Garden
                </div>
              </div>
            </div>

            {/* Delivery Marker */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full">
              {/* "We'll deliver here" Label */}
              <div className="relative mb-1">
                <div className="bg-[#2D3748] text-white text-sm px-4 py-2 rounded-lg whitespace-nowrap shadow-lg">
                  We'll deliver here
                </div>
                {/* Triangle pointer */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[#2D3748]"></div>
              </div>
              {/* Pin */}
              <div className="flex justify-center">
                <div className="w-8 h-8 bg-[#E91E63] rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Zoom Controls */}
            <div className="absolute right-4 bottom-16 flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
              <button className="p-2 hover:bg-gray-100 border-b border-gray-200 transition">
                <Plus className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 transition">
                <Minus className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Google Attribution */}
            <div className="absolute bottom-2 left-2">
              <span className="text-xs text-gray-500 bg-white/80 px-1 rounded">Google</span>
            </div>

            {/* Map Footer */}
            <div className="absolute bottom-2 right-2 flex gap-2 text-xs text-gray-500">
              <span className="bg-white/80 px-1 rounded cursor-pointer hover:text-gray-700">
                Keyboard shortcuts
              </span>
              <span className="bg-white/80 px-1 rounded">Map data ©2025</span>
              <span className="bg-white/80 px-1 rounded cursor-pointer hover:text-gray-700">
                Terms
              </span>
              <span className="bg-white/80 px-1 rounded cursor-pointer hover:text-gray-700">
                Report a map error
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end border-t border-[#00000073] pt-4">
            <button
              onClick={handleSubmit}
              className="max-w-[210px] w-full bg-[#FF8829] hover:bg-[#e67a24] text-white py-3 rounded-lg font-semibold text-lg transition"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationEditModal;