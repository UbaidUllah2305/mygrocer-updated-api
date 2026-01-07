import React, { useEffect, useMemo, useState } from "react";
import { router } from "@inertiajs/react";
import axios from "axios";
import InventoryTable from "./InventoryTable";
import DeleteConfirmationModal from "@/Components/DeleteConfirmationModal";
import Pagination from "@/Components/Pagination";
import { FaFileExcel, FaFilePdf } from "react-icons/fa";

const fallbackData = [
  {
    id: 1,
    main: "Beauty",
    sub: "Skin care",
    code: "12245",
    name: "Soap",
    bp: "200",
    sp: "290",
    qty: "1890",
    unit: "Pieces",
    category: "beauty",
    subCategory: "skincare",
    itemName: "Soap",
    brandName: "Dove",
    buyingPrice: "200",
    sellingPrice: "290",
    itemQuantity: "1890",
  },
  {
    id: 2,
    main: "Cleaning",
    sub: "Cloth Cleaning",
    code: "2344",
    name: "Washing Powder",
    bp: "300",
    sp: "400",
    qty: "1974",
    unit: "1 Kg",
    category: "home",
    subCategory: "cleaning",
    itemName: "Washing Powder",
    brandName: "Tide",
    buyingPrice: "300",
    sellingPrice: "400",
    itemQuantity: "1974",
  },
  {
    id: 3,
    main: "Beauty",
    sub: "Skin care",
    code: "4435",
    name: "Lipstick",
    bp: "500",
    sp: "600",
    qty: "456",
    unit: "Pieces",
    category: "beauty",
    subCategory: "makeup",
    itemName: "Lipstick",
    brandName: "MAC",
    buyingPrice: "500",
    sellingPrice: "600",
    itemQuantity: "456",
  },
];

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    const controller = new AbortController();
    setLoading(true);
    setError("");

    try {
      const response = await axios.get("/api/inventory", {
        signal: controller.signal
      });
      const data = Array.isArray(response.data) ? response.data : [];
      setItems(data.length ? data : fallbackData);
    } catch (err) {
      if (axios.isCancel(err)) return;
      console.error("Fetch error:", err);
      setError("Failed to load inventory data. Using offline data.");
      setItems(fallbackData);
    } finally {
      setLoading(false);
    }

    return () => controller.abort();
  };

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));
  const validatedPage = Math.min(currentPage, totalPages);

  const paginatedItems = useMemo(() => {
    const startIndex = (validatedPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  }, [items, validatedPage, itemsPerPage]);

  const handleDelete = (item) => {
    setDeleteConfirmation(item);
  };

  const confirmDelete = async () => {
    if (!deleteConfirmation) return;
    setIsDeleting(true);

    try {
      await axios.delete(`/api/inventory/${deleteConfirmation.code}`);
      setItems((prev) => prev.filter((i) => i.code !== deleteConfirmation.code));

      const newTotalPages = Math.max(1, Math.ceil((items.length - 1) / itemsPerPage));
      if (currentPage > newTotalPages) {
        setCurrentPage(newTotalPages);
      }
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false);
      setDeleteConfirmation(null);
    }
  };

  const cancelDelete = () => {
    if (!isDeleting) {
      setDeleteConfirmation(null);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleExportPDF = () => {
    console.log("Exporting PDF...");
  };

  const handleExportExcel = () => {
    console.log("Exporting Excel...");
  };

  const handleAddProduct = () => {
    router.visit("/add-products");
  };

  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            Inventory Management
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Manage your product inventory and stock levels
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
            onClick={handleAddProduct}
            className="flex rounded-xl bg-[#6F9C3D] px-4 sm:px-6 py-2.5 text-sm sm:text-base font-medium text-white shadow-sm transition hover:bg-[#5d8a32] hover:shadow-md active:scale-95"
          >
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {/* Inventory Table */}
      <InventoryTable
        items={paginatedItems}
        loading={loading}
        onDelete={handleDelete}
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

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={!!deleteConfirmation}
        onClose={() => setDeleteConfirmation(null)}
        onConfirm={confirmDelete}
        title="Delete Product?"
        itemName={deleteConfirmation?.name}
        details={`Product Code: ${deleteConfirmation?.code}`}
        warningMessage="This action cannot be undone. The product will be permanently removed from your inventory."
      />
    </>
  );
};

export default Inventory;
