import React, { useState, useEffect, useRef } from "react";
import { Link } from "@inertiajs/react";
import { FaBars, FaTimes, FaGlobe, FaChevronDown } from "react-icons/fa";

export default function Header({ auth }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState("English");
    const langDropdownRef = useRef(null);
    const user = auth?.user;

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleLangDropdown = () => setIsLangDropdownOpen(!isLangDropdownOpen);

    const languages = [
        { code: "en", name: "English", flag: "🇬🇧" },
        { code: "ur", name: "اردو", flag: "🇵🇰" },
        { code: "ar", name: "العربية", flag: "🇸🇦" },
    ];

    const handleLanguageChange = (language) => {
        setSelectedLanguage(language.name);
        setIsLangDropdownOpen(false);
        // Add your language change logic here
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
                setIsLangDropdownOpen(false);
            }
        };

        if (isLangDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isLangDropdownOpen]);

    return (
        <header
            className="bg-[#F8F8F8] shadow-sm sticky top-0 z-50"
            style={{ boxShadow: "0px 4px 4px 0px #0000001F" }}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
                    {/* Logo */}
                    <Link href="/shopkeeper" className="flex items-center shrink-0">
                        <img
                            src="/Images/logo.png"
                            alt="My Grocer - Shopkeeper"
                            className="h-12 sm:h-14 lg:h-16 w-auto"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-2 xl:gap-3">
                        {/* For Customers Button */}
                        <Link
                            href="/"
                            className="flex items-center justify-center bg-[#FF8829] text-white px-4 xl:px-6 py-2.5 rounded-xl font-medium text-sm xl:text-base hover:bg-[#e67a32] transition-colors whitespace-nowrap"
                        >
                            For Customers
                        </Link>

                        {/* Login Button */}
                        <Link
                            href="/shopkeeper/login"
                            className="flex items-center justify-center gap-2 bg-[#6F9C3D] text-white px-4 xl:px-6 py-2.5 rounded-xl font-medium text-sm xl:text-base hover:bg-[#5d8a32] transition-colors whitespace-nowrap"
                        >
                            <span>Login</span>
                        </Link>

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
                        isMenuOpen
                            ? "max-h-[500px] opacity-100"
                            : "max-h-0 opacity-0"
                    }`}
                >
                    <nav className="py-4 space-y-3 border-t border-gray-200">
                        {/* For Customers Button */}
                        <Link
                            href="/"
                            className="flex items-center justify-center bg-[#FF8829] text-white px-4 py-3 rounded-xl font-medium hover:bg-[#e67a32] transition-colors"
                            onClick={toggleMenu}
                        >
                            For Customers
                        </Link>

                        {/* Login Button */}
                        <Link
                            href="/shopkeeper/login"
                            className="flex items-center justify-center gap-2 bg-[#6F9C3D] text-white px-4 py-3 rounded-xl font-medium hover:bg-[#5d8a32] transition-colors"
                        >
                            <span>Login</span>
                        </Link>

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
                                            toggleMenu();
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
                    </nav>
                </div>
            </div>
        </header>
    );
}
