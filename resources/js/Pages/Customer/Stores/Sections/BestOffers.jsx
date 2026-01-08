import React, { useRef } from "react";
import { ArrowRightCircle, X } from "lucide-react";

// Custom hook for horizontal scroll
const useHorizontalScroll = (enableInfinite = false) => {
  const scrollRef = useRef(null);

  const scrollNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
    }
  };

  return { scrollRef, scrollNext };
};

// Promotional Banner Component
const PromoBanner = ({ banner, onClose }) => (
  <div
    className="relative rounded-xl overflow-hidden h-32 sm:h-40 md:h-48 lg:h-56 bg-cover bg-center cursor-pointer shadow-md hover:shadow-lg transition-shadow"
    style={{ backgroundImage: `url(${banner.image})` }}
  >
    {banner.closeable && (
      <button
        onClick={onClose}
        className="absolute top-2 right-2 w-6 h-6 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors shadow-sm"
      >
        <X className="w-4 h-4 text-gray-600" />
      </button>
    )}
  </div>
);

const BestOffers = ({ banners }) => {
  const { scrollRef, scrollNext } = useHorizontalScroll(true);

  // Create infinite scroll effect
  const infiniteBanners = [...banners, ...banners];

  return (
    <section className="mb-6 sm:mb-8">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4 text-gray-900">
        Best Offers
      </h2>
      
      <div className="flex items-center gap-3 sm:gap-4">
        <div
          className="flex-1 overflow-x-auto scrollbar-hide pb-2 cursor-grab active:cursor-grabbing"
          ref={scrollRef}
        >
          <div className="flex gap-3 sm:gap-4">
            {infiniteBanners.map((banner, i) => (
              <div
                key={`${banner.id}-${i}`}
                className="shrink-0 w-72 sm:w-80 md:w-96 lg:w-[500px]"
              >
                <PromoBanner 
                  banner={banner} 
                  onClose={() => console.log('Banner closed:', banner.id)}
                />
              </div>
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

export default BestOffers;
