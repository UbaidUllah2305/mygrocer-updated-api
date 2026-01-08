import React, { useState } from "react";
import { X, Plus, Minus, Trash2 } from "lucide-react";

const ItemPreview = ({
  product,
  onClose,
  onAddToCart,
  relatedProducts = [],
}) => {
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
        className="bg-white rounded-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto relative shadow-2xl text-[#2C323C]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center z-10 transition-colors shadow-md"
        >
          <X className="w-4 h-4 text-white" strokeWidth={2.5} />
        </button>

        <div className="p-4 sm:p-6 lg:p-8">
          {/* Main Content - Product Image and Details */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mb-8">
            {/* Product Image */}
            <div className="bg-[#F2F2F2] rounded-xl p-4 sm:p-6 lg:p-8 flex items-center justify-center min-h-[250px] sm:min-h-[300px] lg:min-h-[350px] lg:w-1/2">
              <img
                src={
                  product.image ||
                  "/assets/Assets/Customer/storepreview/default.svg"
                }
                alt={product.name}
                className="max-h-[200px] sm:max-h-[250px] lg:max-h-[300px] w-full object-contain"
              />
            </div>

            {/* Product Details */}
            <div className="flex-1 flex flex-col justify-between lg:w-1/2">
              {/* Product Name */}
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#FF8829] mb-3 lg:mb-4 leading-tight pr-12 lg:pr-0">
                {product.name}
              </h2>

              {/* Price */}
              <div className="mb-2 lg:mb-3 flex justify-start items-center gap-3 sm:gap-6">
                <span className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold">
                  Rs. {product.price.toFixed(2)}
                </span>
                {product.originalPrice &&
                  product.originalPrice > product.price && (
                    <span className="text-base sm:text-lg lg:text-xl text-gray-500 line-through">
                      Rs. {product.originalPrice.toFixed(2)}
                    </span>
                  )}
              </div>

              {/* Discount Badge */}
              {product.discount && (
                <div className="mb-3 lg:mb-4">
                  <span className="bg-[#6F9C3D]/10 text-[#6F9C3D] text-xs sm:text-sm lg:text-base font-semibold px-3 py-1.5 rounded-full">
                    {product.discount} OFF
                  </span>
                </div>
              )}

              {/* Stock Info */}
              <p className="text-gray-500 text-sm sm:text-base lg:text-lg mb-4 lg:mb-6">
                {stockCount} in store
              </p>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 sm:gap-6 mb-6 lg:mb-8">
                <span className="text-base sm:text-lg lg:text-xl font-medium text-gray-700">
                  Quantity:
                </span>
                <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-2">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    disabled={quantity <= 1}
                  >
                    {quantity <= 1 ? (
                      <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>

                  <span className="text-lg sm:text-xl lg:text-2xl font-semibold w-8 sm:w-10 text-center text-[#6F9C3D]">
                    {quantity}
                  </span>

                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-[#6F9C3D] hover:bg-[#6F9C3D]/10 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#FF8829] hover:bg-[#e67524] text-white font-bold text-base sm:text-lg lg:text-xl py-3 sm:py-4 px-6 rounded-xl transition-colors shadow-lg hover:shadow-xl"
                >
                  Add to cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-[#6F9C3D] hover:bg-[#5d8a32] text-white font-bold text-base sm:text-lg lg:text-xl py-3 sm:py-4 px-6 rounded-xl transition-colors shadow-lg hover:shadow-xl"
                >
                  Buy it now
                </button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="my-3 sm:my-6 border-[#9B9DA2]" />

          {/* Product Information */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              Product information
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
              <p className="text-[#2C323C] text-sm sm:text-base lg:text-lg leading-relaxed">
                {product.description ||
                  `Fresh ${product.name} available at your doorstep. High quality product with great taste and nutritional value.`}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 text-sm sm:text-base">
                <div>
                  <span className="font-semibold text-gray-700">Weight:</span>
                  <p className="text-gray-600">{product.weight}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Category:</span>
                  <p className="text-gray-600 capitalize">
                    {product.category || "General"}
                  </p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Stock:</span>
                  <p className="text-gray-600">{product.quantity}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="my-6 sm:my-8 border-[#9B9DA2]" />

          {/* More Like This Section */}
          {relatedProducts.length > 0 && (
            <div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                More like this
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                {relatedProducts.slice(0, 6).map((relProduct) => (
                  <RelatedProductCard
                    key={relProduct.id}
                    product={relProduct}
                  />
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
  <div className="flex flex-col items-center p-3 sm:p-4 hover:bg-gray-50 rounded-lg transition cursor-pointer border border-gray-100 hover:border-[#6F9C3D]/30 hover:shadow-md">
    <div className="w-full aspect-square flex items-center justify-center mb-2 sm:mb-3 bg-white rounded-lg p-2">
      <img
        src={
          product.image || "/assets/Assets/Customer/storepreview/default.svg"
        }
        alt={product.name}
        className="max-h-full max-w-full object-contain"
      />
    </div>
    <div className="text-center w-full">
      <div className="flex items-center justify-center gap-1 flex-wrap mb-1">
        <span className="text-[#4CAF50] font-semibold text-xs sm:text-sm">
          RS. {product.price}
        </span>
        {product.originalPrice && product.originalPrice > product.price && (
          <span className="text-gray-400 text-xs line-through">
            RS. {product.originalPrice}
          </span>
        )}
      </div>
      <p className="text-xs sm:text-sm text-gray-800 font-medium line-clamp-2 mt-1 leading-tight">
        {product.name}
      </p>
      <p className="text-xs text-gray-500 mt-1">{product.weight}</p>
    </div>
  </div>
);

export default ItemPreview;
