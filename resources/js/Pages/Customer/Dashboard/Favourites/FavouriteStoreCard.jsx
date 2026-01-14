import React from "react";
import { Link } from "@inertiajs/react";
import { Star, BadgePercent } from "lucide-react";

const FavouriteStoreCard = ({ store, onRemoveFavorite }) => {
  return (
    <Link
      href={`/stores/${store.id}`}
      className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group block"
    >
      <div className="relative h-36 sm:h-44 overflow-hidden">
        <img
          src={store.image || "/assets/Assets/Customer/storelist/default.jpg"}
          alt={store.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {store.discount && (
            <span className="px-1 py-0.5 w-18 bg-[#6F9C3D] text-white text-xs flex items-center gap-1">
              <BadgePercent className="h-3 w-3 text-[#6F9C3D]" fill="white" />
              {store.discount}
            </span>
          )}
          {store.freeDelivery && (
            <div className="flex bg-[#6F9C3D] px-1 py-0.5 text-white text-xs items-center">
              <BadgePercent className="h-3 w-3 text-[#6F9C3D]" fill="white" />
              <span className="px-1 py-0.5">{store.delivery}</span>
            </div>
          )}
        </div>

        {/* Heart Icon */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRemoveFavorite(store.id);
          }}
          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center"
          aria-label="Remove from favorites"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <mask id={`fave-heart-mask-${store.id}`}>
                <rect width="32" height="32" fill="white" />
                <path
                  d="M12 9.5 C9.5 9.5 8 11.2 8 13.3 C8 16.1 10.7 18.3 16 22.5 C21.3 18.3 24 16.1 24 13.3 C24 11.2 22.5 9.5 20 9.5 C18.4 9.5 17.1 10.3 16 11.7 C14.9 10.3 13.6 9.5 12 9.5Z"
                  fill="black"
                />
              </mask>
            </defs>
            <circle
              cx="16"
              cy="16"
              r="16"
              fill="#FF4545"
              mask={`url(#fave-heart-mask-${store.id})`}
            />
          </svg>
        </button>
      </div>

      {/* Store Info */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-medium text-gray-800 text-sm sm:text-base" style={{ fontFamily: "'Satoshi', sans-serif" }}>
            {store.name}
          </h3>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-[#FFD900]" fill="#FFD900" />
            <span className="text-sm text-gray-600">{store.rating} ({store.reviews})</span>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-1 text-[10px] font-medium text-[#000000]" style={{ fontFamily: "'Inter', sans-serif" }}>
          <div className="flex items-center gap-1">
            <img src="/assets/Assets/Customer/storepreview/scooter.svg" alt="Delivery" className="w-4 h-4" />
            <span>{store.deliveryTime}</span>
          </div>
          <span>{store.priceRange}</span>
          {store.cuisine && <span>{store.cuisine}</span>}
          {store.cashback && <span className="text-[#000000] font-medium ml-4.5">{store.cashback}</span>}
        </div>
      </div>
    </Link>
  );
};

export default FavouriteStoreCard;