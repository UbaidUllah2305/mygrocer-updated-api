import { useState } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import HeroSection from "./Pages/HeroSection";
import ShoppingSection from "./Pages/ShoppingSection";
import StoresGrid from "./Pages/StoresGrid";
import Filters from "./Pages/Filters";
import { FaFilter } from "react-icons/fa";

export default function Home({ auth }) {
  const user = auth?.user;
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  return (
    <div className="min-h-screen">
      <Header auth={auth} />

      <main>
        <HeroSection auth={user} />

        {/* Direct content without layout wrapper */}
        <section className="py-6 sm:py-8 border-t border-gray-200">
          <div className="container mx-auto px-4">
            <>
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

                {/* Main Content */}
                <div className="lg:col-span-3">
                  <ShoppingSection />
                  <StoresGrid />
                </div>
              </div>
            </>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
