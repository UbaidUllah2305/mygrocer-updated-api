import React, { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { Pencil, Search, ChevronRight, Calendar, Users, TrendingUp, Circle, Eye, Upload } from "lucide-react";
import InputFloating from "@/Components/InputFloating";
import FloatingTextarea from "@/Components/FloatingTextarea";
import SelectFloating from "@/Components/SelectFloating";

// Mock data for dropdowns
const mockStores = ["Store A", "Store B", "Store C"];
const mockCustomers = ["All Customers", "Loyalty Members", "New Users"];
const mockCategories = ["Beauty", "Electronics", "Apparel", "Home", "Food"];
const mockProducts = ["Bread", "Eggs", "Meat", "Diputix"];

const CreateOffers = () => {
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

  const [previewTitle, setPreviewTitle] = useState("Black Friday Sale");
  const [previewDiscount, setPreviewDiscount] = useState("25% OFF");
  const [previewValidUntil, setPreviewValidUntil] = useState("Nov 27, 2025");
  const [tempExcludedProduct, setTempExcludedProduct] = useState("");
  const [tempCategory, setTempCategory] = useState("");
  const [tempProduct, setTempProduct] = useState("");
  const [showSaveModal, setShowSaveModal] = useState(false);

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
    alert("Offer created successfully!");
    router.visit("/offers"); 
  };

  return (
    <div className="max-w-316">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            Create New Offer
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Set up a new promotion for your customers
          </p>
        </div>
      </div>

      {/* Main Form Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left & Center Columns - Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Offer Details */}
          <section className="rounded-xl">
            <h2 className="text-xl font-medium mb-5">Basic Offer Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Start Time */}
              <InputFloating
                id="startTime"
                label="Start Time"
                name="startTime"
                type="datetime-local"
                value={formData.startTime}
                onChange={handleChange}
              />

              {/* End Time */}
              <InputFloating
                id="endTime"
                label="End Time"
                name="endTime"
                type="datetime-local"
                value={formData.endTime}
                onChange={handleChange}
              />

              {/* Store Name */}
              <InputFloating
                id="storeName"
                label="Store Name"
                name="storeName"
                value={formData.storeName}
                onChange={handleChange}
              />

              {/* Customer */}
              <SelectFloating
                id="customer"
                label="Customer"
                name="customer"
                value={formData.customer}
                onChange={(e) => setFormData(prev => ({ ...prev, customer: e.target.value }))}
                options={mockCustomers.map(c => ({ value: c, label: c }))}
              />

              {/* Status */}
              <SelectFloating
                id="status"
                label="Status"
                name="status"
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                options={["Active", "Scheduled", "Expired"].map(s => ({ value: s, label: s }))}
                placeholder="Select Status"
              />

              {/* Discount Value */}
              <InputFloating
                id="discountValue"
                label="Discount Value"
                name="discountValue"
                type="number"
                value={formData.discountValue}
                onChange={handleChange}
              />

              {/* Select Store */}
              <SelectFloating
                id="selectStore"
                label="Select Store"
                name="selectStore"
                value={formData.selectStore}
                onChange={(e) => setFormData(prev => ({ ...prev, selectStore: e.target.value }))}
                options={mockStores.map(s => ({ value: s, label: s }))}
                placeholder="Select Store"
              />

              {/* Minimum Purchase */}
              <InputFloating
                id="minimumPurchase"
                label="Minimum Purchase"
                name="minimumPurchase"
                type="number"
                value={formData.minimumPurchase}
                onChange={handleChange}
              />

              {/* Display Message */}
              <FloatingTextarea
                id="displayMessage"
                label="Display Message"
                name="displayMessage"
                value={formData.displayMessage}
                onChange={handleChange}
                rows={2}
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

          {/* Budget & Performance */}
          <section className="rounded-xl">
            <h2 className="text-xl font-medium mb-4">Budget & Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputFloating
                id="offerBudget"
                label="Offer Budget"
                name="offerBudget"
                value={formData.offerBudget}
                onChange={handleChange}
              />
              <InputFloating
                id="targetRevenue"
                label="Target Revenue"
                name="targetRevenue"
                value={formData.targetRevenue}
                onChange={handleChange}
              />
              <InputFloating
                id="priorityLevel"
                label="Priority Level"
                name="priorityLevel"
                value={formData.priorityLevel}
                onChange={handleChange}
              />
              <InputFloating
                id="targetConversion"
                label="Target Conversion %"
                name="targetConversion"
                type="number"
                value={formData.targetConversion}
                onChange={handleChange}
              />
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
                    <p className="mt-1 text-sm text-gray-500">Upload Image</p>
                  </>
                )}
              </label>
            </div>

            {/* Promotional Text */}
            <FloatingTextarea
              id="promotionalText"
              label="Promotional Text"
              name="promotionalText"
              value={formData.promotionalText}
              onChange={handleChange}
              rows={3}
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
        </div>

        {/* Right Column - Live Preview */}
        <div className="lg:col-span-1">
          <div className="rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <Eye size={16} className="text-gray-500" />
              <h2 className="text-lg font-medium">Live Preview</h2>
            </div>

            <div className="bg-[#d8e8d0] rounded-lg p-3 mb-4">
              <img
                src="/assets/Assets/blackfriday.png"
                alt="Offer Preview"
                className="w-full h-40 object-contain rounded"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4 text-center">
              {[
                { value: "2.5K", label: "Est. Views" },
                { value: "8.5%", label: "Target CVR" },
                { value: "$14K", label: "Revenue Goal" },
                { value: "1K", label: "Usage Limit" }
              ].map((item, i) => (
                <div key={i} className="p-2 bg-gray-50 rounded">
                  <div className="text-base font-semibold">{item.value}</div>
                  <div className="text-xs text-gray-500">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="bg-[#e1f6d8] rounded-lg p-3">
              <h3 className="font-medium mb-1">Optimization Tips</h3>
              <ul className="text-xs list-disc pl-4 space-y-1">
                <li>Add urgency with countdown timer</li>
                <li>Set minimum purchase amount</li>
                <li>Test different discount values</li>
              </ul>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-6 text-right">
            <button
              type="button"
              onClick={() => setShowSaveModal(true)}
              className="px-6 py-2 bg-[#6F9C3D] text-white rounded-lg font-medium hover:bg-[#5a8232] transition"
            >
              Save Offer
            </button>
          </div>
        </div>
      </div>

      {/* Save Confirmation Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-[90%]">
            <h3 className="text-lg font-medium mb-2">Save Offer</h3>
            <p className="text-gray-600 mb-4">Are you sure you want to save this offer?</p>
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
  );
};

export default CreateOffers;