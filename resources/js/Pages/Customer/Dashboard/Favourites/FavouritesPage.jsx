// src/Pages/Customer/FavouritesPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import CustomerDashboardLayout from "@/Layouts/CustomerDashboardLayout";
import FavouriteStoreCard from "./FavouriteStoreCard";
import FavouritesEmptyState from "./FavouritesEmptyState";

// Mock store data (same as before)
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

const FavouritesPage = ({ auth }) => {
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
      localStorage.setItem('favoriteStores', JSON.stringify([...newSet]));
      return newSet;
    });
  };

  const favoriteStoreObjects = ALL_STORES.filter(store =>
    favoriteStores.has(store.id)
  );

  return (
    <CustomerDashboardLayout
      auth={auth}
      showFilters={false}
      showLocationBar={false}
      showBreadcrumb={true}
    >
      <div>
        {/* Page Title */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
          My Favourites
        </h1>

        {/* Content */}
        {favoriteStoreObjects.length === 0 ? (
          <FavouritesEmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteStoreObjects.map((store) => (
              <FavouriteStoreCard
                key={store.id}
                store={store}
                onRemoveFavorite={handleRemoveFavorite}
              />
            ))}
          </div>
        )}
      </div>
    </CustomerDashboardLayout>
  );
};

export default FavouritesPage;