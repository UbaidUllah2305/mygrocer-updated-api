import React, { useState, useEffect, useRef } from "react";
import { Link, router } from "@inertiajs/react";
import { FaRegHeart, FaShoppingCart, FaUser, FaBars, FaTimes, FaGlobe, FaChevronDown } from "react-icons/fa";
import { LogOut, UserRound } from "lucide-react";
import axios from "axios";

export default function Header({ auth }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState("English");
    const langDropdownRef = useRef(null);
    const userMenuRef = useRef(null);
    const user = auth?.user;

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleLangDropdown = () => setIsLangDropdownOpen(!isLangDropdownOpen);
    const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

    const languages = [
        { code: "en", name: "English", flag: "🇬🇧" },
        { code: "ur", name: "اردو", flag: "🇵🇰" },
        { code: "ar", name: "العربية", flag: "🇸🇦" },
    ];

    const handleLanguageChange = (language) => {
        setSelectedLanguage(language.name);
        setIsLangDropdownOpen(false);
    };

    const handleLogout = async () => {
        try {
            await axios.post("/api/v1/customer/logout");
            router.visit('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
                setIsLangDropdownOpen(false);
            }
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setIsUserMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="bg-[#F8F8F8] shadow-sm sticky top-0 z-50"
            style={{ boxShadow: "0px 4px 4px 0px #0000001F" }}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
                    {/* Logo */}
                    <Link href="/" className="flex items-center shrink-0">
                        <img
                            src="/Images/logo.png"
                            alt="My Grocer"
                            className="h-12 sm:h-14 lg:h-16 w-auto"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {!user ? (
                            <Link
                                href="/shopkeeper"
                                className="flex items-center justify-center bg-[#6F9C3D] text-white px-4 xl:px-6 py-2.5 rounded-xl font-medium text-sm xl:text-base hover:bg-[#5d8a32] transition-colors whitespace-nowrap"
                            >
                                For Shopkeepers
                            </Link>
                        ) : null}

                        {/* Show Login/Register OR User Menu */}
                        {!user ? (
                            <>
                                {/* Login Button */}
                                <Link
                                    href="/customer/login"
                                    className="flex items-center justify-center gap-2 text-gray-800 px-4 xl:px-6 py-2.5 font-medium text-sm xl:text-base hover:text-[#e67a32] transition-colors whitespace-nowrap"
                                >
                                    <FaUser className="text-sm xl:text-base" />
                                    <span>Login</span>
                                </Link>

                                {/* Sign Up Button */}
                                <Link
                                    href="/customer/register"
                                    className="flex items-center justify-center bg-[#FF8829] text-white px-4 xl:px-6 py-2.5 rounded-xl font-medium text-sm xl:text-base hover:bg-[#e67a32] transition-colors whitespace-nowrap"
                                >
                                    Sign up for free delivery
                                </Link>
                            </>
                        ) : (
                            /* User Menu */
                            <div className="relative" ref={userMenuRef}>
                                <button
                                    onClick={toggleUserMenu}
                                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 rounded-lg transition-colors"
                                >
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF8829]">
                                        <UserRound className="h-4 w-4 text-white" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">{user.name}</span>
                                    <FaChevronDown className={`text-xs transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isUserMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                        <Link
                                            href="/customer/profile"
                                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            <FaUser className="text-sm" />
                                            My Profile
                                        </Link>
                                        <Link
                                            href="/customer/orders"
                                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            <FaShoppingCart className="text-sm" />
                                            My Orders
                                        </Link>
                                        <hr className="my-2" />
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Language Dropdown */}
                        <div className="relative" ref={langDropdownRef}>
                            <button
                                onClick={toggleLangDropdown}
                                className="flex items-center justify-center gap-2 p-2 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
                                aria-label="Select Language"
                            >
                                <FaGlobe className="text-[#6F9C3D] text-xl xl:text-2xl" />
                                <FaChevronDown className={`text-[#6F9C3D] text-xs transition-transform duration-200 ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {isLangDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                    {languages.map((language) => (
                                        <button
                                            key={language.code}
                                            onClick={() => handleLanguageChange(language)}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                                        >
                                            <span className="text-xl">{language.flag}</span>
                                            <span className={selectedLanguage === language.name ? 'font-semibold text-[#6F9C3D]' : ''}>
                                                {language.name}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Wishlist Icon */}
                        <Link
                            // href="/customer/favourites"
                            className="flex items-center justify-center p-2 hover:bg-gray-200 rounded-lg transition-colors"
                            aria-label="Wishlist"
                        >
                            <FaRegHeart className="text-[#FF8829] text-xl xl:text-2xl" />
                        </Link>

                        {/* Cart Icon */}
                        <Link
                            // href="/customer/checkout"
                            className="flex items-center justify-center p-2 hover:bg-gray-200 rounded-lg transition-colors relative"
                            aria-label="Shopping Cart"
                        >
                            <FaShoppingCart className="text-[#6F9C3D] text-xl xl:text-2xl" />
                            {/* Cart badge */}
                            {/* <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full size-5 flex items-center justify-center">
                                3
                            </span> */}
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="lg:hidden flex items-center justify-center p-2 text-gray-700 hover:text-[#6F9C3D] hover:bg-gray-200 rounded-lg transition-colors"
                        aria-label="Toggle menu"
                        aria-expanded={isMenuOpen}
                    >
                        {isMenuOpen ? (
                            <FaTimes className="size-6" />
                        ) : (
                            <FaBars className="size-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                        isMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                    <nav className="py-4 space-y-3 border-t border-gray-200">
                        {/* For Shopkeepers Button */}
                        {!user ? (
                            <Link
                                href="/shopkeeper"
                                className="flex items-center justify-center bg-[#6F9C3D] text-white px-4 xl:px-6 py-2.5 rounded-xl font-medium text-sm xl:text-base hover:bg-[#5d8a32] transition-colors whitespace-nowrap"
                                onClick={toggleMenu}
                            >
                                For Shopkeepers
                            </Link>
                        ) : null}

                        {!user ? (
                            <>
                                {/* Login Button */}
                                <Link
                                    href="/customer/login"
                                    className="flex items-center justify-center gap-2 text-gray-800 px-4 py-3 font-medium hover:bg-gray-200 rounded-xl transition-colors"
                                    onClick={toggleMenu}
                                >
                                    <FaUser className="text-lg" />
                                    <span>Login</span>
                                </Link>

                                {/* Sign Up Button */}
                                <Link
                                    href="/customer/register"
                                    className="flex items-center justify-center bg-[#FF8829] text-white px-4 py-3 rounded-xl font-medium hover:bg-[#e67a32] transition-colors"
                                    onClick={toggleMenu}
                                >
                                    Sign up for free delivery
                                </Link>
                            </>
                        ) : (
                            <>
                                {/* User Info */}
                                <div className="px-4 py-3 bg-gray-100 rounded-xl">
                                    <p className="font-medium text-gray-900">{user.name}</p>
                                    <p className="text-sm text-gray-600">{user.email}</p>
                                </div>

                                {/* User Menu Items */}
                                <Link
                                    href="/customer/profile"
                                    className="flex items-center gap-2 px-4 py-3 text-gray-800 hover:bg-gray-200 rounded-xl transition-colors"
                                    onClick={toggleMenu}
                                >
                                    <FaUser />
                                    My Profile
                                </Link>

                                <Link
                                    href="/customer/orders"
                                    className="flex items-center gap-2 px-4 py-3 text-gray-800 hover:bg-gray-200 rounded-xl transition-colors"
                                    onClick={toggleMenu}
                                >
                                    <FaShoppingCart />
                                    My Orders
                                </Link>

                                <button
                                    onClick={() => {
                                        handleLogout();
                                        toggleMenu();
                                    }}
                                    className="w-full flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                                >
                                    <LogOut className="h-5 w-5" />
                                    Logout
                                </button>
                            </>
                        )}

                        {/* Language Selector - Mobile */}
                        <div className="px-4">
                            <div className="flex items-center gap-2 mb-2">
                                <FaGlobe className="text-[#6F9C3D] text-lg" />
                                <span className="text-sm font-medium text-gray-700">Select Language</span>
                            </div>
                            <div className="space-y-2">
                                {languages.map((language) => (
                                    <button
                                        key={language.code}
                                        onClick={() => {
                                            handleLanguageChange(language);
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                                    >
                                        <span className="text-xl">{language.flag}</span>
                                        <span className={selectedLanguage === language.name ? 'font-semibold text-[#6F9C3D]' : ''}>
                                            {language.name}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Mobile Icons Row */}
                        <div className="flex items-center justify-center gap-6 pt-2">
                            <Link
                                // href="/customer/favourites"
                                className="flex items-center justify-center p-2 hover:bg-gray-200 rounded-lg transition-colors"
                                aria-label="Wishlist"
                                onClick={toggleMenu}
                            >
                                <FaRegHeart className="text-[#FF8829] text-2xl" />
                            </Link>
                            <Link
                                // href="/customer/checkout"
                                className="flex items-center justify-center p-2 hover:bg-gray-200 rounded-lg transition-colors relative"
                                aria-label="Shopping Cart"
                                onClick={toggleMenu}
                            >
                                <FaShoppingCart className="text-[#6F9C3D] text-2xl" />
                            </Link>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}
