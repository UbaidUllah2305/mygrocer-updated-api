import React, { useEffect, useMemo, useState, useRef } from "react";
import Header from "../../Components/Admin/Header";
import Sidebar from "../../Components/Admin/Sidebar";
import { router } from "@inertiajs/react";
import DateInput from "../../Components/Admin/DateInput";
import { ChevronDown } from "lucide-react";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const SERIES = [
  { key: "today", label: "Orders", color: "#ef5484" },
  { key: "hourly1", label: "Sales Graph hourly", color: "#4285f4" },
  { key: "hourly2", label: "No. of orders hourly", color: "#00bdd0" },
  { key: "items", label: "Items Sold mostly Quantity and amount sale graph", color: "#7cb342" },
  { key: "total", label: "Sales Total Price", color: "#ff8c00" }
];

const baseData = [
  { month: "Jan", today: 25, hourly1: 22, hourly2: 15, items: 28, total: 5 },
  { month: "Feb", today: 20, hourly1: 32, hourly2: 48, items: 45, total: 80 },
  { month: "Mar", today: 22, hourly1: 42, hourly2: 48, items: 62, total: 100 },
  { month: "Apr", today: 18, hourly1: 40, hourly2: 25, items: 68, total: 60 },
  { month: "May", today: 32, hourly1: 28, hourly2: 18, items: 55, total: 35 },
  { month: "Jun", today: 35, hourly1: 20, hourly2: 32, items: 38, total: 10 },
  { month: "Jul", today: 32, hourly1: 18, hourly2: 52, items: 18, total: 5 },
  { month: "Aug", today: 22, hourly1: 22, hourly2: 70, items: 10, total: 10 },
  { month: "Sep", today: 15, hourly1: 28, hourly2: 78, items: 25, total: 40 },
  { month: "Oct", today: 12, hourly1: 25, hourly2: 65, items: 32, total: 58 },
  { month: "Nov", today: 10, hourly1: 18, hourly2: 45, items: 18, total: 70 },
  { month: "Dec", today: 12, hourly1: 5, hourly2: 30, items: 12, total: 88 }
];

