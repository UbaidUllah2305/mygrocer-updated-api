import React from "react";

const CategoryTab = ({ label, count, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base whitespace-nowrap transition-all rounded-lg ${
      active
        ? "border-b-2 border-[#6F9C3D] font-semibold text-[#6F9C3D] bg-[#6F9C3D]/5"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
    }`}
  >
    {label} {count && <span className="text-xs sm:text-sm ml-1">({count})</span>}
  </button>
);

const CategoryTabs = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2 scrollbar-hide">
        {categories.map((cat) => (
          <CategoryTab
            key={cat.id}
            label={cat.label}
            count={cat.count}
            active={activeCategory === cat.id}
            onClick={() => setActiveCategory(cat.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;
