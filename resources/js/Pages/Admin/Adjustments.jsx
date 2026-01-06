import React, { useEffect, useMemo, useState, useRef } from "react";
import Header from "../../Components/Admin/Header";
import Sidebar from "../../Components/Admin/Sidebar";
import { Plus, X } from "lucide-react";
import { router } from "@inertiajs/react";
import axios from "axios";

const columns = [
  { key: "main", label: "Main Category" },
  { key: "sub", label: "Sub Category" },
  { key: "code", label: "Code" },
  { key: "name", label: "Product Name" },
  { key: "bp", label: "BP" },
  { key: "sp", label: "SP" },
  { key: "qty", label: "Quantity" },
  { key: "unit", label: "Unit" },
  { key: "image", label: "Image" },
  { key: "actions", label: "Actions" },
];

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

// Category data
const mainCategories = [
  "Fruits & Vegetables",
  "Dairy",
  "Bakery",
  "Beverages",
  "Beauty",
  "Cleaning",
];

const subCategoriesMap = {
  "Fruits & Vegetables": ["Fresh Fruits", "Vegetables", "Exotic Fruits", "Organic"],
  Dairy: ["Milk", "Cheese", "Yogurt", "Butter"],
  Bakery: ["Bread", "Cakes", "Pastries", "Cookies"],
  Beverages: ["Juices", "Soda", "Water", "Energy Drinks"],
  Beauty: ["Skin care", "Hair care", "Makeup", "Fragrance"],
  Cleaning: ["Detergents", "Disinfectants", "Dishwash", "Air Fresheners"],
};

