// src/Pages/Admin/OverheadsPage.jsx
import React, { useState, useEffect, useMemo, useRef } from "react";
import { FaFileExcel, FaFilePdf } from "react-icons/fa";
import { Plus, ChevronDown } from "lucide-react";
import axios from "axios";
import Pagination from "@/Components/Pagination";
import OverheadsTable from "./OverheadsTable";
import OverheadsModal from "./OverheadsModal";

const fallbackData = [
  { exp: "Shop Rent", amt: "1,300", date: "12/07/2025", payment: "Cash", status: "Paid", fre: "Monthly", receipt: "" },
  { exp: "Electricity Invoice", amt: "1,300", date: "12/08/2025", payment: "Cash", status: "Paid", fre: "Monthly", receipt: "" },
  { exp: "Water Invoice", amt: "1,300", date: "12/09/2025", payment: "Cash", status: "Paid", fre: "Monthly", receipt: "" },
  { exp: "Income Tax", amt: "1,300", date: "12/10/2025", payment: "Cash", status: "Paid", fre: "Monthly", receipt: "" },
  { exp: "Internet Invoice", amt: "1,300", date: "12/11/2025", payment: "Cash", status: "Paid", fre: "Monthly", receipt: "" },
  { exp: "Mobile Invoice", amt: "1,300", date: "12/12/2025", payment: "Cash", status: "Paid", fre: "Monthly", receipt: "" },
];

const OverheadsPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Filters
  const [selectedFilterValue, setSelectedFilterValue] = useState("All");
  const [selectedFrequency, setSelectedFrequency] = useState("Monthly");

  // Dropdown states
  const [isFilter1Open, setIsFilter1Open] = useState(false);
  const [isFilter2Open, setIsFilter2Open] = useState(false);

  // Modal
  const [modalMode, setModalMode] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  // Refs for dropdowns
  const filter1Ref = useRef(null);
  const filter2Ref = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filter1Ref.current && !filter1Ref.current.contains(e.target)) {
        setIsFilter1Open(false);
      }
      if (filter2Ref.current && !filter2Ref.current.contains(e.target)) {
        setIsFilter2Open(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch data
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");

    axios
      .get("/api/overheads", { signal: controller.signal })
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        setItems(data.length ? data : fallbackData);
      })
      .catch(() => {
        setItems(fallbackData);
        setError("Failed to load overheads. Showing demo data.");
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  // Filter logic
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (selectedFrequency !== "" && item.fre !== selectedFrequency) {
        return false;
      }

      if (selectedFilterValue !== "All") {
        const [day, month, year] = item.date.split("/");
        const date = new Date(`${year}-${month}-${day}`);

        switch (selectedFrequency) {
          case "Weekly":
            const start = new Date(date.getFullYear(), 0, 1);
            const week = Math.ceil(((date - start) / 86400000 + start.getDay() + 1) / 7);
            return selectedFilterValue === `Week ${week}`;
          case "Monthly":
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const monthName = months[date.getMonth()];
            return selectedFilterValue === monthName;
          case "Yearly":
            return selectedFilterValue === date.getFullYear().toString();
          default:
            return true;
        }
      }
      return true;
    });
  }, [items, selectedFrequency, selectedFilterValue]);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(start, start + itemsPerPage);
  }, [filteredItems, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Filter options based on frequency
  const getFirstFilterOptions = () => {
    switch (selectedFrequency) {
      case "Weekly":
        return ["All", ...Array.from({ length: 52 }, (_, i) => `Week ${i + 1}`)];
      case "Monthly":
        return ["All", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      case "Yearly":
        const currentYear = new Date().getFullYear();
        return ["All", `${currentYear - 1}`, `${currentYear}`, `${currentYear + 1}`, `${currentYear + 2}`];
      default:
        return ["All"];
    }
  };

  // Modal handlers
  const openAddModal = () => {
    setModalMode("add");
    setSelectedItem(null);
  };

  const openEditModal = (item) => {
    setModalMode("edit");
    setSelectedItem(item);
  };

  const closeModal = () => {
    setModalMode(null);
    setSelectedItem(null);
  };

  const handleCreate = (data) => {
    console.log("Create overhead:", data);
    closeModal();
  };

  const handleUpdate = (data) => {
    console.log("Update overhead:", data);
    closeModal();
  };

  const handleExportPDF = () => console.log("Export PDF");
  const handleExportExcel = () => console.log("Export Excel");

  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Overheads</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage your recurring expenses</p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleExportPDF}
            title="Export PDF"
            className="hover:scale-110 transition-transform"
          >
            <FaFilePdf className="w-8 h-8 text-red-600 hover:text-red-700" />
          </button>
          <button
            onClick={handleExportExcel}
            title="Export Excel"
            className="hover:scale-110 transition-transform"
          >
            <FaFileExcel className="h-8 w-8 text-green-600 hover:text-green-700" />
          </button>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 rounded-xl bg-[#6F9C3D] px-4 sm:px-6 py-2.5 text-sm sm:text-base font-medium text-white shadow-sm hover:bg-[#5d8a32] transition"
          >
            <Plus className="h-4 w-4" />
            <span>Add Overheads</span>
          </button>
        </div>
      </div>

      {/* Custom Filter Dropdowns */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full mb-6">
        {/* Filter 1: Dynamic Value */}
        <div className="relative w-full sm:w-44" ref={filter1Ref}>
          <button
            type="button"
            className="w-full h-12 px-3 py-2.5 pr-10 text-base text-left border-2 border-gray-300 rounded-xl bg-white outline-none"
            onClick={() => setIsFilter1Open(!isFilter1Open)}
          >
            {selectedFilterValue}
            <ChevronDown
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none transition-transform ${isFilter1Open ? "rotate-180" : ""}`}
              size={18}
            />
          </button>

          {isFilter1Open && (
            <div
              className="absolute right-0 mt-1 w-full bg-white border-2 border-gray-300 rounded-xl shadow-lg z-10 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {getFirstFilterOptions().map((option, index, arr) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setSelectedFilterValue(option);
                    setIsFilter1Open(false);
                  }}
                  className={`block w-full text-left px-4 py-3 text-base font-normal ${selectedFilterValue === option
                      ? "bg-[#f0f7ed] text-[#161c2b]"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                    } ${index !== arr.length - 1 ? "border-b border-gray-300" : ""}`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Filter 2: Frequency */}
        <div className="relative w-full sm:w-44" ref={filter2Ref}>
          <button
            type="button"
            className="w-full h-12 px-3 py-2.5 pr-10 text-base text-left border-2 border-gray-300 rounded-xl bg-white outline-none"
            onClick={() => setIsFilter2Open(!isFilter2Open)}
          >
            {selectedFrequency}
            <ChevronDown
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none transition-transform ${isFilter2Open ? "rotate-180" : ""}`}
              size={18}
            />
          </button>

          {isFilter2Open && (
            <div
              className="absolute right-0 mt-1 w-full bg-white border-2 border-gray-300 rounded-xl shadow-lg z-10 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {["Weekly", "Monthly", "Yearly"].map((freq, index, arr) => (
                <button
                  key={freq}
                  type="button"
                  onClick={() => {
                    setSelectedFrequency(freq);
                    setSelectedFilterValue("All");
                    setCurrentPage(1);
                    setIsFilter2Open(false);
                  }}
                  className={`block w-full text-left px-4 py-3 text-base font-normal ${selectedFrequency === freq
                      ? "bg-[#f0f7ed] text-[#161c2b]"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                    } ${index !== arr.length - 1 ? "border-b border-gray-300" : ""}`}
                >
                  {freq}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {/* Table */}
      <OverheadsTable
        items={paginatedItems}
        loading={loading}
        onEdit={openEditModal}
      />

      {/* Pagination */}
      {!loading && filteredItems.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredItems.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      )}

      {/* Modal */}
      {modalMode && (
        <OverheadsModal
          isOpen={true}
          mode={modalMode}
          item={selectedItem}
          onClose={closeModal}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
};

export default OverheadsPage;