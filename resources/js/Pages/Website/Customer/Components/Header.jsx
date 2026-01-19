// src/Components/Customer/Header.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import {
    FaRegHeart, FaShoppingCart, FaUser, FaBars, FaTimes, FaGlobe, FaChevronDown,
    FaTicketAlt, FaWallet, FaMapMarkerAlt, FaClipboardList, FaDollarSign,
    FaBell, FaClock, FaBookOpen, FaTags, FaQuestionCircle
} from "react-icons/fa";
import { LogOut, UserRound } from "lucide-react";
import axios from "axios";

const MENU_ITEMS = [
    { key: 'profile', label: 'My Profile', icon: FaUser, path: '/customer/profile' },
    { key: 'orders', label: 'My Orders', icon: FaShoppingCart, path: '/customer/ordering-reordering' },
    { key: 'vouchers', label: 'My Vouchers', icon: FaTicketAlt, path: '/customer/vouchers-and-offers' },
    { key: 'wallet', label: 'My Wallet', icon: FaWallet, path: '/customer/wallet' },
    { key: 'addresses', label: 'My Addresses', icon: FaMapMarkerAlt, path: '/customer/addresses' },
    { key: 'list', label: 'My List', icon: FaClipboardList, path: '/customer/my-list' },
    { key: 'currency', label: 'Currency', icon: FaDollarSign, path: '/customer/currency' },
    { key: 'notifications', label: 'My Notifications', icon: FaBell, path: '/customer/notifications' },
    { key: 'reminders', label: 'My Reminders', icon: FaClock, path: '/customer/reminder' },
    { key: 'manuals', label: 'My User Manuals', icon: FaBookOpen, path: '/customer/user-manual' },
    { key: 'offers', label: 'My Offers', icon: FaTags, path: '/customer/offers-alerts' },
    { key: 'help', label: 'My Help Center', icon: FaQuestionCircle, path: '/customer/help' },
];

const LANGUAGES = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "ur", name: "اردو", flag: "🇵🇰" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
];

