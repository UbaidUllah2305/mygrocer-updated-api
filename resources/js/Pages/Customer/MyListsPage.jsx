// resources/js/Pages/Customer/MyListsPage.jsx

import React, { useState, useRef, useEffect } from "react";
import { Link } from "@inertiajs/react";
import { Eye, Pencil, Trash2, X, ChevronDown, XCircle } from "lucide-react";
import CustomerHeader from "../../Components/Customer/CustomerHeader";

const ListModal = ({ isOpen, onClose, title, isEditing = false, initialData = {}, categories = [] }) => {
  const [name, setName] = useState((initialData && initialData.name) || "");
  const [category, setCategory] = useState((initialData && initialData.category) || "");
  const [products, setProducts] = useState((initialData && initialData.products) || []);
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

  // Mock product list
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
    alert(`${isEditing ? "Updated" : "Created"} list: ${name}`);
    onClose();
    setName("");
    setCategory("");
    setProducts([]);
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
      <div className="bg-white rounded-xl w-full max-w-5xl p-6 shadow-xl relative overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 bg-red-500 rounded-2xl text-white hover:text-gray-700 transition z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Title */}
        <h2
          className="text-xl md:text-2xl font-bold text-neutral-900 mb-6"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {title}
        </h2>

        {/* Name & Category Inputs Side-by-Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Name Input */}
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name of your list"
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6F9C3D] text-base md:text-lg text-neutral-400"
              style={{ fontFamily: "'Inter', sans-serif'" }}
            />
          </div>

          {/* Custom Category Dropdown */}
          <div>
            <div className="relative" ref={categoryDropdownRef}>
              <button
                type="button"
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className="w-full p-2 border border-neutral-300 rounded-lg flex items-center justify-between text-left px-4 py-2"
              >
                <span className="text-base">
                  {category || "Select Category"}
                </span>
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
                      className={`px-4 py-2 text-base cursor-pointer hover:bg-gray-100 ${category === cat ? "bg-[#D3FFA1AB]" : ""
                        }`}
                    >
                      {cat}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Selected Products Section */}
        <div className="mb-6">
          <h3
            className="text-lg md:text-lg font-medium mb-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Selected Products
          </h3>

          {/* Custom Product Dropdown */}
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
                        className={`px-4 py-2 text-sm cursor-pointer flex items-center gap-2 hover:bg-gray-100 ${products.includes(product) ? "bg-[#D3FFA1AB]" : ""
                          }`}
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

          {/* Selected Product Tags */}
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

        {/* Make a List Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="w-full md:max-w-[324px] py-3 bg-[#6F9C3D] text-white text-base md:text-lg font-medium rounded-lg hover:bg-[#5A7E2F] transition"
          >
            {isEditing ? "Update List" : "Make a List"}
          </button>
        </div>
      </div>
    </div>
  );
};

const MyListsPage = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingList, setEditingList] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [viewingList, setViewingList] = useState(null);
  const [deletingList, setDeletingList] = useState(null);

  const categories = ["Grocery", "Household", "Personal Care", "Snacks", "Beverages"];

  const lists = [
    {
      id: 1,
      name: "My Daily Grocery",
      details: "Eggs, Bread, Apples, Butter",
      actions: "edit",
    },
  ];

  const ViewListModal = ({ isOpen, onClose, list }) => {
    if (!isOpen || !list) return null;

    // Parse details into products
    const products = list.details.split(',').map(item => item.trim());

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl w-full max-w-5xl p-6 shadow-xl relative overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-0 right-0 bg-red-500 rounded-2xl text-white hover:text-gray-700 transition z-10"
          >
            <X />
          </button>

          {/* Title */}
          <h2
            className="text-xl font-bold text-neutral-900 mb-6"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            View My List
          </h2>

          {/* Category & Items */}
          <div className="space-y-4 flex justify-between">
            {products.map((product, idx) => (
              <div
                key={idx}
                className="p-3 bg-[#f7f7f7] rounded-lg"
              >
                <div className="flex flex-col items-start gap-4">
                  <div>
                    <span className="font-semibold">Category:</span> {"Bakery"} 
                  </div>
                  <div>
                    <span className="font-semibold">Item:</span> {product}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, listName }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-sm p-6 shadow-xl relative">
          {/* Warning Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full text-red-600 bg-red-100 flex items-center justify-center">
              <XCircle className="w-8 h-8" />
            </div>
          </div>

          {/* Title */}
          <h2
            className="text-xl font-bold text-center text-gray-900 mb-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Delete List?
          </h2>

          {/* Message */}
          <p
            className="text-center text-gray-600 mb-6"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Are you sure you want to delete "{listName}"? This action cannot be undone.
          </p>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-2 bg-[#6F9C3D] text-white rounded-lg hover:bg-[#6F9C3D4F] transition font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <CustomerHeader />

      <main className="pt-20 px-4 sm:px-6 lg:px-8 pb-10">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div
            className="flex items-center gap-2 text-base md:text-lg mb-6 mt-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <Link href="/" className="hover:text-[#6F9C3D]">
              Go to home
            </Link>
            <span>/</span>
            <Link href="/customer/dashboard" className="hover:text-[#6F9C3D] font-medium">
              Dashboard
            </Link>
            <span>/</span>
            <span className="font-medium underline">My Lists</span>
          </div>

          {/* Page Title & Add New List Button */}
          <div className="flex justify-between mb-6">
            <h1
              className="text-2xl font-semibold"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              My Lists
            </h1>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 bg-[#6F9C3D] text-white md:text-lg rounded-lg hover:bg-[#5A7E2F] transition"
            >
              Add a new List
            </button>
          </div>

          {/* Lists Table */}
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              {/* Table Header */}
              <div className="rounded-xl bg-[#6F9C3D4F] p-1">
                <div className="grid grid-cols-4 text-lg font-medium text-neutral-800" style={{ fontFamily: "'Inter', sans-serif" }}>
                  <div className="text-left ml-10 py-2 truncate">#</div>
                  <div className="text-center py-2 truncate">List Name</div>
                  <div className="text-center py-2 truncate">Details</div>
                  <div className="text-center py-2 truncate">Actions</div>
                </div>
              </div>

              {/* Table rows */}
              <div className="mt-3 space-y-3">
                {lists.map((list) => (
                  <div
                    key={list.id}
                    className="relative rounded-xl bg-[#f7f7f7] p-1 shadow-sm ring-1 ring-black/5 transition-all hover:bg-[#f3f3f3]"
                  >
                    <div className="grid grid-cols-4 gap-2 items-center text-lg text-neutral-800 font-normal" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                      <div className="text-left ml-10 py-2 truncate">{list.id}</div>
                      <div className="text-center py-2 truncate">{list.name}</div>
                      <div className="text-center py-2 truncate">{list.details}</div>
                      <div className="text-center py-2 flex items-center justify-center gap-2">
                        <button
                          onClick={() => {
                            setViewingList(list);
                            setIsViewModalOpen(true);
                          }}
                          className="inline-flex h-5 w-5 items-center justify-center text-neutral-400"
                          aria-label="View details"
                        >
                          <Eye />
                        </button>
                        <button
                          onClick={() => {
                            const productsArray = list.details.split(',').map(item => item.trim());
                            setEditingList({
                              ...list,
                              products: productsArray
                            });
                            setIsEditModalOpen(true);
                          }}
                          className="inline-flex h-5 w-5 items-center justify-center text-[#6F9C3D]"
                          aria-label="Edit"
                        >
                          <Pencil />
                        </button>
                        <button
                          onClick={() => {
                            setDeletingList(list);
                            setIsDeleteModalOpen(true);
                          }}
                          className="inline-flex h-5 w-5 items-center justify-center"
                          aria-label="Delete"
                        >
                          <Trash2 />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {lists.length === 0 && (
                  <div className="rounded-xl bg-white p-4 text-center text-sm text-gray-600">
                    No lists found.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        <ListModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="My List"
          isEditing={false}
          categories={categories}
        />

        <ListModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="My List"
          isEditing={true}
          initialData={editingList}
          categories={categories}
        />

        {/* View List Modal */}
        <ViewListModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          list={viewingList}
        />

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => {
            alert(`Deleted list: ${deletingList.name}`);
            setIsDeleteModalOpen(false);
            setDeletingList(null);
          }}
          listName={deletingList?.name || ""}
        />
      </main>
    </div>
  );
};

export default MyListsPage;