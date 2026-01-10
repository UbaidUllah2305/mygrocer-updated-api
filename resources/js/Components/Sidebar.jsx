import React, { useEffect, useRef, useState } from "react";
import { router } from "@inertiajs/react";
import { X, Headphones, BellRing } from "lucide-react";

// Main menu icons
import DashboardIcon from "../assets/icons/dashboard.svg?react";
import InventoryIcon from "../assets/icons/inventory.svg?react";
import OrdersIcon from "../assets/icons/orders.svg?react";
import AnalyticsIcon from "../assets/icons/analytics.svg?react";
import WarehouseIcon from "../assets/icons/warehouse.svg?react";
import AdjustmentsIcon from "../assets/icons/adjustments.svg?react";
import OverheadsIcon from "../assets/icons/overheads.svg?react";
import TrendsIcon from "../assets/icons/trends.svg?react";
import OffersIcon from "../assets/icons/offers.svg?react";
import EventsIcon from "../assets/icons/events.svg?react";
import AccountsIcon from "../assets/icons/accounts.svg?react";
import SettingsIcon from "../assets/icons/settings.svg?react";
import DeliveryIcon from "../assets/icons/delivery.svg?react";
import VouchersIcon from "../assets/icons/vouchers.svg?react";
import SubscriptionIcon from "../assets/icons/subscription.svg?react";

const menuItems = [
  { id: "dashboard", label: "Dashboard", Icon: DashboardIcon, path: "/dashboard" },
  { id: "inventory", label: "Inventory", Icon: InventoryIcon, path: "/inventory" },
  { id: "orders", label: "Orders Received", Icon: OrdersIcon, path: "/orders-received" },
  { id: "analytics", label: "Analytics", Icon: AnalyticsIcon, path: "/analytics" },
  { id: "warehouse", label: "Warehouse", Icon: WarehouseIcon, path: "/warehouse" },
  { id: "adjustments", label: "Adjustments", Icon: AdjustmentsIcon, path: "/adjustments" },
  { id: "overheads", label: "Overheads", Icon: OverheadsIcon, path: "/overheads" },
  { id: "trends", label: "Trends", Icon: TrendsIcon, path: "/trends" },
  { id: "offers", label: "Offers", Icon: OffersIcon, path: "/offers" },
  { id: "events", label: "Events", Icon: EventsIcon, path: "/events" },
  { id: "accounts", label: "Accounts", Icon: AccountsIcon, path: "/accounts" },
];

const settingsSubItems = [
  { id: "delivery", label: "Delivery Settings", Icon: DeliveryIcon, path: "/settings/delivery-settings" },
  { id: "vouchers", label: "Vouchers", Icon: VouchersIcon, path: "/settings/vouchers" },
  { id: "subscription", label: "Subscription", Icon: SubscriptionIcon, path: "/settings/subscription" },
  { id: "vendor-dashboard", label: "Vendor Dashboard", Icon: DashboardIcon, path: "/settings/vendor-dashboard" },
  { id: "help-center", label: "Help Center", Icon: Headphones, path: "settings/help-center"},
  { id: "reminderr", label: "Reminder", Icon: BellRing, path: "settings/reminder"},
];