export default function Header({ auth }) {
    const { url } = usePage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState("English");
    const user = auth?.user;

    const isProfilePage = url.includes('/profile') || url.includes('/settings') ||
        url.includes('/addresses') || url.includes('/currency') ||
        url.includes('/wallet') || url.includes('/help') ||
        url.includes('/notifications') || url.includes('/reminder') ||
        url.includes('/user-manual') || url.includes('/offers-alerts');

    const langRef = useRef(null);
    const userMenuRef = useRef(null);

    // Close dropdowns on outside click
    useEffect(() => {
        const handleClick = (e) => {
            if (langRef.current && !langRef.current.contains(e.target)) setIsLangOpen(false);
            if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setIsUserMenuOpen(false);
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post("/api/v1/customer/logout");
            router.visit('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const getLogoLink = () => {
        if (user?.business?.profile_completed) return "/customer/dashboard";
        return user ? "/profile" : "/";
    };

    const navigateTo = (path, e) => {
        e.preventDefault();
        if (user?.business?.profile_completed) {
            router.visit(path);
        } else {
            router.visit('/profile');
        }
        setIsUserMenuOpen(false);
        setIsMenuOpen(false);
    };

    const isActive = (path) => url.includes(path);

    return (
        <header className="bg-[#F8F8F8] shadow-sm sticky top-0 z-50" style={{ boxShadow: "0px 4px 4px 0px #0000001F" }}>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
                    {/* Logo */}
                    <Link href={getLogoLink()} className="flex items-center shrink-0">
                        <img src="/Images/logo.png" alt="My Grocer" className="h-12 sm:h-14 lg:h-16 w-auto" />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {!user ? (
                            <>
                                <Link href="/shopkeeper" className="flex items-center justify-center bg-[#6F9C3D] text-white px-4 py-2.5 rounded-xl font-medium text-sm hover:bg-[#5d8a32] transition-colors whitespace-nowrap">
                                    For Shopkeepers
                                </Link>
                                <Link href="/customer/login" className="flex items-center gap-2 text-gray-800 px-4 py-2.5 font-medium text-sm hover:text-[#e67a32] transition-colors whitespace-nowrap">
                                    <FaUser className="text-sm" /> Login
                                </Link>
                                <Link href="/customer/register" className="flex items-center justify-center bg-[#FF8829] text-white px-4 py-2.5 rounded-xl font-medium text-sm hover:bg-[#e67a32] transition-colors whitespace-nowrap">
                                    Sign up for free delivery
                                </Link>
                            </>
                        ) : (
                            <>
                                {/* User Menu */}
                                <div className="relative" ref={userMenuRef}>
                                    <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 rounded-lg transition-colors">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF8829]">
                                            <UserRound className="h-4 w-4 text-white" />
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">{user.name}</span>
                                        <FaChevronDown className={`text-xs transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {isUserMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                            {MENU_ITEMS.map(item => (
                                                <button
                                                    key={item.key}
                                                    onClick={(e) => navigateTo(item.path, e)}
                                                    disabled={isActive(item.path)}
                                                    className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-colors ${isActive(item.path) ? 'text-gray-400 cursor-not-allowed bg-gray-50' : 'text-gray-700 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    <item.icon className="text-sm" /> {item.label}
                                                </button>
                                            ))}
                                            <hr className="my-2" />
                                            <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50">
                                                <LogOut className="h-4 w-4" /> Logout
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Language Dropdown */}
                                <div className="relative" ref={langRef}>
                                    <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center justify-center gap-2 p-2 hover:bg-gray-200 rounded-lg">
                                        <FaGlobe className="text-[#6F9C3D] text-xl" />
                                        <FaChevronDown className={`text-[#6F9C3D] text-xs transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                    {isLangOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                            {LANGUAGES.map(lang => (
                                                <button
                                                    key={lang.code}
                                                    onClick={() => setSelectedLanguage(lang.name)}
                                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                                                >
                                                    <span className="text-xl">{lang.flag}</span>
                                                    <span className={selectedLanguage === lang.name ? 'font-semibold text-[#6F9C3D]' : ''}>
                                                        {lang.name}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Icons */}
                                {!isProfilePage && (
                                    <>
                                        <Link href="/customer/favourites" className="p-2 hover:bg-gray-200 rounded-lg">
                                            <FaRegHeart className="text-[#FF8829] text-xl" />
                                        </Link>
                                        <Link href="/customer/checkout" className="p-2 hover:bg-gray-200 rounded-lg relative">
                                            <FaShoppingCart className="text-[#6F9C3D] text-xl" />
                                        </Link>
                                    </>
                                )}
                            </>
                        )}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-gray-700 hover:text-[#6F9C3D] hover:bg-gray-200 rounded-lg">
                        {isMenuOpen ? <FaTimes className="size-6" /> : <FaBars className="size-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0"}`}>
                    <nav className="py-4 space-y-3 border-t border-gray-200">
                        {!user ? (
                            <>
                                <Link href="/shopkeeper" className="flex justify-center bg-[#6F9C3D] text-white px-4 py-3 rounded-xl font-medium" onClick={() => setIsMenuOpen(false)}>
                                    For Shopkeepers
                                </Link>
                                <Link href="/customer/login" className="flex items-center gap-2 px-4 py-3 font-medium hover:bg-gray-200 rounded-xl" onClick={() => setIsMenuOpen(false)}>
                                    <FaUser /> Login
                                </Link>
                                <Link href="/customer/register" className="flex justify-center bg-[#FF8829] text-white px-4 py-3 rounded-xl font-medium" onClick={() => setIsMenuOpen(false)}>
                                    Sign up for free delivery
                                </Link>
                            </>
                        ) : (
                            <>
                                <div className="px-4 py-3 bg-gray-100 rounded-xl">
                                    <p className="font-medium">{user.name}</p>
                                    <p className="text-sm text-gray-600">{user.email}</p>
                                </div>
                                {MENU_ITEMS.map(item => (
                                    <button
                                        key={item.key}
                                        onClick={(e) => navigateTo(item.path, e)}
                                        disabled={isActive(item.path)}
                                        className={`w-full flex items-center gap-2 px-4 py-3 rounded-xl ${isActive(item.path) ? 'text-gray-400 bg-gray-100' : 'text-gray-800 hover:bg-gray-200'
                                            }`}
                                    >
                                        <item.icon /> {item.label}
                                    </button>
                                ))}
                                <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl">
                                    <LogOut className="h-5 w-5" /> Logout
                                </button>

                                {/* Mobile Language */}
                                <div className="px-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <FaGlobe className="text-[#6F9C3D]" /> <span className="text-sm font-medium">Select Language</span>
                                    </div>
                                    {LANGUAGES.map(lang => (
                                        <button
                                            key={lang.code}
                                            onClick={() => setSelectedLanguage(lang.name)}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                                        >
                                            <span className="text-xl">{lang.flag}</span> {lang.name}
                                        </button>
                                    ))}
                                </div>

                                {/* Mobile Icons */}
                                {!isProfilePage && (
                                    <div className="flex justify-center gap-6 pt-2">
                                        <Link href="/customer/favourites" className="p-2 hover:bg-gray-200 rounded-lg" onClick={() => setIsMenuOpen(false)}>
                                            <FaRegHeart className="text-[#FF8829] text-2xl" />
                                        </Link>
                                        <Link href="/customer/checkout" className="p-2 hover:bg-gray-200 rounded-lg" onClick={() => setIsMenuOpen(false)}>
                                            <FaShoppingCart className="text-[#6F9C3D] text-2xl" />
                                        </Link>
                                    </div>
                                )}
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
}