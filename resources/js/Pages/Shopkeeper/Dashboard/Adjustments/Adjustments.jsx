import React, { useEffect, useMemo, useState } from "react";
import { router } from "@inertiajs/react";
import axios from "axios";
import AdjustmentsTable from "./AdjustmentsTable";
import AdjustmentsModal from "./AdjustmentsModal";
import Pagination from "@/Components/Pagination";
import { FaFileExcel, FaFilePdf } from "react-icons/fa";
import { Plus } from "lucide-react";

const fallbackData = [
  {
    main: "Beauty",
    sub: "Skin care",
    code: "12245",
    name: "Soap",
    bp: "200",
    sp: "290",
    qty: "1890",
    unit: "Pieces",
  },
];

const AdjustmentsPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalMode, setModalMode] = useState(null); // 'add' or 'edit'
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");

    axios
      .get("/api/adjustments", { signal: controller.signal })
      .then((res) => {
        const arr = Array.isArray(res.data) ? res.data : [];
        setItems(arr.length ? arr : fallbackData);
      })
      .catch(() => {
        setItems(fallbackData);
        setError("Failed to load adjustments. Showing demo data.");
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));
  const validatedPage = Math.min(currentPage, totalPages);

  const paginatedItems = useMemo(() => {
    const start = (validatedPage - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }, [items, validatedPage, itemsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCreateAdjustment = (data) => {
    console.log("Creating adjustment:", data);
    // TODO: POST to /api/adjustments
    setModalMode(null);
  };

  const handleUpdateAdjustment = (data) => {
    console.log("Updating adjustment:", data);
    // TODO: PUT / PATCH to /api/adjustments/{code}
    setModalMode(null);
  };

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

  const handleExportPDF = () => {
    console.log("Exporting PDF...");
  };

  const handleExportExcel = () => {
    console.log("Exporting Excel...");
  };

  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            Adjustments
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Manage inventory adjustments
          </p>
        </div>

        <div className="flex items-center gap-4 flex-shrink-0">
          <button
            type="button"
            onClick={handleExportPDF}
            title="Export PDF"
            className="hover:scale-110 transition-transform"
          >
            <FaFilePdf className="w-8 h-8 text-red-600 hover:text-red-700" />
          </button>

          <button
            type="button"
            onClick={handleExportExcel}
            title="Export Excel"
            className="hover:scale-110 transition-transform"
          >
            <FaFileExcel className="h-8 w-8 text-green-600 hover:text-green-700" />
          </button>

          <button
            type="button"
            onClick={openAddModal}
            className="flex items-center gap-2 rounded-xl bg-[#6F9C3D] px-4 sm:px-6 py-2.5 text-sm sm:text-base font-medium text-white shadow-sm transition hover:bg-[#5d8a32] hover:shadow-md active:scale-95"
          >
            <Plus className="h-4 w-4" />
            <span>Add Adjustment</span>
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {/* Adjustments Table */}
      <AdjustmentsTable
        items={paginatedItems}
        loading={loading}
        onEdit={openEditModal}
      />

      {/* Pagination */}
      {!loading && items.length > 0 && (
        <Pagination
          currentPage={validatedPage}
          totalPages={totalPages}
          totalItems={items.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      )}

      {/* Modal */}
      {modalMode && (
        <AdjustmentsModal
          isOpen={true}
          mode={modalMode}
          item={selectedItem}
          onClose={closeModal}
          onCreate={handleCreateAdjustment}
          onUpdate={handleUpdateAdjustment}
        />
      )}
    </>
  );
};

export default AdjustmentsPage;