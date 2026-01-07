import React, { useEffect, useRef, useState } from "react";
import { UserRound, ChevronDown, LogOut, PanelRight, X } from "lucide-react";
import { router, usePage } from "@inertiajs/react";
import axios from "axios";
import { FaBell, FaComments, FaGlobe } from "react-icons/fa";

const Header = ({ isMobile = false, isSidebarOpen = false, onToggleSidebar, auth }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const user = auth?.user;
    const { url } = usePage();

    // Check if we're on setup/profile page
    const isSetupPage = url.includes('/profile/setup');

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) {
            return "Good Morning";
        } else if (hour < 18) {
            return "Good Afternoon";
        } else {
            return "Good Evening";
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async (event) => {
        if (event?.preventDefault) {
            event.preventDefault();
        }
        
        try {
            await axios.post("/api/v1/shopkeeper/logout");
            router.visit('/shopkeeper');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    // Apply Inter font only to this component
    const interStyle = { fontFamily: "'Inter', sans-serif" };

    return (
        <header
            className="fixed inset-x-0 top-0 z-50 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
            style={interStyle}
        >
            <div className="mx-auto flex h-20 w-full items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
                {/* LEFT SIDE */}
                <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
                    {/* Mobile Sidebar Toggle */}
                    {isMobile && onToggleSidebar && !isSetupPage && (
                        <button
                            type="button"
                            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
                            onClick={onToggleSidebar}
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-black/10 bg-white text-[#161c2b] shadow-sm transition-all hover:bg-[#e5f0d8] focus:outline-none focus:ring-2 focus:ring-[#6f9c3d]/40 active:scale-95 lg:hidden"
                        >
                            {isSidebarOpen ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <PanelRight className="h-5 w-5" />
                            )}
                        </button>
                    )}

                    {/* Logo */}
                    <div className="flex items-center justify-center flex-shrink-0">
                        <img
                            src="/assets/Assets/logo.png"
                            alt="MyGrocer Logo"
                            className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 object-contain"
                        />
                    </div>

                    {/* Greeting Text */}
                    <div className="flex min-w-0 flex-col leading-tight">
                        <p className="text-sm sm:text-base lg:text-xl font-semibold text-[#161c2b] truncate">
                            Hi, {user?.name || 'User'}!
                        </p>
                        <p className="text-xs sm:text-sm lg:text-base text-gray-600">
                            {getGreeting()}
                        </p>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="relative flex shrink-0 items-center gap-2 sm:gap-3" ref={menuRef}>
                    {/* Action Buttons - Only show if NOT on setup page */}
                    {!isSetupPage && (
                        <>
                            {/* Messages Button */}
                            <button
                                type="button"
                                className="hidden sm:flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-full bg-[#e8f5e9] text-[#6f9c3d] transition-all hover:bg-[#6f9c3d] hover:text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#6f9c3d]/40 active:scale-95"
                                aria-label="Messages"
                                onClick={() => router.visit('/messages')}
                            >
                                <FaComments className="h-6 w-6" />
                            </button>

                            {/* Notifications Button */}
                            <button
                                type="button"
                                className="hidden sm:flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-full bg-[#fff3e0] text-[#ff8b2c] transition-all hover:bg-[#ff8b2c] hover:text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#ff8b2c]/40 active:scale-95 relative"
                                aria-label="Notifications"
                                onClick={() => router.visit('/notifications')}
                            >
                                <FaBell className="h-6 w-6" />
                            </button>

                            {/* Language Button */}
                            <button
                                type="button"
                                className="hidden sm:flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-full bg-[#e3f2fd] text-[#2196f3] transition-all hover:bg-[#2196f3] hover:text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#2196f3]/40 active:scale-95"
                                aria-label="Language"
                            >
                                <FaGlobe className="h-6 w-6" />
                            </button>
                        </>
                    )}

                    {/* Profile Dropdown */}
                    <button
                        type="button"
                        className="flex items-center gap-2 sm:gap-2.5 rounded-full border border-gray-200 bg-white px-1.5 py-1.5 sm:px-3 sm:py-2 text-left transition-all hover:border-[#6f9c3d] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#6f9c3d]/40 active:scale-95"
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                        aria-haspopup="menu"
                        aria-expanded={isMenuOpen}
                    >
                        {/* Avatar */}
                        <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#6f9c3d] to-[#5d8a32] text-white shadow-sm">
                            <UserRound className="h-5 w-5" />
                        </div>

                        {/* User Info - Hidden on small mobile */}
                        <div className="hidden sm:flex sm:flex-col text-left min-w-0">
                            <p className="text-sm font-semibold text-[#161c2b] truncate max-w-[120px]">
                                {user?.name || 'Shopkeeper'}
                            </p>
                            <p className="text-xs text-gray-500">Shopkeeper</p>
                        </div>

                        {/* Chevron Icon */}
                        <ChevronDown
                            className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                                isMenuOpen ? "rotate-180" : ""
                            }`}
                        />
                    </button>

                    {/* Dropdown Menu */}
                    {isMenuOpen && (
                        <div
                            className="absolute right-0 top-full z-50 mt-2 w-56 origin-top-right rounded-xl border border-gray-100 bg-white shadow-2xl ring-1 ring-black/5 backdrop-blur-sm animate-in fade-in slide-in-from-top-2 duration-200"
                            style={interStyle}
                        >
                            {/* User Info Header */}
                            <div className="border-b border-gray-100 px-4 py-3">
                                <p className="text-sm font-semibold text-[#161c2b]">
                                    {user?.name}
                                </p>
                                <p className="text-xs text-gray-500 mt-0.5">
                                    {user?.email}
                                </p>
                            </div>

                            {/* Menu Items */}
                            <div className="p-2">
                                <p className="px-3 py-2 text-xs uppercase tracking-wider text-gray-400 font-medium">
                                    Account
                                </p>
                                
                                <button
                                    type="button"
                                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                                    onClick={handleLogout}
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span className="font-medium">Logout</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
