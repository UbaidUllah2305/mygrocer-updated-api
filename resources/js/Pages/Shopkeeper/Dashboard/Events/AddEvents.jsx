import React, { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { Pencil, Search, ChevronRight, Calendar, Users, TrendingUp, Circle, Eye, Upload } from "lucide-react";

// Mock data for dropdowns
const mockStores = ["Store A", "Store B", "Store C"];
const mockCustomers = ["All Customers", "Loyalty Members", "New Users"];
const mockCategories = ["Beauty", "Electronics", "Apparel", "Home", "Food"];
const mockProducts = ["Bread", "Eggs", "Meat", "Dupatta"];

const AddEventsPage = () => {
  // Form State
  const [formData, setFormData] = useState({
    eventName: "",
    storeName: "",
    startDate: "",
    endDate: "",
    discountType: "Percentage",
    discountValue: "",
    eventDescription: "",
    productSelection: "all",
    categories: [],
    specificProducts: [],
    excludedProducts: [],
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

  // Custom Dropdown Component
  const CustomDropdown = ({ value, onChange, options, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const displayValue = value || placeholder;

    return (
      <div className="relative w-full">
        <button
          type="button"
          className="w-full h-12 px-3 py-2 text-left border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#6F9C3D] focus:border-[#6F9C3D] flex items-center justify-between"
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
    if (formData.promotionalText) {
      const lines = formData.promotionalText.split("\n")[0].split(".");
      setPreviewTitle(lines[0] || "Black Friday Sale");
      setPreviewDiscount(`${formData.discountValue || "25"}% OFF`);
    }
    if (formData.endDate) {
      setPreviewValidUntil(new Date(formData.endDate).toLocaleDateString());
    }
  }, [formData.promotionalText, formData.discountValue, formData.endDate]);

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
    alert("Event created successfully!");
    router.visit("/events"); 
  };

  return (
    <div className="max-w-200">
      {/* Clean Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            Add New Event
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Set up a new promotional event
          </p>
        </div>
      </div>

      {/* Main Form Layout */}
      <div className="grid grid-cols-1 gap-6">
        {/* Form */}
        <div className="space-y-6">
          {/* Basic Event Details */}
          <section className="rounded-xl">
            <h2 className="text-xl font-medium mb-5">Basic Event Details</h2>
            <div className="grid md:grid-cols-2 gap-4 text-base">

              <input
                type="text"
                name="eventName"
                placeholder="Event Name"
                value={formData.eventName}
                onChange={handleChange}
                className="w-full h-12 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6F9C3D]"
              />

              <CustomDropdown
                value={formData.storeName}
                onChange={(value) => setFormData((prev) => ({ ...prev, storeName: value }))}
                options={["", ...mockStores]}
                placeholder="Store Name"
              />

              <input
                name="startDate"
                placeholder="Start Date"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full h-12 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6F9C3D]"
              />

              <input
                name="endDate"
                placeholder="End Date"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full h-12 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6F9C3D]"
              />

              <CustomDropdown
                value={formData.discountType}
                onChange={(value) => setFormData((prev) => ({ ...prev, discountType: value }))}
                options={["Percentage", "Fixed Amount"]}
                placeholder="Discount Type"
              />

              <input
                type="number"
                name="discountValue"
                placeholder="Discount Value"
                value={formData.discountValue}
                onChange={handleChange}
                className="w-full h-12 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6F9C3D]"
              />

              <textarea
                name="eventDescription"
                value={formData.eventDescription}
                onChange={handleChange}
                placeholder="Event Description"
                rows={1}
                className="w-full col-span-2 h-12 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6F9C3D] resize-none"
              />
            </div>
          </section>

          {/* Product Selection */}
          <section className="rounded-xl">
            <h2 className="text-xl font-medium mb-4">Product Selection</h2>

            {/* Radio Buttons */}
            <div className="space-y-4">
              {[
                { label: "All Products", value: "all" },
                { label: "Categories", value: "categories" },
                { label: "Specific Products", value: "specific" }
              ].map((option) => (
                <label key={option.value} className="flex items-center cursor-pointer mr-4">
                  <input
                    type="radio"
                    name="productSelection"
                    value={option.value}
                    checked={formData.productSelection === option.value}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span
                    className={`w-9 h-9 rounded-lg border-2 flex items-center justify-center transition ${formData.productSelection === option.value
                      ? "border-[#6F9C3D] bg-[#6F9C3D]"
                      : "border-gray-300 bg-white"
                      }`}
                  >
                    {formData.productSelection === option.value && (
                      <span className="bg-white rounded-full w-3 h-3"></span>
                    )}
                  </span>
                  <span className="ml-3 px-3 py-2 bg-white border border-gray-300 rounded-xl text-base text-gray-700">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>

            {/* Conditional Sections */}
            {formData.productSelection === "categories" && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Selected Categories</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Add category..."
                    value={tempCategory}
                    onChange={(e) => setTempCategory(e.target.value)}
                    className="w-full h-12 px-3 py-2 pr-20 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6F9C3D]"
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
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 w-28 px-3 bg-[#6F9C3D] text-white rounded-lg text-base hover:bg-[#5a8232]"
                  >
                    Select
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.categories.map((cat, idx) => (
                    <span key={idx} className="inline-flex h-9 items-center pl-3 pr-1 bg-gray-100 text-sm rounded-full border">
                      {cat}
                      <button
                        type="button"
                        onClick={() => handleCategoryToggle(cat)}
                        className="ml-2 text-gray-500 hover:text-gray-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {formData.productSelection === "specific" && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Selected Products</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Add product..."
                    value={tempProduct}
                    onChange={(e) => setTempProduct(e.target.value)}
                    className="w-full h-12 px-3 py-2 pr-20 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6F9C3D]"
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
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 w-28 px-3 bg-[#6F9C3D] text-white rounded-lg text-base hover:bg-[#5a8232]"
                  >
                    Select
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.specificProducts.map((prod, idx) => (
                    <span key={idx} className="inline-flex h-9 items-center pl-3 pr-1 bg-gray-100 text-sm rounded-full border">
                      {prod}
                      <button
                        type="button"
                        onClick={() => handleProductToggle(prod)}
                        className="ml-2 text-gray-500 hover:text-gray-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Excluded Products */}
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Excluded Products</h3>
              <div className="relative mb-3">
                <input
                  type="text"
                  placeholder="Add product to exclude..."
                  value={tempExcludedProduct}
                  onChange={(e) => setTempExcludedProduct(e.target.value)}
                  className="w-full h-12 px-3 py-2 pr-20 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6F9C3D]"
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
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 w-28 px-3 bg-[#6F9C3D] text-white rounded-lg text-base hover:bg-[#5a8232]"
                >
                  Submit
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.excludedProducts.map((prod, idx) => (
                  <span key={idx} className="inline-flex h-9 items-center pl-3 pr-1 bg-gray-100 text-sm rounded-full border">
                    {prod}
                    <button
                      type="button"
                      onClick={() => removeExcludedProduct(idx)}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Marketing & Notifications */}
          <section className="rounded-xl">
            <h2 className="text-xl font-medium mb-4">Marketing & Notifications</h2>

            {/* Image Upload */}
            <div className="mb-4">
              <label className="block w-full h-32 border border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-[#6F9C3D]">
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => {
                        setFormData((prev) => ({ ...prev, uploadedImage: reader.result }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                {formData.uploadedImage ? (
                  <img src={formData.uploadedImage} alt="Preview" className="h-full w-full object-contain rounded" />
                ) : (
                  <>
                    <Upload className="mx-auto h-6 w-6 text-gray-400" />
                    <p className="mt-1 text-sm text-gray-500">Upload Event Banner</p>
                  </>
                )}
              </label>
            </div>

            {/* Promotional Text */}
            <textarea
              name="promotionalText"
              value={formData.promotionalText}
              onChange={handleChange}
              placeholder="Promotional Text"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6F9C3D] text-base"
            />

            {/* Notifications */}
            <div className="mt-4 space-y-3">
              {[
                { label: "Email Notification", name: "emailNotification", desc: "Send email alerts" },
                { label: "Push Notification", name: "pushNotification", desc: "Send mobile notifications" },
                { label: "Show Countdown Timer", name: "showCountdownTimer", desc: "Display urgency timer" }
              ].map((item) => (
                <div key={item.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="text-sm font-medium">{item.label}</div>
                    <div className="text-xs text-gray-500">{item.desc}</div>
                  </div>
                  <label className="relative inline-block w-10 h-5 cursor-pointer">
                    <input
                      type="checkbox"
                      name={item.name}
                      checked={formData[item.name]}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`block w-10 h-5 rounded-full transition ${formData[item.name] ? "bg-[#6F9C3D]" : "bg-gray-300"}`}></div>
                    <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${formData[item.name] ? "translate-x-5" : ""}`}></div>
                  </label>
                </div>
              ))}
            </div>
          </section>

          {/* Save Button */}
          <div className="text-right">
            <button
              type="button"
              onClick={() => setShowSaveModal(true)}
              className="px-6 py-2 bg-[#6F9C3D] text-white rounded-lg font-medium hover:bg-[#5a8232] transition"
            >
              Save Event
            </button>
          </div>
        </div>

        {/* Save Confirmation Modal */}
        {showSaveModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg p-6 w-96 max-w-[90%]">
              <h3 className="text-lg font-medium mb-2">Save Event</h3>
              <p className="text-gray-600 mb-4">Are you sure you want to save this event?</p>
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
                    handleSubmit();
                    setShowSaveModal(false);
                  }}
                  className="px-4 py-2 bg-[#6F9C3D] text-white rounded hover:bg-[#5a8232]"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddEventsPage;