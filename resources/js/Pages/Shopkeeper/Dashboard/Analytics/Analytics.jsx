import React, { useEffect, useMemo, useState } from "react";
import DateInput from "@/Components/Admin/DateInput";
import AnalyticsGraph from "./AnalyticsGraph";
import AnalyticsTable from "./AnalyticsTable";
import Pagination from "@/Components/Pagination"; // 👈 Import Pagination

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

  // ✅ Pagination state for table
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Show 10 products per page

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

  // ✅ Filtered & sorted data
  const filteredProducts = useMemo(() => {
    const start = new Date(tableFromDate);
    const end = new Date(tableToDate);
    return productsData
      .filter(p => p.date >= start && p.date <= end)
      .sort((a, b) => b.sold - a.sold);
  }, [productsData, tableFromDate, tableToDate]);

  // ✅ Paginated data
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-[1099px]">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Analytics Overview</h1>
          <p className="text-sm sm:text-base text-gray-600">Track sales, orders, and performance metrics</p>
        </div>
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
          items={paginatedProducts}
          fromDate={tableFromDate}
          toDate={tableToDate}
          loading={false}
        />

        {/* ✅ Pagination — always visible when there's data */}
        {filteredProducts.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredProducts.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default Analytics;