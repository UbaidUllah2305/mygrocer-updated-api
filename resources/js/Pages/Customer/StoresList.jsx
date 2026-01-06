import React, { useState, useRef, useEffect } from "react";
import { Link } from "@inertiajs/react";
import CartSidebar from "@/Components/Customer/CartSidebar";
import CustomerHeader from "../../Components/Customer/CustomerHeader";
import {
  Search,
  ChevronDown,
  Heart,
  Star,
  BadgePercent,
} from "lucide-react";

// Custom Dropdown Component
const CustomDropdown = ({ options, value, onChange, placeholder = "Select..." }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition text-left"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <span className="text-sm text-gray-700">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 text-left"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Filter Checkbox
const FilterCheckbox = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-2 cursor-pointer py-1">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 rounded border-gray-300 text-[#6F9C3D] focus:ring-[#6F9C3D]/30"
    />
    <span
      className="text-sm text-gray-700"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {label}
    </span>
  </label>
);

// Category Card
const CategoryCard = ({ image, title, hasButton = false }) => {
  const isGrocery = title === "Daily Grocery";

  return (
    <div
      className={`relative ${isGrocery ? "w-[210px]" : "w-[105px]"} h-32 rounded-lg overflow-hidden bg-[#D3FFA1AB] cursor-pointer group`}
    >
      {/* Image Container */}
      <div className="w-full h-24 rounded-lg flex items-center justify-center">
        {image ? (
          <img
            src={image}
            alt={title}
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-[#6F9C3D]/20 to-[#FF8B2C]/20">
            <span className="text-2xl">🛒</span>
          </div>
        )}
      </div>

      {/* Bottom Bar */}
      <div
        className={`${isGrocery ? "bg-[#DBF6E3]" : "bg-white/80"}
        absolute bottom-0 left-0 right-0 backdrop-blur-sm p-2 flex items-center justify-between`}
      >
        <span
          className="font-medium text-sm text-gray-800 truncate"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {title}
        </span>

        {/* Shop Here Button (only for Daily Grocery) */}
        {hasButton && (
          <button className="px-2 py-0.5 text-[#308636] text-xs rounded-full font-medium hover:bg-[#5d8a32] transition">
            Shop Here
          </button>
        )}
      </div>
    </div>
  );
};

// Store Card
const StoreCard = ({ store, isFavorite = false, onToggleFavorite }) => (
  <Link
    href={`/customer/stores/${store.id}`}
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

      {/* Heart Icon */}
      <button
        onClick={(e) => onToggleFavorite(store.id, e)}
        className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <mask id={`heart-mask-${store.id}`}>
              {/* Full visible area */}
              <rect width="32" height="32" fill="white" />
              {/* Centered heart cutout */}
              <path
                d="M12 9.5
             C9.5 9.5 8 11.2 8 13.3
             C8 16.1 10.7 18.3 16 22.5
             C21.3 18.3 24 16.1 24 13.3
             C24 11.2 22.5 9.5 20 9.5
             C18.4 9.5 17.1 10.3 16 11.7
             C14.9 10.3 13.6 9.5 12 9.5Z"
                fill="black"
              />
            </mask>
          </defs>

          {/* Circle fill */}
          <circle
            cx="16"
            cy="16"
            r="16"
            fill={isFavorite ? "#FF4545" : "#FF8B2C"}
            mask={`url(#heart-mask-${store.id})`}
          />
        </svg>
      </button>

    </div>

    {/* Store Info */}
    <div className="p-3">
      {/* Row 1: Name + Rating */}
      <div className="flex items-center justify-between mb-1">
        <h3
          className="font-medium text-gray-800 text-sm sm:text-base"
          style={{ fontFamily: "'Satoshi', sans-serif" }}
        >
          {store.name}
        </h3>
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 text-[#FFD900]" fill="#FFD900" />
          <span className="text-sm text-gray-600">
            {store.rating} ({store.reviews})
          </span>
        </div>
      </div>

      {/* Row 2: Delivery Time • Price Range • Cuisine • Cashback */}
      <div
        className="flex items-center flex-wrap gap-1 text-[10px] font-medium text-[#000000]"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {/* Delivery Time */}
        <div className="flex items-center gap-1">
          <img
            src="/assets/Assets/Customer/storepreview/scooter.svg"
            alt="Delivery"
            className="w-4 h-4"
          />
          <span>{store.deliveryTime}</span>
        </div>

        {/* Price Range */}
        <span>{store.priceRange}</span>

        {/* Cuisine (if exists) */}
        {store.cuisine && (
          <>
            <span>{store.cuisine}</span>
          </>
        )}

        {/* Cashback (if exists) */}
        {store.cashback && (
          <>
            <span className="text-[#000000] font-medium ml-4.5">{store.cashback}</span>
          </>
        )}
      </div>
    </div>
  </Link>
);

// Main Component
const StoresList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("deal-end");
  const [filters, setFilters] = useState({
    freeDelivery: false,
    acceptsVouchers: false,
    selectedCategory: '',
    selectedVendor: '',
    selectedCity: '',
    selectedCountry: '',
  });
  const [shopTypes, setShopTypes] = useState({
    beauty: false,
    butchery: false,
    convenience: false,
    freshBazaar: false,
    fruitsVegetables: false,
    groceries: false,
    healthWellbeing: false,
    miniMarket: false,
    specialtyStores: false,
    clothing: false,
    supermarket: false,
    womenWear: false,
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const [favoriteStores, setFavoriteStores] = useState(() => {
    const saved = localStorage.getItem('favoriteStores');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  
  const toggleFavorite = (storeId, e) => {
    e.preventDefault();
    e.stopPropagation();

    setFavoriteStores(prev => {
      const newSet = new Set(prev);
      if (newSet.has(storeId)) {
        newSet.delete(storeId);
      } else {
        newSet.add(storeId);
      }
      // ✅ Persist to localStorage
      localStorage.setItem('favoriteStores', JSON.stringify([...newSet]));
      return newSet;
    });
  };

  const categories = [
    {
      id: 1,
      title: "Daily Grocery",
      image: "/assets/Assets/Customer/storelist/dailygrocery.svg",
      hasButton: true,
    },
    {
      id: 2,
      title: "New Stores",
      image: "/assets/Assets/Customer/storelist/new.svg",
    },
    {
      id: 3,
      title: "Top Rated Stores",
      image: "/assets/Assets/Customer/storelist/top.svg",
    },
    {
      id: 4,
      title: "Only Pickups",
      image: "/assets/Assets/Customer/storelist/pickup.svg",
    },
    {
      id: 5,
      title: "Offers",
      image: "/assets/Assets/Customer/storelist/offer.svg",
    },
  ];

  const stores = [
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
      dealEndDate: new Date("2025-12-25"),
      createdAt: new Date("2025-12-10"),
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
      dealEndDate: new Date("2025-12-30"),
      createdAt: new Date("2025-12-15"),
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
      dealEndDate: new Date("2025-11-30"),
      createdAt: new Date("2025-11-15"),
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
      dealEndDate: new Date("2025-11-20"),
      createdAt: new Date("2025-11-05"),
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
      dealEndDate: new Date("2025-12-25"),
      createdAt: new Date("2025-12-13"),
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
      dealEndDate: new Date("2025-12-22"),
      createdAt: new Date("2025-12-08"),
    },
  ];

  // Sort stores based on sortBy state
  const sortedStores = [...stores].sort((a, b) => {
    if (sortBy === "deal-end") {
      // Soonest deal end first
      return a.dealEndDate - b.dealEndDate;
    } else if (sortBy === "recent") {
      // Most recent first
      return b.createdAt - a.createdAt;
    }
    return 0;
  });

  const shopTypeLabels = {
    beauty: "Beauty",
    butchery: "Butchery",
    convenience: "Convenience",
    freshBazaar: "Fresh Bazaar",
    fruitsVegetables: "Fruits & Vegetables",
    groceries: "Groceries",
    healthWellbeing: "Health & Wellbeing",
    miniMarket: "Mini Market",
    specialtyStores: "Specialty Stores",
    clothing: "Clothing",
    supermarket: "Supermarket",
    womenWear: "Women wear",
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <CustomerHeader cartCount={cartItems.length} onCartClick={openCart} />

      <main className="pt-[88px] px-4 sm:px-6 lg:px-10 pb-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters Sidebar */}
            <aside className="w-full lg:w-64 mt-15 shrink-0 bg-white rounded-lg border border-gray-200 h-fit">
              <div className="bg-[#6F9C3D] text-white py-2 px-3 rounded-t-sm mb-4">
                <h3 className="font-semibold text-sm">Filters</h3>
              </div>
              <div className="p-4">
                <div className="space-y-3 mb-6">
                  {/* ✅ Custom Dropdowns */}
                  <CustomDropdown
                    placeholder="All Categories"
                    options={[
                      { value: '', label: 'All Categories' },
                      { value: 'grocery', label: 'Grocery' },
                      { value: 'fresh-food', label: 'Fresh Food' },
                      { value: 'bakery', label: 'Bakery' },
                      { value: 'dairy', label: 'Dairy & Eggs' },
                      { value: 'household', label: 'Household' },
                    ]}
                    value={filters.selectedCategory}
                    onChange={(value) => setFilters(prev => ({ ...prev, selectedCategory: value }))}
                  />

                  <CustomDropdown
                    placeholder="All Vendors"
                    options={[
                      { value: '', label: 'All Vendors' },
                      { value: 'saeed', label: 'Saeed Mart' },
                      { value: 'al-fateh', label: 'Al-Fateh' },
                      { value: 'imtiaz', label: 'Imtiaz Mart' },
                    ]}
                    value={filters.selectedVendor}
                    onChange={(value) => setFilters(prev => ({ ...prev, selectedVendor: value }))}
                  />

                  <CustomDropdown
                    placeholder="All Cities"
                    options={[
                      { value: '', label: 'All Cities' },
                      { value: 'lahore', label: 'Lahore' },
                      { value: 'karachi', label: 'Karachi' },
                      { value: 'islamabad', label: 'Islamabad' },
                    ]}
                    value={filters.selectedCity}
                    onChange={(value) => setFilters(prev => ({ ...prev, selectedCity: value }))}
                  />

                  <CustomDropdown
                    placeholder="All Country"
                    options={[
                      { value: '', label: 'All Country' },
                      { value: 'pakistan', label: 'Pakistan' },
                    ]}
                    value={filters.selectedCountry}
                    onChange={(value) => setFilters(prev => ({ ...prev, selectedCountry: value }))}
                  />
                </div>

                <div className="mb-6">
                  <h3
                    className="font-medium text-[#000000] mb-2 text-sm sm:tex-base"
                    style={{ fontFamily: "'Satoshi', sans-serif" }}
                  >
                    Offers
                  </h3>
                  <FilterCheckbox
                    label="Free Delivery"
                    checked={filters.freeDelivery}
                    onChange={(e) =>
                      setFilters({ ...filters, freeDelivery: e.target.checked })
                    }
                  />
                  <FilterCheckbox
                    label="Accepts vouchers"
                    checked={filters.acceptsVouchers}
                    onChange={(e) =>
                      setFilters({ ...filters, acceptsVouchers: e.target.checked })
                    }
                  />
                </div>

                <div>
                  <h3
                    className="font-medium text-[#000000] mb-2 text-sm sm:text-base"
                    style={{ fontFamily: "'Satoshi', sans-serif" }}
                  >
                    Shop types
                  </h3>
                  {Object.entries(shopTypeLabels).map(([key, label]) => (
                    <FilterCheckbox
                      key={key}
                      label={label}
                      checked={shopTypes[key]}
                      onChange={(e) =>
                        setShopTypes({ ...shopTypes, [key]: e.target.checked })
                      }
                    />
                  ))}
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Breadcrumb */}
              <div
                className="text-lg text-gray-800 font-medium mb-4 mt-4"
                style={{ fontFamily: "'Satoshi', sans-serif" }}
              >
                Stores List /
              </div>

              {/* Search & Sort */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="relative flex-1 max-w-[710px]">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by shops name, categories, or items.."
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg bg-white focus:border-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/20 outline-none transition text-sm"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className="text-sm text-gray-600"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Sort by :
                  </span>
                  <div className="flex rounded-lg border border-[#00000026] overflow-hidden">
                    <button
                      onClick={() => setSortBy("deal-end")}
                      className={`px-4 py-2 text-sm font-medium transition ${sortBy === "deal-end"
                        ? "bg-[#FF8B2C] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                      Deal End
                    </button>
                    <button
                      onClick={() => setSortBy("recent")}
                      className={`px-4 py-2 text-sm font-medium transition ${sortBy === "recent"
                        ? "bg-[#FF8B2C] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                      Recent
                    </button>
                  </div>
                </div>
              </div>

              {/* Start Shopping Categories */}
              <div className="mb-8">
                <h2
                  className="text-xl font-semibold text-gray-800 mb-4"
                  style={{ fontFamily: "'Satoshi', sans-serif" }}
                >
                  Start Shopping
                </h2>
                <div className="flex flex-wrap gap-2 sm:gap-3 max-w-[710px]">
                  {categories.map((cat) => (
                    <CategoryCard
                      key={cat.id}
                      image={cat.image}
                      title={cat.title}
                      hasButton={cat.hasButton}
                    />
                  ))}
                </div>
              </div>

              {/* Top Picks */}
              <div>
                <h2
                  className="text-xl font-semibold text-gray-800 mb-4"
                  style={{ fontFamily: "'Satoshi', sans-serif" }}
                >
                  Top picks
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {sortedStores.map((store) => (
                    <StoreCard
                      key={store.id}
                      store={store}
                      isFavorite={favoriteStores.has(store.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Cart Sidebar */}
            {isCartOpen && (
              <aside className="hidden lg:block w-80 shrink-0 -mr-15">
                <CartSidebar
                  cartItems={cartItems}
                  deliveryMode="delivery"
                  setDeliveryMode={() => { }}
                  onClose={closeCart}
                />
              </aside>
            )}
          </div>

          {/* Mobile Cart */}
          {isCartOpen && (
            <div className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={closeCart}>
              <div className="absolute right-0 top-0 h-full w-80 bg-white" onClick={(e) => e.stopPropagation()}>
                <CartSidebar
                  cartItems={cartItems}
                  deliveryMode="delivery"
                  setDeliveryMode={() => { }}
                  onClose={closeCart}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StoresList;