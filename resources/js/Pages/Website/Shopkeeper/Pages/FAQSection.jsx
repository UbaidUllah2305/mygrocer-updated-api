import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "Why should I partner with My Grocer?",
            answer: "My Grocer provides you access to thousands of customers, easy-to-use business tools, competitive commission rates, and dedicated support to help grow your business.",
        },
        {
            question: "Is my store a good fit for My Grocer?",
            answer: "If you operate a grocery store, supermarket, convenience store, or specialty food shop with proper business documentation, you're likely a great fit! We welcome businesses of all sizes.",
        },
        {
            question: "What are the requirements to become a partner?",
            answer: "You need a registered business with valid documentation (business license, tax registration), a physical store location, and the ability to fulfill orders during business hours.",
        },
        {
            question: "Can I join without a physical shop?",
            answer: "Currently, we require all partners to have a physical store location. This ensures product quality, inventory management, and reliable order fulfillment for our customers.",
        },
        {
            question: "How do I get started?",
            answer: "Simply fill out the registration form on this page with your business details. Our team will verify your information and contact you within 24 hours to complete the onboarding process.",
        },
        {
            question: "How do I know if my business is verified?",
            answer: "Once your application is approved, you'll receive a confirmation email and SMS. You'll also get access to your partner dashboard where you can manage your store and start receiving orders.",
        },
        {
            question: "What is the commission fee for partners?",
            answer: "Our commission rates are competitive and transparent, typically ranging from 15-25% depending on your category and order volume. No hidden fees or surprise charges!",
        },
        {
            question: "What is the commission fee for partners?",
            answer: "Our commission structure is simple: we charge between 15-25% commission per order depending on your product category and monthly sales volume. Higher sales volumes get better rates!",
        },
        {
            question: "How can I upsell effectively in my shop?",
            answer: "Use our platform's promotional tools to highlight bestsellers, create bundle deals, and offer seasonal discounts. Our analytics dashboard helps you identify trending products to boost your sales.",
        },
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-12 sm:py-16 lg:py-20">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-10 sm:mb-12 lg:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900">
                        Any Questions?
                    </h2>
                </div>

                {/* FAQ List */}
                <div>
                    <div className="border-t border-[#ABABAB]"></div>
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-b border-[#ABABAB] group">
                            {/* Question Button */}
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between py-5 sm:py-6 lg:py-7 text-left transition-colors duration-200"
                            >
                                <span className="text-sm sm:text-base lg:text-lg font-medium text-gray-900 pr-4 leading-relaxed">
                                    {faq.question}
                                </span>
                                <FaChevronDown 
                                    className={`text-gray-400 text-sm sm:text-base shrink-0 transition-transform duration-300 ${
                                        openIndex === index ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>

                            {/* Answer */}
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                    openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                }`}
                            >
                                <div className="pb-5 sm:pb-6 lg:pb-7 pt-0">
                                    <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