const Analytics = () => {
  const [active, setActive] = useState("analytics");
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [graphFromDate, setGraphFromDate] = useState("2025-01-01");
  const [graphToDate, setGraphToDate] = useState("2025-12-31");
  const [tableFromDate, setTableFromDate] = useState("2025-11-11");
  const [tableToDate, setTableToDate] = useState("2025-12-11");

  // Graph filter state
  const [frequency, setFrequency] = useState("hourly");
  const [selectedSeries, setSelectedSeries] = useState(new Set(SERIES.map(s => s.key)));
  const [isSeriesDropdownOpen, setIsSeriesDropdownOpen] = useState(false);
  const [isFrequencyDropdownOpen, setIsFrequencyDropdownOpen] = useState(false);

  // Refs for dropdowns
  const frequencyDropdownRef = useRef(null);
  const seriesDropdownRef = useRef(null);
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, value: 0, series: "", month: "" });

  const generateSmoothPath = (points) => {
    if (points.length < 2) return "";

    let path = `M${points[0].x},${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const next = i < points.length - 1 ? points[i + 1] : curr;

      // Control points for cubic Bezier (more accurate than quadratic)
      const cp1x = prev.x + (curr.x - prev.x) / 3;
      const cp1y = prev.y;
      const cp2x = curr.x - (curr.x - prev.x) / 3;
      const cp2y = curr.y;

      path += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${curr.x},${curr.y}`;
    }

    return path;
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        frequencyDropdownRef.current &&
        !frequencyDropdownRef.current.contains(e.target)
      ) {
        setIsFrequencyDropdownOpen(false);
      }
      if (
        seriesDropdownRef.current &&
        !seriesDropdownRef.current.contains(e.target)
      ) {
        setIsSeriesDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setIsSidebarOpen(true);
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

  const graphData = useMemo(() => baseData, []);
  const filteredData = graphData;

  const productsData = useMemo(() => {
    const cats = ["Beauty", "Cleaning", "Food", "Beverage"];
    const subCats = ["Skin care", "General", "Personal care", "Household"];
    const products = ["Soap", "Face powder", "Lipstick", "Base", "Shampoo", "Lotion"];
    return Array.from({ length: 24 }).map((_, idx) => {
      const month = idx % 12;
      return {
        date: new Date(2025, month, 15),
        main: cats[idx % cats.length],
        sub: subCats[idx % subCats.length],
        code: String(12245 + idx),
        name: products[idx % products.length],
        sold: 200 + (idx * 13) % 300,
        amount: 290 + (idx * 17) % 500,
        orders: 1890 + (idx * 23) % 2000,
        discount: (idx % 10) + "%",
        profit: (20 + (idx % 60)) + "%",
      };
    });
  }, []);

  const topProducts = useMemo(() => {
    const start = new Date(tableFromDate);
    const end = new Date(tableToDate);
    const withinRange = productsData.filter(p => p.date >= start && p.date <= end);
    return withinRange
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10);
  }, [productsData, tableFromDate, tableToDate]);

  const [graphWidth, setGraphWidth] = useState(920);
  const [graphHeight, setGraphHeight] = useState(280);

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth > 768 ? 920 : window.innerWidth - 40;
      const height = window.innerWidth > 768 ? 280 : 200;
      setGraphWidth(width);
      setGraphHeight(height);
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const padding = 32;
  const maxY = 100;
  const xStep = (graphWidth - padding * 2) / Math.max(1, filteredData.length - 1);
  const yScale = (v) => graphHeight - padding - (v / maxY) * (graphHeight - padding * 2);

  const pathFor = (key, color) => {
    if (!selectedSeries.has(key) || filteredData.length === 0) return null;
    return (
      <path
        key={key}
        d={filteredData
          .map((row, i) => {
            const x = padding + i * xStep;
            const y = yScale(row[key]);
            return `${i === 0 ? "M" : "L"}${x},${y}`;
          })
          .join(" ")}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    );
  };

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
          active={active}
          onChange={handleSidebarChange}
          isMobile={isMobile}
          mobileOpen={isMobile ? isSidebarOpen : true}
          onCloseMobile={closeSidebar}
        />

        <main
          className={`flex-1 overflow-y-auto p-6 transition-all duration-300 ${isMobile ? "ml-0" : "ml-64"}`}
          style={{ marginTop: "99px" }}
        >
          {/* DATE FILTERS */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-medium">Analytics Overview</h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <DateInput
                label="From"
                value={graphFromDate}
                onChange={setGraphFromDate}
              />
              <DateInput
                label="To"
                value={graphToDate}
                onChange={setGraphToDate}
              />
            </div>
          </div>

          {/* GRAPH SECTION */}
          <div className="mt-4 rounded-xl border border-gray-200 bg-linear-to-br from-gray-50 to-white p-6 shadow-md">
            {/* ✅ CUSTOM FILTER DROPDOWNS */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2 mb-4">
              {/* Frequency Dropdown */}
              <div className="relative" ref={frequencyDropdownRef}>
                <button
                  type="button"
                  className="w-60 h-12 px-3 py-2.5 pr-10 text-base text-left border-2 border-gray-300 rounded-xl bg-white outline-none"
                  onClick={() => setIsFrequencyDropdownOpen(!isFrequencyDropdownOpen)}
                >
                  {frequency === "hourly"
                    ? "Select frequency Hourly"
                    : frequency.charAt(0).toUpperCase() + frequency.slice(1)}
                  <ChevronDown
                    size={18}
                    className={`absolute left-52 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none transition-transform ${isFrequencyDropdownOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {isFrequencyDropdownOpen && (
                  <div
                    className="absolute z-10 mt-1 w-full bg-white border-2 border-gray-300 rounded-xl shadow-lg overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {[
                      { value: "hourly", label: "Select frequency Hourly" },
                      { value: "daily", label: "Daily" },
                      { value: "weekly", label: "Weekly" },
                      { value: "monthly", label: "Monthly" }
                    ].map((option, index, arr) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                          setFrequency(option.value);
                          setIsFrequencyDropdownOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-3 text-base font-normal ${frequency === option.value
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

              {/* Series Dropdown */}
              <div className="relative" ref={seriesDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsSeriesDropdownOpen(!isSeriesDropdownOpen)}
                  className="flex items-center justify-between px-3 py-1.5 text-base font-normal border-2 border-gray-300 rounded-xl shadow-sm bg-white outline-none w-60 h-12 min-w-[140px]"
                >
                  <span>Select from dropdown</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${isSeriesDropdownOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isSeriesDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {SERIES.map((s) => (
                      <label
                        key={s.key}
                        className="flex items-center px-3 py-1.5 cursor-pointer hover:bg-gray-50"
                      >
                        <input
                          type="checkbox"
                          checked={selectedSeries.has(s.key)}
                          onChange={(e) => {
                            const newSet = new Set(selectedSeries);
                            if (e.target.checked) {
                              newSet.add(s.key);
                            } else {
                              newSet.delete(s.key);
                            }
                            setSelectedSeries(newSet);
                          }}
                          className="mr-2 h-4 w-4 text-[#6F9C3D] border-gray-300 rounded focus:ring-[#6F9C3D]"
                        />
                        <span className="text-sm">{s.label}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Tooltip */}
            <div className="overflow-x-auto">
              <div style={{ position: 'relative' }}>
                <svg
                  viewBox={`0 0 ${graphWidth} ${graphHeight}`}
                  className="w-full h-auto"
                  style={{ maxWidth: "100%", height: "auto" }}
                  // Close tooltip when clicking on graph background
                  onClick={() => setTooltip({ visible: false })}
                >
                  {/* Background */}
                  <rect x="0" y="0" width={graphWidth} height={graphHeight} fill="#fafafa" rx="8" />

                  {/* Grid Lines */}
                  {[0, 20, 40, 60, 80, 100].map((y) => (
                    <line
                      key={`grid-${y}`}
                      x1={padding}
                      y1={yScale(y)}
                      x2={graphWidth - padding}
                      y2={yScale(y)}
                      stroke="#e5e7eb"
                      strokeWidth="1"
                    />
                  ))}

                  {/* Axes */}
                  <line x1={padding} y1={padding} x2={padding} y2={graphHeight - padding} stroke="#d1d5db" strokeWidth="2" />
                  <line x1={padding} y1={graphHeight - padding} x2={graphWidth - padding} y2={graphHeight - padding} stroke="#d1d5db" strokeWidth="2" />

                  {/* Draw Smooth Paths + Points */}
                  {SERIES.map((s) => {
                    if (!selectedSeries.has(s.key)) return null;

                    const pathData = filteredData.map((row, i) => ({
                      x: padding + i * xStep,
                      y: yScale(row[s.key])
                    }));

                    const smoothPath = generateSmoothPath(pathData);

                    return (
                      <g key={s.key}>
                        {/* Smooth Line */}
                        <path
                          d={smoothPath}
                          fill="none"
                          stroke={s.color}
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        {/* Clickable Points */}
                        {pathData.map((point, i) => {
                          const actualX = point.x;
                          const actualY = point.y;

                          return (
                            <circle
                              key={`point-${s.key}-${i}`}
                              cx={actualX}
                              cy={actualY}
                              r="4"
                              fill={s.color}
                              stroke="white"
                              strokeWidth="2"
                              className="cursor-pointer"
                              // ✅ CLICK TO SHOW TOOLTIP
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent closing immediately
                                const month = filteredData[i].month;
                                const value = filteredData[i][s.key];
                                const seriesLabel = s.label;

                                const tooltipY = actualY < 60 ? actualY + 20 : actualY - 60;

                                setTooltip({
                                  visible: true,
                                  x: actualX,
                                  y: tooltipY,
                                  value,
                                  series: seriesLabel,
                                  month,
                                  flip: actualY < 60
                                });
                              }}
                            />
                          );
                        })}
                      </g>
                    );
                  })}

                  {/* X-Axis Labels */}
                  {filteredData.map((row, i) => (
                    <text
                      key={`xlab-${i}`}
                      x={padding + i * xStep}
                      y={graphHeight - padding + 16}
                      fontSize="10"
                      textAnchor="middle"
                      fill="#000"
                      className="text-xs"
                    >
                      {row.month}
                    </text>
                  ))}

                  {/* Y-Axis Labels */}
                  {[0, 20, 40, 60, 80, 100].map((y) => (
                    <text
                      key={`ylab-${y}`}
                      x={padding - 8}
                      y={yScale(y) + 4}
                      fill="#6b7280"
                      fontSize="12"
                      textAnchor="end"
                      fontWeight="500"
                    >
                      {y}
                    </text>
                  ))}
                </svg>

                {/* ✅ TOOLTIP — appears on CLICK */}
                {tooltip.visible && (
                  <div
                    className={`absolute bg-white rounded-lg p-2 shadow-md pointer-events-none z-10 ${tooltip.flip ? 'transform translate-y-2' : 'transform -translate-y-2'}`}
                    style={{
                      left: `${tooltip.x}px`,
                      top: `${tooltip.y}px`,
                      transform: `translateX(-50%) ${tooltip.flip ? 'translateY(10px)' : 'translateY(-10px)'}`,
                    }}
                  >
                    <div className="text-xs font-medium text-[#6F9C3D]">{tooltip.series}</div>
                    <div className="text-sm font-medium text-[#3a3e47]">{tooltip.month}</div>
                    <div className="text-lg font-bold text-[#3a3e47]">{tooltip.value}</div>
                  </div>
                )}
              </div>
            </div>

            {/* LEGEND */}
            <div className=" ml-7 mt-4 pt-3 flex flex-wrap gap-8 text-xs sm:text-sm">
              {SERIES.filter(s => selectedSeries.has(s.key)).map((s) => (
                <div key={s.key} className="flex items-center gap-2">
                  <span
                    className="inline-block h-3 w-3 rounded-full border border-white"
                    style={{ backgroundColor: s.color }}
                  />
                  <span className="text-gray-700 font-medium whitespace-nowrap">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* TABLE SECTION */}
          <div className="mt-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <div className="text-xl font-medium">Top 10 Products Sales details</div>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <DateInput
                  label="From"
                  value={tableFromDate}
                  onChange={setTableFromDate}
                />
                <DateInput
                  label="To"
                  value={tableToDate}
                  onChange={setTableToDate}
                />
              </div>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">
              <div className="min-w-[1000px]">
                {/* Table Header */}
                <div className="rounded-xl bg-[#6f9c3d4f] p-4">
                  <div className="grid grid-cols-10 text-lg font-medium text-[#3a3e47]" style={{ fontFamily: "'Inter', sans-serif" }}>
                    <div className="text-center py-2 truncate">Main Category</div>
                    <div className="text-center py-2 truncate">Sub Category</div>
                    <div className="text-center py-2 truncate">Code</div>
                    <div className="text-center py-2 truncate">Product Name</div>
                    <div className="text-center py-2 truncate">Sold</div>
                    <div className="text-center py-2 truncate">Amount</div>
                    <div className="text-center py-2 truncate">Orders</div>
                    <div className="text-center py-2 truncate">Discount</div>
                    <div className="text-center py-2 truncate">Profit</div>
                    <div className="text-center py-2 truncate">Date Range</div>
                  </div>
                </div>

                {/* Table Rows */}
                <div className="mt-3 space-y-3">
                  {topProducts.length === 0 ? (
                    <div className="rounded-xl bg-white p-4 text-center text-sm text-gray-600">
                      No sales data found.
                    </div>
                  ) : (
                    topProducts.map((p, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl bg-[#f7f7f7] p-4 shadow-sm ring-1 ring-black/5 transition-all hover:bg-[#f3f3f3]"
                      >
                        <div className="grid grid-cols-10 gap-2 items-center text-lg font-normal" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                          <div className="text-center py-2 truncate">{p.main}</div>
                          <div className="text-center py-2 truncate">{p.sub}</div>
                          <div className="text-center py-2 truncate">{p.code}</div>
                          <div className="text-center py-2 truncate">{p.name}</div>
                          <div className="text-center py-2 truncate">{p.sold}</div>
                          <div className="text-center py-2 truncate">{p.amount}</div>
                          <div className="text-center py-2 truncate">{p.orders}</div>
                          <div className="text-center py-2 truncate">{p.discount}</div>
                          <div className="text-center py-2 truncate">{p.profit}</div>
                          <div className="text-center py-2 truncate">
                            <div className="text-sm">From: {tableFromDate.split('-').slice(1).join('-')}</div>
                            <div className="text-sm">To: {tableToDate.split('-').slice(1).join('-')}</div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div >
    </div >
  );
};

export default Analytics;