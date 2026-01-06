import React from "react";
import { Link } from "@inertiajs/react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="container mx-auto px-4 py-8 sm:py-10 lg:py-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8">
                    {/* Links Section */}
                    <nav className="order-2 md:order-1">
                        <ul className="flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6 lg:gap-8 text-sm sm:text-base">
                            <li>
                                <Link
                                    href="/privacy-policy"
                                    className="text-gray-700 hover:text-[#6F9C3D] transition-colors duration-200 font-medium"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms-of-service"
                                    className="text-gray-700 hover:text-[#6F9C3D] transition-colors duration-200 font-medium"
                                >
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/cookie-policy"
                                    className="text-gray-700 hover:text-[#6F9C3D] transition-colors duration-200 font-medium"
                                >
                                    Cookie Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-gray-700 hover:text-[#6F9C3D] transition-colors duration-200 font-medium"
                                >
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Copyright and Contact Section */}
                    <div className="text-center md:text-right order-1 md:order-2">
                        <p className="text-sm sm:text-base text-gray-600 mb-2 sm:mb-3 font-medium">
                            © {currentYear} Websoft Enterprise Platform. All rights reserved
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-end items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
                            <a
                                href="mailto:enterprise@smartprocure.pro"
                                className="hover:text-[#6F9C3D] transition-colors duration-200"
                            >
                                enterprise@smartprocure.pro
                            </a>
                            <span className="text-gray-400">|</span>
                            <a
                                href="tel:+18007762873"
                                className="hover:text-[#6F9C3D] transition-colors duration-200"
                            >
                                +1 (800) Procure
                            </a>
                            <span className="text-gray-400 hidden sm:inline">|</span>
                            <span className="text-gray-500 w-full sm:w-auto mt-1 sm:mt-0">
                                24/7 Global Enterprise Support
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
