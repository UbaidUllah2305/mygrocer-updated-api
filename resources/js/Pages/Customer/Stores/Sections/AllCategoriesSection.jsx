import React, { useRef } from "react";
import { Link } from "@inertiajs/react";
import { ArrowRightCircle } from "lucide-react";

// Custom hook for horizontal scroll
const useHorizontalScroll = () => {
  const scrollRef = useRef(null);

  const scrollNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 250, behavior: "smooth" });
    }
  };

  return { scrollRef, scrollNext };
};

// Category Icon Card
const CategoryIconCard = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center gap-2 sm:gap-3 transition group w-full min-w-[80px] sm:min-w-[120px] md:min-w-[140px]"
  >
    <div className="w-full aspect-square p-3 sm:p-4 md:p-6 rounded-xl bg-[#EFEFEF] flex items-center justify-center group-hover:bg-[#E8F5E0] transition-colors">
      {icon ? (
        <img 
          src={icon} 
          alt={label} 
          className="w-full h-full max-w-12 max-h-12 sm:max-w-16 sm:max-h-16 object-contain" 
        />
      ) : (
        <span className="text-xl sm:text-2xl">🛒</span>
      )}
    </div>
    <span className="text-xs sm:text-sm md:text-base font-medium text-center line-clamp-2 px-1">
      {label}
    </span>
  </button>
);

const AllCategoriesSection = ({ categoryIcons, onCategoryClick }) => {
  const { scrollRef, scrollNext } = useHorizontalScroll();

  // Create infinite scroll effect
  const infiniteCategories = [...categoryIcons, ...categoryIcons];

  return (
    <section className="mb-6 sm:mb-8">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900">
          All Categories
        </h2>
        <Link
          href="#"
          className="text-sm sm:text-base font-medium text-[#000000B8] hover:text-gray-900 border-b border-[#000000B8] hover:border-gray-900 transition-colors"
        >
          View All (37)
        </Link>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <div
          className="flex-1 overflow-x-auto scrollbar-hide pb-2 cursor-grab active:cursor-grabbing"
          ref={scrollRef}
        >
          <div className="flex gap-3 sm:gap-4 md:gap-6">
            {infiniteCategories.map((cat, i) => (
              <CategoryIconCard
                key={`${cat.id}-${i}`}
                icon={cat.icon}
                label={cat.label}
                onClick={() =>
                  onCategoryClick(
                    cat.label.toLowerCase().replace(/\s+/g, "-")
                  )
                }
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

export default AllCategoriesSection;
