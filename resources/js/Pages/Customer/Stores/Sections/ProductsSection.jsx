import React, { useRef } from "react";
import { Link } from "@inertiajs/react";
import { ArrowRightCircle, PlusCircle } from "lucide-react";

// Custom hook for horizontal scroll
const useHorizontalScroll = () => {
  const scrollRef = useRef(null);

  const scrollNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 250, behavior: "smooth" });
    }
  };

  return { scrollRef, scrollNext };
};

// Product Card Component
const ProductCard = ({ product, onAddToCart, onProductClick }) => (
  <div
    className="p-3 sm:p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-200 group relative cursor-pointer border border-gray-100 hover:border-[#6F9C3D]/30 min-w-[140px] sm:min-w-[160px] md:min-w-[180px]"
    onClick={() => onProductClick(product)}
  >
    {/* Product Image */}
    <div className="relative p-2 h-20 sm:h-28 md:h-32 mb-3 flex items-center justify-center bg-gray-50 rounded-lg">
      <img
        src={
          product.image || "/assets/Assets/Customer/storepreview/default.svg"
        }
        alt={product.name}
        className="max-h-full max-w-full object-contain"
      />

      {/* Add Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onAddToCart(product);
        }}
        className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#6F9C3D] rounded-full flex items-center justify-center text-white hover:bg-[#5d8a32] transition-colors shadow-lg opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100"
      >
        <PlusCircle className="w-5 h-5" />
      </button>
    </div>

    {/* Product Info */}
    <div className="space-y-2">
      {/* Price */}
      <div className="flex items-center gap-2">
        <span className="text-[#249B34] font-semibold text-sm sm:text-base">
          Rs. {product.price}
        </span>
        {product.originalPrice && product.originalPrice > product.price && (
          <span className="text-xs text-gray-400 line-through">
            Rs. {product.originalPrice}
          </span>
        )}
      </div>

      {/* Product Name */}
      <h3 className="text-xs sm:text-sm font-medium line-clamp-2 text-gray-800 leading-tight">
        {product.name}
      </h3>

      {/* Weight */}
      <p className="text-xs text-gray-500">{product.weight}</p>

      {/* Quantity and Discount */}
      <div className="flex justify-between items-center">
        <div className="text-xs text-gray-400">
          <span>{product.quantity}</span>
        </div>

        {/* Discount Badge */}
        {product.discount && (
          <span className="bg-[#6F9C3D]/10 text-[#6F9C3D] text-xs font-medium px-2 py-1 rounded-full">
            {product.discount}
          </span>
        )}
      </div>
    </div>
  </div>
);

const ProductsSection = ({
  products,
  activeCategory,
  categories,
  searchQuery,
  onAddToCart,
  onProductClick,
}) => {
  const { scrollRef, scrollNext } = useHorizontalScroll();

  // Get section title
  const getSectionTitle = () => {
    if (searchQuery) {
      return `Search Results (${products.length})`;
    }
    if (activeCategory === "all") {
      return "All Products";
    }
    const category = categories.find((cat) => cat.id === activeCategory);
    return category?.label || "Products";
  };

  // Create infinite scroll effect for non-search results
  const displayProducts =
    !searchQuery && products.length > 5
      ? [...products, ...products]
      : products;

  const shouldShowInfiniteScroll = !searchQuery && products.length > 5;

  return (
    <section className="mb-6 sm:mb-8">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900">
          {getSectionTitle()}
        </h2>
        {!searchQuery && (
          <Link
            href="#"
            className="text-sm sm:text-base font-medium text-[#000000B8] hover:text-gray-900 border-b border-[#000000B8] hover:border-gray-900 transition-colors"
          >
            View All
          </Link>
        )}
      </div>

      {products.length === 0 ? (
        <div className="text-center py-8 sm:py-12">
          <div className="text-gray-400 mb-4">
            <svg
              className="w-16 h-16 sm:w-20 sm:h-20 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-5.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-2.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 009.586 13H4"
              />
            </svg>
          </div>
          <p className="text-gray-500 text-base sm:text-lg">
            {searchQuery
              ? "No products found matching your search."
              : "No products found in this category."}
          </p>
          {searchQuery && (
            <p className="text-gray-400 text-sm mt-2">
              Try adjusting your search terms or browse our categories.
            </p>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-3 sm:gap-4">
          <div
            className={`flex-1 overflow-x-auto scrollbar-hide pb-2 ${
              shouldShowInfiniteScroll
                ? "cursor-grab active:cursor-grabbing"
                : ""
            }`}
            ref={shouldShowInfiniteScroll ? scrollRef : null}
          >
            <div className="flex gap-3 sm:gap-4">
              {displayProducts.map((product, i) => (
                <ProductCard
                  key={searchQuery ? product.id : `${product.id}-${i}`}
                  product={product}
                  onAddToCart={onAddToCart}
                  onProductClick={onProductClick}
                />
              ))}
            </div>
          </div>

          {shouldShowInfiniteScroll && (
            <button
              onClick={scrollNext}
              className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#D3FFA1AB] transition-colors"
            >
              <ArrowRightCircle className="w-6 h-6 sm:w-8 sm:h-8 text-[#6F9C3D]" />
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default ProductsSection;
