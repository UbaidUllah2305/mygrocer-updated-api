import React, { useState, useRef, useEffect } from "react";
import { Link, router } from "@inertiajs/react";
import { FaChevronDown, FaUser } from "react-icons/fa";
import { LogOut, UserRound } from "lucide-react";
import axios from "axios";

export default function CustomerProfileLayout({ auth, children }) {
    const user = auth?.user;
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const userMenuRef = useRef(null);

    const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

    const handleLogout = async () => {
        try {
            await axios.post("/api/v1/customer/logout");
            router.visit("/");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setIsUserMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header
                className="bg-[#F8F8F8] sticky top-0 z-50"
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

                        {/* User Dropdown */}
                        {user && (
                            <div className="relative" ref={userMenuRef}>
                                <button
                                    onClick={toggleUserMenu}
                                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 rounded-lg transition-colors"
                                >
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF8829]">
                                        <UserRound className="h-4 w-4 text-white" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">
                                        {user.name}
                                    </span>
                                    <FaChevronDown
                                        className={`text-xs transition-transform ${
                                            isUserMenuOpen ? "rotate-180" : ""
                                        }`}
                                    />
                                </button>

                                {isUserMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                        <Link
                                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                                        >
                                            <FaUser className="text-sm" />
                                            My Profile
                                        </Link>

                                        <hr className="my-2" />

                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Page Content */}
            <main>{children}</main>
        </div>
    );
}
