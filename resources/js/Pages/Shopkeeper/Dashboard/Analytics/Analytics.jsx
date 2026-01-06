import React, { useEffect, useMemo, useState } from "react";
import { FaFileExcel, FaFilePdf } from "react-icons/fa";
import DateInput from "@/Components/Admin/DateInput";
import AnalyticsGraph from "./AnalyticsGraph";
import AnalyticsTable from "./AnalyticsTable";

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
  const [graphFromDate, setGraphFromDate] = useState("2025-01-01");
  const [graphToDate, setGraphToDate] = useState("2025-12-31");
  const [tableFromDate, setTableFromDate] = useState("2025-11-11");
  const [tableToDate, setTableToDate] = useState("2025-12-11");

  const [frequency, setFrequency] = useState("hourly");
  const [selectedSeries, setSelectedSeries] = useState(new Set([
    "today", "hourly1", "hourly2", "items", "total"
  ]));
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

  const productsData = useMemo(() => {
    const cats = ["Beauty", "Cleaning", "Food", "Beverage"];
    const subCats = ["Skin care", "General", "Personal care", "Household"];
    const products = ["Soap", "Face powder", "Lipstick", "Base", "Shampoo", "Lotion"];
    return Array.from({ length: 24 }).map((_, idx) => ({
      date: new Date(2025, idx % 12, 15),
      main: cats[idx % cats.length],
      sub: subCats[idx % subCats.length],
      code: String(12245 + idx),
      name: products[idx % products.length],
      sold: 200 + (idx * 13) % 300,
      amount: 290 + (idx * 17) % 500,
      orders: 1890 + (idx * 23) % 2000,
      discount: (idx % 10) + "%",
      profit: (20 + (idx % 60)) + "%",
    }));
  }, []);

  const topProducts = useMemo(() => {
    const start = new Date(tableFromDate);
    const end = new Date(tableToDate);
    return productsData
      .filter(p => p.date >= start && p.date <= end)
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10);
  }, [productsData, tableFromDate, tableToDate]);

  const handleExportPDF = () => console.log("Export PDF");
  const handleExportExcel = () => console.log("Export Excel");

  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Analytics Overview</h1>
          <p className="text-sm sm:text-base text-gray-600">Track sales, orders, and performance metrics</p>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={handleExportPDF} className="hover:scale-110 transition-transform">
            <FaFilePdf className="w-8 h-8 text-red-600 hover:text-red-700" />
          </button>
          <button onClick={handleExportExcel} className="hover:scale-110 transition-transform">
            <FaFileExcel className="h-8 w-8 text-green-600 hover:text-green-700" />
          </button>
        </div>
      </div>

      {/* Graph Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h2 className="text-xl font-medium">Sales & Orders Trends</h2>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <DateInput label="From" value={graphFromDate} onChange={setGraphFromDate} />
          <DateInput label="To" value={graphToDate} onChange={setGraphToDate} />
        </div>
      </div>

      <AnalyticsGraph
        data={baseData}
        frequency={frequency}
        onFrequencyChange={setFrequency}
        selectedSeries={selectedSeries}
        onSeriesChange={setSelectedSeries}
      />

      {/* Table Section */}
      <div className="mt-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div className="text-xl font-medium">Top 10 Products Sales Details</div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <DateInput label="From" value={tableFromDate} onChange={setTableFromDate} />
            <DateInput label="To" value={tableToDate} onChange={setTableToDate} />
          </div>
        </div>

        <AnalyticsTable
          items={topProducts}
          fromDate={tableFromDate}
          toDate={tableToDate}
          loading={false}
        />
      </div>
    </>
  );
};

export default Analytics;