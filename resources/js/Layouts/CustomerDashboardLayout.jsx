import React, { useState } from "react";
import { usePage } from "@inertiajs/react";
import { FaMapMarkerAlt, FaFilter } from "react-icons/fa";
import Filters from "../Pages/Website/Customer/Pages/Filters";
import ShoppingSection from "../Pages/Website/Customer/Pages/ShoppingSection";
import StoresGrid from "../Pages/Website/Customer/Pages/StoresGrid";
import Breadcrumb from "@/Components/Breadcrumb";
import { getBreadcrumbs } from "@/Components/Config/breadcrumbs";

export default function CustomerDashboardLayout({ auth, children, showStoresList = true }) {
    const { url } = usePage();
    const user = auth?.user;
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [currentLocation, setCurrentLocation] = useState("Work 365 Link AT Main Road Lahore");

    // Get breadcrumbs based on current route
    const breadcrumbs = getBreadcrumbs(url);

    return (
        <div className="min-h-screen bg-white">
            {/* Location Section */}
            <section
                className={`bg-white sticky z-40 ${
                    !user ? "border-b border-gray-200" : ""
                }`}
            >
                <div className="container mx-auto px-4">
                    {user && (
                        <div className="flex justify-center items-center gap-2 text-sm sm:text-base py-4">
                            <FaMapMarkerAlt className="text-[#6F9C3D] text-lg sm:text-xl shrink-0" />
                            <span className="text-gray-700 font-medium truncate">
                                {currentLocation}
                            </span>
                        </div>
                    )}
                </div>
            </section>

            <main>
                {/* Show stores list section or custom children */}
                {showStoresList ? (
                    <section className="py-6 sm:py-8">
                        <div className="container mx-auto px-4">
                            {/* Mobile Filter Button */}
                            <div className="lg:hidden mb-4">
                                <button
                                    onClick={() => setShowMobileFilters(true)}
                                    className="flex items-center gap-2 bg-[#6F9C3D] text-white px-4 py-2.5 rounded-lg font-medium hover:bg-[#5d8a32] transition-colors shadow-md"
                                >
                                    <FaFilter className="text-sm" />
                                    <span>Show Filters</span>
                                </button>
                            </div>
                            
                            <div className="grid lg:grid-cols-4 gap-4 lg:gap-6 xl:gap-8 pb-4">
                                <div></div>
                                <div className="lg:col-span-3">
                                    {/* Breadcrumb Navigation */}
                                    <Breadcrumb items={breadcrumbs} />
                                </div>
                            </div>

                            <div className="grid lg:grid-cols-4 gap-4 lg:gap-6 xl:gap-8">
                                {/* Desktop Filters Sidebar */}
                                <div className="hidden lg:block lg:col-span-1">
                                    <Filters />
                                </div>

                                {/* Mobile Filters Modal */}
                                {showMobileFilters && (
                                    <div
                                        className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                                        onClick={() => setShowMobileFilters(false)}
                                    >
                                        <div
                                            className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl animate-slide-in"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <div className="sticky top-0 z-10 bg-[#6F9C3D] p-4 flex justify-between items-center shadow-md">
                                                <h2 className="text-lg font-semibold text-white">
                                                    Filters
                                                </h2>
                                                <button
                                                    onClick={() => setShowMobileFilters(false)}
                                                    className="text-white text-3xl hover:text-gray-200 transition-colors leading-none"
                                                    aria-label="Close filters"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                            <Filters onClose={() => setShowMobileFilters(false)} />
                                        </div>
                                    </div>
                                )}

                                {/* Stores Grid */}
                                <div className="lg:col-span-3">
                                    <ShoppingSection />
                                    <StoresGrid />
                                </div>
                            </div>
                        </div>
                    </section>
                ) : (
                    <section className="py-6 sm:py-8">
                        <div className="container mx-auto px-4">
                            {/* Breadcrumb for non-stores pages */}
                            <Breadcrumb items={breadcrumbs} />
                            
                            {children}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}
