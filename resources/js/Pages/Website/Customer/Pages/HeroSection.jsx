import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function HeroSection() {
    const [location, setLocation] = useState("");

    return (
        <section className="relative py-6 sm:py-10 lg:py-16 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 items-center">
                    {/* Left Content */}
                    <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-gray-800 leading-tight">
                            Food, groceries, clothing & essentials — fast delivery
                            from Lahore's top local stores, all in one app!
                        </h1>

                        {/* Search Input with Location Icon */}
                        <div className="relative w-full sm:w-4/5 lg:w-3/4 xl:w-2/3">
                            <div className="flex items-center gap-3 px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-3.5 bg-white border border-[#D7D7D7] rounded-lg focus-within:border-[#6F9C3D] transition-all duration-200"
                                style={{ boxShadow: "0px 2px 2px 0px #0000001F" }}
                            >
                                {/* Location Icon */}
                                <FaMapMarkerAlt className="text-[#6F9C3D] text-lg sm:text-xl md:text-2xl shrink-0" />
                                
                                {/* Input Field */}
                                <input
                                    type="text"
                                    placeholder="Add location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="flex-1 outline-none text-sm sm:text-base text-gray-700 placeholder-gray-400 bg-transparent focus:outline-none focus:ring-0 border-0 p-0"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Image with Background Circle */}
                    <div className="relative flex justify-center lg:justify-start mt-6 lg:mt-0">
                        {/* Green Circle Background */}
                        <div 
                            className="absolute -bottom-16 right-3 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full -z-10"
                            style={{
                                background: '#D3FFA1AB'
                            }}
                        ></div>
                        
                        {/* Hero Image */}
                        <img
                            src="/Images/hero-section.png"
                            alt="Fresh groceries and food delivery"
                            className="w-full max-w-[280px] sm:max-w-xs md:max-w-sm relative z-10 mt-2 sm:mt-4 lg:mt-8"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
