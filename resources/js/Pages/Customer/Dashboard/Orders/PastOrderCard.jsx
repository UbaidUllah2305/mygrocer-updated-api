import React, { useState } from "react";
import { Clock, ChevronRight } from "lucide-react";

const PastOrderCard = ({ order, onViewSummary }) => {
  const [isRating, setIsRating] = useState(false);
  const [rating, setRating] = useState(order.rating || 0);

  const handleStarClick = (value) => {
    setRating(value);
    setIsRating(true);
    setTimeout(() => alert(`Thank you for rating ${value} stars!`), 500);
  };

  return (
    <div className="group bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex flex-col md:flex-row gap-5">
        {/* Image Section */}
        <div className="relative shrink-0">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
            <img
              src={order.image}
              alt="Order item"
              className="w-full h-full object-cover mix-blend-multiply"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#6F9C3D] transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
                {order.store}
              </h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {order.items}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-lg font-bold text-[#6F9C3D]">{order.total}</p>
              <div className="flex items-center justify-end gap-1 mt-1 text-xs font-medium text-gray-400">
                <Clock size={12} />
                <span>{order.deliveredAt}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-4 mt-4 pt-4 border-t border-gray-50">
            {/* Rating */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Rate your order</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleStarClick(star)}
                    className={`transition-transform hover:scale-110 focus:outline-none ${star <= rating ? "text-yellow-400" : "text-gray-200"}`}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87.69 6.89L12 21l-5.69-.48.69-6.89-5-4.87L9 8.24z" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={onViewSummary}
              className="px-5 py-2.5 bg-orange-50 text-[#FF8829] hover:text-white hover:bg-[#FF8829] font-medium rounded-lg transition-all duration-200 text-sm flex items-center gap-2"
            >
              <span>Reorder Items</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastOrderCard;