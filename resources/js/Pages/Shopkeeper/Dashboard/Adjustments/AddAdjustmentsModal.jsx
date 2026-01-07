import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import InputFloating from "@/Components/InputFloating";
import SelectFloating from "@/Components/SelectFloating";

const AdjustmentsModal = ({ 
  isOpen, 
  mode, 
  item, 
  onClose, 
  onCreate, 
  onUpdate 
}) => {
  const [focusedFields, setFocusedFields] = useState({});
  const [formData, setFormData] = useState({
    mainCategory: "",
    subCategory: "",
    code: "",
    productName: "",
    buyingPrice: "",
    sellingPrice: "",
    quantity: "",
    unit: "",
  });

  // Pre-fill form in edit mode
  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && item) {
        setFormData({
          mainCategory: item.main || "",
          subCategory: item.sub || "",
          code: item.code || "",
          productName: item.name || "",
          buyingPrice: item.bp || "",
          sellingPrice: item.sp || "",
          quantity: item.qty || "",
          unit: item.unit || "",
        });
      } else {
        // Add mode: reset
        setFormData({
          mainCategory: "",
          subCategory: "",
          code: "",
          productName: "",
          buyingPrice: "",
          sellingPrice: "",
          quantity: "",
          unit: "",
        });
      }
    }
  }, [isOpen, mode, item]);

  const setFieldFocus = (field, isFocused) => {
    setFocusedFields((prev) => ({ ...prev, [field]: isFocused }));
  };

  const mainCategoryOptions = [
    { value: "Fruits & Vegetables", label: "Fruits & Vegetables" },
    { value: "Dairy", label: "Dairy" },
    { value: "Bakery", label: "Bakery" },
    { value: "Beverages", label: "Beverages" },
    { value: "Beauty", label: "Beauty" },
    { value: "Cleaning", label: "Cleaning" },
  ];

  const subCategoriesMap = {
    "Fruits & Vegetables": [
      { value: "Fresh Fruits", label: "Fresh Fruits" },
      { value: "Vegetables", label: "Vegetables" },
      { value: "Exotic Fruits", label: "Exotic Fruits" },
      { value: "Organic", label: "Organic" },
    ],
    Dairy: [
      { value: "Milk", label: "Milk" },
      { value: "Cheese", label: "Cheese" },
      { value: "Yogurt", label: "Yogurt" },
      { value: "Butter", label: "Butter" },
    ],
    Bakery: [
      { value: "Bread", label: "Bread" },
      { value: "Cakes", label: "Cakes" },
      { value: "Pastries", label: "Pastries" },
      { value: "Cookies", label: "Cookies" },
    ],
    Beverages: [
      { value: "Juices", label: "Juices" },
      { value: "Soda", label: "Soda" },
      { value: "Water", label: "Water" },
      { value: "Energy Drinks", label: "Energy Drinks" },
    ],
    Beauty: [
      { value: "Skin care", label: "Skin care" },
      { value: "Hair care", label: "Hair care" },
      { value: "Makeup", label: "Makeup" },
      { value: "Fragrance", label: "Fragrance" },
    ],
    Cleaning: [
      { value: "Detergents", label: "Detergents" },
      { value: "Disinfectants", label: "Disinfectants" },
      { value: "Dishwash", label: "Dishwash" },
      { value: "Air Fresheners", label: "Air Fresheners" },
    ],
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === "mainCategory" && prev.subCategory) {
      setFormData((prev) => ({ ...prev, subCategory: "", [field]: value }));
    }
  };

  const handleSubmit = () => {
    const payload = {
      main: formData.mainCategory,
      sub: formData.subCategory,
      code: formData.code,
      name: formData.productName,
      bp: formData.buyingPrice,
      sp: formData.sellingPrice,
      qty: formData.quantity,
      unit: formData.unit,
    };

    if (mode === "add") {
      onCreate(payload);
    } else if (mode === "edit") {
      onUpdate(payload);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/40 backdrop-blur-sm transition-opacity duration-300"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-4xl rounded-2xl bg-white shadow-xl ring-1 ring-black/10">
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#ef4444] text-white shadow hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#ef4444]/50"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-6 sm:p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-[#2c323c]">
              {mode === "add" ? "Add Adjustment" : "Edit Adjustment"}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <SelectFloating
              id="mainCategory"
              label="Main Category"
              value={formData.mainCategory}
              onChange={(e) => handleInputChange("mainCategory", e.target.value)}
              onFocus={() => setFieldFocus("mainCategory", true)}
              onBlur={() => setFieldFocus("mainCategory", false)}
              isFocused={focusedFields.mainCategory}
              options={mainCategoryOptions}
            />

            <SelectFloating
              id="subCategory"
              label="Sub Category"
              value={formData.subCategory}
              onChange={(e) => handleInputChange("subCategory", e.target.value)}
              onFocus={() => setFieldFocus("subCategory", true)}
              onBlur={() => setFieldFocus("subCategory", false)}
              isFocused={focusedFields.subCategory}
              options={formData.mainCategory ? subCategoriesMap[formData.mainCategory] || [] : []}
              disabled={!formData.mainCategory}
            />

            <InputFloating
              id="code"
              label="Code"
              value={formData.code}
              onChange={(e) => handleInputChange("code", e.target.value)}
              onFocus={() => setFieldFocus("code", true)}
              onBlur={() => setFieldFocus("code", false)}
              isFocused={focusedFields.code}
            />

            <InputFloating
              id="productName"
              label="Product Name"
              value={formData.productName}
              onChange={(e) => handleInputChange("productName", e.target.value)}
              onFocus={() => setFieldFocus("productName", true)}
              onBlur={() => setFieldFocus("productName", false)}
              isFocused={focusedFields.productName}
            />

            <InputFloating
              id="buyingPrice"
              label="Buying Price"
              value={formData.buyingPrice}
              onChange={(e) => handleInputChange("buyingPrice", e.target.value)}
              type="number"
              onFocus={() => setFieldFocus("buyingPrice", true)}
              onBlur={() => setFieldFocus("buyingPrice", false)}
              isFocused={focusedFields.buyingPrice}
            />

            <InputFloating
              id="sellingPrice"
              label="Selling Price"
              value={formData.sellingPrice}
              onChange={(e) => handleInputChange("sellingPrice", e.target.value)}
              type="number"
              onFocus={() => setFieldFocus("sellingPrice", true)}
              onBlur={() => setFieldFocus("sellingPrice", false)}
              isFocused={focusedFields.sellingPrice}
            />

            <InputFloating
              id="quantity"
              label="Quantity"
              value={formData.quantity}
              onChange={(e) => handleInputChange("quantity", e.target.value)}
              type="number"
              onFocus={() => setFieldFocus("quantity", true)}
              onBlur={() => setFieldFocus("quantity", false)}
              isFocused={focusedFields.quantity}
            />

            <InputFloating
              id="unit"
              label="Unit"
              value={formData.unit}
              onChange={(e) => handleInputChange("unit", e.target.value)}
              onFocus={() => setFieldFocus("unit", true)}
              onBlur={() => setFieldFocus("unit", false)}
              isFocused={focusedFields.unit}
            />
          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="button"
              className="px-8 py-3 rounded-xl text-lg font-medium bg-[#6F9C3D] text-white hover:bg-[#5d8a32] transition-colors min-w-[200px]"
              onClick={handleSubmit}
            >
              {mode === "add" ? "Create" : "Update"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdjustmentsModal;