import React, { useState } from "react";
import SearchBar from "./Sections/SearchBar";
import CategoryTabs from "./Sections/CategoryTabs";
import BestOffers from "./Sections/BestOffers";
import VouchersSection from "./Sections/VouchersSection";
import AllCategoriesSection from "./Sections/AllCategoriesSection";
import ProductsSection from "./Sections/ProductsSection";
import CartSidebar from "./CartSidebar";
import ItemPreview from "./ItemPreview";
import VoucherDetails from "./VoucherDetails";
import CustomerDashboardLayout from "@/Layouts/CustomerDashboardLayout";
import { FaBiking } from "react-icons/fa";

const StoreDetails = ({ store, storeId, auth }) => {
  // State management
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [deliveryMode, setDeliveryMode] = useState("delivery");
  const [isCartOpen, setIsCartOpen] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  // Cart handlers
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const openProductPreview = (product) => setSelectedProduct(product);
  const closeProductPreview = () => setSelectedProduct(null);
  const openVoucherDetails = (voucher) => setSelectedVoucher(voucher);
  const closeVoucherDetails = () => setSelectedVoucher(null);

  // Mock store data - In real app, this would come from props/API
  const storeData = store || {
    id: storeId || 1,
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
    {
      id: 1,
      label: "New Arrivals",
      icon: "/assets/Assets/Customer/storepreview/speaker.svg",
    },
    {
      id: 2,
      label: "11.11 Deals",
      icon: "/assets/Assets/Customer/storepreview/11.11.svg",
    },
    {
      id: 3,
      label: "Popular",
      icon: "/assets/Assets/Customer/storepreview/popular.svg",
    },
    {
      id: 4,
      label: "Fresh Food",
      icon: "/assets/Assets/Customer/storepreview/fresh.svg",
    },
    {
      id: 5,
      label: "Frozen",
      icon: "/assets/Assets/Customer/storepreview/frozen.svg",
    },
    {
      id: 6,
      label: "Bakery",
      icon: "/assets/Assets/Customer/storepreview/bakery.svg",
    },
    {
      id: 7,
      label: "Household",
      icon: "/assets/Assets/Customer/storepreview/household.svg",
    },
    {
      id: 8,
      label: "Seasonal",
      icon: "/assets/Assets/Customer/storepreview/popular.svg",
    },
  ];

  // Mock promotional banners
  const promoBanners = [
    {
      id: 1,
      image: "/assets/Assets/Customer/storepreview/independenceoffer.svg",
    },
    { id: 2, image: "/assets/Assets/Customer/storepreview/vegoffer.svg" },
    {
      id: 3,
      image: "/assets/Assets/Customer/storepreview/independenceoffer.svg",
    },
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

  // Mock products
  const allProducts = [
    {
      id: 1,
      name: "Whole Wheat Bread",
      weight: "Medium sized bread",
      price: 345,
      originalPrice: 380,
      discount: "9%",
      quantity: "20 in store",
      image: "/assets/Assets/Customer/storepreview/bread.svg",
      category: "bakery",
    },
    {
      id: 2,
      name: "Opler's Full Cream Milk 1Ltr",
      weight: "1 Ltr",
      price: 347,
      originalPrice: 370,
      discount: "6%",
      quantity: "450 in store",
      image: "/assets/Assets/Customer/storepreview/milk.svg",
      category: "dairy",
    },
    {
      id: 3,
      name: "Coca Cola",
      weight: "1.5 Ltr",
      price: 159,
      originalPrice: 190,
      discount: "16%",
      quantity: "90 in store",
      image: "/assets/Assets/Customer/storepreview/coke.svg",
      category: "beverages",
    },
    {
      id: 4,
      name: "Knorr Chatt patta Noodles",
      weight: "Family Pack 66",
      price: 172,
      originalPrice: 159,
      quantity: "200 in store",
      image: "/assets/Assets/Customer/storepreview/noodles.svg",
      category: "groceries",
    },
    {
      id: 5,
      name: "Nescafe Classic 1",
      weight: "50g",
      price: 76,
      originalPrice: 30,
      quantity: "240 in store",
      image: "/assets/Assets/Customer/storepreview/coffee.svg",
      category: "beverages",
    },
    {
      id: 6,
      name: "Peri peri sauce",
      weight: "400ml jar",
      price: 172,
      originalPrice: 185,
      discount: "7%",
      quantity: "100 in store",
      image: "/assets/Assets/Customer/storepreview/sauce.svg",
      category: "groceries",
    },
    {
      id: 7,
      name: "Whole Wheat Bread",
      weight: "Medium sized bread ",
      price: 367,
      originalPrice: 390,
      discount: "6%",
      quantity: "20 in store",
      image: "/assets/Assets/Customer/storepreview/bread.svg",
      category: "bakery",
      isPopular: true,
    },
    {
      id: 8,
      name: "Brightfarm Onion",
      weight: "1kg",
      price: 200,
      quantity: "450 in store",
      image: "/assets/Assets/Customer/storepreview/onions.svg",
      category: "fresh-food",
      isPopular: true,
    },
    {
      id: 9,
      name: "Fresh Eggs",
      weight: "12 Pieces",
      price: 159,
      originalPrice: 168,
      quantity: "90 in store",
      image: "/assets/Assets/Customer/storepreview/eggs.svg",
      category: "dairy",
      isPopular: true,
    },
    {
      id: 10,
      name: "Sufi Canola Cooking Oil",
      weight: "5 Liter",
      price: 1658,
      originalPrice: 0,
      quantity: "200 in store",
      image: "/assets/Assets/Customer/storepreview/oil.svg",
      category: "groceries",
      isPopular: true,
    },
    {
      id: 11,
      name: "Opler's Full Cream",
      weight: "1 Ltr",
      price: 347,
      originalPrice: 370,
      discount: "6%",
      quantity: "240 in store",
      image: "/assets/Assets/Customer/storepreview/milk.svg",
      category: "dairy",
      isPopular: true,
    },
    {
      id: 12,
      name: "Peri peri sauce",
      weight: "400ml jar",
      price: 172,
      originalPrice: 185,
      discount: "7%",
      quantity: "100 in store",
      image: "/assets/Assets/Customer/storepreview/sauce.svg",
      category: "groceries",
      isPopular: true,
    },
  ];

  // Filter products based on category and search
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

  // Cart handlers
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

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
  };

  return (
    <CustomerDashboardLayout
      auth={auth}
      showFilters={false}
      showLocationBar={true}
      showBreadcrumb={true}
    >
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        {/* Main Content */}
        <div
          className={`flex-1 min-w-0 transition-all duration-300 ${
            isCartOpen ? "lg:max-w-[calc(100%-320px)]" : ""
          }`}
        >
          {/* Store Header */}
          <div className="relative rounded-xl overflow-hidden mb-6 shadow-lg">
            <img
              src={storeData.image}
              alt={`${storeData.name} (${storeData.location})`}
              className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover"
            />

            {/* Shop Information Button */}
            <button className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-[#6F9C3D] text-white border px-3 py-2 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-[#5d8a32] transition-colors shadow-md">
              Shop Information
            </button>

            {/* Store Info Bar */}
            <div className="bg-[#6F9C3D29] p-4 sm:p-6 w-full">
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center sm:gap-4 md:gap-8">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-medium text-gray-900 truncate">
                  {storeData.name} ({storeData.location})
                </h1>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4 md:gap-8 text-sm sm:text-base">
                  <div className="flex items-center gap-2">
                    <FaBiking className="text-[#6F9C3D] shrink-0" />
                    <span className="text-gray-700">
                      {storeData.freeDeliveryText}
                    </span>
                  </div>

                  <span className="text-gray-700">
                    Min Rs. {storeData.minOrder}
                  </span>

                  <span className="text-gray-900 font-semibold">
                    Delivery: {storeData.deliveryTime}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>

          {/* Category Tabs */}
          <CategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

          {/* Best Offers */}
          <BestOffers banners={promoBanners} />

          {/* Vouchers */}
          <VouchersSection
            vouchers={vouchers}
            onVoucherClick={openVoucherDetails}
          />

          {/* All Categories */}
          <AllCategoriesSection
            categoryIcons={categoryIcons}
            onCategoryClick={handleCategoryClick}
          />

          {/* Products */}
          <ProductsSection
            products={filteredProducts}
            activeCategory={activeCategory}
            categories={categories}
            searchQuery={searchQuery}
            onAddToCart={handleAddToCart}
            onProductClick={openProductPreview}
          />
        </div>

        {/* Desktop Cart Sidebar */}
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
        <div
          className="fixed inset-0 bg-black/50 z-50 lg:hidden"
          onClick={() => setIsCartOpen(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-full max-w-sm bg-white overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
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

      {/* Floating Cart Button for Mobile */}
      {!isCartOpen && cartItems.length > 0 && (
        <button
          onClick={openCart}
          className="fixed bottom-4 right-4 lg:hidden bg-[#6F9C3D] text-white p-3 rounded-full shadow-lg z-40 flex items-center gap-2"
        >
          <span className="text-sm font-medium">
            Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
          </span>
        </button>
      )}

      {/* Modals */}
      {selectedProduct && (
        <ItemPreview
          product={selectedProduct}
          onClose={closeProductPreview}
          onAddToCart={handleAddToCart}
          relatedProducts={allProducts.filter(
            (p) => p.id !== selectedProduct.id
          )}
        />
      )}

      {selectedVoucher && (
        <VoucherDetails
          voucher={selectedVoucher}
          onClose={closeVoucherDetails}
          onApply={(voucher) => {
            console.log("Voucher applied:", voucher);
            closeVoucherDetails();
          }}
        />
      )}
    </CustomerDashboardLayout>
  );
};

export default StoreDetails;
