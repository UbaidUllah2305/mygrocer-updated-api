import React, { useState } from "react";
import { X, ChevronUp, ChevronDown } from "lucide-react";

const VoucherDetails = ({ voucher, onClose, onApply }) => {
  const [termsExpanded, setTermsExpanded] = useState(true);

  // Default voucher data structure
  const voucherData = {
    title: voucher?.title || "Voucher only valid for fresh produce category products!",
    description: voucher?.description || "Voucher only valid for fresh prod...",
    customerType: voucher?.customerType || "New and existing customers",
    validItems: voucher?.validItems || "Valid for selected items.",
    validFrom: voucher?.validFrom || "10 Oct 2024",
    validTo: voucher?.validTo || "31 Dec 2025",
    minOrder: voucher?.minOrder || 800,
    discountCap: voucher?.discountCap || 250,
    discount: voucher?.discount || "25%",
    terms: voucher?.terms || [
      "Valid for a minimum order of Rs.800",
      "Discount capped at Rs.250",
      "Applicable for Delivery.",
      "Valid only for the selected chains.",
      "Applicable only for selected products or categories.",
      "Limited to 12 redemption per user.",
      "For selected users only.",
      "My Grocer may at any time in its sole and absolute discretion withdraw, amend and/or alter any applicable terms and conditions of the voucher, deals, or promotions without prior notice.",
      "My Grocer may at any time in its sole and absolute discretion exclude, void, discontinue or disqualify you from any voucher, deal, or promotion without prior notice.",
    ],
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl max-w-[970px] w-full max-h-[90vh] overflow-y-auto relative shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-1 right-1 w-7 h-7 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center z-10 transition-colors"
        >
          <X className="w-4 h-4 text-white" strokeWidth={2.5} />
        </button>

        <div className="p-6">
          {/* Title */}
          <h2
            className="text-xl sm:text-2xl font-normal text-gray-900 mb-6"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Voucher details
          </h2>

          {/* Voucher Header */}
          <div className="flex items-start gap-3 mb-4">
            {/* Voucher Icon */}
            <div className="w-13 h-9 shrink-0 mt-5 md:mt-0 mr-3">
              <img
                src="/assets/Assets/Customer/storepreview/voucher.svg"
                alt="voucher"
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* Voucher Title */}
            <h3
              className="text-xl sm:text-2xl font-bold text-[#FF8829] leading-tight"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {voucherData.title}
            </h3>
          </div>

          {/* Voucher Info */}
          <div className="space-y-1 text-neutral-800 text-base sm:text-lg mb-6">
            <p>{voucherData.customerType}</p>
            <p>{voucherData.validItems}</p>
            <p>Valid from {voucherData.validFrom} - {voucherData.validTo}</p>
            <p>Min. order Rs. {voucherData.minOrder}. Discount capped at Rs. {voucherData.discountCap}</p>
          </div>

          {/* Terms & Conditions */}
          <div className="pt-4">
            <button
              onClick={() => setTermsExpanded(!termsExpanded)}
              className="flex relative items-center justify-between w-full text-left mb-3"
            >
              <span
                className="text-lg sm:text-xl font-normal text-gray-900"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Terms & Conditions
              </span>
              <div className="w-6 h-6 absolute left-60 rounded-full border border-gray-300 flex items-center justify-center">
                {termsExpanded ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </div>
            </button>

            {termsExpanded && (
              <ul className="space-y-2 text-base sm:text-lg text-gray-700 list-disc pl-5">
                {voucherData.terms.map((term, index) => (
                  <li key={index} className="leading-relaxed">
                    {term}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Apply/Create Button */}
          <button
            onClick={() => {
              onApply && onApply(voucher);
              onClose();
            }}
            className="flex items-center justify-center max-w-[670px] md:mx-34 w-full mt-6 bg-[#FF8829] hover:bg-[#ea6c0f] text-white font-bold py-3 px-6 rounded-lg transition-colors text-lg sm:text-xl"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoucherDetails;