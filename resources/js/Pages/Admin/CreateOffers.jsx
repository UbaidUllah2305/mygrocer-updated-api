import React, { useState, useEffect } from "react";
import Header from "../../Components/Admin/Header";
import Sidebar from "../../Components/Admin/Sidebar";
import { router } from "@inertiajs/react";
import { Pencil, Search, ChevronRight, Calendar, Users, TrendingUp, Circle, Eye, Upload } from "lucide-react";

// Mock data for dropdowns
const mockStores = ["Store A", "Store B", "Store C"];
const mockCustomers = ["All Customers", "Loyalty Members", "New Users"];
const mockCategories = ["Beauty", "Electronics", "Apparel", "Home", "Food"];
const mockProducts = ["Bread", "Eggs", "Meat", "Diputix"];

const CreateOfferPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    startTime: "",
    endTime: "",
    storeName: "",
    customer: "",
    status: "Active",
    discountValue: "",
    selectStore: "",
    minimumPurchase: "",
    displayMessage: "Get 25% off on all beauty products. Limited time only!",
    productSelection: "all",
    categories: [],
    specificProducts: [],
    excludedProducts: [],
    offerBudget: "",
    targetRevenue: "",
    priorityLevel: "Medium",
    targetConversion: "",
    promotionalText: "Black Friday Mega Sale! Get 25% off on all beauty products. Limited time only!",
    emailNotification: false,
    pushNotification: false,
    showCountdownTimer: false,
  });

  // Live Preview State
  const [previewTitle, setPreviewTitle] = useState("Black Friday Sale");
  const [previewDiscount, setPreviewDiscount] = useState("25% OFF");
  const [previewValidUntil, setPreviewValidUntil] = useState("Nov 27, 2025");
  const [tempExcludedProduct, setTempExcludedProduct] = useState("");
  const [tempCategory, setTempCategory] = useState("");
  const [tempProduct, setTempProduct] = useState("");
  const [showSaveModal, setShowSaveModal] = useState(false);

  // --- Custom Dropdown Component ---
  const CustomDropdown = ({ value, onChange, options, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const displayValue = value || placeholder;

    return (
      <div className="relative w-full">
        <button
          type="button"
          className="w-full h-16 px-3 py-2 text-left border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#6F9C3D] focus:border-[#6F9C3D] flex items-center justify-between"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={value ? "text-gray-900" : "text-gray-400"}>{displayValue}</span>
          <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-90" : ""}`} />
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
            {options.map((option, idx) => (
              <button
                key={idx}
                type="button"
                className="w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
              >
                {option || placeholder}
              </button>
            ))}
          </div>
        )}

        {/* Close dropdown when clicking outside */}
        {isOpen && (
          <div
            className="fixed inset-0 z-0"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    );
  };

  // Update preview when form changes
  useEffect(() => {
    if (formData.displayMessage) {
      const lines = formData.displayMessage.split("\n")[0].split(".");
      setPreviewTitle(lines[0] || "Black Friday Sale");
      setPreviewDiscount(`${formData.discountValue || "25"}% OFF`);
    }
    if (formData.endTime) {
      setPreviewValidUntil(new Date(formData.endTime).toLocaleDateString());
    }
  }, [formData.displayMessage, formData.discountValue, formData.endTime]);

  // Sidebar toggle logic
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCategoryToggle = (category) => {
    setFormData((prev) => {
      const newCategories = prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category];
      return { ...prev, categories: newCategories };
    });
  };

  const handleProductToggle = (product) => {
    setFormData((prev) => {
      const newProducts = prev.specificProducts.includes(product)
        ? prev.specificProducts.filter((p) => p !== product)
        : [...prev.specificProducts, product];
      return { ...prev, specificProducts: newProducts };
    });
  };

  const handleExcludedProductAdd = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      setFormData((prev) => ({
        ...prev,
        excludedProducts: [...prev.excludedProducts, e.target.value.trim()],
      }));
      e.target.value = "";
    }
  };

  const removeExcludedProduct = (index) => {
    setFormData((prev) => ({
      ...prev,
      excludedProducts: prev.excludedProducts.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Submit logic here
    alert("Offer created successfully!");
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

      {/* Sidebar + Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          active="offers"
          onChange={handleSidebarChange}
          isMobile={isMobile}
          mobileOpen={isMobile ? isSidebarOpen : true}
          onCloseMobile={closeSidebar}
        />

        {/* Main Content */}
        <main
          className={`flex-1 overflow-y-auto p-6 transition-all duration-300 ${isMobile ? "ml-0" : "ml-64"}`}
          style={{ marginTop: "99px" }}
        >
          {/* Page Title */}
          <h1 className="text-2xl font-medium mb-6">Offers / Create New Offer</h1>

          {/* Main Form Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-316">
            {/* Left & Center Columns - Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Offer Details */}
              <section className="bg-white">
                <h2 className="text-2xl font-medium mb-5">Basic Offer Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xl" style={{ fontFamily: 'AbeeZee' }}>

                  {/* Start Time */}
                  <input
                    // type="datetime-local"
                    name="startTime"
                    placeholder="Start Time"
                    value={formData.startTime}
                    onChange={handleChange}
                    className="w-full h-16 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6F9C3D] focus:border-[#6F9C3D]"
                  />

                  {/* End Time */}
                  <input
                    // type="datetime-local"
                    name="endTime"
                    placeholder="End Time"
                    value={formData.endTime}
                    onChange={handleChange}
                    className="w-full h-16 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6F9C3D] focus:border-[#6F9C3D]"
                  />

                  {/* Store Name */}
                  <input
                    type="text"
                    name="storeName"
                    placeholder="Store Name"
                    value={formData.storeName}
                    onChange={handleChange}
                    className="w-full h-16 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6F9C3D] focus:border-[#6F9C3D]"
                  />

                  {/* Customer Dropdown - Custom */}
                  <CustomDropdown
                    value={formData.customer}
                    onChange={(value) => setFormData((prev) => ({ ...prev, customer: value }))}
                    options={["", ...mockCustomers]}
                    placeholder="Select Customer"
                  />

                  {/* Status Dropdown - Custom */}
                  <CustomDropdown
                    value={formData.status}
                    onChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                    options={["Active", "Scheduled", "Expired"]}
                    placeholder="Select Status"
                  />

                  {/* Discount Value */}
                  <input
                    type="number"
                    name="discountValue"
                    placeholder="Discount Value"
                    value={formData.discountValue}
                    onChange={handleChange}
                    className="w-full h-16 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6F9C3D] focus:border-[#6F9C3D]"
                  />

                  {/* Select Store - Custom */}
                  <CustomDropdown
                    value={formData.selectStore}
                    onChange={(value) => setFormData((prev) => ({ ...prev, selectStore: value }))}
                    options={["", ...mockStores]}
                    placeholder="Select Store"
                  />

                  {/* Minimum Purchase */}
                  <input
                    type="number"
                    name="minimumPurchase"
                    value={formData.minimumPurchase}
                    onChange={handleChange}
                    placeholder="Minimum Purchase"
                    className="w-full h-16 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6F9C3D] focus:border-[#6F9C3D]"
                  />

                  {/* Display Message */}
                  <textarea
                    name="displayMessage"
                    // value={formData.displayMessage}
                    onChange={handleChange}
                    placeholder="Display Message"
                    rows={1}
                    className="w-full col-span-2 h-16 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6F9C3D] focus:border-[#6F9C3D] resize-none"
                  />
                </div>
              </section>

              {/* Product Selection */}
              <section className="bg-white">
                <h2 className="text-2xl font-medium mb-4">Product Selection</h2>

                {/* Row 1: All Products + Categories */}
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* All Products */}
                  <label className="inline-flex items-center cursor-pointer w-full">
                    <input
                      type="radio"
                      name="productSelection"
                      value="all"
                      checked={formData.productSelection === "all"}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span
                      className={`w-10 h-9 rounded-lg border-2 flex items-center justify-center transition ${formData.productSelection === "all"
                        ? "border-[#6F9C3D] bg-[#6F9C3D]"
                        : "border-gray-300 bg-white"
                        }`}
                    >
                      {formData.productSelection === "all" && (
                        <span className="bg-white rounded-full"></span>
                      )}
                    </span>
                    <span className="ml-3 w-full h-16 flex items-center px-3 bg-white border border-gray-300 rounded-xl text-xl text-gray-400">
                      All Products
                    </span>
                  </label>

                  {/* Categories */}
                  <label className="inline-flex items-center cursor-pointer w-full">
                    <input
                      type="radio"
                      name="productSelection"
                      value="categories"
                      checked={formData.productSelection === "categories"}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span
                      className={`w-10 h-9 rounded-lg border-2 flex items-center justify-center transition ${formData.productSelection === "categories"
                        ? "border-[#6F9C3D] bg-[#6F9C3D]"
                        : "border-gray-300 bg-white"
                        }`}
                    >
                      {formData.productSelection === "categories" && (
                        <span className="bg-white rounded-full"></span>
                      )}
                    </span>
                    <span className="ml-3 w-full h-16 flex items-center px-3 bg-white border border-gray-300 rounded-xl text-xl text-gray-400">
                      Categories
                    </span>
                  </label>
                </div>

                {/* Row 2: Specific Products */}
                <div className="mt-4">
                  <label className="inline-flex items-center cursor-pointer w-full lg:w-1/2">
                    <input
                      type="radio"
                      name="productSelection"
                      value="specific"
                      checked={formData.productSelection === "specific"}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span
                      className={`w-10 h-9 rounded-lg border-2 flex items-center justify-center transition ${formData.productSelection === "specific"
                        ? "border-[#6F9C3D] bg-[#6F9C3D]"
                        : "border-gray-300 bg-white"
                        }`}
                    >
                      {formData.productSelection === "specific" && (
                        <span className="bg-white rounded-full"></span>
                      )}
                    </span>
                    <span className="ml-3 w-full h-16 flex items-center px-3 bg-white border border-gray-300 rounded-xl text-xl text-gray-400">
                      Specific Products
                    </span>
                  </label>
                </div>

                {/* Conditional Sections Below */}

                {/* Selected Categories (only if "categories" is selected) */}
                {formData.productSelection === "categories" && (
                  <div className="mt-6">
                    <h3 className="text-2xl font-medium mb-2">Selected Categories</h3>

                    {/* Input + Button (embedded) */}
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Add category you want to exclude from all categories for this click select"
                        value={tempCategory}
                        onChange={(e) => setTempCategory(e.target.value)}
                        className="w-full h-16 px-3 py-2 pr-20 bg-gray-100 border border-gray-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-[#6F9C3D] focus:border-[#6F9C3D]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (tempCategory.trim() && !formData.categories.includes(tempCategory.trim())) {
                            setFormData((prev) => ({
                              ...prev,
                              categories: [...prev.categories, tempCategory.trim()],
                            }));
                            setTempCategory("");
                          }
                        }}
                        className="absolute w-31 h-12 right-1 top-1/2 transform -translate-y-1/2 px-3 py-1.5 bg-[#6F9C3D] text-white rounded-xl text-2xl font-normal hover:bg-[#5a8232] transition"
                      >
                        Select
                      </button>
                    </div>

                    {/* Chips */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {formData.categories.map((cat, idx) => (
                        <span
                          key={idx}
                          className="inline-flex h-12 items-center px-2 py-1 bg-gray-100 text-base rounded-md border border-gray-300"
                        >
                          {cat}
                          <img
                            src="/assets/Assets/cross.png"
                            alt="Remove"
                            className="w-3 h-3 ml-2 cursor-pointer hover:opacity-80"
                            onClick={() => handleCategoryToggle(cat)}
                          />
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Selected Products (only if "specific" is selected) */}
                {formData.productSelection === "specific" && (
                  <div className="mt-6">
                    <h3 className="text-2xl font-medium mb-2">Selected Products</h3>

                    {/* Input + Button (embedded) */}
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Select products you want to add from products, for this click on select"
                        value={tempProduct}
                        onChange={(e) => setTempProduct(e.target.value)}
                        className="w-full h-16 px-3 py-2 pr-20 bg-gray-100 border border-gray-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-[#6F9C3D] focus:border-[#6F9C3D]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (tempProduct.trim() && !formData.specificProducts.includes(tempProduct.trim())) {
                            setFormData((prev) => ({
                              ...prev,
                              specificProducts: [...prev.specificProducts, tempProduct.trim()],
                            }));
                            setTempProduct("");
                          }
                        }}
                        className="absolute w-31 h-12 right-1 top-1/2 transform -translate-y-1/2 px-3 py-1.5 bg-[#6F9C3D] text-white rounded-xl text-2xl font-normal hover:bg-[#5a8232] transition"
                      >
                        Select
                      </button>
                    </div>

                    {/* Chips */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {formData.specificProducts.map((prod, idx) => (
                        <span
                          key={idx}
                          className="inline-flex h-12 items-center px-2 py-1 bg-gray-100 text-base rounded-md border border-gray-300"
                        >
                          {prod}
                          <img
                            src="/assets/Assets/cross.png"
                            alt="Remove"
                            className="w-3 h-3 ml-2 cursor-pointer hover:opacity-80"
                            onClick={() => handleProductToggle(prod)}
                          />
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Excluded Products */}
                <div className="mt-6">
                  <h3 className="text-2xl font-medium mb-2">Excluded Products</h3>
                  <div className="relative mb-4">
                    <input
                      type="text"
                      placeholder="Add Product you want to exclude from all & click on submit button"
                      value={tempExcludedProduct}
                      onChange={(e) => setTempExcludedProduct(e.target.value)}
                      className="w-full h-16 px-3 py-2 pr-20 bg-gray-100 border border-gray-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-[#6F9C3D] focus:border-[#6F9C3D]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (tempExcludedProduct.trim()) {
                          setFormData((prev) => ({
                            ...prev,
                            excludedProducts: [...prev.excludedProducts, tempExcludedProduct.trim()],
                          }));
                          setTempExcludedProduct("");
                        }
                      }}
                      className="absolute h-12 w-33 right-1 top-1/2 transform -translate-y-1/2 px-3 py-1.5 bg-[#6F9C3D] text-white rounded-xl text-2xl font-normal hover:bg-[#5a8232] transition"
                    >
                      Submit
                    </button>
                  </div>
                  {/* Chips */}
                  <div className="flex flex-wrap gap-2">
                    {formData.excludedProducts.map((prod, idx) => (
                      <span
                        key={idx}
                        className="inline-flex h-12 items-center px-2 py-1 bg-gray-100 rounded-md border border-gray-300"
                      >
                        {prod}
                        <img
                          src="/assets/Assets/cross.png"
                          alt="Remove"
                          className="w-3 h-3 ml-2 cursor-pointer hover:opacity-80"
                          onClick={() => removeExcludedProduct(idx)}
                        />
                      </span>
                    ))}
                  </div>
                </div>
              </section>

              {/* Budget & Performance */}
              <section className="bg-white">
                <h2 className="text-2xl font-medium mb-4">Budget & Performance</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xl" style={{ fontFamily: 'AbeeZee' }}>
                  <div>
                    <input
                      type="input"
                      name="offerBudget"
                      value={formData.offerBudget}
                      onChange={handleChange}
                      placeholder="Offer Budget"
                      className="w-full h-16 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6F9C3D] focus:border-[#6F9C3D]"
                    />
                  </div>
                  <div>
                    <input
                      type="input"
                      name="targetRevenue"
                      value={formData.targetRevenue}
                      onChange={handleChange}
                      placeholder="Target Revenue"
                      className="w-full h-16 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6F9C3D] focus:border-[#6F9C3D]"
                    />
                  </div>
                  <div>
                    <input
                      type="input"
                      name="priorityLevel"
                      placeholder="Priority Level"
                      value={formData.priorityLevel}
                      onChange={handleChange}
                      className="w-full h-16 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6F9C3D] focus:border-[#6F9C3D]"
                    >
                    </input>
                  </div>
                  <div>
                    <input
                      type="number"
                      name="targetConversion"
                      value={formData.targetConversion}
                      onChange={handleChange}
                      placeholder="Target Conversion %"
                      className="w-full h-16 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6F9C3D] focus:border-[#6F9C3D]"
                    />
                  </div>
                </div>
              </section>

              {/* Marketing & Notifications */}
              <section className="bg-white">
                <h2 className="text-2xl font-medium mb-4">Marketing & Notifications</h2>

                {/* Image Upload */}
                <div className="mb-4">
                  <label className="block w-full h-30 border border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-[#6F9C3D] transition relative">
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                      className="sr-only"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = () => {
                            setFormData((prev) => ({
                              ...prev,
                              uploadedImage: reader.result, // store as base64
                            }));
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const file = e.dataTransfer.files?.[0];
                        if (file && file.type.startsWith("image/")) {
                          const reader = new FileReader();
                          reader.onload = () => {
                            setFormData((prev) => ({
                              ...prev,
                              uploadedImage: reader.result,
                            }));
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />

                    {formData.uploadedImage ? (
                      <img
                        src={formData.uploadedImage}
                        alt="Uploaded preview"
                        className="h-full w-full object-contain rounded"
                      />
                    ) : (
                      <>
                        <Upload className="mx-auto h-8 w-8 text-gray-400" />
                        <p className="mt-2 text-[28px] font-medium text-gray-500">
                          Upload Image or drag and drop
                        </p>
                      </>
                    )}
                  </label>
                </div>

                {/* Promotional Text */}
                <div className="mb-4">
                  <label className="block text-2xl font-medium text-gray-700 mb-2">Promotional Text</label>
                  <textarea
                    name="promotionalText"
                    value={formData.promotionalText}
                    onChange={handleChange}
                    // rows={3}
                    className="w-full h-16 pt-4.5 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6F9C3D] focus:border-[#6F9C3D] text-base text-gray-400 resize-none"
                  />
                </div>

                {/* Notifications */}
                <div className="space-y-3">
                  <h2 className="text-lg font-medium mb-4">Notifications</h2>

                  {/* All notifications in a responsive grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                    {/* Email Notification */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 h-16">
                      <div className="flex-1">
                        <div className="text-base font-medium text-gray-400">Email Notification</div>
                        <div className="text-xs text-gray-400">Send email alerts to customers about this offer</div>
                      </div>
                      <label className="relative inline-block w-10 h-5 align-middle select-none cursor-pointer">
                        <input
                          type="checkbox"
                          name="emailNotification"
                          checked={formData.emailNotification}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div
                          className={`block w-10 h-5 rounded-full transition-colors duration-200 ease-in-out ${formData.emailNotification ? "bg-[#6F9C3D]" : "bg-gray-300"
                            }`}
                        ></div>
                        <div
                          className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out ${formData.emailNotification ? "transform translate-x-5" : ""
                            }`}
                        ></div>
                      </label>
                    </div>

                    {/* Push Notification */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 h-16">
                      <div className="flex-1">
                        <div className="text-base font-medium text-gray-400">Push Notification</div>
                        <div className="text-xs text-gray-400">Send mobile apps notifications</div>
                      </div>
                      <label className="relative inline-block w-10 h-5 align-middle select-none cursor-pointer">
                        <input
                          type="checkbox"
                          name="pushNotification"
                          checked={formData.pushNotification}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div
                          className={`block w-10 h-5 rounded-full transition-colors duration-200 ease-in-out ${formData.pushNotification ? "bg-[#6F9C3D]" : "bg-gray-300"
                            }`}
                        ></div>
                        <div
                          className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out ${formData.pushNotification ? "transform translate-x-5" : ""
                            }`}
                        ></div>
                      </label>
                    </div>

                    {/* Show Countdown Timer — now part of the same grid */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 h-16">
                      <div className="flex-1">
                        <div className="text-base font-medium text-gray-400">Show Countdown Timer</div>
                        <div className="text-xs text-gray-400">Display urgency timer on offer page</div>
                      </div>
                      <label className="relative inline-block w-10 h-5 align-middle select-none cursor-pointer">
                        <input
                          type="checkbox"
                          name="showCountdownTimer"
                          checked={formData.showCountdownTimer}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div
                          className={`block w-10 h-5 rounded-full transition-colors duration-200 ease-in-out ${formData.showCountdownTimer ? "bg-[#6F9C3D]" : "bg-gray-300"
                            }`}
                        ></div>
                        <div
                          className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out ${formData.showCountdownTimer ? "transform translate-x-5" : ""
                            }`}
                        ></div>
                      </label>
                    </div>

                  </div>
                </div>
              </section>
            </div>

            {/* Right Column - Live Preview */}
            <div className="lg:col-span-1 md:mt-95">
              <div className="bg-white p-6 sticky top-6">

                {/* Header with Eye Icon */}
                <div className="flex items-center gap-2 mb-4">
                  <Eye size={18} className="text-gray-500" />
                  <h2 className="text-lg font-medium">Live Preview</h2>
                </div>

                {/* Preview Card — Static Image */}
                <div className="bg-[#d8e8d0] rounded-xl p-4 mb-4">
                  <img
                    src="/assets/Assets/blackfriday.png"
                    alt="Black Friday Sale"
                    className="w-74 h-54 rounded-lg"
                  />
                </div>

                {/* KPI Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3 text-center">
                    <div className="text-xl font-semibold">2.5K</div>
                    <div className="text-xs text-gray-500">Est. Views</div>
                  </div>
                  <div className="p-3 text-center">
                    <div className="text-xl font-semibold">8.5%</div>
                    <div className="text-xs text-gray-500">Target CVR</div>
                  </div>
                  <div className="p-3 text-center">
                    <div className="text-xl font-semibold">$14K</div>
                    <div className="text-xs text-gray-500">Revenue Goal</div>
                  </div>
                  <div className="p-3 text-center">
                    <div className="text-xl font-semibold">1K</div>
                    <div className="text-xs text-gray-500">Usage Limit</div>
                  </div>
                </div>

                {/* Optimization Tips */}
                <div className="bg-[#e1f6d8] rounded-lg p-4">
                  <h3 className="font-medium mb-2">Optimization Tips</h3>
                  <ol className="text-xs space-y-1 list-decimal pl-4">
                    <li>Add urgency with countdown timer</li>
                    <li>Consider minimum purchase amount</li>
                    <li>Test different discount values</li>
                  </ol>
                </div>

              </div>

              {/* Save Button */}
              <div className="md:mt-155 px-6 text-right">
                <button
                  type="button" // changed from "submit"
                  onClick={() => setShowSaveModal(true)} // open modal
                  className="w-full lg:w-auto px-6 py-2 bg-[#6F9C3D] text-white rounded-lg font-medium hover:bg-[#5a8232] transition focus:outline-none focus:ring-2 focus:ring-[#6F9C3D]/30"
                >
                  Save
                </button>
              </div>
            </div>

            {/* Save Confirmation Modal */}
            {showSaveModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="bg-white rounded-lg p-6 w-96 max-w-[90%]">
                  <h3 className="text-lg font-medium mb-4">Confirm Save</h3>
                  <p className="text-gray-600 mb-6">
                    Are you sure you want to save this offer?
                  </p>
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowSaveModal(false)}
                      className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        handleSubmit(); // actually save
                        setShowSaveModal(false);
                      }}
                      className="px-4 py-2 bg-[#6F9C3D] text-white rounded hover:bg-[#5a8232]"
                    >
                      Yes, Save
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateOfferPage;