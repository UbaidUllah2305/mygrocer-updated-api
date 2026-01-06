import React, { useState, useEffect, useRef } from "react";
import Header from "../../Components/Admin/Header";
import Sidebar from "../../Components/Admin/Sidebar";
import { ChevronDown } from "lucide-react";
import { router } from "@inertiajs/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import DateInput from "../../Components/Admin/DateInput";

const CHART_ITEM_DATA = [
  { name: "Beauty Soap", value: 25 },
  { name: "Fresh Milk", value: 60 },
  { name: "Washing Powder", value: 55 },
  { name: "Basmati Rice", value: 85 },
  { name: "Floor Cleaning detergent", value: 75 },
  { name: "Face Wash", value: 70 },
  { name: "Toothpaste", value: 80 },
];

const TrendsPage = () => {
  const [activeTab, setActiveTab] = useState("items");
  const [timeRange, setTimeRange] = useState("daily");
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Dropdown states
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
  const [isItemFilterOpen, setIsItemFilterOpen] = useState(false);
  const [isTopSellingFilterOpen, setIsTopSellingFilterOpen] = useState(false);

  // Filter states
  const [itemFilter, setItemFilter] = useState("All");
  const [topSellingFilter, setTopSellingFilter] = useState("By Item");

  // Refs
  const timeDropdownRef = useRef(null);
  const itemFilterRef = useRef(null);
  const topSellingFilterRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (timeDropdownRef.current && !timeDropdownRef.current.contains(e.target)) {
        setIsTimeDropdownOpen(false);
      }
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

  // Greeting
  const [greeting, setGreeting] = useState("");
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  const customerData = {
    daily: [
      { time: "6am", value: 20 },
      { time: "9am", value: 55 },
      { time: "12pm", value: 65 },
      { time: "3pm", value: 90 },
      { time: "6pm", value: 78 },
      { time: "9pm", value: 60 },
      { time: "12am", value: 55 },
      { time: "3am", value: 10 },
    ],
    weekly: [
      { time: "Mon", value: 80 },
      { time: "Tue", value: 120 },
      { time: "Wed", value: 150 },
      { time: "Thu", value: 130 },
      { time: "Fri", value: 180 },
      { time: "Sat", value: 200 },
      { time: "Sun", value: 160 },
    ],
    monthly: [
      { time: "Jan", value: 300 },
      { time: "Feb", value: 350 },
      { time: "Mar", value: 400 },
      { time: "Apr", value: 380 },
      { time: "May", value: 450 },
      { time: "Jun", value: 500 },
      { time: "Jul", value: 480 },
      { time: "Aug", value: 520 },
      { time: "Sep", value: 490 },
      { time: "Oct", value: 550 },
      { time: "Nov", value: 600 },
      { time: "Dec", value: 580 },
    ],
    yearly: [
      { time: "2021", value: 1200 },
      { time: "2022", value: 1500 },
      { time: "2023", value: 1800 },
      { time: "2024", value: 2000 },
      { time: "2025", value: 2200 },
    ],
  };

  const getCurrentData = () => {
    if (activeTab === "items") return CHART_ITEM_DATA;
    else return customerData[timeRange] || customerData.daily;
  };

  const currentData = getCurrentData();
  const chartTitle =
    activeTab === "items"
      ? "Trend of Items over Time"
      : `Trend of Customers with ${timeRange}`;

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    if (isMobile) setIsSidebarOpen(false);
  };

  const handleSidebarChange = (id) => {
    const paths = {
      dashboard: "/dashboard",
      inventory: "/inventory",
      analytics: "/analytics",
      trends: "/trends",
      adjustments: "/adjustments",
      overheads: "/overheads",
      events: "/events",
      offers: "/offers",
      orders: "/orders",
      messages: "/messages",
      accounts: "/accounts",
      vouchers: "/settings/vouchers",
      delivery: "/settings/deliverysettings",
      subscription: "/settings/subscription",
      "vendor-dashboard": "/settings/vendor-dashboard",
      "help-center": "/settings/help-center",
    };

    if (paths[id]) {
      router.visit(paths[id], {
        preserveScroll: true,
        preserveState: true,
      });
    }

    if (isMobile) {
      closeSidebar();
    }
  };

  // ===== Date States =====
  const [fromDate, setFromDate] = useState("2025-11-11");
  const [toDate, setToDate] = useState("2025-12-11");

  // ===== Table Data =====
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

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#161c2b]">
      <div className="shrink-0">
        <Header
          isMobile={isMobile}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={toggleSidebar}
        />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          active="trends"
          onChange={handleSidebarChange}
          isMobile={isMobile}
          mobileOpen={isMobile ? isSidebarOpen : true}
          onCloseMobile={closeSidebar}
        />

        <main
          className={`flex-1 overflow-y-auto p-6 transition-all duration-300 ${isMobile ? "ml-0" : "ml-64"}`}
          style={{ marginTop: "99px" }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <h2 className="text-2xl font-medium">
              {activeTab === "customers"
                ? "Trending Customer"
                : "Trending Items"}
            </h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("items")}
                className={`px-4 py-2 w-29 h-12 rounded-lg text-xl font-medium transition ${activeTab === "items"
                  ? "bg-[#6f9c3d] text-white"
                  : "bg-gray-300 text-gray-700 border border-gray-300 hover:bg-gray-200"
                  }`}
              >
                Items
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("customers")}
                className={`px-4 py-2 w-42 h-12 rounded-lg text-xl font-medium transition ${activeTab === "customers"
                  ? "bg-[#6f9c3d] text-white"
                  : "bg-gray-300 text-gray-700 border border-gray-300 hover:bg-gray-200"
                  }`}
              >
                Customers
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            {/* Chart Header Row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-xl sm:text-2xl font-medium text-gray-800 truncate">
                  {chartTitle}
                </h3>
              </div>

              {/* Filters */}
              {activeTab === "items" && (
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <DateInput
                    label="From"
                    value={fromDate}
                    onChange={setFromDate}
                    className="w-full sm:w-auto"
                  />
                  <DateInput
                    label="To"
                    value={toDate}
                    onChange={setToDate}
                    className="w-full sm:w-auto"
                  />
                  <div className="relative" ref={timeDropdownRef} style={{ width: "100%", maxWidth: "176px" }}>
                    <button
                      type="button"
                      onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
                      className="flex items-center justify-between w-full md:w-44 h-12 px-4 py-3 border-2 border-gray-300 rounded-xl text-base bg-white hover:bg-gray-50 focus:outline-none font-medium"
                    >
                      <span className="truncate">
                        {timeRange.charAt(0).toUpperCase() + timeRange.slice(1)}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`text-gray-500 transition-transform ${isTimeDropdownOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {isTimeDropdownOpen && (
                      <div
                        className="absolute right-0 mt-1 w-full bg-white border-2 border-gray-300 rounded-xl shadow-lg z-10 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {["daily", "weekly", "monthly", "yearly"].map((range, index, arr) => (
                          <button
                            key={range}
                            type="button"
                            onClick={() => {
                              setTimeRange(range);
                              setIsTimeDropdownOpen(false);
                            }}
                            className={`block w-full text-left px-4 py-3 text-base font-normal ${timeRange === range
                              ? "bg-[#f0f7ed] text-[#161c2b]"
                              : "bg-white text-gray-700 hover:bg-gray-50"
                              } ${index !== arr.length - 1 ? "border-b border-gray-300" : ""}`}
                          >
                            {range.charAt(0).toUpperCase() + range.slice(1)}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "customers" && (
                <div className="relative" ref={timeDropdownRef} style={{ width: "100%", maxWidth: "160px" }}>
                  <button
                    type="button"
                    onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
                    className="flex items-center justify-between w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-xl bg-white hover:bg-gray-50 focus:outline-none font-medium"
                  >
                    <span className="truncate">
                      {timeRange.charAt(0).toUpperCase() + timeRange.slice(1)}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`text-gray-500 transition-transform ${isTimeDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isTimeDropdownOpen && (
                    <div
                      className="absolute right-0 mt-1 w-full bg-white border-2 border-gray-300 rounded-xl shadow-lg z-10 overflow-hidden"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {["daily", "weekly", "monthly", "yearly"].map((range, index, arr) => (
                        <button
                          key={range}
                          type="button"
                          onClick={() => {
                            setTimeRange(range);
                            setIsTimeDropdownOpen(false);
                          }}
                          className={`block w-full text-left px-4 py-3 text-base font-normal ${timeRange === range
                            ? "bg-[#f0f7ed] text-[#161c2b]"
                            : "bg-white text-gray-700 hover:bg-gray-50"
                            } ${index !== arr.length - 1 ? "border-b border-gray-300" : ""}`}
                        >
                          {range.charAt(0).toUpperCase() + range.slice(1)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={currentData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey={activeTab === "items" ? "name" : "time"}
                    tick={activeTab === "items" ? false : { fontSize: 16, fill: "#666", fontWeight: "500" }}
                    tickLine={false}
                    axisLine={false}
                    interval={0}
                    padding={{ left: 10, right: 10 }}
                  />
                  <YAxis
                    domain={[0, "auto"]}
                    tick={{ fontSize: 16, fill: "#666", fontWeight: "500" }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    formatter={(value) => [
                      `${value} ${activeTab === "customers" ? "customers" : "items"}`,
                      "",
                    ]}
                    labelFormatter={(label) => `${label}`}
                  />
                  {activeTab === "items" ? (
                    <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={50}>
                      {currentData.map((entry, index) => {
                        const colorMap = {
                          "beauty soap": "#FFACAC",
                          "fresh milk": "#158FFB",
                          "washing powder": "#AE15FB",
                          "basmati rice": "#FB15DC",
                          "floor cleaning detergent": "#FFBB97",
                          "face wash": "#C6D6BF",
                          "toothpaste": "#F9E2B1",
                        };
                        const normalized = String(entry.name || "").toLowerCase().trim();
                        const fill = colorMap[normalized] || "#6f9c3d";
                        return <Cell key={`cell-${index}`} fill={fill} />;
                      })}
                    </Bar>
                  ) : (
                    <Bar
                      dataKey="value"
                      fill="#6f9c3d"
                      radius={[4, 4, 0, 0]}
                      barSize={50}
                    />
                  )}
                </BarChart>
              </ResponsiveContainer>
            </div>

            {activeTab === "items" && (
              <div className="mt-4 flex flex-wrap gap-7 ml-28">
                {[
                  { label: "Beauty Soap", color: "#FFACAC" },
                  { label: "Fresh Milk", color: "#158FFB" },
                  { label: "Washing Powder", color: "#AE15FB" },
                  { label: "Basmati Rice", color: "#FB15DC" },
                  { label: "Floor Cleaning detergent", color: "#FFBB97" },
                  { label: "Face Wash", color: "#C6D6BF" },
                  { label: "Toothpaste", color: "#F9E2B1" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-sm">
                    <span
                      className="inline-block w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {activeTab === "items" && (
            <div className="mt-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <h2 className="text-2xl font-medium">
                  Top Trending Products (Based on sales performance)
                </h2>
                <div className="flex flex-col sm:flex-row gap-2">
                  {/* ✅ ITEM NAME FILTER */}
                  <div className="relative" ref={itemFilterRef}>
                    <button
                      type="button"
                      onClick={() => setIsItemFilterOpen(!isItemFilterOpen)}
                      className="w-44 h-12 px-3 py-2.5 pr-10 text-base text-left border-2 border-gray-300 rounded-xl bg-white outline-none"
                    >
                      {itemFilter === "All" ? "Item Name" : itemFilter}
                      <ChevronDown
                        size={18}
                        className={`absolute left-37 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none transition-transform ${isItemFilterOpen ? "rotate-180" : ""
                          }`}
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
                          { value: "Lipglose", label: "Lipglose" }
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

                  {/* ✅ TOP SELLING FILTER */}
                  <div className="relative" ref={topSellingFilterRef}>
                    <button
                      type="button"
                      onClick={() => setIsTopSellingFilterOpen(!isTopSellingFilterOpen)}
                      className="w-44 h-12 px-3 py-2.5 pr-10 text-base text-left border-2 border-gray-300 rounded-xl bg-white outline-none"
                    >
                      {topSellingFilter}
                      <ChevronDown
                        size={18}
                        className={`absolute left-37 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none transition-transform ${isTopSellingFilterOpen ? "rotate-180" : ""
                          }`}
                      />
                    </button>

                    {isTopSellingFilterOpen && (
                      <div
                        className="absolute z-10 mt-1 w-full bg-white border-2 border-gray-300 rounded-xl shadow-lg overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {[
                          { value: "By Item", label: "By Item" },
                          { value: "Top Selling", label: "Top Selling" }
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

              {/*TABLE */}
              <div className="overflow-x-auto mt-6">
                <div className="min-w-[950px]">
                  {/* Table Header */}
                  <div className="rounded-xl bg-[#6f9c3d4f] p-4">
                    <div className="grid grid-cols-10 text-lg font-medium text-[#3a3e47]" style={{ fontFamily: "'Inter', sans-serif" }}>
                      <div className="text-center py-2 truncate">Main Category</div>
                      <div className="text-center py-2 truncate">Sub Category</div>
                      <div className="text-center py-2 truncate">Code</div>
                      <div className="text-center py-2 truncate">Product Name</div>
                      <div className="text-center py-2 truncate">BP</div>
                      <div className="text-center py-2 truncate">SP</div>
                      <div className="text-center py-2 truncate">Quantity</div>
                      <div className="text-center py-2 truncate">Sold out</div>
                      <div className="text-center py-2 truncate">In stock</div>
                      <div className="text-center py-2 truncate">Image</div>
                    </div>
                  </div>

                  {/* Table Rows */}
                  <div className="mt-3 space-y-3">
                    {tableData.length === 0 ? (
                      <div className="rounded-xl bg-white p-4 text-center text-sm text-gray-600">
                        No sales data found.
                      </div>
                    ) : (
                      tableData.map((row, idx) => (
                        <div
                          key={idx}
                          className="rounded-xl bg-[#f7f7f7] p-4 shadow-sm ring-1 ring-black/5 transition-all hover:bg-[#f3f3f3]"
                        >
                          <div className="grid grid-cols-10 gap-2 items-center text-lg font-normal" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                            {/* Main Category */}
                            <div className="text-center py-2 truncate">{row.main}</div>
                            {/* Sub Category */}
                            <div className="text-center py-2 truncate">{row.sub}</div>
                            {/* Code */}
                            <div className="text-center py-2 truncate">{row.code}</div>
                            {/* Product Name */}
                            <div className="text-center py-2 truncate">{row.name}</div>
                            {/* BP */}
                            <div className="text-center py-2 truncate">{row.bp}</div>
                            {/* SP */}
                            <div className="text-center py-2 truncate">{row.sp}</div>
                            {/* Quantity */}
                            <div className="text-center py-2 truncate">{row.quantity}</div>
                            {/* Sold out */}
                            <div className="text-center py-2 truncate">{row.soldOut}</div>
                            {/* In stock */}
                            <div className="text-center py-2 truncate">{row.inStock}</div>
                            {/* Image */}
                            <div className="text-center py-2 flex justify-center">
                              <img src={row.image} alt="Product" className="h-6 w-6 rounded-full" />
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default TrendsPage;