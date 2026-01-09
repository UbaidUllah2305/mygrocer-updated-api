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
        className="bg-white rounded-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto relative shadow-2xl text-[#2C323C]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center z-10 transition-colors shadow-md"
        >
          <X className="w-4 h-4 text-white" strokeWidth={2.5} />
        </button>

        <div className="p-4 sm:p-6 lg:p-8">
          {/* Title */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-6">
            Voucher details
          </h2>

          {/* Voucher Header */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="w-12 h-8 sm:w-16 sm:h-10 shrink-0">
              <img
                src="/assets/Assets/Customer/storepreview/voucher.svg"
                alt="voucher"
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-[#FF8829] leading-tight">
              {voucherData.title}
            </h3>
          </div>

          {/* Voucher Info */}
          <div className="space-y-1 sm:space-y-2 text-sm sm:text-base lg:text-lg xl:text-xl mb-8">
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
          <div className="mb-8">
            <button
              onClick={() => setTermsExpanded(!termsExpanded)}
              className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold">
                Terms & Conditions
              </span>
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-gray-300 flex items-center justify-center bg-white transition-transform duration-200">
                {termsExpanded ? (
                  <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                )}
              </div>
            </button>

            {termsExpanded && (
              <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-white">
                <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base lg:text-lg list-disc pl-4 sm:pl-6">
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
          <div className="bg-gradient-to-r from-[#FF8829] to-[#ff9f47] rounded-xl p-2 sm:p-4 mb-4 text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              {voucherData.discount}
            </div>
            <div className="text-sm sm:text-base text-white/90">
              OFF on orders above Rs. {voucherData.minOrder}
            </div>
          </div>

          {/* Apply/Create Button */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={() => {
                onApply && onApply(voucher);
                onClose();
              }}
              className="flex-1 bg-[#FF8829] hover:bg-[#e67524] text-white font-bold py-3 sm:py-4 px-6 rounded-xl transition-colors text-base sm:text-lg lg:text-xl shadow-lg hover:shadow-xl"
            >
              Apply Voucher
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 sm:py-4 px-6 rounded-xl transition-colors text-base sm:text-lg lg:text-xl border border-gray-300"
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
