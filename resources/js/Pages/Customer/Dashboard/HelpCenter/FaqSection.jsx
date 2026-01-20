import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const FaqSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = {
    all: [
      { question: "How do I track my order?", answer: "You can track your order in the 'Orders' section of your account." },
      { question: "What are delivery charges?", answer: "Delivery charges vary by location and order size. Check your cart before checkout." },
      { question: "Can I cancel my order?", answer: "Yes, you can cancel your order within 30 minutes of placing it. After 30 minutes, the order goes into preparation and cannot be cancelled. To cancel, go to My Orders and click the cancel button." },
    ],
    orders: [{ question: "How do I track my order?", answer: "You can track your order in the 'Orders' section of your account." }],
    payments: [{ question: "What payment methods are accepted?", answer: "We accept Credit/Debit cards, Wallet, and Cash on Delivery." }],
    delivery: [{ question: "What are delivery charges?", answer: "Delivery charges vary by location and order size. Check your cart before checkout." }],
    products: [{ question: "Can I return a product?", answer: "Yes, you can return unopened products within 7 days of delivery." }],
    account: [{ question: "How do I update my profile?", answer: "Go to My Profile > Edit and save changes." }],
  };

  const filteredFaqs = faqs[selectedCategory] || faqs.all;

  return (
    <div className="mt-4">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { key: "all", label: "All Topics" },
          { key: "orders", label: "Orders" },
          { key: "payments", label: "Payments" },
          { key: "delivery", label: "Delivery" },
          { key: "products", label: "Products" },
          { key: "account", label: "Account" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedCategory(tab.key)}
            className={`px-4 py-2 rounded-lg text-base font-medium transition ${selectedCategory === tab.key
              ? "bg-[#6F9C3D] text-white"
              : "bg-gray-400 text-white hover:bg-gray-500"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* FAQ List */}
      <div className="space-y-2">
        {filteredFaqs.map((faq, idx) => (
          <div key={idx} className="bg-white rounded-xl p-4 border border-gray-200">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
            >
              <h3 className="text-base md:text-lg font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
                {faq.question}
              </h3>
              <ChevronDown
                className={`text-[#6F9C3D] transition-transform duration-200 ${openFaq === idx ? "rotate-180" : ""}`}
              />
            </div>
            {openFaq === idx && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-800" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;