const AdjustmentsPage = () => {
  const [active, setActive] = useState("adjustments");
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal form state
  const [mainCategory, setMainCategory] = useState("Fruits & Vegetables");
  const [subCategory, setSubCategory] = useState("Fresh Fruits");
  const [isMainDropdownOpen, setIsMainDropdownOpen] = useState(false);
  const [isSubDropdownOpen, setIsSubDropdownOpen] = useState(false);

  // Refs for dropdown click outside
  const mainDropdownRef = useRef(null);
  const subDropdownRef = useRef(null);

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
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mainDropdownRef.current && !mainDropdownRef.current.contains(e.target)) {
        setIsMainDropdownOpen(false);
      }
      if (subDropdownRef.current && !subDropdownRef.current.contains(e.target)) {
        setIsSubDropdownOpen(false);
      }
    };

    if (isMainDropdownOpen || isSubDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMainDropdownOpen, isSubDropdownOpen]);

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

  const normalized = useMemo(() => {
    return items.map((i) => ({ ...i }));
  }, [items]);

  const visibilityCls = (key) => {
    if (key === "actions" || key === "main") return "block";
    if (key === "image") return "hidden md:flex";
    return "hidden md:block";
  };

  const toggleExpand = (idx) => {
    setExpanded((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleCreate = () => {
    // TODO: Submit form data (mainCategory, subCategory, etc.)
    console.log({
      mainCategory,
      subCategory,
      // Add other fields when you connect them
    });
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#161c2b]">
      {/* Fixed Header */}
      <div className="shrink-0">
        <Header
          isMobile={isMobile}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={toggleSidebar}
        />
      </div>

      {/* Sidebar + Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          active={active}
          onChange={handleSidebarChange}
          isMobile={isMobile}
          mobileOpen={isMobile ? isSidebarOpen : true}
          onCloseMobile={closeSidebar}
        />

        {/* Scrollable Main Content */}
        <main
          className={`flex-1 overflow-y-auto p-6 transition-all duration-300 ${isMobile ? "ml-0" : "ml-64"
            }`}
          style={{ marginTop: "99px" }}
        >
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-medium font-inter tracking-[0%] leading-[auto]">
              Adjustments
            </h2>
            <div className="flex items-center gap-2">
              {/* PDF Export Button - Custom Image */}
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg  bg-white p-2 text-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#6F9C3D]/30"
                title="Export PDF"
                style={{ width: "44px", height: "44px" }}
              >
                <img
                  src="/assets/Assets/pdf.svg"
                  alt="Export as PDF"
                  className="h-9 w-7"
                  width="20"
                  height="20"
                  loading="lazy"
                />
              </button>

              {/* Excel Export Button - Custom Image */}
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg bg-white p-2 text-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#6F9C3D]/30"
                title="Export Spreadsheet"
                style={{ width: "54px", height: "44px" }}
              >
                <img
                  src="/assets/Assets/Excel.svg"
                  alt="Export as Excel"
                  className="h-9 w-9"
                  loading="lazy"
                />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto mt-6">
            <div className="min-w-[900px]"> {/* Adjust min-width based on content */}
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
                  <div className="text-center py-2 truncate">Unit</div>
                  <div className="text-center py-2 truncate">Image</div>
                  <div className="text-center py-2 truncate">Actions</div>
                </div>
              </div>

              {/* Table Rows */}
              <div className="mt-3 space-y-3">
                {loading && (
                  <div className="rounded-xl bg-[#f7f7f7] p-4 text-sm text-gray-600">
                    Loading...
                  </div>
                )}
                {error && (
                  <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-900">
                    {error}
                  </div>
                )}

                {normalized.map((row, idx) => (
                  <div
                    key={`${row.code}-${idx}`}
                    className="relative rounded-xl bg-[#f7f7f7] p-4 shadow-sm ring-1 ring-black/5 transition-all hover:bg-[#f3f3f3]"
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
                      <div className="text-center py-2 truncate">{row.qty}</div>
                      {/* Unit */}
                      <div className="text-center py-2 truncate">{row.unit}</div>
                      {/* Image */}
                      <div className="text-center py-2 flex justify-center">
                        <div className="h-10 w-10 rounded-full border border-[#969696]" />
                      </div>
                      {/* Actions */}
                      <div className="text-center py-2 flex items-center justify-center">
                        <button
                          type="button"
                          className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-neutral-400 text-[#6F9C3D] shadow-sm transition hover:bg-[#e5f0d8] focus:outline-none focus:ring-2 focus:ring-[#6F9C3D]/30"
                          aria-label="Add adjustment"
                          onClick={() => setIsModalOpen(true)}
                        >
                          <Plus className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {!loading && normalized.length === 0 && (
                  <div className="rounded-xl bg-white p-4 text-center text-sm text-gray-600">
                    No adjustments found.
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/40 backdrop-blur-sm transition-opacity duration-300"
          role="dialog"
          aria-modal="true"
          aria-labelledby="adj-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div className="relative w-[95vw] max-w-[1039px] rounded-2xl bg-white shadow-xl ring-1 ring-black/10 transition-transform duration-300">
            <div className="absolute right-3 top-3 z-10">
              <button
                type="button"
                aria-label="Close"
                onClick={() => setIsModalOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#ef4444] text-white shadow hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#ef4444]/50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 id="adj-modal-title" className="text-2xl font-semibold text-[#2c323c] text-center">
                  Adjustments
                </h2>
                <div className="flex-1"></div>
                {/* Image Preview */}
                <div className="hidden sm:block">
                  <img
                    src="/assets/Assets/apple.png"
                    alt="Product Image"
                    className="h-27 w-37.5 rounded-lg mr-8 object-cover border border-[#969696]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Main Category Custom Dropdown */}
                <div ref={mainDropdownRef} className="relative">
                  <label className="relative rounded-xl border border-[#6f9c3d] px-4 py-3 block">
                    <span className="absolute -top-3 left-4 bg-white px-2 text-[#6f9c3d] text-lg font-medium">
                      Main Category
                    </span>
                    <div
                      className="mt-1 ml-2 w-full bg-transparent text-[#2c323c] text-lg outline-none cursor-pointer relative"
                      onClick={() => setIsMainDropdownOpen(!isMainDropdownOpen)}
                      style={{ fontFamily: 'satoshi' }}
                    >
                      {mainCategory}
                      <svg
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="#2c323c"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>
                  </label>

                  {isMainDropdownOpen && (
                    <div className="absolute z-20 mt-1 w-full bg-white border border-[#6f9c3d] rounded-lg shadow-lg max-h-40 overflow-y-auto">
                      {mainCategories.map((cat) => (
                        <div
                          key={cat}
                          className="px-4 py-2 hover:bg-[#e5f0d8] cursor-pointer text-[#2c323c] text-lg"
                          style={{ fontFamily: 'satoshi' }}
                          onClick={() => {
                            setMainCategory(cat);
                            setSubCategory(subCategoriesMap[cat]?.[0] || "");
                            setIsMainDropdownOpen(false);
                          }}
                        >
                          {cat}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Sub Category Custom Dropdown */}
                <div ref={subDropdownRef} className="relative">
                  <label className="relative rounded-xl border border-[#6f9c3d] px-4 py-3 block">
                    <span className="absolute -top-3 left-4 bg-white px-2 text-[#6f9c3d] text-lg font-medium">
                      Sub Category
                    </span>
                    <div
                      className="mt-1 ml-2 w-full bg-transparent text-[#2c323c] text-lg outline-none cursor-pointer relative"
                      onClick={() => setIsSubDropdownOpen(!isSubDropdownOpen)}
                      style={{ fontFamily: 'satoshi' }}
                    >
                      {subCategory}
                      <svg
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="#2c323c"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>
                  </label>

                  {isSubDropdownOpen && (
                    <div className="absolute z-20 mt-1 w-full bg-white border border-[#6f9c3d] rounded-lg shadow-lg max-h-40 overflow-y-auto">
                      {(subCategoriesMap[mainCategory] || []).map((sub) => (
                        <div
                          key={sub}
                          className="px-4 py-2 hover:bg-[#e5f0d8] cursor-pointer text-[#2c323c] text-lg"
                          style={{ fontFamily: 'satoshi' }}
                          onClick={() => {
                            setSubCategory(sub);
                            setIsSubDropdownOpen(false);
                          }}
                        >
                          {sub}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Code */}
                <label className="relative rounded-xl border border-[#6f9c3d] px-4 py-3">
                  <span className="absolute -top-3 left-4 bg-white px-2 text-[#6f9c3d] text-lg font-medium">
                    Code
                  </span>
                  <input
                    type="text"
                    defaultValue="FV-001"
                    className="mt-1 ml-2 w-full bg-transparent text-[#2c323c] text-lg outline-none"
                    style={{ fontFamily: 'satoshi' }}
                  />
                </label>
                {/* Product Name */}
                <label className="relative rounded-xl border border-[#6f9c3d] px-4 py-3">
                  <span className="absolute -top-3 left-4 bg-white px-2 text-[#6f9c3d] text-lg font-medium">
                    Product Name
                  </span>
                  <input
                    type="text"
                    defaultValue="Apples"
                    className="mt-1 ml-2 w-full bg-transparent text-[#2c323c] text-lg outline-none"
                    style={{ fontFamily: 'satoshi' }}
                  />
                </label>
                {/* Buying Price */}
                <label className="relative rounded-xl border border-[#6f9c3d] px-4 py-3">
                  <span className="absolute -top-3 left-4 bg-white px-2 text-[#6f9c3d] text-lg font-medium">
                    Buying Price
                  </span>
                  <input
                    type="text"
                    defaultValue="100.00"
                    className="mt-1 ml-2 w-full bg-transparent text-[#2c323c] text-lg outline-none"
                    style={{ fontFamily: 'satoshi' }}
                  />
                </label>
                {/* Selling Price */}
                <label className="relative rounded-xl border border-[#6f9c3d] px-4 py-3">
                  <span className="absolute -top-3 left-4 bg-white px-2 text-[#6f9c3d] text-lg font-medium">
                    Selling Price
                  </span>
                  <input
                    type="text"
                    defaultValue="115.00"
                    className="mt-1 ml-2 w-full bg-transparent text-[#2c323c] text-lg outline-none"
                    style={{ fontFamily: 'satoshi' }}
                  />
                </label>
                {/* Quantity */}
                <label className="relative rounded-xl border border-[#6f9c3d] px-4 py-3">
                  <span className="absolute -top-3 left-4 bg-white px-2 text-[#6f9c3d] text-lg font-medium">
                    Quantity
                  </span>
                  <input
                    type="text"
                    defaultValue="20"
                    className="mt-1 ml-2 w-full bg-transparent text-[#2c323c] text-lg outline-none"
                    style={{ fontFamily: 'satoshi' }}
                  />
                </label>
                {/* Unit */}
                <label className="relative rounded-xl border border-[#6f9c3d] px-4 py-3">
                  <span className="absolute -top-3 left-4 bg-white px-2 text-[#6f9c3d] text-lg font-medium">
                    Unit
                  </span>
                  <input
                    type="text"
                    defaultValue="Kg"
                    className="mt-1 ml-2 w-full bg-transparent text-[#2c323c] text-lg outline-none"
                    style={{ fontFamily: 'satoshi' }}
                  />
                </label>
              </div>

              {/* Mobile Image */}
              <div className="sm:hidden mt-4">
                <img
                  src="/assets/Assets/apple.png"
                  alt="Product Image"
                  className="h-20 w-20 mx-auto rounded-lg object-cover border border-[#969696]"
                />
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  className="inline-flex min-h-16 w-[696px] items-center justify-center rounded-xl bg-[#6f9c3d] px-6 py-3 text-white shadow font-semibold transition hover:bg-[#5a8232] focus:outline-none focus:ring-2 focus:ring-[#6f9c3D]/40"
                  onClick={handleCreate}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdjustmentsPage;