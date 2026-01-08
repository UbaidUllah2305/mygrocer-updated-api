import React, { useRef } from "react";
import { ArrowRightCircle } from "lucide-react";
import { FaTicketAlt } from "react-icons/fa";

// Custom hook for horizontal scroll
const useHorizontalScroll = () => {
  const scrollRef = useRef(null);

  const scrollNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
    }
  };

  return { scrollRef, scrollNext };
};

// Voucher Card Component
const VoucherCard = ({ voucher, onClick }) => (
  <div
    className="bg-gradient-to-r from-[#D3FFA1AB] to-[#E8F5E0] rounded-xl p-4 sm:p-6 cursor-pointer hover:from-[#c5f590] hover:to-[#d4e8c7] transition-all duration-200 shadow-sm hover:shadow-md min-w-[280px] sm:min-w-[320px]"
    onClick={() => onClick(voucher)}
  >
    <div className="flex items-start gap-3 sm:gap-4">
      <FaTicketAlt className="w-5 h-5 sm:w-6 sm:h-6 text-[#6F9C3D] shrink-0 mt-1" />
      <div className="flex-1 min-w-0">
        <p className="text-sm sm:text-base text-gray-800 font-medium line-clamp-2 mb-2">
          {voucher.description}
        </p>
        <p className="text-lg sm:text-xl font-bold text-[#6F9C3D] mb-3">
          {voucher.discount}
        </p>
      </div>
    </div>
    <p className="text-xs text-gray-600 border border-[#0000003B] rounded-full px-3 py-1.5 inline-block">
      {voucher.validity}
    </p>
  </div>
);

const VouchersSection = ({ vouchers, onVoucherClick }) => {
  const { scrollRef, scrollNext } = useHorizontalScroll();

  // Create infinite scroll effect
  const infiniteVouchers = [...vouchers, ...vouchers];

  return (
    <section className="mb-6 sm:mb-8">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4 text-gray-900">
        Apply a voucher at checkout
      </h2>
      
      <div className="flex items-center gap-3 sm:gap-4">
        <div
          className="flex-1 overflow-x-auto scrollbar-hide pb-2 cursor-grab active:cursor-grabbing"
          ref={scrollRef}
        >
          <div className="flex gap-3 sm:gap-4">
            {infiniteVouchers.map((voucher, i) => (
              <VoucherCard
                key={`${voucher.id}-${i}`}
                voucher={voucher}
                onClick={onVoucherClick}
              />
            ))}
          </div>
        </div>

        <button
          onClick={scrollNext}
          className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#D3FFA1AB] transition-colors"
        >
          <ArrowRightCircle className="w-6 h-6 sm:w-8 sm:h-8 text-[#6F9C3D]" />
        </button>
      </div>
    </section>
  );
};

export default VouchersSection;
