import React from "react";

export default function BenefitsSection() {
    const benefits = [
        {
            icon: "/Images/Shopkeeper/new-customer.png",
            title: "Reach thousands of new customers",
            description: "Connect with customers actively looking for products in your area",
        },
        {
            icon: "/Images/Shopkeeper/revenue.png",
            title: "Low commission, high returns",
            description: "Keep more of what you earn with our competitive commission rates",
        },
        {
            icon: "/Images/Shopkeeper/business.png",
            title: "Easy-to-use business tools",
            description: "Manage orders, inventory, and analytics from one simple dashboard",
        },
    ];

    return (
        <section className="relative py-12 sm:py-16 lg:py-20 bg-white -mt-20 sm:-mt-36 lg:-mt-48">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-10 sm:mb-12 lg:mb-16 pt-16 sm:pt-24 lg:pt-32">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-gray-900 leading-tight px-4">
                        <span className="text-[#6F9C3D]">My Grocer</span> brings new opportunities
                    </h2>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center text-center group"
                        >
                            {/* Icon Container */}
                            <div className="mb-4 sm:mb-5 lg:mb-6 transition-transform duration-300 ease-out group-hover:scale-110">
                                <img
                                    src={benefit.icon}
                                    alt={benefit.title}
                                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain"
                                />
                            </div>

                            {/* Content */}
                            <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold text-[#6F9C3D] leading-tight">
                                    {benefit.title}
                                </h3>
                                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 font-medium leading-relaxed max-w-xs sm:max-w-sm mx-auto">
                                    {benefit.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
