import React, { useEffect, useMemo, useState, useRef } from "react";
import { ChevronDown } from "lucide-react";

const SERIES = [
  { key: "today", label: "Orders", color: "#ef5484" },
  { key: "hourly1", label: "Sales Graph hourly", color: "#4285f4" },
  { key: "hourly2", label: "No. of orders hourly", color: "#00bdd0" },
  { key: "items", label: "Items Sold mostly Quantity and amount sale graph", color: "#7cb342" },
  { key: "total", label: "Sales Total Price", color: "#ff8c00" }
];

const AnalyticsGraph = ({
  data,
  frequency,
  onFrequencyChange,
  selectedSeries,
  onSeriesChange,
}) => {
  const [isSeriesDropdownOpen, setIsSeriesDropdownOpen] = useState(false);
  const [isFrequencyDropdownOpen, setIsFrequencyDropdownOpen] = useState(false);
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, value: 0, series: "", month: "" });

  const frequencyDropdownRef = useRef(null);
  const seriesDropdownRef = useRef(null);

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

  // Close dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (frequencyDropdownRef.current && !frequencyDropdownRef.current.contains(e.target)) {
        setIsFrequencyDropdownOpen(false);
      }
      if (seriesDropdownRef.current && !seriesDropdownRef.current.contains(e.target)) {
        setIsSeriesDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const generateSmoothPath = (points) => {
    if (points.length < 2) return "";
    let path = `M${points[0].x},${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const cp1x = prev.x + (curr.x - prev.x) / 3;
      const cp1y = prev.y;
      const cp2x = curr.x - (curr.x - prev.x) / 3;
      const cp2y = curr.y;
      path += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${curr.x},${curr.y}`;
    }
    return path;
  };

  const padding = 32;
  const maxY = 100;
  const xStep = (graphWidth - padding * 2) / Math.max(1, data.length - 1);
  const yScale = (v) => graphHeight - padding - (v / maxY) * (graphHeight - padding * 2);

  return (
    <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-6 shadow-md">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2 mb-4">
        {/* Frequency Dropdown */}
        <div className="relative" ref={frequencyDropdownRef}>
          <button
            type="button"
            className="flex items-center justify-between px-3 py-1.5 text-base font-normal border-2 border-gray-300 rounded-xl shadow-sm bg-white outline-none w-60 h-12"
            onClick={() => setIsFrequencyDropdownOpen(!isFrequencyDropdownOpen)}
          >
            {frequency === "hourly"
              ? "Select frequency Hourly"
              : frequency.charAt(0).toUpperCase() + frequency.slice(1)}
            <ChevronDown
              size={18}
              className={`text-gray-500 pointer-events-none transition-transform ${isFrequencyDropdownOpen ? "rotate-180" : ""}`}
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
                    onFrequencyChange(option.value);
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
            className="flex items-center justify-between px-3 py-1.5 text-base font-normal border-2 border-gray-300 rounded-xl shadow-sm bg-white outline-none w-60 h-12"
          >
            <span>Select from dropdown</span>
            <ChevronDown 
              size={18}
              className={`text-gray-500 pointer-events-none transition-transform ${isSeriesDropdownOpen ? "rotate-180" : ""}`}
            />
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
                      if (e.target.checked) newSet.add(s.key);
                      else newSet.delete(s.key);
                      onSeriesChange(newSet);
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

      {/* SVG Graph */}
      <div className="overflow-x-auto">
        <div style={{ position: 'relative' }}>
          <svg
            viewBox={`0 0 ${graphWidth} ${graphHeight}`}
            className="w-full h-auto"
            style={{ maxWidth: "100%", height: "auto" }}
            onClick={() => setTooltip({ visible: false })}
          >
            <rect x="0" y="0" width={graphWidth} height={graphHeight} fill="#fafafa" rx="8" />
            {[0, 20, 40, 60, 80, 100].map((y) => (
              <line key={`grid-${y}`} x1={padding} y1={yScale(y)} x2={graphWidth - padding} y2={yScale(y)} stroke="#e5e7eb" strokeWidth="1" />
            ))}
            <line x1={padding} y1={padding} x2={padding} y2={graphHeight - padding} stroke="#d1d5db" strokeWidth="2" />
            <line x1={padding} y1={graphHeight - padding} x2={graphWidth - padding} y2={graphHeight - padding} stroke="#d1d5db" strokeWidth="2" />

            {SERIES.map((s) => {
              if (!selectedSeries.has(s.key)) return null;
              const pathData = data.map((row, i) => ({
                x: padding + i * xStep,
                y: yScale(row[s.key])
              }));
              const smoothPath = generateSmoothPath(pathData);
              return (
                <g key={s.key}>
                  <path d={smoothPath} fill="none" stroke={s.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  {pathData.map((point, i) => (
                    <circle
                      key={`point-${s.key}-${i}`}
                      cx={point.x}
                      cy={point.y}
                      r="4"
                      fill={s.color}
                      stroke="white"
                      strokeWidth="2"
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        const month = data[i].month;
                        const value = data[i][s.key];
                        const seriesLabel = s.label;
                        const tooltipY = point.y < 60 ? point.y + 20 : point.y - 60;
                        setTooltip({
                          visible: true,
                          x: point.x,
                          y: tooltipY,
                          value,
                          series: seriesLabel,
                          month,
                          flip: point.y < 60
                        });
                      }}
                    />
                  ))}
                </g>
              );
            })}

            {data.map((row, i) => (
              <text key={`xlab-${i}`} x={padding + i * xStep} y={graphHeight - padding + 16} fontSize="10" textAnchor="middle" fill="#000">
                {row.month}
              </text>
            ))}
            {[0, 20, 40, 60, 80, 100].map((y) => (
              <text key={`ylab-${y}`} x={padding - 8} y={yScale(y) + 4} fill="#6b7280" fontSize="12" textAnchor="end" fontWeight="500">
                {y}
              </text>
            ))}
          </svg>

          {/* Tooltip */}
          {tooltip.visible && (
            <div
              className="absolute bg-white rounded-lg p-2 shadow-md pointer-events-none z-10"
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

      {/* Legend */}
      <div className="ml-7 mt-4 pt-3 flex flex-wrap gap-8 text-xs sm:text-sm">
        {SERIES.filter(s => selectedSeries.has(s.key)).map((s) => (
          <div key={s.key} className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-full border border-white" style={{ backgroundColor: s.color }} />
            <span className="text-gray-700 font-medium text-wrap">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsGraph;