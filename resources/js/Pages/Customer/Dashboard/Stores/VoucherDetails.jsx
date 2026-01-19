import React, { useState } from "react";
import { X, ChevronUp, ChevronDown } from "lucide-react";

const VoucherDetails = ({ voucher, onClose, onApply }) => {
  const [termsExpanded, setTermsExpanded] = useState(true);

  // Default voucher data structure
  const voucherData = {
    title:
      voucher?.title ||
      "Voucher only valid for fresh produce category products!",
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
        className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative shadow-2xl text-[#2C323C]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-7 h-7 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center z-10 transition-colors shadow-md"
        >
          <X className="w-4 h-4 text-white" strokeWidth={2.5} />
        </button>

        <div className="p-4 sm:p-6">
          {/* Title */}
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
            Voucher details
          </h2>

          {/* Voucher Header */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 bg-orange-50 rounded-lg flex items-center justify-center p-2">
              <img
                src="/assets/Assets/Customer/storepreview/voucher.svg"
                alt="voucher"
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#FF8829] leading-tight pt-1">
              {voucherData.title}
            </h3>
          </div>

          {/* Voucher Info */}
          <div className="space-y-1 sm:space-y-1.5 text-sm sm:text-base text-gray-600 mb-6">
            <p>{voucherData.customerType}</p>
            <p>{voucherData.validItems}</p>
            <p>
              Valid from {voucherData.validFrom} - {voucherData.validTo}
            </p>
            <p>
              Min. order Rs. {voucherData.minOrder}. Discount capped at Rs.{" "}
              {voucherData.discountCap}
            </p>
          </div>

          {/* Terms & Conditions */}
          <div className="mb-6">
            <button
              onClick={() => setTermsExpanded(!termsExpanded)}
              className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="text-sm sm:text-base font-bold text-gray-700">
                Terms & Conditions
              </span>
              <div className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center bg-white transition-transform duration-200">
                {termsExpanded ? (
                  <ChevronUp className="w-3.5 h-3.5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                )}
              </div>
            </button>

            {termsExpanded && (
              <div className="mt-3 p-3 border border-gray-200 rounded-lg bg-white">
                <ul className="space-y-1 text-xs sm:text-sm list-disc pl-4 text-gray-600">
                  {voucherData.terms.map((term, index) => (
                    <li key={index} className="leading-relaxed">
                      {term}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Discount Badge */}
          <div className="bg-gradient-to-r from-[#FF8829] to-[#ff9f47] rounded-xl p-3 mb-4 text-center shadow-sm">
            <div className="text-2xl sm:text-3xl font-bold text-white mb-0.5">
              {voucherData.discount}
            </div>
            <div className="text-xs sm:text-sm text-white/90 font-medium">
              OFF on orders above Rs. {voucherData.minOrder}
            </div>
          </div>

          {/* Apply/Create Button */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                onApply && onApply(voucher);
                onClose();
              }}
              className="flex-1 bg-[#FF8829] hover:bg-[#e67524] text-white font-bold py-2.5 sm:py-3 px-6 rounded-xl transition-colors text-sm sm:text-base shadow-md hover:shadow-lg"
            >
              Apply Voucher
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 sm:py-3 px-6 rounded-xl transition-colors text-sm sm:text-base border border-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoucherDetails;
