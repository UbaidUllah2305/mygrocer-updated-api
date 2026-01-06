import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function Filters({ onClose }) {
    const [openSections, setOpenSections] = useState({
        categories: true,
        city: false,
        country: false,
        vendors: false,
        priceRange: false,
        freeDelivery: false,
    });

    const [selectedFilters, setSelectedFilters] = useState({
        categories: [],
        city: null,
        country: null,
        vendors: [],
        priceRange: null,
        freeDelivery: false,
    });

    const toggleSection = (section) => {
        setOpenSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const handleCategoryChange = (category) => {
        setSelectedFilters((prev) => ({
            ...prev,
            categories: prev.categories.includes(category)
                ? prev.categories.filter((c) => c !== category)
                : [...prev.categories, category],
        }));
    };

    const handleCityChange = (city) => {
        setSelectedFilters((prev) => ({
            ...prev,
            city: prev.city === city ? null : city,
        }));
    };

    const handleCountryChange = (country) => {
        setSelectedFilters((prev) => ({
            ...prev,
            country: prev.country === country ? null : country,
        }));
    };

    const handleVendorChange = (vendor) => {
        setSelectedFilters((prev) => ({
            ...prev,
            vendors: prev.vendors.includes(vendor)
                ? prev.vendors.filter((v) => v !== vendor)
                : [...prev.vendors, vendor],
        }));
    };

    const handlePriceRangeChange = (range) => {
        setSelectedFilters((prev) => ({
            ...prev,
            priceRange: prev.priceRange === range ? null : range,
        }));
    };

    const handleFreeDeliveryToggle = () => {
        setSelectedFilters((prev) => ({
            ...prev,
            freeDelivery: !prev.freeDelivery,
        }));
    };

    const clearAllFilters = () => {
        setSelectedFilters({
            categories: [],
            city: null,
            country: null,
            vendors: [],
            priceRange: null,
            freeDelivery: false,
        });
    };

    const categories = [
        "Grocery",
        "Bakery",
        "Meat",
        "Seafood",
        "Beverages",
        "Snacks",
        "Dairy Products",
        "Frozen Foods",
        "Health & Beauty",
        "Household Items",
    ];

    const cities = [
        "Lahore",
        "Karachi",
        "Islamabad",
        "Rawalpindi",
        "Faisalabad",
        "Multan",
        "Peshawar",
        "Quetta",
    ];

    const countries = [
        "Pakistan",
        "United States",
        "United Kingdom",
        "Canada",
        "Australia",
    ];

    const vendors = [
        "Metro Cash & Carry",
        "Imtiaz Super Market",
        "Naheed Super Market",
        "Chase Up",
        "Al-Fatah",
        "Hyperstar",
        "Carrefour",
        "Utility Stores",
    ];

    const priceRanges = ["$10", "$50", "$100", "$300"];

    return (
        <aside className="bg-white lg:rounded-md lg:border border-[#0000001F] overflow-hidden h-full lg:h-fit lg:sticky lg:top-24">
            {/* Filter Header - Desktop Only */}
            <div className="hidden lg:block bg-[#6F9C3D] p-4 sm:p-5">
                <div className="flex justify-between items-center">
                    <h2 className="text-base sm:text-lg font-semibold text-white">
                        Filters
                    </h2>
                    <button
                        onClick={clearAllFilters}
                        className="text-xs sm:text-sm text-white hover:text-gray-100 font-medium transition-colors"
                    >
                        Clear All
                    </button>
                </div>
            </div>

            {/* Filter Content */}
            <div className="p-4 sm:p-5 space-y-4 max-h-[calc(100vh-180px)] overflow-y-auto">
                {/* Categories */}
                <div className="border-b border-gray-200 pb-4">
                    <button
                        onClick={() => toggleSection("categories")}
                        className="flex justify-between items-center w-full text-left group"
                    >
                        <h3 className="text-sm sm:text-base font-medium text-gray-800">
                            Categories
                        </h3>
                        {openSections.categories ? (
                            <FaChevronUp className="text-gray-500 group-hover:text-[#6F9C3D] text-sm transition-colors" />
                        ) : (
                            <FaChevronDown className="text-gray-500 group-hover:text-[#6F9C3D] text-sm transition-colors" />
                        )}
                    </button>
                    {openSections.categories && (
                        <div className="mt-3 space-y-2 max-h-48 overflow-y-auto pr-2">
                            {categories.map((category) => (
                                <label
                                    key={category}
                                    className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded transition-colors"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedFilters.categories.includes(
                                            category
                                        )}
                                        onChange={() =>
                                            handleCategoryChange(category)
                                        }
                                        className="w-4 h-4 text-[#6F9C3D] border-gray-300 rounded focus:ring-[#6F9C3D] cursor-pointer"
                                    />
                                    <span className="text-sm text-gray-700">
                                        {category}
                                    </span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* City */}
                <div className="border-b border-gray-200 pb-4">
                    <button
                        onClick={() => toggleSection("city")}
                        className="flex justify-between items-center w-full text-left group"
                    >
                        <h3 className="text-sm sm:text-base font-medium text-gray-800">
                            City
                        </h3>
                        {openSections.city ? (
                            <FaChevronUp className="text-gray-500 group-hover:text-[#6F9C3D] text-sm transition-colors" />
                        ) : (
                            <FaChevronDown className="text-gray-500 group-hover:text-[#6F9C3D] text-sm transition-colors" />
                        )}
                    </button>
                    {openSections.city && (
                        <div className="mt-3 space-y-2 max-h-48 overflow-y-auto pr-2">
                            {cities.map((city) => (
                                <label
                                    key={city}
                                    className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded transition-colors"
                                >
                                    <input
                                        type="radio"
                                        name="city"
                                        checked={selectedFilters.city === city}
                                        onChange={() => handleCityChange(city)}
                                        className="w-4 h-4 text-[#6F9C3D] border-gray-300 focus:ring-[#6F9C3D] cursor-pointer"
                                    />
                                    <span className="text-sm text-gray-700">
                                        {city}
                                    </span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Country */}
                <div className="border-b border-gray-200 pb-4">
                    <button
                        onClick={() => toggleSection("country")}
                        className="flex justify-between items-center w-full text-left group"
                    >
                        <h3 className="text-sm sm:text-base font-medium text-gray-800">
                            Country
                        </h3>
                        {openSections.country ? (
                            <FaChevronUp className="text-gray-500 group-hover:text-[#6F9C3D] text-sm transition-colors" />
                        ) : (
                            <FaChevronDown className="text-gray-500 group-hover:text-[#6F9C3D] text-sm transition-colors" />
                        )}
                    </button>
                    {openSections.country && (
                        <div className="mt-3 space-y-2">
                            {countries.map((country) => (
                                <label
                                    key={country}
                                    className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded transition-colors"
                                >
                                    <input
                                        type="radio"
                                        name="country"
                                        checked={selectedFilters.country === country}
                                        onChange={() => handleCountryChange(country)}
                                        className="w-4 h-4 text-[#6F9C3D] border-gray-300 focus:ring-[#6F9C3D] cursor-pointer"
                                    />
                                    <span className="text-sm text-gray-700">
                                        {country}
                                    </span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Vendors */}
                <div className="border-b border-gray-200 pb-4">
                    <button
                        onClick={() => toggleSection("vendors")}
                        className="flex justify-between items-center w-full text-left group"
                    >
                        <h3 className="text-sm sm:text-base font-medium text-gray-800">
                            Vendors
                        </h3>
                        {openSections.vendors ? (
                            <FaChevronUp className="text-gray-500 group-hover:text-[#6F9C3D] text-sm transition-colors" />
                        ) : (
                            <FaChevronDown className="text-gray-500 group-hover:text-[#6F9C3D] text-sm transition-colors" />
                        )}
                    </button>
                    {openSections.vendors && (
                        <div className="mt-3 space-y-2 max-h-48 overflow-y-auto pr-2">
                            {vendors.map((vendor) => (
                                <label
                                    key={vendor}
                                    className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded transition-colors"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedFilters.vendors.includes(
                                            vendor
                                        )}
                                        onChange={() => handleVendorChange(vendor)}
                                        className="w-4 h-4 text-[#6F9C3D] border-gray-300 rounded focus:ring-[#6F9C3D] cursor-pointer"
                                    />
                                    <span className="text-sm text-gray-700">
                                        {vendor}
                                    </span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Price Range */}
                <div className="border-b border-gray-200 pb-4">
                    <button
                        onClick={() => toggleSection("priceRange")}
                        className="flex justify-between items-center w-full text-left group"
                    >
                        <h3 className="text-sm sm:text-base font-medium text-gray-800">
                            Price Range
                        </h3>
                        {openSections.priceRange ? (
                            <FaChevronUp className="text-gray-500 group-hover:text-[#6F9C3D] text-sm transition-colors" />
                        ) : (
                            <FaChevronDown className="text-gray-500 group-hover:text-[#6F9C3D] text-sm transition-colors" />
                        )}
                    </button>
                    {openSections.priceRange && (
                        <div className="mt-3 grid grid-cols-2 gap-2">
                            {priceRanges.map((range) => (
                                <button
                                    key={range}
                                    onClick={() => handlePriceRangeChange(range)}
                                    className={`py-2 px-3 text-xs sm:text-sm font-medium rounded-lg border transition-all ${
                                        selectedFilters.priceRange === range
                                            ? "bg-[#6F9C3D] text-white border-[#6F9C3D] shadow-md"
                                            : "bg-white text-gray-700 border-gray-300 hover:border-[#6F9C3D]"
                                    }`}
                                >
                                    {range}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Free Delivery */}
                <div className="pb-2">
                    <label className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
                        <span className="text-sm sm:text-base font-medium text-gray-800">
                            Free Delivery
                        </span>
                        <div className="relative inline-block w-11 h-6">
                            <input
                                type="checkbox"
                                checked={selectedFilters.freeDelivery}
                                onChange={handleFreeDeliveryToggle}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#6F9C3D] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6F9C3D]"></div>
                        </div>
                    </label>
                </div>
            </div>

            {/* Apply Filters Button */}
            <div className="p-4 sm:p-5 border-t border-gray-200 bg-gray-50 sticky bottom-0">
                <button
                    onClick={onClose}
                    className="w-full bg-[#6F9C3D] hover:bg-[#5d8a32] text-white py-2.5 sm:py-3 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
                >
                    Apply Filters
                </button>
            </div>
        </aside>
    );
}
