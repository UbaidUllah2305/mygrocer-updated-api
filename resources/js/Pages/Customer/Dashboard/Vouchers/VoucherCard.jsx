import React from "react";

const VoucherCard = ({ voucher, onUse }) => {
  return (
    <div className="bg-white w-full max-w-3xl rounded-xl p-4 border border-[#00000059] flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
      <div className="flex-1 w-full">
        <div className="flex items-center gap-2 mb-2">
          <img
            src="/assets/Assets/Customer/storepreview/voucher.svg"
            alt="voucher"
            className="w-5 h-5 shrink-0"
          />
          <h3 className="text-base font-medium line-clamp-1">{voucher.title}</h3>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3">
          <span className="text-base font-bold text-[#6F9C3D]">{voucher.amount}</span>
          <span className="px-2 py-0.5 text-sm font-mono bg-gray-100 rounded border border-gray-200">{voucher.code}</span>
          <span className="px-2 py-0.5 bg-[#6F9C3D]/10 text-[#6F9C3D] text-xs font-semibold rounded-full whitespace-nowrap">
            {voucher.remaining} left
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1 text-xs px-3 py-1.5 border border-gray-200 rounded-lg w-full sm:w-auto bg-gray-50">
          <span className="whitespace-nowrap">Min. order {voucher.minOrder}</span>
          <span className="hidden sm:inline">-</span>
          <span className="whitespace-nowrap">Use by {voucher.expiry}</span>
        </div>
      </div>
      <button
        onClick={onUse}
        className="w-full sm:w-auto px-5 py-2 text-sm md:text-base text-white bg-[#6F9C3D] hover:bg-[#5d8a32] font-medium rounded-lg transition shadow-sm whitespace-nowrap"
      >
        Use now
      </button>
    </div>
  );
};

export default VoucherCard;