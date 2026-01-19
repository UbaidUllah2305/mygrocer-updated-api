import React, { useState, useEffect, useRef } from "react";
import { X, ChevronDown } from "lucide-react";

const ListModal = ({
  isOpen,
  onClose,
  mode = "add", // 'add' or 'edit'
  initialData = {},
  categories = []
}) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const categoryDropdownRef = useRef(null);
  const productDropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
        setIsCategoryDropdownOpen(false);
      }
      if (productDropdownRef.current && !productDropdownRef.current.contains(event.target)) {
        setIsProductDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync initial data when editing
  useEffect(() => {
    if (isOpen) {
      setName(initialData?.name || "");
      setCategory(initialData?.category || "");
      setProducts(initialData?.products || []);
    }
  }, [isOpen, initialData]);

  const allProducts = [
    "Brown Bread", "Eggs", "Apples", "Fresh Butter", "Milk", "Cheese",
    "Tomatoes", "Onions", "Rice", "Pasta", "Olive Oil", "Chicken Breast",
    "Bananas", "Carrots", "Potatoes", "Yogurt", "Cereal", "Juice"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter a list name.");
      return;
    }
    alert(`${mode === "edit" ? "Updated" : "Created"} list: ${name}`);
    onClose();
  };

  const removeProduct = (productToRemove) => {
    setProducts(products.filter(p => p !== productToRemove));
  };

  const toggleProduct = (product) => {
    if (products.includes(product)) {
      setProducts(products.filter(p => p !== product));
    } else {
      setProducts([...products, product]);
    }
  };

  const filteredProducts = allProducts.filter(product =>
    product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-3xl p-6 md:p-8 shadow-xl relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-500 p-1.5 rounded-full text-white hover:bg-red-600 transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl md:text-2xl font-bold text-neutral-900 mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
          {mode === "edit" ? "Edit List" : "Create New List"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name of your list"
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6F9C3D] text-base md:text-lg text-neutral-400"
            style={{ fontFamily: "'Inter', sans-serif'" }}
          />

          <div className="relative" ref={categoryDropdownRef}>
            <button
              type="button"
              onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
              className="w-full p-2 border border-neutral-300 rounded-lg flex items-center justify-between text-left px-4 py-2"
            >
              <span className="text-base">{category || "Select Category"}</span>
              <ChevronDown className="w-5 h-5" />
            </button>

            {isCategoryDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                {categories.map((cat) => (
                  <div
                    key={cat}
                    onClick={() => {
                      setCategory(cat);
                      setIsCategoryDropdownOpen(false);
                    }}
                    className={`px-4 py-2 text-base cursor-pointer hover:bg-gray-100 ${category === cat ? "bg-[#D3FFA1AB]" : ""}`}
                  >
                    {cat}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg md:text-lg font-medium mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
            Selected Products
          </h3>

          <div className="relative" ref={productDropdownRef}>
            <button
              type="button"
              onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
              className="w-full p-3 bg-gray-200 rounded-lg flex items-center justify-between text-left"
            >
              <span className="text-sm text-gray-600">
                {products.length > 0
                  ? `${products.length} product(s) selected`
                  : "Select products you want to add from the dropdown"}
              </span>
              <ChevronDown className="w-5" />
            </button>

            {isProductDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                <div className="p-2 border-b border-gray-200">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6F9C3D]"
                  />
                </div>
                <div className="max-h-40 overflow-y-auto">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <div
                        key={product}
                        onClick={() => toggleProduct(product)}
                        className={`px-4 py-2 text-sm cursor-pointer flex items-center gap-2 hover:bg-gray-100 ${products.includes(product) ? "bg-[#D3FFA1AB]" : ""}`}
                      >
                        <input
                          type="checkbox"
                          checked={products.includes(product)}
                          onChange={() => toggleProduct(product)}
                          className="h-4 w-4 text-[#6F9C3D] rounded focus:ring-[#6F9C3D]"
                        />
                        <span>{product}</span>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-sm text-gray-500">No products found.</div>
                  )}
                </div>
              </div>
            )}
          </div>

          {products.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {products.map((product) => (
                <div
                  key={product}
                  className="flex items-center gap-4 px-3 py-1 bg-white border border-gray-300 rounded-lg text-sm md:text-base"
                >
                  <span>{product}</span>
                  <button
                    onClick={() => removeProduct(product)}
                    className="hover:text-gray-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="w-full md:max-w-[324px] py-3 bg-[#6F9C3D] text-white text-base md:text-lg font-medium rounded-lg hover:bg-[#5A7E2F] transition"
          >
            {mode === "edit" ? "Update List" : "Make a List"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListModal;