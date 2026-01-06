// resources/js/Pages/Customer/FavouritesPage.jsx

import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import CustomerHeader from "../../Components/Customer/CustomerHeader";
import { Star, BadgePercent } from "lucide-react";

// StoreCard
const StoreCard = ({ store, onRemoveFavorite }) => (
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
            <span className="px-1 py-0.5">
              {store.delivery}
            </span>
          </div>
        )}
      </div>

      {/* heart */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onRemoveFavorite(store.id);
        }}
        className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center"
        aria-label="Remove from favorites"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
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

// Empty State Component
const EmptyState = () => (
  <div className="text-center py-12">
    <div className="mb-6">
      <img
        src="/assets/Assets/Customer/favourites/no-favourites.svg"
        alt="No favourites saved"
        className="w-64 mx-auto"
      />
    </div>
    <h2 className="text-xl font-semibold text-gray-800 mb-2">No Favourites Saved</h2>
    <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
      You'll see all your favorites here, to make ordering even faster. Just look for the heart icon while browsing!
    </p>
    <Link
      href="/stores"
      className="inline-block bg-[#6F9C3D] hover:bg-[#5d8a32] text-white px-6 py-2 rounded-lg font-medium transition"
    >
      Let's find some favorite items
    </Link>
  </div>
);

// 🗂️ MOCK ALL STORES (must match StoresList mock data)
const ALL_STORES = [
  {
    id: 1,
    name: "Saeed Mart",
    image: "/assets/Assets/Customer/storelist/saeed.svg",
    rating: "3.8",
    reviews: "2000+",
    deliveryTime: "20-25min.",
    priceRange: "Rs.60.",
    cuisine: "Pakistani",
    discount: "20% off",
    freeDelivery: true,
    delivery: "Free Delivery",
    cashback: "10% cashback: giftcard500",
  },
  {
    id: 2,
    name: "Al-Fateh",
    image: "/assets/Assets/Customer/storelist/al-fatah.svg",
    rating: "4.5",
    reviews: "3000+",
    deliveryTime: "10-15min.",
    priceRange: "Rs.120.",
    cuisine: "Pakistani",
    discount: "20% off",
    freeDelivery: true,
    delivery: "Free Delivery",
    cashback: "10% cashback: giftcard500",
  },
  {
    id: 3,
    name: "Imtiaz Mart",
    image: "/assets/Assets/Customer/storelist/imtiaz.svg",
    rating: "3.8",
    reviews: "2000+",
    deliveryTime: "20-25min.",
    priceRange: "Rs.100.",
    cuisine: "Pakistani",
    discount: "20% off",
    freeDelivery: true,
    delivery: "Free Delivery",
    cashback: "10% cashback: giftcard500",
  },
  {
    id: 4,
    name: "Saeed Mart",
    image: "/assets/Assets/Customer/storelist/saeed.svg",
    rating: "3.8",
    reviews: "2000+",
    deliveryTime: "20-25min.",
    priceRange: "Rs.60.",
    cuisine: "Pakistani",
    discount: "20% off",
    freeDelivery: true,
    delivery: "Free Delivery",
    cashback: "10% cashback: giftcard500",
  },
  {
    id: 5,
    name: "Al-Fateh",
    image: "/assets/Assets/Customer/storelist/al-fatah.svg",
    rating: "3.8",
    reviews: "2000+",
    deliveryTime: "20-25min.",
    priceRange: "Rs.120.",
    cuisine: "Pakistani",
    discount: "20% off",
    freeDelivery: true,
    delivery: "Free Delivery",
    cashback: "10% cashback: giftcard500",
  },
  {
    id: 6,
    name: "Imtiaz Mart",
    image: "/assets/Assets/Customer/storelist/imtiaz.svg",
    rating: "3.8",
    reviews: "2000+",
    deliveryTime: "20-25min.",
    priceRange: "Rs.100.",
    cuisine: "Pakistani",
    discount: "20% off",
    freeDelivery: true,
    delivery: "Free Delivery",
    cashback: "10% cashback: giftcard500",
  },
];

const FavouritesPage = () => {
  const [favoriteStores, setFavoriteStores] = useState(new Set());

  useEffect(() => {
    const saved = localStorage.getItem('favoriteStores');
    if (saved) {
      try {
        setFavoriteStores(new Set(JSON.parse(saved)));
      } catch (e) {
        console.error("Failed to parse favorites from localStorage", e);
      }
    }
  }, []);

  const handleRemoveFavorite = (storeId) => {
    setFavoriteStores(prev => {
      const newSet = new Set(prev);
      newSet.delete(storeId);
      // Update localStorage
      localStorage.setItem('favoriteStores', JSON.stringify([...newSet]));
      return newSet;
    });
  };

  const favoriteStoreObjects = ALL_STORES.filter(store =>
    favoriteStores.has(store.id)
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <CustomerHeader />

      <main className="pt-20 px-4 sm:px-6 lg:px-8 pb-10">
        <div className="max-w-7xl w-full mx-auto">
          {/* Breadcrumb */}
          <div
            className="flex items-center gap-2 text-sm text-gray-500 mb-6 mt-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <Link href="/" className="hover:text-[#6F9C3D]">
              Go to home
            </Link>
            <span>/</span>
            <Link href="/stores" className="hover:text-[#6F9C3D]">
              Stores List
            </Link>
            <span>/</span>
            <span className="text-gray-800 font-medium underline">Favourites</span>
          </div>

          {/* Page Title */}
          <h1
            className="text-2xl font-semibold text-gray-900 mb-6"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            My Favourites
          </h1>

          {/* Content */}
          {favoriteStoreObjects.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteStoreObjects.map((store) => (
                <StoreCard
                  key={store.id}
                  store={store}
                  onRemoveFavorite={handleRemoveFavorite}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default FavouritesPage;