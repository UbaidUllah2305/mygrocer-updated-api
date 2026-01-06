// resources/js/Pages/Customer/StorePreview.jsx

import React, { useState, useEffect, useRef } from "react";
import { Link } from "@inertiajs/react";
import CustomerHeader from "../../Components/Customer/CustomerHeader";
import CartSidebar from "../../Components/Customer/CartSidebar";
import ItemPreview from "../../Components/Customer/ItemPreview";
import VoucherDetails from "../../Components/Customer/VoucherDetails";
import {
  Search,
  Heart,
  X,
  Truck,
  Clock,
  BadgePercent,
  PlusCircle,
  ArrowRightCircle
} from "lucide-react";

// Custom hook for horizontal drag-to-scroll
const useHorizontalScroll = (enableInfinite = false) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!enableInfinite) return;

    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const maxScrollLeft = el.scrollWidth - el.clientWidth;

      // Near right end → jump back to start
      if (el.scrollLeft >= maxScrollLeft - 5) {
        el.scrollLeft = 1;
      }

      // Near left start → jump to end
      if (el.scrollLeft <= 0) {
        el.scrollLeft = maxScrollLeft - 1;
      }
    };

    el.addEventListener("scroll", handleScroll, { passive: true });

    // Start slightly away from 0 so left jump works
    el.scrollLeft = 1;

    return () => el.removeEventListener("scroll", handleScroll);
  }, [enableInfinite]);

  return scrollRef;
};

