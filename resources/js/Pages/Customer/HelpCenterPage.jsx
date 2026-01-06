// resources/js/Pages/Customer/HelpCenterPage.jsx

import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { ArrowUp, ChevronRight } from "lucide-react";
import CustomerHeader from "../../Components/Customer/CustomerHeader";

const HelpCenterPage = () => {
  const [activeTab, setActiveTab] = useState("chat"); // 'chat' or 'faq'

  // Mock recent chats
  const recentChats = [
    {
      id: 1,
      vendor: "Fresh Mart",
      message: "Thanks for ordering...",
      time: "2m",
      badge: "3",
    },
    {
      id: 2,
      vendor: "Al Fateh",
      message: "Let me know if you want to confirm it...",
      time: "2w",
      badge: "1",
    },
    {
      id: 3,
      vendor: "Al Saeed",
      message: "Thank you for your co-operation...",
      time: "2w",
      badge: "1",
    },
  ];

  // Mock chat messages for Fresh Mart
  const chatMessages = [
    { id: 1, sender: "vendor", text: "Hello! Welcome to Fresh Mart. How can I assist you today?", time: "3:22 PM" },
    { id: 2, sender: "user", text: "Hi! I ordered vegetables yesterday but have not received any delivery updates yet. Can you help me check the status?", time: "3:47 PM" },
    { id: 3, sender: "vendor", text: "Of course! Let me check that for you right away. Could you please share your order number? You can find it in the orders section of your account.", time: "3:45 PM" },
    { id: 4, sender: "user", text: "Thank you for your Co-operation.", time: "3:50 PM" },
  ];

  // Mock FAQs
  const faqs = {
    all: [
      { question: "How do I track my order?", answer: "You can track your order in the 'Orders' section of your account." },
      { question: "What are delivery charges?", answer: "Delivery charges vary by location and order size. Check your cart before checkout." },
      { question: "Can I cancel my order?", answer: "Yes, you can cancel your order within 30 minutes of placing it. After 30 minutes, the order goes into preparation and cannot be cancelled. To cancel, go to My Orders and click the cancel button." },
    ],
    orders: [
      { question: "How do I track my order?", answer: "You can track your order in the 'Orders' section of your account." },
    ],
    payments: [
      { question: "What payment methods are accepted?", answer: "We accept Credit/Debit cards, Wallet, and Cash on Delivery." },
    ],
    delivery: [
      { question: "What are delivery charges?", answer: "Delivery charges vary by location and order size. Check your cart before checkout." },
    ],
    products: [
      { question: "Can I return a product?", answer: "Yes, you can return unopened products within 7 days of delivery." },
    ],
    account: [
      { question: "How do I update my profile?", answer: "Go to My Profile > Edit and save changes." },
    ],
  };

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openFaq, setOpenFaq] = useState(null);

  const filteredFaqs = faqs[selectedCategory] || faqs.all;

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <CustomerHeader />

      <main className="pt-20 px-4 sm:px-6 lg:px-8 pb-10">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div
            className="flex items-center gap-2 text-base md:text-lg mb-6 mt-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <Link href="/" className="hover:text-[#6F9C3D]">
              Go to home
            </Link>
            <span>/</span>
            <Link href="/customer/dashboard" className="hover:text-[#6F9C3D] font-medium">
              Dashboard
            </Link>
            <span>/</span>
            <span className="font-medium underline">Help Center</span>
          </div>

          <div className="flex justify-between">
            {/* Page Title or FAQ Header */}
            {activeTab === "chat" ? (
              <h1
                className="text-xl md:text-2xl font-semibold mb-6"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Help Center
              </h1>
            ) : (
              <div className="max-w-[300px] w-full">
                <h1
                  className="text-xl md:text-2xl font-semibold mb-2"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Frequently Asked Questions
                </h1>
                <p
                  className="text-sm text-gray-600 truncate"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Find the answers to common questions about orders, payments, and delivery.
                </p>
              </div>
            )}

            {/* Tab Buttons */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => setActiveTab("chat")}
                className={`px-6 py-2 md:h-12 rounded-lg text-base md:text-lg font-medium transition ${activeTab === "chat"
                  ? "bg-[#6F9C3D] text-white"
                  : "bg-gray-400 text-white hover:bg-gray-300"
                  }`}
              >
                Chat Support
              </button>
              <button
                onClick={() => setActiveTab("faq")}
                className={`px-6 py-2 md:h-12 rounded-lg text-base md:text-lg font-medium transition ${activeTab === "faq"
                  ? "bg-[#6F9C3D] text-white"
                  : "bg-gray-400 text-white hover:bg-gray-500"
                  }`}
              >
                FAQs
              </button>
            </div>
          </div>

          {/* Chat Support Tab */}
          {activeTab === "chat" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left: Recent Chats */}
              <div className="bg-white rounded-xl shadow-sm">
                {/* Header */}
                <div className="bg-[#6F9C3D] p-4 rounded-t-xl">
                  <h2
                    className="text-lg font-semibold text-white"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Recent Chat
                  </h2>
                </div>

                {/* Search Input */}
                <div className="p-4">
                  <input
                    type="text"
                    placeholder="Search vendors..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6F9C3D] text-base"
                    style={{ fontFamily: "'Inter', sans-serif'" }}
                  />
                </div>

                {/* Chat List */}
                <div className="p-4 space-y-3">
                  {recentChats.map((chat) => (
                    <div
                      key={chat.id}
                      className="flex items-center justify-between p-3 border border-[#00000026] rounded-lg cursor-pointer hover:bg-[#f7f7f7] transition"
                    >
                      {/* Left: Logo + Text */}
                      <div className="flex items-center gap-3 flex-1">
                        <img
                          src={`/assets/Assets/Customer/helpcenter/${chat.vendor.toLowerCase().replace(/\s+/g, '')}.svg`}
                          alt={chat.vendor}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <div className="font-semibold">{chat.vendor}</div>
                          <div className="text-xs font-light truncate">{chat.message}</div>
                        </div>
                      </div>

                      {/* Right: Badge + Time */}
                      <div className="flex flex-col items-center gap-2">
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-[#6F9C3D] text-white text-xs rounded-full">
                          {chat.badge || "1"}
                        </span>
                        <span className="text-xs font-light">{chat.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Chat Window */}
              <div className="md:col-span-2 bg-white rounded-xl shadow-sm">
                {/* Vendor Header */}
                <div className="bg-[#D2E0C3] p-4 rounded-t-xl flex items-center gap-3">
                  <img
                    src="/assets/Assets/Customer/helpcenter/fresh-mart.svg" // Replace with real logo
                    alt="Fresh Mart"
                    className="w-13 h-13 rounded-full"
                  />
                  <div>
                    <h3
                      className="text-lg md:text-xl font-semibold text-gray-900"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Fresh Mart
                    </h3>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="p-4 h-[400px] overflow-y-auto space-y-4">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-3 rounded-lg text-neutral-900 font-medium max-w-[80%] ${msg.sender === "vendor"
                        ? "bg-[#D8D8D83B] ml-auto"
                        : "bg-[#E8EFE0] mr-auto"
                        }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <div className="text-xs text-gray-500 text-right mt-1">{msg.time}</div>
                    </div>
                  ))}
                </div>

                {/* Input Box */}
                <div className="p-4">
                  <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-2xl">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-2 text-base"
                      style={{ fontFamily: "'Inter', sans-serif'" }}
                    />
                    <button
                      className="p-1 bg-[#6F9C3D] text-white rounded-full hover:bg-[#5A7E2F] transition"
                    >
                      <ArrowUp />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FAQs Tab */}
          {activeTab === "faq" && (
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
                    className={`px-4 py-2 rounded-lg text-base md:text-lg font-medium transition ${selectedCategory === tab.key
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
                  <div
                    key={idx}
                    className="bg-white rounded-xl p-4 border border-gray-200"
                  >
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    >
                      <h3
                        className="text-base md:text-lg font-semibold"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {faq.question}
                      </h3>
                      <ChevronRight className="text-[#6F9C3D]"/>
                    </div>
                    {openFaq === idx && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p
                          className="text-sm text-gray-800"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default HelpCenterPage;