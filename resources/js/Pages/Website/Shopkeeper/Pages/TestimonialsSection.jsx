import React from "react";

export default function TestimonialsSection() {
    const testimonials = [
        {
            image: "/Images/Shopkeeper/testimonial-one.png",
            quote: "I am truly one of the happiest partners as My Grocer has not only increased the sales of my store but it also made us famous in our area.",
            name: "Farhan Ahmad",
            business: "Clothing Store by Farhan, Islamabad",
        },
        {
            image: "/Images/Shopkeeper/testimonial-two.png",
            quote: "Thanks to My Grocer, my store now receives regular orders. It has increased visibility and helped my business grow steadily.",
            name: "Hassan Javed",
            business: "Hassan Dairy & Grocery, Faisalabad",
        },
    ];

    return (
        <section className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-white">
            <div className="container mx-auto px-4">
                {/* Testimonials Stack */}
                <div className="space-y-0">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="grid md:grid-cols-2 gap-0 bg-gradient-to-br from-[#6F9C3D] to-[#5d8a32] overflow-hidden shadow-2xl"
                        >
                            {/* Image - Order changes based on index */}
                            <div 
                                className={`h-72 sm:h-80 md:h-96 lg:h-[28rem] xl:h-[32rem] ${
                                    index % 2 === 0 ? 'md:order-1' : 'md:order-2'
                                }`}
                            >
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Content - Order changes based on index */}
                            <div 
                                className={`p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col justify-center text-white ${
                                    index % 2 === 0 ? 'md:order-2' : 'md:order-1'
                                }`}
                            >
                                <div className="space-y-4 sm:space-y-5 lg:space-y-6">
                                    {/* Quote */}
                                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold leading-relaxed">
                                        &ldquo;{testimonial.quote}&rdquo;
                                    </p>
                                    
                                    {/* Name and Business */}
                                    <div className="space-y-1 sm:space-y-2">
                                        <p className="text-lg sm:text-xl lg:text-2xl font-bold">
                                            {testimonial.name}
                                        </p>
                                        <p className="text-sm sm:text-base lg:text-lg text-white/80 font-medium">
                                            {testimonial.business}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
