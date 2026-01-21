import { Home } from "lucide-react";

// Shopkeeper Breadcrumb Configuration
export const shopkeeperBreadcrumbs = {
  "/dashboard": [{ label: "Dashboard", icon: Home }],
  "/inventory": [
    { label: "Dashboard", icon: Home, href: "/dashboard" },
    { label: "Inventory" },
  ],
  "/add-products": [
    { label: "Dashboard", icon: Home, href: "/dashboard" },
    { label: "Inventory", href: "/inventory" },
    { label: "Add Product" },
  ],
  "/orders-received": [
    { label: "Dashboard", icon: Home, href: "/dashboard" },
    { label: "Orders Received" },
  ],
  "/adjustments": [
    { label: "Dashboard", icon: Home, href: "/dashboard" },
    { label: "Adjustments" },
  ],
  "/analytics": [
    { label: "Dashboard", icon: Home, href: "/dashboard" },
    { label: "Analytics" },
  ],
  "/warehouse": [
    { label: "Dashboard", icon: Home, href: "/dashboard" },
    { label: "Warehouse" },
  ],
  "/overheads": [
    { label: "Dashboard", icon: Home, href: "/dashboard" },
    { label: "Overheads" },
  ],
  "/trends": [
    { label: "Dashboard", icon: Home, href: "/dashboard" },
    { label: "Trends" },
  ],
  "/offers": [
    { label: "Dashboard", icon: Home, href: "/dashboard" },
    { label: "Offers" },
  ],
  "/create-offers": [
    { label: "Dashboard", icon: Home, href: "/dashboard" },
    { label: "Offers", href: "/offers" },
    { label: "Create Offer" },
  ],
  "/events": [
    { label: "Dashboard", icon: Home, href: "/dashboard" },
    { label: "Events" },
  ],
  "/add-events": [
    { label: "Dashboard", icon: Home, href: "/dashboard" },
    { label: "Events", href: "/events" },
    { label: "Add Event" },
  ],
  "/accounts": [
    { label: "Dashboard", icon: Home, href: "/dashboard" },
    { label: "Accounts" },
  ],
  "/list": [
    { label: "Dashboard", icon: Home, href: "/dashboard" },
    { label: "Accounts", href: "/accounts" },
    { label: "Accounts List" },
  ],
  "/balance-sheet": [
    { label: "Dashboard", icon: Home, href: "/dashboard" },
    { label: "Accounts", href: "/accounts" },
    { label: "Balance Sheet" },
  ],
  "/messages": [
    { label: "Dashboard", icon: Home, href: "/dashboard" },
    { label: "Messages" },
  ],
  "/settings/delivery-settings": [
    { label: "Dashboard", icon: Home, href: "/dashboard" },
    { label: "Settings" },
    { label: "Delivery Settings" },
  ],
  "/settings/vouchers": [
    { label: "Dashboard", icon: Home, href: "/dashboard" },
    { label: "Settings" },
    { label: "Vouchers" },
  ],
  "/settings/subscription": [
    { label: "Dashboard", icon: Home, href: "/dashboard" },
    { label: "Settings" },
    { label: "Subscription" },
  ],
  "/settings/vendor-dashboard": [
    { label: "Dashboard", icon: Home, href: "/dashboard" },
    { label: "Settings" },
    { label: "Vendor Dashboard" },
  ],
  "/settings/help-center": [
    { label: "Dashboard", icon: Home, href: "/dashboard" },
    { label: "Settings" },
    { label: "Help Center" },
  ],
  "/settings/reminder": [
    { label: "Dashboard", icon: Home, href: "/dashboard" },
    { label: "Settings" },
    { label: "Reminder" },
  ],
  "/profile/setup": [
    { label: "Dashboard", icon: Home, href: "/dashboard" },
    { label: "Profile Setup" },
  ],
};

// Customer Breadcrumb Configuration
export const customerBreadcrumbs = {
  "/": [{ label: "Home", icon: Home }],
  "/customer/dashboard": [{ label: "Home", icon: Home }],
  "/customer/profile": [
    { label: "Home", icon: Home, href: "/customer/dashboard" },
    { label: "Profile" },
  ],
  "/customer/ordering-reordering": [
    { label: "Home", icon: Home, href: "/customer/dashboard" },
    { label: "Orders" },
  ],
  "/customer/addresses": [
    { label: "Home", icon: Home, href: "/customer/dashboard" },
    { label: "Addresses" },
  ],
  "/customer/currency": [
    { label: "Home", icon: Home, href: "/customer/dashboard" },
    { label: "Currency" },
  ],
  "/customer/wallet": [
    { label: "Home", icon: Home, href: "/customer/dashboard" },
    { label: "Wallet" },
  ],
  "/customer/help": [
    { label: "Home", icon: Home, href: "/customer/dashboard" },
    { label: "Help Center" },
  ],
  "/customer/my-list": [
    { label: "Home", icon: Home, href: "/customer/dashboard" },
    { label: "My Lists" },
  ],
  "/customer/notifications": [
    { label: "Home", icon: Home, href: "/customer/dashboard" },
    { label: "Notifications" },
  ],
  "/customer/reminder": [
    { label: "Home", icon: Home, href: "/customer/dashboard" },
    { label: "Reminder" },
  ],
  "/customer/user-manual": [
    { label: "Home", icon: Home, href: "/customer/dashboard" },
    { label: "User Manual" },
  ],
  "/customer/offers-alerts": [
    { label: "Home", icon: Home, href: "/customer/dashboard" },
    { label: "Offers & Alerts" },
  ],
  "/customer/checkout": [
    { label: "Home", icon: Home, href: "/customer/dashboard" },
    { label: "Checkout" },
  ],
  "/customer/order-tracking": [
    { label: "Home", icon: Home, href: "/customer/dashboard" },
    { label: "Order Tracking" },
  ],
  "/customer/favourites": [
    { label: "Home", icon: Home, href: "/customer/dashboard" },
    { label: "Favourites" },
  ],
  "/customer/vouchers-and-offers": [
    { label: "Home", icon: Home, href: "/customer/dashboard" },
    { label: "Vouchers & Offers" },
  ],
};

// Helper function to get breadcrumbs based on user type and path
export const getBreadcrumbs = (path) => {
  // Normalize path
  const normalizedPath = path.toLowerCase().split("?")[0].replace(/\/$/, "");

  // Handle root path
  if (normalizedPath === "" || normalizedPath === "/") {
    return [{ label: "Home", icon: Home }];
  }

  // Determine user type based on path
  const isCustomer =
    normalizedPath.startsWith("/customer") || normalizedPath === "/profile";
  const isShopkeeper =
    normalizedPath.startsWith("/dashboard") ||
    normalizedPath.startsWith("/inventory") ||
    normalizedPath.startsWith("/add-products") ||
    normalizedPath.startsWith("/edit-products") ||
    normalizedPath.startsWith("/orders-received") ||
    normalizedPath.startsWith("/adjustments") ||
    normalizedPath.startsWith("/analytics") ||
    normalizedPath.startsWith("/warehouse") ||
    normalizedPath.startsWith("/overheads") ||
    normalizedPath.startsWith("/trends") ||
    normalizedPath.startsWith("/offers") ||
    normalizedPath.startsWith("/create-offers") ||
    normalizedPath.startsWith("/events") ||
    normalizedPath.startsWith("/add-events") ||
    normalizedPath.startsWith("/accounts") ||
    normalizedPath.startsWith("/list") ||
    normalizedPath.startsWith("/details") ||
    normalizedPath.startsWith("/balance-sheet") ||
    normalizedPath.startsWith("/messages") ||
    normalizedPath.startsWith("/settings") ||
    normalizedPath.startsWith("/profile/setup");

  // Select appropriate config
  const breadcrumbConfig = isCustomer
    ? customerBreadcrumbs
    : isShopkeeper
    ? shopkeeperBreadcrumbs
    : customerBreadcrumbs; // Default to customer

  // Check for shopkeeper edit-products path with ID
  if (normalizedPath.startsWith("/edit-products/")) {
    return [
      { label: "Dashboard", icon: Home, href: "/dashboard" },
      { label: "Inventory", href: "/inventory" },
      { label: "Edit Product" },
    ];
  }

  // Check for account details path with ID
  if (normalizedPath.startsWith("/list/detail")) {
    return [
      { label: "Dashboard", icon: Home, href: "/dashboard" },
      { label: "Accounts", href: "/accounts" },
      { label: "Accounts List", href: "/list" },
      { label: "Account Details" },
    ];
  }

  // Check for customer store preview path with ID
  if (
    normalizedPath.startsWith("/customer/stores/") &&
    normalizedPath !== "/customer/stores"
  ) {
    return [
      { label: "Home", icon: Home, href: "/customer/dashboard" },
      { label: "Store Details" },
    ];
  }

  // Try exact match first
  if (breadcrumbConfig[normalizedPath]) {
    return breadcrumbConfig[normalizedPath];
  }

  // Try to find partial match for dynamic routes
  for (const [configPath, breadcrumbs] of Object.entries(breadcrumbConfig)) {
    if (normalizedPath.startsWith(configPath) && configPath !== "/") {
      return breadcrumbs;
    }
  }

  // Default breadcrumbs based on user type
  if (isCustomer) {
    return [{ label: "Home", icon: Home, href: "/customer/dashboard" }];
  } else if (isShopkeeper) {
    return [{ label: "Dashboard", icon: Home, href: "/dashboard" }];
  } else {
    return [{ label: "Home", icon: Home }];
  }
};
