import React from "react";
import { FaBiking } from "react-icons/fa";

const StoreHeader = ({ storeData }) => {
  return (
    <div className="relative rounded-xl overflow-hidden mb-6 shadow-lg">
      <img
        src={storeData.image}
        alt={`${storeData.name} (${storeData.location})`}
        className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover"
      />
      
      {/* Shop Information Button */}
      <button className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-[#6F9C3D] text-white border px-3 py-2 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-[#5d8a32] transition-colors shadow-md">
        Shop Information
      </button>
      
      {/* Store Info Bar */}
      <div className="bg-[#6F9C3D29] p-4 sm:p-6 w-full">
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center sm:gap-4 md:gap-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-medium text-gray-900 truncate">
            {storeData.name} ({storeData.location})
          </h1>
          
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4 md:gap-8 text-sm sm:text-base">
            <div className="flex items-center gap-2">
              <FaBiking className="text-[#6F9C3D] shrink-0" />
              <span className="text-gray-700">{storeData.freeDeliveryText}</span>
            </div>
            
            <span className="text-gray-700">
              Min Rs. {storeData.minOrder}
            </span>
            
            <span className="text-gray-900 font-semibold">
              Delivery: {storeData.deliveryTime}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreHeader;
