import React from "react";
import { X } from "lucide-react";

const ViewListModal = ({ isOpen, onClose, list }) => {
  if (!isOpen || !list) return null;

  const products = list.details.split(',').map(item => item.trim());

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-5xl p-6 shadow-xl relative overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 bg-red-500 rounded-2xl text-white hover:text-gray-700 transition z-10"
        >
          <X />
        </button>

        <h2 className="text-xl font-bold text-neutral-900 mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
          View My List
        </h2>

        <div className="space-y-4">
          {products.map((product, idx) => (
            <div key={idx} className="p-3 bg-[#f7f7f7] rounded-lg">
              <div className="flex flex-col items-start gap-2">
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

export default ViewListModal;