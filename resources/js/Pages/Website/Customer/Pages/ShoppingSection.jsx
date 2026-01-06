import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function ShoppingSection() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeSort, setActiveSort] = useState("deal");

    const categories = [
        {
            name: "New Stores",
            icon: "/Images/new-arrival.png",
        },
        {
            name: "Top Rated Stores",
            icon: "/Images/top-store.png",
        },
        {
            name: "Only Pickups",
            icon: "/Images/pickups.png",
        },
        {
            name: "Offers",
            icon: "/Images/special-offer.png",
        },
    ];

    return (
        <>
            {/* Search and Sort Section */}
            <div className="grid lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 items-center mb-4 sm:mb-6 lg:mb-8">
                {/* Search Input */}
                <div className="lg:col-span-2 relative w-full">
                    <div className="flex items-center gap-x-2 sm:gap-x-4 px-3 sm:px-4 md:px-6 bg-white border border-[#00000026] rounded-md shadow-sm focus-within:shadow-lg focus-within:border-[#6F9C3D] transition-all duration-200">
                        {/* Search Icon */}
                        <FaSearch className="text-[#6F9C3D] text-base sm:text-lg md:text-xl shrink-0" />

                        {/* Vertical Divider */}
                        <div className="h-8 sm:h-12 lg:h-14 w-px bg-[#00000026]"></div>

                        {/* Input Field */}
                        <input
                            type="text"
                            placeholder="Search by shops, categories, or items.."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-1 outline-none text-sm sm:text-base text-gray-700 placeholder-gray-400 bg-transparent focus:outline-none focus:ring-0 border-0 p-0"
                        />
                    </div>
                </div>

                {/* Sort Section */}
                <div className="flex justify-start lg:justify-end items-center gap-2 sm:gap-3">
                    <h2 className="text-xs sm:text-sm md:text-base font-medium text-gray-700 whitespace-nowrap">
                        Sort by:
                    </h2>
                    <div className="flex">
                        <button
                            type="button"
                            onClick={() => setActiveSort("deal")}
                            className={`px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm font-medium rounded-l-lg transition-colors ${
                                activeSort === "deal"
                                    ? "bg-[#FF8829] text-white"
                                    : "bg-white text-gray-700 border border-[#00000026]"
                            }`}
                        >
                            Deal End
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveSort("recent")}
                            className={`px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm font-medium rounded-r-lg transition-colors border-y border-r ${
                                activeSort === "recent"
                                    ? "bg-[#FF8829] text-white border-[#FF8829]"
                                    : "bg-white text-gray-700 border-[#00000026]"
                            }`}
                        >
                            Recent
                        </button>
                    </div>
                </div>
            </div>

            {/* Start Shopping Title */}
            <div className="mb-3 sm:mb-4 md:mb-6">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                    Start Shopping
                </h2>
            </div>

            {/* Categories Grid */}
            <div className="mb-6 sm:mb-8">
                <div className="flex flex-wrap gap-3 sm:gap-4">
                    {/* Daily Grocery Card */}
                    <a href="#" className="shrink-0 group">
                        <div className="w-44 sm:w-48 md:w-56 lg:w-64 rounded-lg border border-[#6F9C3D] overflow-hidden hover:shadow-lg transition-all duration-200">
                            <div className="flex flex-col">
                                <div className="bg-white p-2">
                                    <img
                                        src="/Images/daily-grocery.png"
                                        alt="Daily grocery"
                                        className="w-full h-16 sm:h-20 md:h-24 object-contain"
                                    />
                                </div>
                                <div className="px-2 sm:px-3 py-2 sm:py-2.5 flex justify-between items-center gap-2 bg-[#DBF6E3]">
                                    <span className="text-xs sm:text-sm font-medium text-gray-800">
                                        Daily Grocery
                                    </span>
                                    <span className="text-xs sm:text-sm font-medium text-[#308636] cursor-pointer hover:underline">
                                        Shop Here
                                    </span>
                                </div>
                            </div>
                        </div>
                    </a>

                    {/* Category Cards */}
                    {categories.map((category, index) => (
                        <a
                            key={index}
                            href="#"
                            className="shrink-0 flex flex-col items-center group"
                        >
                            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-lg bg-[#D3FFA1AB] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform duration-200">
                                <img
                                    src={category.icon}
                                    alt={category.name}
                                    className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain"
                                />
                            </div>
                            <span className="text-xs sm:text-sm font-medium text-gray-800 text-center max-w-[96px] sm:max-w-[112px] md:max-w-[128px]">
                                {category.name}
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </>
    );
}