const Sidebar = ({ active, onChange, isMobile, mobileOpen, onCloseMobile }) => {
  const previousOverflowRef = useRef("");
  const [openDropdown, setOpenDropdown] = useState(null);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobile && mobileOpen) {
      previousOverflowRef.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = previousOverflowRef.current || "";
    }

    return () => {
      document.body.style.overflow = previousOverflowRef.current || "";
    };
  }, [isMobile, mobileOpen]);

  // Auto-open settings dropdown if any sub-item is active
  useEffect(() => {
    const settingsIds = settingsSubItems.map(item => item.id);
    if (settingsIds.includes(active) || active === 'delivery-settings') {
      setOpenDropdown("settings");
    }
  }, [active]);

  const handleNavClick = (path, id, isSubItem = false) => {
    if (id !== "settings" && !isSubItem) {
      setOpenDropdown(null);
    }

    onChange?.(id);

    if (path) {
      router.visit(path, {
        preserveScroll: false,
        preserveState: false,
      });
    }

    // Close mobile sidebar after navigation
    if (isMobile) {
      onCloseMobile?.();
    }
  };

  const toggleSettingsDropdown = (e) => {
    e.stopPropagation();
    setOpenDropdown(prevState => prevState === "settings" ? null : "settings");
  };

  // Check if parent Settings should be active
  const isSettingsActive =
    active === "settings" ||
    active === "delivery-settings" ||
    active === "delivery" ||
    active === "subscription" ||
    active === "vouchers" ||
    active === "vendor-dashboard" ||
    active === "hepl-center"

  // MenuItem Component
  const MenuItem = ({ item, isActive, onClick }) => (
    <button
      onClick={onClick}
      aria-label={item.label}
      aria-current={isActive ? "page" : undefined}
      className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 ${
        isActive
          ? "bg-[#6f9c3d] text-white shadow-sm"
          : "text-[#161c2b] hover:bg-[#e5f0d8] active:scale-95"
      }`}
      style={{
        fontFamily: "'Satoshi', sans-serif",
        fontSize: "15px",
        fontWeight: isActive ? "500" : "400",
      }}
    >
      <item.Icon
        className={`w-5 h-5 flex-shrink-0 transition-colors ${
          isActive ? "text-white" : "text-[#6f9c3d]"
        }`}
      />
      <span className="truncate">{item.label}</span>
    </button>
  );

  // SubMenuItem Component
  const SubMenuItem = ({ item, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 ${
        isActive
          ? "bg-[#6f9c3d] text-white shadow-sm"
          : "text-[#161c2b] hover:bg-[#e5f0d8] active:scale-95"
      }`}
      style={{
        fontFamily: "'Satoshi', sans-serif",
        fontSize: "14px",
        fontWeight: isActive ? "500" : "400",
        paddingLeft: isMobile ? "2rem" : "3rem",
      }}
    >
      <item.Icon
        className={`w-4 h-4 flex-shrink-0 transition-colors ${
          isActive ? "text-white" : "text-[#6f9c3d]"
        }`}
      />
      <span className="truncate">{item.label}</span>
    </button>
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobile && mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`z-50 bg-[#f4f7ef] transition-transform duration-300 ease-in-out ${
          isMobile
            ? `fixed left-0 top-0 h-full w-72 shadow-2xl ${
                mobileOpen ? "translate-x-0" : "-translate-x-full"
              }`
            : "fixed left-0 top-[80px] h-[calc(100vh-80px)] w-64 border-r border-black/10"
        }`}
        aria-hidden={isMobile && !mobileOpen}
        role={isMobile ? "dialog" : "complementary"}
        aria-modal={isMobile ? true : undefined}
        aria-label="Main navigation"
      >
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          {isMobile && (
            <div className="flex items-center justify-between px-4 py-4 border-b border-black/10 bg-white/50 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/Assets/logo.png"
                  alt="Logo"
                  className="w-8 h-8 object-contain"
                />
                <h2
                  className="text-base font-semibold text-[#161c2b]"
                  style={{ fontFamily: "'Satoshi', sans-serif" }}
                >
                  Menu
                </h2>
              </div>
              <button
                type="button"
                onClick={onCloseMobile}
                aria-label="Close sidebar"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 bg-white text-[#161c2b] shadow-sm transition-all hover:bg-[#e5f0d8] focus:outline-none focus:ring-2 focus:ring-[#6f9c3d]/40 active:scale-95"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}

          {/* Navigation Menu */}
          <nav
            className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
            role="navigation"
            aria-label="Main navigation"
          >
            {/* Main Menu Items */}
            {menuItems.map((item) => (
              <MenuItem
                key={item.id}
                item={item}
                isActive={active === item.id}
                onClick={() => handleNavClick(item.path, item.id)}
              />
            ))}

            {/* Settings Dropdown */}
            <div className="relative">
              <button
                onClick={toggleSettingsDropdown}
                aria-label="Settings"
                aria-expanded={openDropdown === "settings"}
                className={`w-full flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 ${
                  isSettingsActive
                    ? "bg-[#6f9c3d] text-white shadow-sm"
                    : "text-[#161c2b] hover:bg-[#e5f0d8] active:scale-95"
                }`}
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: "15px",
                  fontWeight: isSettingsActive ? "500" : "400",
                }}
              >
                <div className="flex items-center gap-3">
                  <SettingsIcon
                    className={`w-5 h-5 flex-shrink-0 transition-colors ${
                      isSettingsActive ? "text-white" : "text-[#6f9c3d]"
                    }`}
                  />
                  <span className="truncate">Settings</span>
                </div>
                <svg
                  className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${
                    openDropdown === "settings" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Items with Animation */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openDropdown === "settings" ? "max-h-96 opacity-100 mt-1.5" : "max-h-0 opacity-0"
                }`}
              >
                <div className="space-y-1">
                  {settingsSubItems.map((item) => (
                    <SubMenuItem
                      key={item.id}
                      item={item}
                      isActive={active === item.id || active === `${item.id}-settings`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNavClick(item.path, item.id, true);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </nav>
        </div>
      </aside>

      {/* Accessibility Live Region */}
      {isMobile && (
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {mobileOpen ? "Navigation menu opened" : "Navigation menu closed"}
        </div>
      )}
    </>
  );
};

export default Sidebar;
