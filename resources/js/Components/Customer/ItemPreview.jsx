import React, { useState } from "react";
import { X, Plus, Minus, Trash2 } from "lucide-react";

const ItemPreview = ({ product, onClose, onAddToCart, relatedProducts = [] }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    onAddToCart({ ...product, quantity });
    onClose();
  };

  const handleBuyNow = () => {
    onAddToCart({ ...product, quantity });
    onClose();
  };

  // Parse stock from quantity string (e.g., "90 in store" → 90)
  const stockCount = product.quantity
    ? parseInt(product.quantity.replace(/\D/g, "")) || 0
    : 0;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl max-w-[1182px] w-full max-h-[90vh] overflow-y-auto overflow-x-hidden relative shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-1 right-1 w-7 h-7 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center z-10 transition-colors"
        >
          <X className="w-4 h-4 text-white" strokeWidth={2.5} />
        </button>

        <div className="p-6 sm:p-8">
          {/* Main Content - Product Image and Details */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Product Image */}
            <div className="bg-[#F2F2F2] rounded-xl p-6 flex items-center justify-center min-h-[280px] md:w-full max-w-[530px]">
              <img
                src={product.image || "/assets/Assets/Customer/storepreview/default.svg"}
                alt={product.name}
                className="max-h-[350px] w-full object-contain"
              />
            </div>

            {/* Product Details */}
            <div className="flex-1 flex flex-col justify-between max-w-[522px] max-h-[312px] mt-27">
              {/* Product Name */}
              <h2
                className="text-2xl sm:text-3xl font-bold text-[#FF8829] mb-2"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {product.name}
              </h2>

              {/* Price */}
              <div className="mb-1">
                <span className="text-xl sm:text-2xl font-medium text-gray-900">
                  Rs. {product.price.toFixed(2)}
                </span>
              </div>

              {/* Stock Info */}
              <p className="text-gray-500 text-base sm:text-lg mb-6">{stockCount} in store</p>

              {/* Quantity Selector */}
              <div className="flex items-center gap-6 mb-6 text-[#6F9C3D]">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="w-8 h-8 flex items-center justify-center transition-colors"
                  disabled={quantity <= 1}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                
                <span className="text-xl font-medium w-8 text-center">
                  {quantity}
                </span>
                
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="w-8 h-8 flex items-center justify-center transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#FF8829] hover:bg-[#ea6c0f] h-12 text-white font-bold sm:text-xl py-3 px-6 rounded-lg transition-colors text-lg"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Add to cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-[#6F9C3D] hover:bg-[#45a049] h-12 text-white font-bold sm:text-xl py-3 px-6 rounded-lg transition-colors text-lg"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Buy it now
                </button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="my-6 border-[#9B9DA2]" />

          {/* Product Information */}
          <div className="mb-8">
            <h3
              className="text-xl sm:text-2xl font-bold text-gray-900 mb-2"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Product information
            </h3>
            <p className="text-[#2C323C] font-light text-lg sm:text-xl">
              {product.description || `Fresh ${product.name} at your door step`}
            </p>
          </div>

          {/* Divider */}
          <hr className="my-6 border-[#9B9DA2]" />

          {/* More Like This Section */}
          {relatedProducts.length > 0 && (
            <div>
              <h3
                className="text-xl sm:text-2xl font-bold text-neutral-800 mb-4"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                More like this
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {relatedProducts.slice(0, 6).map((relProduct) => (
                  <RelatedProductCard key={relProduct.id} product={relProduct} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Related Product Card Component
const RelatedProductCard = ({ product }) => (
  <div className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg transition cursor-pointer">
    <div className="w-full aspect-square flex items-center justify-center mb-2">
      <img
        src={product.image || "/assets/Assets/Customer/storepreview/default.svg"}
        alt={product.name}
        className="max-h-full max-w-full object-contain"
      />
    </div>
    <div className="text-center w-full">
      <div className="flex items-center justify-center gap-1 flex-wrap">
        <span className="text-[#4CAF50] font-medium text-sm">
          RS. {product.price}
        </span>
        {product.originalPrice && product.originalPrice > product.price && (
          <span className="text-gray-400 text-xs line-through">
            RS. {product.originalPrice}
          </span>
        )}
      </div>
      <p className="text-xs text-gray-800 font-medium line-clamp-2 mt-1">
        {product.name}
      </p>
      <p className="text-xs text-gray-500">{product.weight}</p>
    </div>
  </div>
);

export default ItemPreview;