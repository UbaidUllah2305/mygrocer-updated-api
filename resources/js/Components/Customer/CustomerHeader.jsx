import React, { useState, useRef, useEffect } from "react";
import { Link, router } from "@inertiajs/react";
import {
  ChevronDown,
  Heart,
  ShoppingCart,
  MapPin,
  Globe,
  User,
  FileText,
  Gift,
  Coins,
  MapPin as MapPinIcon,
  ClipboardList,
  DollarSign,
  HelpCircle,
  LogOut,
  X,
} from "lucide-react";

const LogoutConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-[1130px] md:h-full md:max-h-[280px] p-6 shadow-xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 bg-red-500 rounded-2xl text-white hover:text-gray-700 transition z-10"
        >
          <X />
        </button>

        {/* Title */}
        <h2
          className="text-xl md:text-2xl font-bold mb-8 md:mb-11"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Logging out?
        </h2>

        {/* Message */}
        <p
          className="text-lg md:text-xl font-medium mb-10 md:mb-15"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Thanks for stopping by. See you again soon!
        </p>

        {/* Buttons */}
        <div className="flex justify-end mt-20 gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 md:max-w-44 md:h-15 bg-[#9B9DA2] border border-gray-300 text-white rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 md:max-w-[324px] md:h-15 bg-[#6F9C3D] text-white rounded-lg hover:bg-[#5A7E2F] transition font-medium"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

const CustomerHeader = ({
  cartCount = 0,
  userName = "Ayesha",
  location = "Work 365 Link ATI Main Road Lahore",
  onCartClick //  Accept cart click handler
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const userMenuRef = useRef(null);
  const langMenuRef = useRef(null);

  const handleLogout = () => {
    router.post("/logout");
    setIsLogoutModalOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setIsLangMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white">
      <div className="mx-auto flex h-[72px] w-full items-center justify-between px-4 sm:px-6 lg:px-10">
        {/* Logo */}
        <Link href="/stores" className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <img
              src="/assets/Assets/logo.png"
              alt="My Grocer"
              className="h-full w-10 object-contain"
            />
            <div>
              <h1
                className="text-lg font-bold text-[#6F9C3D]"
                style={{ fontFamily: "'Satoshi', sans-serif" }}
              >
                My Grocer
              </h1>
              <p className="text-xs text-gray-500">Smart Selling Made Simple</p>
            </div>
          </div>
        </Link>

        {/* Location */}
        <div className="hidden md:flex items-center gap-2 text-gray-600 cursor-pointer hover:text-gray-800 transition">
          <MapPin className="h-4 w-4 text-gray-400" />
          <span className="text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
            {location}
          </span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => {
                setIsUserMenuOpen(!isUserMenuOpen);
                setIsLangMenuOpen(false);
              }}
              className="flex items-center gap-1 hover:opacity-80 transition"
            >
              <User className="h-5 w-5 text-gray-600" />
              <span
                className="hidden sm:inline text-sm text-gray-700"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {userName}
              </span>
              <ChevronDown
                className={`h-4 w-4 text-gray-500 transition-transform ${isUserMenuOpen ? "rotate-180" : ""
                  }`}
              />
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-50">
                <div className="space-y-1">
                  <Link
                    href="/customer/profile"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition"
                  >
                    <User className="h-5 w-5 text-gray-500" />
                    Profile
                  </Link>

                  <Link
                    href="/customer/ordering-reordering"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition"
                  >
                    <FileText className="h-5 w-5 text-gray-500" />
                    Orders & Reordering
                  </Link>

                  <Link
                    href="/customer/vouchers-and-offers"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition"
                  >
                    <Gift className="h-5 w-5 text-gray-500" />
                    Vouchers
                  </Link>

                  <Link
                    href="/customer/wallet"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition"
                  >
                    <Coins className="h-5 w-5 text-gray-500" />
                    Loyalty Wallet
                  </Link>

                  <Link
                    href="/customer/addresses"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition"
                  >
                    <MapPinIcon className="h-5 w-5 text-gray-500" />
                    Addresses
                  </Link>

                  <Link
                    href="/customer/my-list"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition"
                  >
                    <ClipboardList className="h-5 w-5 text-gray-500" />
                    My List
                  </Link>

                  <Link
                    href="/customer/notifications"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition"
                  >
                    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h10a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Notifications
                  </Link>

                  <Link
                    href="/customer/reminder"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition"
                  >
                    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Reminder
                  </Link>

                  <Link
                    href="/customer/user-manual"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition"
                  >
                    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    User Manual
                  </Link>

                  <Link
                    href="/customer/offers-alerts"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition"
                  >
                    <Gift className="h-5 w-5 text-gray-500" />
                    Offers
                  </Link>

                  <Link
                    href="/customer/currency"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition"
                  >
                    <DollarSign className="h-5 w-5 text-gray-500" />
                    Select Currency
                  </Link>

                  <Link
                    href="/customer/help"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition"
                  >
                    <HelpCircle className="h-5 w-5 text-gray-500" />
                    Help Center
                  </Link>

                  <hr className="my-1 mx-4 border-gray-100" />

                  <button
                    onClick={() => setIsLogoutModalOpen(true)}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <LogOut className="h-5 w-5 text-red-500" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Language Selector */}
          <div className="relative" ref={langMenuRef}>
            <button
              onClick={() => {
                setIsLangMenuOpen(!isLangMenuOpen);
                setIsUserMenuOpen(false);
              }}
              className="flex items-center gap-1 hover:opacity-80 transition"
            >
              <Globe className="h-5 w-5 text-gray-600" />
              <span className="text-sm text-gray-700" style={{ fontFamily: "'Inter', sans-serif" }}>
                EN
              </span>
              <ChevronDown
                className={`h-4 w-4 text-gray-500 transition-transform ${isLangMenuOpen ? "rotate-180" : ""
                  }`}
              />
            </button>
            {isLangMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-32 bg-white border border-gray-100 rounded-lg shadow-lg py-2 z-50">
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 font-medium">
                  English
                </button>
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  اردو
                </button>
              </div>
            )}
          </div>

          {/* Favorites */}
          <Link href="/customer/favourites" className="relative p-2 hover:bg-gray-50 rounded-full transition">
            <Heart className="h-5 w-5 text-gray-600" />
          </Link>

          {/* Cart */}
          <button
            onClick={onCartClick}
            className="relative p-2 hover:bg-gray-50 rounded-full transition"
          >
            <ShoppingCart className="h-5 w-5 text-[#6F9C3D]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-[#FF8B2C] text-white text-xs rounded-full flex items-center justify-center">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <LogoutConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </header>
  );
};

export default CustomerHeader;