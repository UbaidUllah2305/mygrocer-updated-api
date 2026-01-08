import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative w-full">
      <div className="flex items-center gap-x-3 sm:gap-x-4 px-3 sm:px-4 md:px-6 bg-white border border-[#00000026] rounded-lg shadow-sm focus-within:shadow-lg focus-within:border-[#6F9C3D] transition-all duration-200">
        {/* Search Icon */}
        <FaSearch className="text-[#6F9C3D] text-base sm:text-lg md:text-xl shrink-0" />

        {/* Vertical Divider */}
        <div className="h-8 sm:h-12 lg:h-16 w-px bg-[#00000026]"></div>

        {/* Input Field */}
        <input
          type="text"
          placeholder="Search Products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 outline-none text-sm sm:text-base text-gray-700 placeholder-gray-400 bg-transparent focus:outline-none focus:ring-0 border-0 p-0"
        />
      </div>
    </div>
  );
};

export default SearchBar;
