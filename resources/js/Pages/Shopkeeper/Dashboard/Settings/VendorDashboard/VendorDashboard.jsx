import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import VendorCategoriesTable from "./VendorCategoriesTable";
import AddCategoryModal from "./AddCategoryModal";
import DeleteConfirmationModal from "@/Components/DeleteConfirmationModal"; 

const VendorDashboard = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null); 

  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'Food',
      description: 'Testing',
      subCategory: 'Drinks',
      status: 'Active'
    }
  ]);

  const handleAddCategory = () => {
    setEditCategory(null);
    setShowAddModal(true);
  };

  const handleEditCategory = (category) => {
    setEditCategory(category);
    setShowAddModal(true);
  };

  // Open confirmation modal instead of deleting directly
  const handleDeleteCategory = (category) => {
    setCategoryToDelete(category);
  };

  // Actual delete logic
  const confirmDelete = () => {
    if (categoryToDelete) {
      setCategories(prev => prev.filter(cat => cat.id !== categoryToDelete.id));
      setCategoryToDelete(null);
    }
  };

  const handleSaveCategory = (formData, editId = null) => {
    if (editId) {
      setCategories(prev =>
        prev.map(cat => (cat.id === editId ? { ...cat, ...formData } : cat))
      );
    } else {
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
    <>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Vendor Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Manage your product categories
          </p>
        </div>
        <button
          onClick={handleAddCategory}
          className="bg-[#6F9C3D] hover:bg-[#5a7d31] text-white px-6 py-2.5 rounded-xl font-medium text-base sm:text-lg transition"
        >
          Add New Category
        </button>
      </div>

      {/* Table */}
      <VendorCategoriesTable
        categories={categories}
        onEdit={handleEditCategory}
        onDelete={handleDeleteCategory} 
      />

      {/* Modals */}
      <AddCategoryModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setEditCategory(null);
        }}
        onSave={handleSaveCategory}
        editCategory={editCategory}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={!!categoryToDelete}
        onClose={() => setCategoryToDelete(null)}
        onConfirm={confirmDelete}
        itemName={categoryToDelete?.name || 'this category'}
        itemType="category"
      />
    </>
  );
};

export default VendorDashboard;