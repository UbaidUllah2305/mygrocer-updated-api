import React from "react";

export default function PartnerSection() {
    return (
        <section className="relative overflow-visible py-12 sm:py-16 lg:py-20">
            {/* Gradient Background */}
            <div className="absolute left-0 right-0 top-[15%] bottom-[15%] sm:top-[20%] sm:bottom-[20%] bg-gradient-to-br from-[#6F9C3D] to-[#5d8a32]"></div>

            {/* Content Container */}
            <div className="relative z-10">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center">
                        {/* Left Image */}
                        <div className="order-2 lg:order-1">
                            <div className="relative -my-6 sm:-my-10 lg:-my-14 xl:-my-16">
                                <img
                                    src="/Images/Shopkeeper/partner.png"
                                    alt="Partner with us"
                                    className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto rounded-2xl shadow-2xl transform hover:scale-[1.03] transition-all duration-300 ease-out"
                                />
                            </div>
                        </div>

                        {/* Right Content */}
                        <div className="order-1 lg:order-2 space-y-4 sm:space-y-5 lg:space-y-6 xl:space-y-8 py-8 sm:py-12 lg:py-16 xl:py-24 px-4 sm:px-6 lg:px-8">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white leading-tight">
                                Partner with My Grocer today
                            </h2>
                            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white font-medium leading-relaxed max-w-xl">
                                Take your business to the next level by reaching new customers and boost your sales!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
