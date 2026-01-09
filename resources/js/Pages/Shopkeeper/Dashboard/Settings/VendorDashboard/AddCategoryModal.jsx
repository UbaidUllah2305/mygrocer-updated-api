import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

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
      <div className="relative bg-white rounded-xl w-full max-w-md max-h-[90vh] shadow-xl overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 z-10 bg-red-600 rounded-full text-white"
          aria-label="Close"
        >
          <X />
        </button>

        <div className="p-6">
          {/* Header */}
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {editCategory ? 'Edit Category' : 'Add a New Category'}
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Row 1: Category Name, Sub Category, Status */}
            <div className="grid grid-cols-1 gap-4 mb-4">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Category Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6F9C3D] focus:border-[#6F9C3D]"
              />
              <input
                type="text"
                value={formData.subCategory}
                onChange={(e) => handleChange('subCategory', e.target.value)}
                placeholder="Sub Category"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6F9C3D] focus:border-[#6F9C3D]"
              />
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6F9C3D] focus:border-[#6F9C3D] appearance-none bg-white"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6F9C3D] focus:border-[#6F9C3D] resize-none"
              />
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="w-full bg-[#6F9C3D] hover:bg-[#5a7d31] text-white py-3 rounded-lg font-medium text-base transition"
            >
              {editCategory ? 'Update Category' : 'Save Category'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal;