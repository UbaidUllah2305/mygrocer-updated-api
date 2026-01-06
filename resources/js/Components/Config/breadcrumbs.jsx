import { Home, Package, ShoppingCart, BarChart3, Warehouse, Settings, TrendingUp, Tag, Calendar, Users, DollarSign, MessageSquare, Sliders } from "lucide-react";

export const breadcrumbConfig = {
  '/dashboard': [
    { label: "Home", icon: Home, href: "/dashboard" },
    { label: "Dashboard" }
  ],
  '/inventory': [
    { label: "Home", icon: Home, href: "/dashboard" },
    { label: "Inventory" }
  ],
  '/add-products': [
    { label: "Home", icon: Home, href: "/dashboard" },
    { label: "Inventory", href: "/inventory" },
    { label: "Add Product" }
  ],
  '/orders-received': [
    { label: "Home", icon: Home, href: "/dashboard" },
    { label: "Orders Received" }
  ],
  '/adjustments': [
    { label: "Home", icon: Home, href: "/dashboard" },
    { label: "Adjustments" }
  ],
  '/analytics': [
    { label: "Home", icon: Home, href: "/dashboard" },
    { label: "Analytics" }
  ],
  '/warehouse': [
    { label: "Home", icon: Home, href: "/dashboard" },
    { label: "Warehouse" }
  ],
  '/overheads': [
    { label: "Home", icon: Home, href: "/dashboard" },
    { label: "Overheads" }
  ],
  '/trends': [
    { label: "Home", icon: Home, href: "/dashboard" },
    { label: "Trends" }
  ],
  '/offers': [
    { label: "Home", icon: Home, href: "/dashboard" },
    { label: "Offers" }
  ],
  '/create-offers': [
    { label: "Home", icon: Home, href: "/dashboard" },
    { label: "Offers", href: "/offers" },
    { label: "Create Offer" }
  ],
  '/events': [
    { label: "Home", icon: Home, href: "/dashboard" },
    { label: "Events" }
  ],
  '/add-events': [
    { label: "Home", icon: Home, href: "/dashboard" },
    { label: "Events", href: "/events" },
    { label: "Add Event" }
  ],
  '/accounts': [
    { label: "Home", icon: Home, href: "/dashboard" },
    { label: "Accounts" }
  ],
  '/messages': [
    { label: "Home", icon: Home, href: "/dashboard" },
    { label: "Messages" }
  ],
  '/settings/delivery-settings': [
    { label: "Home", icon: Home, href: "/dashboard" },
    { label: "Settings" },
    { label: "Delivery Settings" }
  ],
  '/settings/vouchers': [
    { label: "Home", icon: Home, href: "/dashboard" },
    { label: "Settings" },
    { label: "Vouchers" }
  ],
  '/settings/subscription': [
    { label: "Home", icon: Home, href: "/dashboard" },
    { label: "Settings" },
    { label: "Subscription" }
  ],
  '/settings/vendor-dashboard': [
    { label: "Home", icon: Home, href: "/dashboard" },
    { label: "Settings" },
    { label: "Vendor Dashboard" }
  ],
  '/settings/help-center': [
    { label: "Home", icon: Home, href: "/dashboard" },
    { label: "Settings" },
    { label: "Help Center" }
  ],
  '/settings/reminder': [
    { label: "Home", icon: Home, href: "/dashboard" },
    { label: "Settings" },
    { label: "Reminder" }
  ]
};

// Helper function to get breadcrumbs for current path
export const getBreadcrumbs = (path) => {
  // Normalize path
  const normalizedPath = path.toLowerCase().split('?')[0].replace(/\/$/, '');
  
  // Check if it's an edit-products path with ID
  if (normalizedPath.startsWith('/edit-products/')) {
    return [
      { label: "Home", icon: Home, href: "/dashboard" },
      { label: "Inventory", href: "/inventory" },
      { label: "Edit Product" }
    ];
  }
  
  // Try exact match first
  if (breadcrumbConfig[normalizedPath]) {
    return breadcrumbConfig[normalizedPath];
  }
  
  // Try to find partial match for dynamic routes
  for (const [configPath, breadcrumbs] of Object.entries(breadcrumbConfig)) {
    if (normalizedPath.startsWith(configPath)) {
      return breadcrumbs;
    }
  }
  
  // Default breadcrumb
  return [
    { label: "Dashboard", icon: Home }
  ];
};
