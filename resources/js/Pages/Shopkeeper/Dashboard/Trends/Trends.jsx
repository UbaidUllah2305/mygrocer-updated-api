import React, { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import TrendsChart from "./TrendsChart";
import TrendsTable from "./TrendsTable";
import Pagination from "@/Components/Pagination";

const TrendsPage = () => {
  const [activeTab, setActiveTab] = useState("items");

  // Chart date filters
  const [fromDate, setFromDate] = useState("2025-11-11");
  const [toDate, setToDate] = useState("2025-12-11");

  // Table filters
  const [itemFilter, setItemFilter] = useState("All");
  const [topSellingFilter, setTopSellingFilter] = useState("By Item");

  // Dropdown refs
  const itemFilterRef = useRef(null);
  const topSellingFilterRef = useRef(null);
  const [isItemFilterOpen, setIsItemFilterOpen] = useState(false);
  const [isTopSellingFilterOpen, setIsTopSellingFilterOpen] = useState(false);

  // Add state for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (itemFilterRef.current && !itemFilterRef.current.contains(e.target)) {
        setIsItemFilterOpen(false);
      }
      if (topSellingFilterRef.current && !topSellingFilterRef.current.contains(e.target)) {
        setIsTopSellingFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Raw table data
  const tableData = [
    {
      main: "Beauty",
      sub: "Skin care",
      code: "12245",
      name: "Soap",
      bp: "200",
      sp: "290",
      quantity: "1890",
      soldOut: "1,000",
      inStock: "890",
      image: "/assets/Assets/soap.jpg",
    },
    {
      main: "Beauty",
      sub: "Makeup",
      code: "13245",
      name: "Lipglose",
      bp: "300",
      sp: "490",
      quantity: "1890",
      soldOut: "1,000",
      inStock: "890",
      image: "/assets/Assets/lipglose.jpg",
    },
  ];

  const filteredTableData = tableData.filter((item) => {
    if (itemFilter !== "All" && item.name !== itemFilter) {
      return false;
    }
    return true;
  });

  // Compute paginated data
  const paginatedTableData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTableData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTableData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredTableData.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-[1099px]">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        {/*  Title + Subtitle */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {activeTab === "customers" ? "Trending Customers" : "Trending Items"}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Analyze sales and customer trends
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("items")}
            className={`px-4 py-2 h-12 rounded-lg text-base sm:text-xl font-medium transition whitespace-nowrap
              ${activeTab === "items"
                ? "bg-[#6f9c3d] text-white"
                : "bg-gray-300 text-gray-700 border border-gray-300 hover:bg-gray-200"
              }`}
          >
            Items
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("customers")}
            className={`px-4 py-2 h-12 rounded-lg text-base sm:text-xl font-medium transition whitespace-nowrap
              ${activeTab === "customers"
                ? "bg-[#6f9c3d] text-white"
                : "bg-gray-300 text-gray-700 border border-gray-300 hover:bg-gray-200"
              }`}
          >
            Customers
          </button>
        </div>
      </div>

      {/* Chart */}
      <TrendsChart
        activeTab={activeTab}
        onTabChange={setActiveTab}
        fromDate={fromDate}
        toDate={toDate}
        onFromDateChange={setFromDate}
        onToDateChange={setToDate}
      />

      {/* Trending Products Table */}
      {activeTab === "items" && (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-6 mb-4">
            <h2 className="text-xl font-medium">Top Trending Products (Based on sales performance)</h2>
            <div className="flex flex-col sm:flex-row gap-2">
              {/* Item Name Filter */}
              <div className="relative" ref={itemFilterRef}>
                <button
                  type="button"
                  onClick={() => setIsItemFilterOpen(!isItemFilterOpen)}
                  className="min-w-44 w-full sm:w-44 h-12 px-3 py-2.5 pr-10 text-base text-left border-2 border-gray-300 rounded-xl bg-white outline-none"
                >
                  {itemFilter === "All" ? "Item Name" : itemFilter}
                  <ChevronDown
                    size={18}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none transition-transform ${isItemFilterOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isItemFilterOpen && (
                  <div
                    className="absolute z-10 mt-1 w-full bg-white border-2 border-gray-300 rounded-xl shadow-lg overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {[
                      { value: "All", label: "Item Name" },
                      { value: "Soap", label: "Soap" },
                      { value: "Lipglose", label: "Lipglose" },
                    ].map((option, index, arr) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                          setItemFilter(option.value);
                          setIsItemFilterOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-3 text-base font-normal ${itemFilter === option.value
                          ? "bg-[#f0f7ed] text-[#161c2b]"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                          } ${index !== arr.length - 1 ? "border-b border-gray-300" : ""}`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Top Selling Filter */}
              <div className="relative" ref={topSellingFilterRef}>
                <button
                  type="button"
                  onClick={() => setIsTopSellingFilterOpen(!isTopSellingFilterOpen)}
                  className="w-44 h-12 px-3 py-2.5 pr-10 text-base text-left border-2 border-gray-300 rounded-xl bg-white outline-none"
                >
                  {topSellingFilter}
                  <ChevronDown
                    size={18}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none transition-transform ${isTopSellingFilterOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isTopSellingFilterOpen && (
                  <div
                    className="absolute z-10 mt-1 w-full bg-white border-2 border-gray-300 rounded-xl shadow-lg overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {[
                      { value: "By Item", label: "By Item" },
                      { value: "Top Selling", label: "Top Selling" },
                    ].map((option, index, arr) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                          setTopSellingFilter(option.value);
                          setIsTopSellingFilterOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-3 text-base font-normal ${topSellingFilter === option.value
                          ? "bg-[#f0f7ed] text-[#161c2b]"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                          } ${index !== arr.length - 1 ? "border-b border-gray-300" : ""}`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <TrendsTable items={paginatedTableData} loading={false} />

          {filteredTableData.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredTableData.length}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default TrendsPage;