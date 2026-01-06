import React, { useState } from "react";
import {
    FaBiking,
    FaTag,
    FaHeart,
    FaRegHeart,
    FaStar,
    FaPercent,
    FaTruck,
} from "react-icons/fa";

export default function StoresGrid() {
    const [favorites, setFavorites] = useState([]);

    const stores = [
        {
            id: 1,
            name: "Metro Cash & Carry",
            image: "/Images/Store/store-one.png",
            rating: 4.5,
            ratingCount: "3000+",
            deliveryTime: "30-40 min",
            deliveryFee: "Rs. 60",
            discount: "10% cashback",
            promoCode: "giftcard500",
            badges: [
                { text: "20% OFF", type: "discount" },
                { text: "Free Delivery", type: "delivery" },
            ],
        },
        {
            id: 2,
            name: "Imtiaz Super Market",
            image: "/Images/Store/store-two.png",
            rating: 4.3,
            ratingCount: "2500+",
            deliveryTime: "25-35 min",
            deliveryFee: "Rs. 50",
            badges: [{ text: "Free Delivery", type: "delivery" }],
        },
        {
            id: 3,
            name: "Naheed Super Market",
            image: "/Images/Store/store-three.png",
            rating: 4.6,
            ratingCount: "4200+",
            deliveryTime: "20-30 min",
            deliveryFee: "Rs. 80",
            discount: "15% cashback",
            promoCode: "mega15",
            badges: [{ text: "5% OFF", type: "discount" }],
        },
        {
            id: 4,
            name: "Chase Up",
            image: "/Images/Store/store-four.png",
            rating: 4.4,
            ratingCount: "1800+",
            deliveryTime: "35-45 min",
            deliveryFee: "Rs. 70",
            badges: [
                { text: "10% OFF", type: "discount" },
                { text: "Free Delivery", type: "delivery" },
            ],
        },
        {
            id: 5,
            name: "Al-Fatah",
            image: "/Images/Store/store-five.png",
            rating: 4.2,
            ratingCount: "2100+",
            deliveryTime: "40-50 min",
            deliveryFee: "Rs. 90",
        },
        {
            id: 6,
            name: "Hyperstar",
            image: "/Images/Store/store-six.png",
            rating: 4.7,
            ratingCount: "5000+",
            deliveryTime: "15-25 min",
            deliveryFee: "Rs. 100",
            discount: "20% cashback",
            promoCode: "hyper20",
            badges: [{ text: "20% OFF", type: "discount" }],
        },
    ];

    // Repeat stores to show multiple rows
    const displayStores = [...stores, ...stores, ...stores, ...stores];

    const toggleFavorite = (e, storeId) => {
        e.preventDefault();
        setFavorites((prev) =>
            prev.includes(storeId)
                ? prev.filter((id) => id !== storeId)
                : [...prev, storeId]
        );
    };

    const getBadgeColor = (type) => {
        return type === "discount" ? "bg-[#6F9C3D]" : "bg-[#308636]";
    };

    const getBadgeIcon = (type) => {
        return type === "discount" ? (
            <FaPercent className="text-xs" />
        ) : (
            <FaTruck className="text-xs" />
        );
    };

    return (
        <>
            {/* Section Title */}
            <div className="flex items-center justify-start mb-3 sm:mb-4 md:mb-6">
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-gray-800">
                    Shops near me
                </h2>
            </div>

            {/* Stores Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                {displayStores.map((store, index) => {
                    const uniqueId = `${store.id}-${index}`;
                    const isFavorite = favorites.includes(uniqueId);
                    const hasDiscount = store.discount && store.promoCode;

                    return (
                        <a
                            key={uniqueId}
                            href="#"
                            className="bg-white rounded-xl border border-[#0000001F] overflow-hidden hover:shadow-lg transition-all duration-300 group"
                        >
                            {/* Store Image */}
                            <div className="relative">
                                <img
                                    src={store.image}
                                    alt={store.name}
                                    className="w-full h-36 sm:h-40 md:h-44 lg:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                />

                                {/* Badges (Left Top) */}
                                {store.badges && store.badges.length > 0 && (
                                    <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-col gap-1.5 sm:gap-2">
                                        {store.badges.map(
                                            (badge, badgeIndex) => (
                                                <div
                                                    key={badgeIndex}
                                                    className={`flex items-center gap-1 sm:gap-1.5 ${getBadgeColor(
                                                        badge.type
                                                    )} text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium shadow-md`}
                                                >
                                                    {getBadgeIcon(badge.type)}
                                                    <span>{badge.text}</span>
                                                </div>
                                            )
                                        )}
                                    </div>
                                )}

                                {/* Favorite Icon (Right Top) */}
                                <button
                                    onClick={(e) => toggleFavorite(e, uniqueId)}
                                    className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-[#FF8E33] p-1.5 sm:p-2 rounded-full shadow-md transition-all duration-200 hover:scale-110"
                                    aria-label={
                                        isFavorite
                                            ? "Remove from favorites"
                                            : "Add to favorites"
                                    }
                                >
                                    {isFavorite ? (
                                        <FaHeart className="text-white text-sm sm:text-base md:text-lg" />
                                    ) : (
                                        <FaRegHeart className="text-white text-sm sm:text-base md:text-lg" />
                                    )}
                                </button>
                            </div>

                            {/* Store Info */}
                            <div className="p-2.5 sm:p-3 md:p-4">
                                {/* Name and Rating */}
                                <div className="flex justify-between items-start gap-2 mb-2 sm:mb-3">
                                    <h3 className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-1 flex-1">
                                        {store.name}
                                    </h3>
                                    <div className="flex items-center gap-1 bg-yellow-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md shrink-0">
                                        <FaStar className="text-yellow-400 text-[10px] sm:text-xs" />
                                        <span className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-800 whitespace-nowrap">
                                            {store.rating}
                                            <span className="text-gray-500">
                                                ({store.ratingCount})
                                            </span>
                                        </span>
                                    </div>
                                </div>

                                {/* Delivery Info and Discount */}
                                <div className="flex justify-between items-start gap-2 flex-wrap">
                                    {/* Delivery Info */}
                                    <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs md:text-sm text-gray-600">
                                        <div className="flex items-center gap-1 sm:gap-1.5">
                                            <FaBiking className="text-[#6F9C3D] text-xs sm:text-sm md:text-base shrink-0" />
                                            <span className="whitespace-nowrap">
                                                {store.deliveryTime}
                                            </span>
                                        </div>
                                        <span className="text-gray-300">•</span>
                                        <span className="whitespace-nowrap">
                                            {store.deliveryFee}
                                        </span>
                                    </div>

                                    {/* Discount Info */}
                                    {hasDiscount && (
                                        <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs md:text-sm shrink-0">
                                            <FaTag className="text-[#6F9C3D] text-[10px] sm:text-xs md:text-sm shrink-0" />
                                            <span className="text-gray-700 font-medium">
                                                {store.discount}
                                            </span>
                                            <span className="text-gray-400">
                                                •
                                            </span>
                                            <span className="text-[#6F9C3D] font-medium">
                                                {store.promoCode}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </a>
                    );
                })}
            </div>
        </>
    );
}
