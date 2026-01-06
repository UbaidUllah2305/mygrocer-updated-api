import React from "react";

export default function FeaturesSection() {
    const features = [
        {
            icon: "/Images/Shopkeeper/order.png",
            title: "The Customer Orders",
            description: "Customers browse your products and place orders through the MyGrocer app",
        },
        {
            icon: "/Images/Shopkeeper/prepare.png",
            title: "You Prepare",
            description: "Receive instant notifications and prepare the order with your current inventory",
        },
        {
            icon: "/Images/Shopkeeper/deliver.png",
            title: "Deliver at doorstep",
            description: "A rider will be along shortly to pick up the order and deliver it to the customer",
        },
        {
            icon: "/Images/Shopkeeper/business-grow.png",
            title: "Watch Your Business Grow",
            description: "Monitor your revenue and performance with real-time insights and weekly payouts",
        },
    ];

    return (
        <section className="relative bg-white">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-10 sm:mb-12 lg:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-gray-900 leading-tight">
                        We make it <span className="text-[#6F9C3D]">simple and easy</span>
                    </h2>
                    <p className="mt-4 sm:mt-6 lg:mt-8 text-base sm:text-lg md:text-xl lg:text-2xl">
                        Four seamless steps to transform your business with digital efficiency
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center text-center group hover:transform hover:scale-105 transition-transform duration-300"
                        >
                            {/* Icon Container */}
                            <div className="mb-4 sm:mb-5 lg:mb-6 bg-[#6F9C3D3B] rounded-full group-hover:bg-[#6F9C3D]/20 transition-colors duration-300">
                                <img
                                    src={feature.icon}
                                    alt={feature.title}
                                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain"
                                />
                            </div>

                            {/* Content */}
                            <div className="space-y-2 sm:space-y-4">
                                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-[#6F9C3D] leading-tight">
                                    {feature.title}
                                </h3>
                                <p className="text-sm sm:text-base md:text-lg text-gray-700 font-medium leading-relaxed max-w-xs mx-auto">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