// Category Tab Component
const CategoryTab = ({ label, count, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm sm:text-base whitespace-nowrap transition ${active
      ? "border-b-2 border-[#6F9C3D]"
      : "text-gray-600 hover:bg-gray-100"
      }`}
    style={{ fontFamily: "'Inter', sans-serif" }}
  >
    {label} {count && <span className="text-sm sm:text-base">({count})</span>}
  </button>
);

// Category Icon Card
const CategoryIconCard = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-xl transition group w-full"
  >
    <div className="w-full aspect-5/4 max-w-[100px] rounded-xl bg-[#EFEFEF] flex items-center justify-center group-hover:bg-[#E8F5E0] transition p-4">
      {icon ? (
        <img src={icon} alt={label} className="w-full h-full object-contain" />
      ) : (
        <span className="text-2xl">🛒</span>
      )}
    </div>
    <span
      className="text-sm sm:text-base font-medium text-[#000000] text-center"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {label}
    </span>
  </button>
);

// Product Card Component
const ProductCard = ({ product, onAddToCart, onProductClick }) => (
  <div
    className="p-3 rounded-xl hover:shadow-md transition group relative h-58 cursor-pointer"
    onClick={() => onProductClick(product)}
  >
    {/* Product Image */}
    <div className="relative h-24 mb-2 flex items-center justify-center">
      <img
        src={product.image || "/assets/Assets/Customer/storepreview/default.svg"}
        alt={product.name}
        className="max-h-full max-w-full object-contain"
      />

      {/* Add Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onAddToCart(product);
        }}
        className="absolute bottom-2 right-2 w-7 h-7 bg-[#6F9C3D] rounded-full flex items-center justify-center text-white hover:bg-[#5d8a32] transition"
      >
        <PlusCircle className="w-7 h-7" />
      </button>
    </div>

    {/* Product Info */}
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <span className="text-[#249B34] font-normal text-sm sm:text-base">
          Rs. {product.price}
        </span>
        {product.originalPrice && (
          <span className="text-[#000000] text-xs font-normal line-through">
            Rs. {product.originalPrice}
          </span>
        )}
      </div>
      <h3
        className="text-sm font-medium text-[#000000] line-clamp-2"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {product.name}
      </h3>
      <p className="text-xs text-[#000000]">{product.weight}</p>
    </div>

    {/* Quantity */}
    <div className="absolute -bottom-1 left-1 px-2 py-0.5 text-xs text-[#00000073] flex items-center gap-1">
      <span>{product.quantity}</span>
    </div>

    {/* Discount Badge */}
    {product.discount && (
      <div className="absolute -bottom-1 right-5 z-10">
        <span className="bg-[#6F9C3D4F] text-[#6F9C3D] text-xs font-medium px-2 py-0.5 rounded-full">
          {product.discount}
        </span>
      </div>
    )}
  </div>
);

// Voucher Card Component
const VoucherCard = ({ voucher, onClick }) => (
  <div
    className="bg-[#D3FFA1AB] rounded-lg p-5 min-w-[333px] cursor-pointer hover:bg-[#c5f590] transition-colors"
    onClick={() => onClick(voucher)}
  >
    <div className="flex items-start gap-2">
      <div className="w-5 h-5 flex items-center justify-center shrink-0">
        <img
          src="/assets/Assets/Customer/storepreview/voucher.svg"
          alt="voucher"
        />
      </div>
      <div>
        <p className="text-sm sm:text-base truncate line-clamp-2" style={{ fontFamily: "'Inter', sans-serif" }}>
          {voucher.description}
        </p>
        <p className="text-sm sm:text-base mt-1">{voucher.discount}</p>
        <p className="text-xs mt-2 -ml-7 font-normal border border-[#0000003B] rounded-2xl px-4 py-2 -mb-2">{voucher.validity}</p>
      </div>
    </div>
  </div>
);

// Promotional Banner Component
const PromoBanner = ({ banner }) => (
  <div
    className="relative rounded-lg overflow-hidden h-[249px] bg-cover bg-center cursor-pointer"
    style={{ backgroundImage: `url(${banner.image})` }}
  >
    {banner.closeable && (
      <button className="absolute top-2 right-2 w-6 h-6 bg-white/80 rounded-full flex items-center justify-center">
        <X className="w-4 h-4 text-gray-600" />
      </button>
    )}
  </div>
);

// Main Store Preview Component
const StorePreview = ({ store }) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [deliveryMode, setDeliveryMode] = useState("delivery");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const openProductPreview = (product) => setSelectedProduct(product);
  const closeProductPreview = () => setSelectedProduct(null);
  const openVoucherDetails = (voucher) => setSelectedVoucher(voucher);
  const closeVoucherDetails = () => setSelectedVoucher(null);

  // Mock store data
  const storeData = store || {
    id: 1,
    name: "Al-Fatah",
    location: "Lahore",
    image: "/assets/Assets/Customer/storepreview/banner.svg",
    freeDeliveryText: "Free delivery on first shop order",
    minOrder: "299.00",
    deliveryTime: "45-65 min",
  };

  // Mock categories
  const categories = [
    { id: "all", label: "All Categories", count: null },
    { id: "popular", label: "Popular", count: 68 },
    { id: "fresh-food", label: "Fresh Food", count: 7 },
    { id: "frozen", label: "Frozen", count: 8 },
    { id: "dairy", label: "Dairy & Eggs", count: 6 },
    { id: "bakery", label: "Bakery", count: 7 },
    { id: "household", label: "Household", count: 10 },
  ];

  // Mock category icons
  const categoryIcons = [
    { id: 1, label: "New Arrivals", icon: "/assets/Assets/Customer/storepreview/speaker.svg" },
    { id: 2, label: "11.11 Deals", icon: "/assets/Assets/Customer/storepreview/11.11.svg" },
    { id: 3, label: "Popular", icon: "/assets/Assets/Customer/storepreview/popular.svg" },
    { id: 4, label: "Fresh Food", icon: "/assets/Assets/Customer/storepreview/fresh.svg" },
    { id: 5, label: "Frozen", icon: "/assets/Assets/Customer/storepreview/frozen.svg" },
    { id: 6, label: "Bakery", icon: "/assets/Assets/Customer/storepreview/bakery.svg" },
    { id: 7, label: "Household", icon: "/assets/Assets/Customer/storepreview/household.svg" },
    { id: 8, label: "Seasonal", icon: "/assets/Assets/Customer/storepreview/popular.svg" },
  ];

  // Mock promotional banners
  const promoBanners = [
    { id: 1, image: "/assets/Assets/Customer/storepreview/independenceoffer.svg" },
    { id: 2, image: "/assets/Assets/Customer/storepreview/vegoffer.svg" },
    { id: 3, image: "/assets/Assets/Customer/storepreview/independenceoffer.svg" },
    { id: 4, image: "/assets/Assets/Customer/storepreview/vegoffer.svg" },
  ];

  // Mock vouchers
  const vouchers = [
    {
      id: 1,
      description: "Voucher only valid for fresh prod...",
      title: "Voucher only valid for fresh produce category products!",
      discount: "25%",
      validity: "Min. order Rs. 800.00 • Use by 31 Dec 2025",
      customerType: "New and existing customers",
      validItems: "Valid for selected items.",
      validFrom: "10 Oct 2024",
      validTo: "31 Dec 2025",
      minOrder: 800,
      discountCap: 250,
      terms: [
        "Valid for a minimum order of Rs.800",
        "Discount capped at Rs.250",
        "Applicable for Delivery.",
        "Valid only for the selected chains.",
        "Applicable only for selected products or categories.",
        "Limited to 12 redemption per user.",
        "For selected users only.",
        "My Grocer may at any time in its sole and absolute discretion withdraw, amend and/or alter any applicable terms and conditions of the voucher, deals, or promotions without prior notice.",
        "My Grocer may at any time in its sole and absolute discretion exclude, void, discontinue or disqualify you from any voucher, deal, or promotion without prior notice.",
      ],
    },
    {
      id: 2,
      description: "Voucher only valid for pickup orde...",
      title: "Voucher only valid for pickup orders!",
      discount: "15%",
      validity: "Min. order Rs. 400.00 • Use by 31 Dec 2025",
      customerType: "New and existing customers",
      validItems: "Valid for pickup orders only.",
      validFrom: "10 Oct 2024",
      validTo: "31 Dec 2025",
      minOrder: 400,
      discountCap: 150,
      terms: [
        "Valid for a minimum order of Rs.400",
        "Discount capped at Rs.150",
        "Applicable for Pick-up only.",
        "Valid only for the selected chains.",
        "Applicable only for selected products or categories.",
        "Limited to 12 redemption per user.",
        "For selected users only.",
        "My Grocer may at any time in its sole and absolute discretion withdraw, amend and/or alter any applicable terms and conditions of the voucher, deals, or promotions without prior notice.",
        "My Grocer may at any time in its sole and absolute discretion exclude, void, discontinue or disqualify you from any voucher, deal, or promotion without prior notice.",
      ],
    },
    {
      id: 3,
      description: "Get Rs. 100 off on your first order!",
      title: "First Order Voucher",
      discount: "Rs. 100",
      validity: "Min. order Rs. 500.00 • Use by 31 Dec 2025",
      customerType: "New customers only",
      validItems: "All items",
      validFrom: "10 Oct 2024",
      validTo: "31 Dec 2025",
      minOrder: 500,
      discountCap: 100,
      terms: [
        "Valid for a minimum order of Rs.500",
        "Discount capped at Rs.100",
        "Applicable for Delivery.",
        "Valid only for the selected chains.",
        "Applicable only for selected products or categories.",
        "Limited to 12 redemption per user.",
        "For selected users only.",
        "My Grocer may at any time in its sole and absolute discretion withdraw, amend and/or alter any applicable terms and conditions of the voucher, deals, or promotions without prior notice.",
        "My Grocer may at any time in its sole and absolute discretion exclude, void, discontinue or disqualify you from any voucher, deal, or promotion without prior notice.",
      ],
    },
    {
      id: 4,
      description: "Weekend special - extra 10% off!",
      title: "Weekend Deal",
      discount: "10%",
      validity: "Min. order Rs. 600.00 • Use by 31 Dec 2025",
      customerType: "All customers",
      validItems: "All categories",
      validFrom: "10 Oct 2024",
      validTo: "31 Dec 2025",
      minOrder: 600,
      discountCap: 200,
      terms: [
        "Valid for a minimum order of Rs.600",
        "Discount capped at Rs.200",
        "Applicable for Delivery.",
        "Valid only for the selected chains.",
        "Applicable only for selected products or categories.",
        "Limited to 12 redemption per user.",
        "For selected users only.",
        "My Grocer may at any time in its sole and absolute discretion withdraw, amend and/or alter any applicable terms and conditions of the voucher, deals, or promotions without prior notice.",
        "My Grocer may at any time in its sole and absolute discretion exclude, void, discontinue or disqualify you from any voucher, deal, or promotion without prior notice.",
      ],
    },
  ];

  const infiniteVouchers = [...vouchers, ...vouchers];
  const infiniteCategories = [...categoryIcons, ...categoryIcons];

  // Mock products
  const saleProducts = [
    { id: 1, name: "Whole Wheat Bread", weight: "Medium sized bread", price: 345, originalPrice: 380, discount: "9%", quantity: "20 in store", image: "/assets/Assets/Customer/storepreview/bread.svg", category: "bakery" },
    { id: 2, name: "Opler's Full Cream Milk 1Ltr", weight: "1 Ltr", price: 347, originalPrice: 370, discount: "6%", quantity: "450 in store", image: "/assets/Assets/Customer/storepreview/milk.svg", category: "dairy" },
    { id: 3, name: "Coca Cola", weight: "1.5 Ltr", price: 159, originalPrice: 190, discount: "16%", quantity: "90 in store", image: "/assets/Assets/Customer/storepreview/coke.svg", category: "beverages" },
    { id: 4, name: "Knorr Chatt patta Noodles", weight: "Family Pack 66", price: 172, originalPrice: 159, quantity: "200 in store", image: "/assets/Assets/Customer/storepreview/noodles.svg", category: "groceries" },
    { id: 5, name: "Nescafe Classic 1", weight: "50g", price: 76, originalPrice: 30, quantity: "240 in store", image: "/assets/Assets/Customer/storepreview/coffee.svg", category: "beverages" },
    { id: 6, name: "Peri peri sauce", weight: "400ml jar", price: 172, originalPrice: 185, discount: "7%", quantity: "100 in store", image: "/assets/Assets/Customer/storepreview/sauce.svg", category: "groceries" },
  ];

  const popularProducts = [
    { id: 7, name: "Whole Wheat Bread", weight: "Medium sized bread ", price: 367, originalPrice: 390, discount: "6%", quantity: "20 in store", image: "/assets/Assets/Customer/storepreview/bread.svg", category: "bakery", isPopular: true },
    { id: 8, name: "Brightfarm Onion", weight: "1kg", price: 200, quantity: "450 in store", image: "/assets/Assets/Customer/storepreview/onions.svg", category: "fresh-food", isPopular: true },
    { id: 9, name: "Fresh Eggs", weight: "12 Pieces", price: 159, originalPrice: 168, quantity: "90 in store", image: "/assets/Assets/Customer/storepreview/eggs.svg", category: "dairy", isPopular: true },
    { id: 10, name: "Sufi Canola Cooking Oil", weight: "5 Liter", price: 1658, originalPrice: 0, quantity: "200 in store", image: "/assets/Assets/Customer/storepreview/oil.svg", category: "groceries", isPopular: true },
    { id: 11, name: "Opler's Full Cream", weight: "1 Ltr", price: 347, originalPrice: 370, discount: "6%", quantity: "240 in store", image: "/assets/Assets/Customer/storepreview/milk.svg", category: "dairy", isPopular: true },
    { id: 12, name: "Peri peri sauce", weight: "400ml jar", price: 172, originalPrice: 185, discount: "7%", quantity: "100 in store", image: "/assets/Assets/Customer/storepreview/sauce.svg", category: "groceries", isPopular: true },
  ];

  const additionalProducts = [
    { id: 13, name: "Basmati Rice", weight: "5kg", price: 890, originalPrice: 950, discount: "6%", quantity: "120 in store", image: "/assets/Assets/Customer/storepreview/bread.svg", category: "groceries" },
    { id: 14, name: "Green Chilies", weight: "250g", price: 45, quantity: "300 in store", image: "/assets/Assets/Customer/storepreview/onions.svg", category: "fresh-food" },
    { id: 15, name: "Butter", weight: "200g", price: 220, originalPrice: 240, discount: "8%", quantity: "80 in store", image: "/assets/Assets/Customer/storepreview/eggs.svg", category: "dairy" },
    { id: 16, name: "Tomato Ketchup", weight: "500ml", price: 195, originalPrice: 210, discount: "7%", quantity: "150 in store", image: "/assets/Assets/Customer/storepreview/sauce.svg", category: "groceries" },
    { id: 17, name: "Frozen Peas", weight: "400g", price: 180, quantity: "90 in store", image: "/assets/Assets/Customer/storepreview/milk.svg", category: "frozen" },
    { id: 18, name: "Chocolate Cake", weight: "500g", price: 450, originalPrice: 500, discount: "10%", quantity: "25 in store", image: "/assets/Assets/Customer/storepreview/noodles.svg", category: "bakery" },
    { id: 19, name: "Garlic", weight: "250g", price: 120, quantity: "200 in store", image: "/assets/Assets/Customer/storepreview/coffee.svg", category: "fresh-food" },
    { id: 20, name: "Dishwasher Gel", weight: "1L", price: 320, originalPrice: 350, discount: "9%", quantity: "60 in store", image: "/assets/Assets/Customer/storepreview/coke.svg", category: "household" },
  ];

  const allProducts = [...saleProducts, ...popularProducts, ...additionalProducts];

  const filteredProducts = allProducts
    .filter((product) => {
      if (activeCategory === "all") return true;
      if (activeCategory === "popular") return product.isPopular;
      return product.category === activeCategory;
    })
    .filter(
      (product) =>
        !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.weight?.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const infiniteProducts =
    filteredProducts.length > 0
      ? [...filteredProducts, ...filteredProducts]
      : [];


  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    if (!isCartOpen) {
      setIsCartOpen(true);
    }
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  useEffect(() => {
    const yOffset = window.innerWidth >= 1024 ? 250 : 150;
    window.scrollTo({ top: yOffset, behavior: "smooth" });
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <CustomerHeader cartCount={cartItems.length} onCartClick={() => setIsCartOpen(!isCartOpen)} />

      <main className="pt-20 px-4 sm:px-6 lg:px-8 pb-10">
        <div className="max-w-7xl w-full mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-lg sm:text-xl font-medium text-gray-500 mb-4 mt-2" style={{ fontFamily: "'Inter', sans-serif" }}>
            <Link href="/" className="hover:text-[#6F9C3D] font-normal">Go to home</Link>
            <span>/</span>
            <Link href="/stores" className="hover:text-[#6F9C3D]">Stores List</Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">{storeData.name} {storeData.location}</span>
          </div>

          <div className="flex gap-6">
            {/* Main Content */}
            <div className={`flex-1 min-w-0 transition-all duration-300 ${isCartOpen ? 'lg:max-w-[calc(100%-320px)]' : ''}`}>
              {/* Store Banner */}
              <div className="relative rounded-xl overflow-hidden mb-6 h-75">
                <img
                  src={storeData.image}
                  alt={`${storeData.name} (${storeData.location})`}
                  className="w-full h-60 object-cover"
                />
                <button className="absolute top-2 right-2 bg-[#6F9C3D] text-white border h-11 w-43 px-4 py-2 rounded-lg text-base font-normal hover:bg-[#5d8a32] transition">
                  Shop Information
                </button>
                <div className="bg-[#6F9C3D29] p-4 flex items-center justify-between w-full">
                  <div className="flex items-center gap-4 md:gap-20">
                    <h1
                      className="md:text-3xl text-xl font-medium text-gray-800"
                      style={{ fontFamily: "'Satoshi', sans-serif" }}
                    >
                      {storeData.name} ({storeData.location})
                    </h1>
                    <div className="flex items-center gap-2 text-sm md:text-base ml-10">
                      <img
                        src="/assets/Assets/Customer/storepreview/scooter.svg"
                        alt="scooter"
                        className="w-5 h-5"
                      />
                      {storeData.freeDeliveryText}
                    </div>
                    <span className="text-sm md:text-base mx-10">Min Rs. {storeData.minOrder}</span>
                    <span className="text-sm md:text-base font-semibold">Delivery: {storeData.deliveryTime}</span>
                  </div>
                </div>
              </div>

              {/* Search Products */}
              <div className="flex gap-3 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products"
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg bg-white focus:border-[#6F9C3D] focus:ring-2 focus:ring-[#6F9C3D]/20 outline-none transition text-sm sm:text-base text-[#000000]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  />
                </div>
              </div>

              {/* Categories tab */}
              <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
                {categories.map((cat) => (
                  <CategoryTab
                    key={cat.id}
                    label={cat.label}
                    count={cat.count}
                    active={activeCategory === cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                  />
                ))}
              </div>

              {/* Best Offers */}
              <section className="mb-6">
                <h2 className="text-xl sm:text-2xl font-medium text-gray-800 mb-3" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                  Best Offers
                </h2>
                <div className="flex items-center gap-4">
                  <div className="overflow-x-auto scrollbar-hide pb-2 cursor-grab" ref={useHorizontalScroll(true)}>
                    <div className="flex gap-4 w-max">
                      {[...promoBanners, ...promoBanners].map((banner, i) => (
                        <div key={`${banner.id}-${i}`} className="shrink-0 w-[300px] sm:w-[458px]">
                          <PromoBanner banner={banner} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div
                    className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#D3FFA1AB] transition"
                    onClick={(e) => {
                      const container = e.currentTarget.previousElementSibling;
                      container?.scrollBy({ left: 320, behavior: 'smooth' });
                    }}
                  >
                    <ArrowRightCircle className="w-6 h-6 text-[#6F9C3D]" />
                  </div>
                </div>
              </section>

              {/* Vouchers */}
              <section className="mb-6">
                <h2 className="text-xl sm:text-2xl font-medium text-gray-800 mb-3" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                  Apply a voucher at checkout
                </h2>
                <div className="flex items-center gap-3">
                  <div className="flex-1 overflow-x-auto scrollbar-hide pb-2 cursor-grab" ref={useHorizontalScroll(true)}>
                    <div className="flex gap-3 w-max">
                      {infiniteVouchers.map((voucher, i) => (
                        <div key={`${voucher.id}-${i}`} className="shrink-0">
                          <VoucherCard voucher={voucher} onClick={openVoucherDetails} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#D3FFA1AB]"
                    onClick={(e) => {
                      const container = e.currentTarget.previousElementSibling;
                      container?.scrollBy({ left: 350, behavior: "smooth" });
                    }}
                  >
                    <ArrowRightCircle className="w-6 h-6 text-[#6F9C3D]" />
                  </div>
                </div>

              </section>

              {/* All Categories */}
              <section className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl sm:text-2xl font-medium text-gray-800" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                    All Categories
                  </h2>
                  <Link href="#" className="text-sm text-[#000000B8] font-medium border-b">
                    View All (37)
                  </Link>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1 overflow-x-auto scrollbar-hide pb-2 cursor-grab" ref={useHorizontalScroll(true)}>
                    <div className="flex gap-x-4 gap-y-6 w-max">
                      {infiniteCategories.map((cat, i) => (
                        <div key={`${cat.id}-${i}`} className="shrink-0 w-20 sm:w-[140px]">
                          <CategoryIconCard icon={cat.icon} label={cat.label} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    className="shrink-0 w-10 h-10 mb-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#D3FFA1AB]"
                    onClick={(e) => {
                      const container = e.currentTarget.previousElementSibling;
                      container?.scrollBy({ left: 300, behavior: "smooth" });
                    }}
                  >
                    <ArrowRightCircle className="w-6 h-6 text-[#6F9C3D]" />
                  </div>
                </div>

              </section>

              {/* Products */}
              <section className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl sm:text-2xl font-medium text-gray-800" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                    {activeCategory === "all"
                      ? "All Products"
                      : categories.find(cat => cat.id === activeCategory)?.label || "Products"}
                  </h2>
                  <Link href="#" className="text-sm font-medium text-[#000000B8] border-b">
                    View All
                  </Link>
                </div>

                {allProducts.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No products found in this category.</p>
                ) : (
                  <div className="flex items-center gap-3">
                    <div className="flex-1 overflow-x-auto scrollbar-hide pb-2 cursor-grab" ref={useHorizontalScroll(!searchQuery && filteredProducts.length > 5)}>
                      <div className="flex gap-1 w-max">
                        {infiniteProducts.map((product, i) => (
                          <div key={`${product.id}-${i}`} className="w-[150px] shrink-0">
                            <ProductCard
                              product={product}
                              onAddToCart={handleAddToCart}
                              onProductClick={openProductPreview}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div
                      className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#D3FFA1AB]"
                      onClick={(e) => {
                        const container = e.currentTarget.previousElementSibling;
                        container?.scrollBy({ left: 300, behavior: "smooth" });
                      }}
                    >
                      <ArrowRightCircle className="w-6 h-6 text-[#6F9C3D]" />
                    </div>
                  </div>
                )}
              </section>
            </div>

            {/* Cart Sidebar - Desktop: scrolls with page, Mobile: overlay */}
            {isCartOpen && (
              <aside className="hidden lg:block w-80 shrink-0">
                <CartSidebar
                  cartItems={cartItems}
                  deliveryMode={deliveryMode}
                  setDeliveryMode={setDeliveryMode}
                  onClose={closeCart}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                  storeName={`${storeData.name} - ${storeData.location}`}
                />
              </aside>
            )}
          </div>

          {/* Mobile Cart Overlay */}
          {isCartOpen && (
            <div className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={() => setIsCartOpen(false)}>
              <div className="absolute right-0 top-0 h-full w-80 bg-white overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <CartSidebar
                  cartItems={cartItems}
                  deliveryMode={deliveryMode}
                  setDeliveryMode={setDeliveryMode}
                  onClose={closeCart}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                  storeName={`${storeData.name} - ${storeData.location}`}
                />
              </div>
            </div>
          )}

          {/* Modals */}
          {selectedProduct && (
            <ItemPreview
              product={selectedProduct}
              onClose={closeProductPreview}
              onAddToCart={handleAddToCart}
              relatedProducts={allProducts.filter(p => p.id !== selectedProduct.id)}
            />
          )}

          {selectedVoucher && (
            <VoucherDetails
              voucher={selectedVoucher}
              onClose={closeVoucherDetails}
              onApply={(voucher) => {
                console.log("Voucher applied:", voucher);
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default StorePreview;