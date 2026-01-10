import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const AddEditCardModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  editCard = null,
  isSubCard = false 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: isSubCard ? 'delivery' : 'settings'
  });
  const [iconFile, setIconFile] = useState(null);
  const [iconPreview, setIconPreview] = useState(null);

  useEffect(() => {
    if (editCard) {
      setFormData({
        title: editCard.title || '',
        description: editCard.description || '',
        icon: editCard.icon || (isSubCard ? 'delivery' : 'settings')
      });
      setIconFile(null);
      setIconPreview(null);
    } else {
      setFormData({
        title: '',
        description: '',
        icon: isSubCard ? 'delivery' : 'settings'
      });
      setIconFile(null);
      setIconPreview(null);
    }
  }, [editCard, isOpen, isSubCard]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIconFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setIconPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCard = {
      id: editCard?.id || Date.now().toString(),
      title: formData.title,
      description: formData.description,
      icon: iconFile ? iconFile : formData.icon,
      link: isSubCard ? `/settings/${formData.icon}` : "/settings",
      isCustomIcon: !!iconFile,
    };
    onSave(newCard, editCard?.id, isSubCard);
    onClose();
  };

  if (!isOpen) return null;

  const previewContent = iconPreview ? (
    <img src={iconPreview} alt="Custom Icon" className="w-16 h-16 object-contain" />
  ) : (
    <img 
      src={`/Images/${formData.icon}.svg`} 
      alt={formData.icon}
      className="w-6 h-6"
      onError={(e) => e.target.src = "/Images/settings.svg"}
    />
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="relative bg-white rounded-xl w-full max-w-[580px] shadow-xl">
        <button 
          onClick={onClose} 
          className="absolute top-0 right-0 bg-red-500 rounded-full text-white z-10"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="p-6">
          <h2 className="text-xl md:text-2xl font-semibold text-neutral-900 mb-6">
            {editCard ? "Edit " : "Add "} {isSubCard ? "Sub-Card" : "Main Card"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Card Name"
                className="w-full px-4 py-3 rounded-lg border border-[#00000033] focus:border-[#6F9C3D] focus:ring-1 focus:ring-[#6F9C3D]/30 outline-none transition"
                required
              />
            </div>
            <div className="mb-4">
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Write description here"
                className="w-full px-4 py-3 rounded-lg border border-[#00000033] focus:border-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/30 outline-none transition"
                rows="3"
                required
              />
            </div>
            <div className="mb-6">
              <div className="flex flex-col items-center gap-3">
                <div className="w-20 h-20 border border-[#00000033] rounded-lg flex items-center justify-center">
                  {previewContent}
                </div>
                <div className="flex items-center gap-3 border border-[#00000033] rounded-lg">
                  <label
                    htmlFor="icon-upload"
                    className="px-4 py-2 bg-[#6F9C3D] text-white rounded-lg hover:bg-[#5a7d31] transition cursor-pointer"
                  >
                    Choose File
                  </label>
                  <input
                    id="icon-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <span className="text-sm text-gray-500 pr-3">
                    {iconFile ? iconFile.name : "No file chosen"}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full max-w-[350px] bg-[#6F9C3D] hover:bg-[#5a7d31] text-white py-3 rounded-lg font-semibold transition"
              >
                {editCard ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditCardModal;