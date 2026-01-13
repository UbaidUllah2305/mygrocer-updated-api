import React from "react";

const VoucherCard = ({ voucher, onUse }) => {
  return (
    <div className="bg-white w-full max-w-[688px] rounded-xl p-4 border border-[#00000059] flex items-start justify-between">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <img
            src="/assets/Assets/Customer/storepreview/voucher.svg"
            alt="voucher"
            className="w-5 h-5"
          />
          <h3 className="text-base">{voucher.title}</h3>
        </div>
        <div className="flex items-center gap-4 mb-2">
          <span className="text-base">{voucher.amount}</span>
          <span className="px-2 py-0.5 text-base">{voucher.code}</span>
          <span className="px-2 py-0.5 bg-[#6F9C3D29] text-xs rounded-full">
            {voucher.remaining} left
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs px-3 py-1 border border-[#0000003B] rounded-2xl w-[268px]">
          <span>Min. order {voucher.minOrder}</span>
          <span>-</span>
          <span>Use by {voucher.expiry}</span>
        </div>
      </div>
      <button
        onClick={onUse}
        className="ml-4 px-3 py-1.5 text-base text-[#6F9C3D] font-medium hover:bg-[#6F9C3D]/10 rounded transition"
      >
        Use now
      </button>
    </div>
  );
};

export default VoucherCard;