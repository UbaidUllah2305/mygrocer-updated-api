import React, { useState, useEffect } from 'react';
import Header from '../../../Components/Admin/Header';
import Sidebar from '../../../Components/Admin/Sidebar';
import { router } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';

// Add New Category Modal
const AddCategoryModal = ({ isOpen, onClose, onSave, editCategory = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    subCategory: '',
    status: '',
    description: ''
  });

  useEffect(() => {
    if (editCategory) {
      setFormData({
        name: editCategory.name || '',
        subCategory: editCategory.subCategory || '',
        status: editCategory.status || '',
        description: editCategory.description || ''
      });
    } else {
      setFormData({
        name: '',
        subCategory: '',
        status: '',
        description: ''
      });
    }
  }, [editCategory, isOpen]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData, editCategory?.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="relative bg-white rounded-xl w-full max-w-[700px] shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 z-10"
          aria-label="Close"
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="15" cy="15" r="15" fill="#DF3A3A" />
              <path d="M10 10L20 20M20 10L10 20" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </button>

        <div className="p-6 pt-5">
          {/* Header */}
          <h2 className="text-3xl font-normal text-gray-800 mb-6" style={{ fontFamily: "'Satoshi', sans-serif" }}>
            Add a New Category
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Row 1: Category Name, Sub Category, Status */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Category Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none md:text-lg text-gray-700 placeholder-gray-400 focus:border-[#6F9C3D] transition"
                style={{ fontFamily: "'Satoshi', sans-serif" }}
              />
              <input
                type="text"
                value={formData.subCategory}
                onChange={(e) => handleChange('subCategory', e.target.value)}
                placeholder="Sub Category"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none md:text-lg text-gray-700 placeholder-gray-400 focus:border-[#6F9C3D] transition"
                style={{ fontFamily: "'Satoshi', sans-serif" }}
              />
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none md:text-lg text-gray-700 focus:border-[#6F9C3D] transition appearance-none bg-white"
                style={{ fontFamily: "'Satoshi', sans-serif" }}
              >
                <option value="" disabled>Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Row 2: Description */}
            <div className="mb-6">
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Enter Description"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none md:text-lg text-gray-700 placeholder-gray-400 focus:border-[#6F9C3D] transition resize-none"
                style={{ fontFamily: "'Satoshi', sans-serif" }}
              />
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="max-w-174 w-full h-16 bg-[#6F9C3D] hover:bg-[#5a7d31] text-white py-3 rounded-lg font-bold text-xl transition"
              style={{ fontFamily: "'Satoshi', sans-serif" }}
            >
              Save Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const VendorDashboard = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  // Mock data for categories
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'Food',
      description: 'Testing',
      subCategory: 'Drinks',
      status: 'Active'
    }
  ]);

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

  const handleAddCategory = () => {
    setEditCategory(null);
    setShowAddModal(true);
  };

  const handleEditCategory = (category) => {
    setEditCategory(category);
    setShowAddModal(true);
  };

  const handleDeleteCategory = (categoryId) => {
    setCategories(prev => prev.filter(cat => cat.id !== categoryId));
  };

  const handleSaveCategory = (formData, editId = null) => {
    if (editId) {
      // Update existing category
      setCategories(prev => prev.map(cat =>
        cat.id === editId
          ? { ...cat, ...formData }
          : cat
      ));
    } else {
      // Add new category
      const newCategory = {
        id: categories.length + 1,
        name: formData.name,
        description: formData.description,
        subCategory: formData.subCategory,
        status: formData.status || 'Active'
      };
      setCategories(prev => [...prev, newCategory]);
    }
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
          active="vendor-dashboard"
          onChange={handleSidebarChange}
          isMobile={isMobile}
          mobileOpen={isMobile ? isSidebarOpen : true}
          onCloseMobile={closeSidebar}
        />

        {/* Main Content */}
        <main
          className={`flex-1 overflow-y-auto p-4 sm:p-6 transition-all duration-300 ${isMobile ? "ml-0" : "ml-64"}`}
          style={{ marginTop: "99px" }}
        >
          {/* Breadcrumb */}
          <div className="text-lg sm:text-xl text-gray-500 mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
            Vendor Dashboard /
          </div>

          {/* Add New Category Button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={handleAddCategory}
              className="bg-[#6F9C3D] hover:bg-[#5a7d31] text-white h-12 px-6 py-2.5 rounded-xl text-lg sm:text-xl font-medium transition"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Add New Category
            </button>
          </div>

          {/* Categories Table */}
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Table Header */}
              <div className="rounded-xl bg-[#D2E0C3] p-5.5 h-17">
                <div className="grid grid-cols-6 gap-2 text-lg font-medium text-neutral-800 -ml-7" style={{ fontFamily: "'Inter', sans-serif" }}>
                  <div className="text-center">#</div>
                  <div className="text-center">Name</div>
                  <div className="text-center">Description</div>
                  <div className="text-center">Sub Category</div>
                  <div className="text-center">Status</div>
                  <div className="text-center">Action</div>
                </div>
              </div>

              {/* Table Rows */}
              <div className="mt-2 space-y-2">
                {categories.map((category, idx) => (
                  <div
                    key={category.id}
                    className="rounded-xl bg-[#D8D8D83B] shadow-sm p-4 hover:bg-gray-100 transition"
                  >
                    <div className="grid grid-cols-6 gap-2 items-center text-lg text-gray-700 -ml-7" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                      <div className="text-center">{idx + 1}</div>
                      <div className="text-center">{category.name}</div>
                      <div className="text-center">{category.description}</div>
                      <div className="text-center">{category.subCategory}</div>
                      <div className="text-center">{category.status}</div>
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEditCategory(category)}
                          className="p-2 text-[#6F9C3D] hover:text-[#6F9C3D] hover:bg-[#6F9C3D]/10 rounded-lg transition"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
                          className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {categories.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg" style={{ fontFamily: "'Inter', sans-serif" }}>
                    No categories found. Add your first category!
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Add Category Modal */}
      <AddCategoryModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setEditCategory(null);
        }}
        onSave={handleSaveCategory}
        editCategory={editCategory}
      />
    </div>
  );
};

export default VendorDashboard;