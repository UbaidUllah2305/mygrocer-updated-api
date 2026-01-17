import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
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
import DateInput from "@/Components/Admin/DateInput";

const CHART_ITEM_DATA = [
  { name: "Beauty Soap", value: 25 },
  { name: "Fresh Milk", value: 60 },
  { name: "Washing Powder", value: 55 },
  { name: "Basmati Rice", value: 85 },
  { name: "Floor Cleaning detergent", value: 75 },
  { name: "Face Wash", value: 70 },
  { name: "Toothpaste", value: 80 },
];

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

const TrendsChart = ({
  activeTab,
  onTabChange,
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
}) => {
  const [timeRange, setTimeRange] = useState("daily");
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
  const timeDropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (timeDropdownRef.current && !timeDropdownRef.current.contains(e.target)) {
        setIsTimeDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getCurrentData = () => {
    if (activeTab === "items") return CHART_ITEM_DATA;
    return customerData[timeRange] || customerData.daily;
  };

  const currentData = getCurrentData();
  const chartTitle =
    activeTab === "items"
      ? "Trend of Items over Time"
      : `Trend of Customers (${timeRange})`;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm w-full">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h3 className="text-xl sm:text-2xl font-medium text-gray-800">
          {chartTitle}
        </h3>

        {/* Filters */}
        {activeTab === "items" && (
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <DateInput label="From" value={fromDate} onChange={onFromDateChange} />
            <DateInput label="To" value={toDate} onChange={onToDateChange} />
            <div className="relative max-w-xs w-full" ref={timeDropdownRef}>
              <button
                type="button"
                onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
                className="flex items-center justify-between w-48 h-12 px-4 py-3 border-2 border-gray-300 rounded-xl text-base bg-white"
              >
                <span>{timeRange.charAt(0).toUpperCase() + timeRange.slice(1)}</span>
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
          <div className="relative max-w-xs w-full" ref={timeDropdownRef}>
            <button
              type="button"
              onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
              className="flex items-center justify-between w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-xl bg-white"
            >
              <span>{timeRange.charAt(0).toUpperCase() + timeRange.slice(1)}</span>
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

      {/* Chart */}
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

      {/* Legend for Items */}
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
  );
};

export default TrendsChart;