import React from "react";
import { Trash2, X, AlertTriangle } from "lucide-react";

const InventoryDeleteModal = ({ isOpen, item, onConfirm, onCancel }) => {
  if (!isOpen || !item) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl border border-gray-200 pointer-events-auto animate-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-modal-title"
          aria-describedby="delete-modal-description"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onCancel}
            className="absolute top-4 right-4 p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-7 w-7 text-red-600" />
            </div>
          </div>

          {/* Content */}
          <div className="text-center">
            <h3 
              id="delete-modal-title"
              className="text-xl font-bold text-gray-900 mb-2"
            >
              Delete Product?
            </h3>
            <div id="delete-modal-description">
              <p className="text-sm text-gray-600 mb-1">
                Are you sure you want to delete
              </p>
              <p className="font-semibold text-gray-900 mb-1">
                "{item.name}"
              </p>
              <p className="text-xs text-gray-500 mb-3">
                Product Code: {item.code}
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <p className="text-xs text-red-800 flex items-start gap-2">
                  <Trash2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>
                    This action cannot be undone. The product will be permanently removed from your inventory.
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row justify-center gap-3 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="px-6 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Delete Permanently
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InventoryDeleteModal;