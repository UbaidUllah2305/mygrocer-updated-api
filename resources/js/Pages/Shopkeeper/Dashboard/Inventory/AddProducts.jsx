import React, { useState, useEffect, useRef } from "react";
import { useForm, router, usePage } from "@inertiajs/react";
import { Plus } from "lucide-react";
import InputFloating from "@/Components/InputFloating";
import SelectFloating from "@/Components/SelectFloating";
import FloatingTextarea from "@/Components/FloatingTextarea";
import axios from "axios";

export default function AddProducts({ auth }) {
  const { props } = usePage();
  const productId = props.productId;
  const isEdit = !!productId;

  const [focusedFields, setFocusedFields] = useState({});
  const [loading, setLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([null]);
  const imageRefs = useRef([]);
  
  // Initialize products
  const [products, setProducts] = useState([{
    category: "",
    subCategory: "",
    itemName: "",
    brandName: "",
    buyingPrice: "",
    sellingPrice: "",
    itemQuantity: "",
    expiryDate: "",
    itemPicture: "",
    promo: "",
    discount: "",
    tags: "",
    visibility: "public",
    specialRemarks: "",
    addLoyaltyPoints: "",
    itemDescriptions: "",
  }]);

  const { data, setData, post, put, processing, errors } = useForm({
    products: products,
  });

  // Fetch product data if editing
  useEffect(() => {
    if (isEdit && productId) {
      setLoading(true);
      axios.get(`/api/v1/inventory/${productId}`)
        .then(response => {
          const productData = response.data;
          const mappedProduct = {
            id: productData.id,
            category: productData.category || "",
            subCategory: productData.subCategory || productData.sub || "",
            itemName: productData.itemName || productData.name || "",
            brandName: productData.brandName || "",
            buyingPrice: productData.buyingPrice || productData.bp || "",
            sellingPrice: productData.sellingPrice || productData.sp || "",
            itemQuantity: productData.itemQuantity || productData.qty || "",
            expiryDate: productData.expiryDate || "",
            itemPicture: productData.itemPicture || productData.image || "",
            promo: productData.promo || "",
            discount: productData.discount || "",
            tags: productData.tags || "",
            visibility: productData.visibility || "public",
            specialRemarks: productData.specialRemarks || "",
            addLoyaltyPoints: productData.addLoyaltyPoints || "",
            itemDescriptions: productData.itemDescriptions || "",
            code: productData.code || "",
          };
          setProducts([mappedProduct]);
          setImagePreviews([mappedProduct.itemPicture || null]);
        })
        .catch(error => {
          console.error("Failed to fetch product:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isEdit, productId]);

  // Update form data when products change
  useEffect(() => {
    setData("products", products);
  }, [products]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEdit && products[0]?.code) {
      // Update existing product
      put(`/api/inventory/${products[0].code}`, {
        onSuccess: () => {
          router.visit("/inventory");
        },
        onError: (errors) => {
          console.error("Update failed:", errors);
        },
      });
    } else {
      // Create new product(s)
      post("/api/inventory", {
        onSuccess: () => {
          router.visit("/inventory");
        },
        onError: (errors) => {
          console.error("Creation failed:", errors);
        },
      });
    }
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [field]: value,
    };
    setProducts(updatedProducts);
  };

  const handleImageUpload = (e, index) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      const newPreviews = [...imagePreviews];
      newPreviews[index] = reader.result;
      setImagePreviews(newPreviews);
      
      // Update product data
      handleProductChange(index, 'itemPicture', reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAddMoreItem = () => {
    setProducts([
      ...products,
      {
        category: "",
        subCategory: "",
        itemName: "",
        brandName: "",
        buyingPrice: "",
        sellingPrice: "",
        itemQuantity: "",
        expiryDate: "",
        itemPicture: "",
        promo: "",
        discount: "",
        tags: "",
        visibility: "public",
        specialRemarks: "",
        addLoyaltyPoints: "",
        itemDescriptions: "",
      },
    ]);
    setImagePreviews([...imagePreviews, null]);
  };

  const setFieldFocus = (fieldKey, isFocused) => {
    setFocusedFields((prev) => ({
      ...prev,
      [fieldKey]: isFocused,
    }));
  };

  // Categories and subcategories data
  const categories = [
    { value: "electronics", label: "Electronics" },
    { value: "clothing", label: "Clothing" },
    { value: "books", label: "Books" },
    { value: "home", label: "Home & Garden" },
    { value: "beauty", label: "Beauty & Personal Care" },
    { value: "freshfood", label: "Fresh Food" },
  ];

  const subcategories = {
    electronics: [
      { value: "phones", label: "Phones" },
      { value: "laptops", label: "Laptops" },
      { value: "tablets", label: "Tablets" },
      { value: "accessories", label: "Accessories" },
      { value: "audio", label: "Audio Equipment" },
    ],
    clothing: [
      { value: "men", label: "Men's Clothing" },
      { value: "women", label: "Women's Clothing" },
      { value: "kids", label: "Kids' Clothing" },
      { value: "footwear", label: "Footwear" },
      { value: "accessories", label: "Clothing Accessories" },
    ],
    books: [
      { value: "fiction", label: "Fiction" },
      { value: "nonfiction", label: "Non-Fiction" },
      { value: "textbooks", label: "Textbooks" },
      { value: "comics", label: "Comics & Graphic Novels" },
      { value: "children", label: "Children's Books" },
    ],
    home: [
      { value: "furniture", label: "Furniture" },
      { value: "decor", label: "Home Decor" },
      { value: "kitchen", label: "Kitchenware" },
      { value: "garden", label: "Garden Tools" },
      { value: "appliances", label: "Home Appliances" },
    ],
    beauty: [
      { value: "skincare", label: "Skincare" },
      { value: "makeup", label: "Makeup" },
      { value: "haircare", label: "Hair Care" },
      { value: "fragrance", label: "Fragrances" },
      { value: "tools", label: "Beauty Tools" },
    ],
    freshfood: [
      { value: "fruits", label: "Fruits & Vegetables" },
      { value: "dairy", label: "Dairy Products" },
      { value: "meat", label: "Meat & Poultry" },
      { value: "seafood", label: "Seafood" },
      { value: "bakery", label: "Bakery Items" },
    ],
  };

  return (
    <>
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {isEdit ? "Edit Product" : "Add New Product"}
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          {isEdit 
            ? "Update product information in your inventory" 
            : "Add products to your inventory"}
        </p>
      </div>

      {/* Form Container */}
      <div className="w-full">
        <form onSubmit={handleSubmit}>
          {products.map((product, index) => {
            const fieldKey = (field) => `${field}-${index}`;

            return (
              <div key={index} className="mb-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <SelectFloating
                    id={fieldKey("category")}
                    label="Category"
                    value={product.category}
                    onChange={(e) =>
                      handleProductChange(index, "category", e.target.value)
                    }
                    onFocus={() => setFieldFocus(fieldKey("category"), true)}
                    onBlur={() => setFieldFocus(fieldKey("category"), false)}
                    isFocused={focusedFields[fieldKey("category")]}
                    options={categories}
                  />

                  <SelectFloating
                    id={fieldKey("subCategory")}
                    label="Sub Category"
                    value={product.subCategory}
                    onChange={(e) =>
                      handleProductChange(index, "subCategory", e.target.value)
                    }
                    onFocus={() => setFieldFocus(fieldKey("subCategory"), true)}
                    onBlur={() => setFieldFocus(fieldKey("subCategory"), false)}
                    isFocused={focusedFields[fieldKey("subCategory")]}
                    options={
                      product.category
                        ? subcategories[product.category] || []
                        : []
                    }
                    disabled={!product.category}
                  />

                  <InputFloating
                    id={fieldKey("itemName")}
                    label="Item Name"
                    value={product.itemName}
                    onChange={(e) =>
                      handleProductChange(index, "itemName", e.target.value)
                    }
                    onFocus={() => setFieldFocus(fieldKey("itemName"), true)}
                    onBlur={() => setFieldFocus(fieldKey("itemName"), false)}
                    isFocused={focusedFields[fieldKey("itemName")]}
                  />

                  <InputFloating
                    id={fieldKey("brandName")}
                    label="Brand Name"
                    value={product.brandName}
                    onChange={(e) =>
                      handleProductChange(index, "brandName", e.target.value)
                    }
                    onFocus={() => setFieldFocus(fieldKey("brandName"), true)}
                    onBlur={() => setFieldFocus(fieldKey("brandName"), false)}
                    isFocused={focusedFields[fieldKey("brandName")]}
                  />

                  <InputFloating
                    id={fieldKey("buyingPrice")}
                    label="Buying Price"
                    value={product.buyingPrice}
                    onChange={(e) =>
                      handleProductChange(index, "buyingPrice", e.target.value)
                    }
                    type="number"
                    onFocus={() => setFieldFocus(fieldKey("buyingPrice"), true)}
                    onBlur={() => setFieldFocus(fieldKey("buyingPrice"), false)}
                    isFocused={focusedFields[fieldKey("buyingPrice")]}
                  />

                  <InputFloating
                    id={fieldKey("sellingPrice")}
                    label="Selling Price"
                    value={product.sellingPrice}
                    onChange={(e) =>
                      handleProductChange(index, "sellingPrice", e.target.value)
                    }
                    type="number"
                    onFocus={() => setFieldFocus(fieldKey("sellingPrice"), true)}
                    onBlur={() => setFieldFocus(fieldKey("sellingPrice"), false)}
                    isFocused={focusedFields[fieldKey("sellingPrice")]}
                  />

                  <InputFloating
                    id={fieldKey("itemQuantity")}
                    label="Item Quantity"
                    value={product.itemQuantity}
                    onChange={(e) =>
                      handleProductChange(index, "itemQuantity", e.target.value)
                    }
                    type="number"
                    onFocus={() => setFieldFocus(fieldKey("itemQuantity"), true)}
                    onBlur={() => setFieldFocus(fieldKey("itemQuantity"), false)}
                    isFocused={focusedFields[fieldKey("itemQuantity")]}
                  />

                  <InputFloating
                    id={fieldKey("expiryDate")}
                    label="Expiry Date"
                    type="date"
                    value={product.expiryDate}
                    onChange={(e) =>
                      handleProductChange(index, "expiryDate", e.target.value)
                    }
                    onFocus={() => setFieldFocus(fieldKey("expiryDate"), true)}
                    onBlur={() => setFieldFocus(fieldKey("expiryDate"), false)}
                    isFocused={focusedFields[fieldKey("expiryDate")]}
                  />

                  {/* Item Picture Upload */}
                  <div className="flex items-center justify-between gap-4 p-1 sm:p-2 rounded-xl border-2 border-[#B9BBBD] bg-white">
                    <label className="px-2 text-sm sm:text-base text-gray-600 flex-1">
                        Item Picture
                    </label>
                    <button
                        type="button"
                        onClick={() => imageRefs.current?.click()}
                        className="px-4 py-2 sm:px-6 sm:py-2.5 bg-[#6F9C3D] text-white text-sm sm:text-base font-medium rounded-lg hover:bg-[#5d8a32] transition-colors whitespace-nowrap"
                    >
                        Choose Image
                    </button>
                    <input
                        type="file"
                        ref={imageRefs}
                        onChange={(e) => handleImageUpload(e, index)}
                        accept="image/*"
                        className="hidden"
                    />
                  </div>

                  <InputFloating
                    id={fieldKey("promo")}
                    label="Promo"
                    value={product.promo}
                    onChange={(e) =>
                      handleProductChange(index, "promo", e.target.value)
                    }
                    onFocus={() => setFieldFocus(fieldKey("promo"), true)}
                    onBlur={() => setFieldFocus(fieldKey("promo"), false)}
                    isFocused={focusedFields[fieldKey("promo")]}
                  />

                  <InputFloating
                    id={fieldKey("discount")}
                    label="Discount %"
                    value={product.discount}
                    onChange={(e) =>
                      handleProductChange(index, "discount", e.target.value)
                    }
                    type="number"
                    onFocus={() => setFieldFocus(fieldKey("discount"), true)}
                    onBlur={() => setFieldFocus(fieldKey("discount"), false)}
                    isFocused={focusedFields[fieldKey("discount")]}
                  />

                  <InputFloating
                    id={fieldKey("tags")}
                    label="Tags"
                    value={product.tags}
                    onChange={(e) =>
                      handleProductChange(index, "tags", e.target.value)
                    }
                    onFocus={() => setFieldFocus(fieldKey("tags"), true)}
                    onBlur={() => setFieldFocus(fieldKey("tags"), false)}
                    isFocused={focusedFields[fieldKey("tags")]}
                  />

                  <SelectFloating
                    id={fieldKey("visibility")}
                    label="Visibility"
                    value={product.visibility}
                    onChange={(e) =>
                      handleProductChange(index, "visibility", e.target.value)
                    }
                    onFocus={() => setFieldFocus(fieldKey("visibility"), true)}
                    onBlur={() => setFieldFocus(fieldKey("visibility"), false)}
                    isFocused={focusedFields[fieldKey("visibility")]}
                    options={[
                      { value: "public", label: "Public" },
                      { value: "private", label: "Private" },
                      { value: "hidden", label: "Hidden" },
                    ]}
                  />

                  <InputFloating
                    id={fieldKey("specialRemarks")}
                    label="Special Remarks"
                    value={product.specialRemarks}
                    onChange={(e) =>
                      handleProductChange(index, "specialRemarks", e.target.value)
                    }
                    onFocus={() => setFieldFocus(fieldKey("specialRemarks"), true)}
                    onBlur={() => setFieldFocus(fieldKey("specialRemarks"), false)}
                    isFocused={focusedFields[fieldKey("specialRemarks")]}
                  />

                  <InputFloating
                    id={fieldKey("addLoyaltyPoints")}
                    label="Add Loyalty Points"
                    value={product.addLoyaltyPoints}
                    onChange={(e) =>
                      handleProductChange(index, "addLoyaltyPoints", e.target.value)
                    }
                    type="number"
                    onFocus={() => setFieldFocus(fieldKey("addLoyaltyPoints"), true)}
                    onBlur={() => setFieldFocus(fieldKey("addLoyaltyPoints"), false)}
                    isFocused={focusedFields[fieldKey("addLoyaltyPoints")]}
                  />
                </div>

                <div className="my-8">
                  <FloatingTextarea
                    id={fieldKey("itemDescriptions")}
                    label="Item Descriptions"
                    value={product.itemDescriptions}
                    onChange={(e) =>
                      handleProductChange(index, "itemDescriptions", e.target.value)
                    }
                    onFocus={() => setFieldFocus(fieldKey("itemDescriptions"), true)}
                    onBlur={() => setFieldFocus(fieldKey("itemDescriptions"), false)}
                    isFocused={focusedFields[fieldKey("itemDescriptions")]}
                    rows={4}
                  />
                </div>

                {index < products.length - 1 && (
                  <hr className="my-8 border-[#9B9DA2]" />
                )}
              </div>
            );
          })}

          {/* Add More Item Button */}
          {!isEdit && (
            <div className="flex justify-center items-center my-8">
              <div className="flex-1 h-px bg-[#9B9DA2]"></div>
              <button
                type="button"
                onClick={handleAddMoreItem}
                className="mx-4 px-6 py-2.5 border-2 border-[#B9BBBD] rounded-full text-[#9B9DA2] text-lg font-medium hover:bg-gray-50 hover:border-[#6F9C3D] hover:text-[#6F9C3D] transition-all flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add More Item
              </button>
              <div className="flex-1 h-px bg-[#9B9DA2]"></div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="submit"
              className="px-8 py-3 rounded-xl text-lg font-medium bg-[#6F9C3D] text-white hover:bg-[#5d8a32] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={processing}
            >
              {processing ? "Saving..." : isEdit ? "Update Product" : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
