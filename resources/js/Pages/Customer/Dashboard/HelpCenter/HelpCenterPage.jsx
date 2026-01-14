import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import CustomerDashboardLayout from "@/Layouts/CustomerDashboardLayout";
import ChatSupportSection from "./ChatSupportSection";
import FaqSection from "./FaqSection";

const HelpCenterPage = ({ auth }) => {
  const [activeTab, setActiveTab] = useState("chat");

  return (
    <CustomerDashboardLayout
      auth={auth}
      showFilters={false}
      showLocationBar={false}
      showBreadcrumb={true}
    >
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        {activeTab === "chat" ? (
          <h1 className="text-2xl font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
            Help Center
          </h1>
        ) : (
          <div className="max-w-[300px]">
            <h1 className="text-2xl font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
              Frequently Asked Questions
            </h1>
            <p className="text-sm text-gray-600" style={{ fontFamily: "'Inter', sans-serif" }}>
              Find the answers to common questions about orders, payments, and delivery.
            </p>
          </div>
        )}

        {/* Tab Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => setActiveTab("chat")}
            className={`px-6 py-2 rounded-lg text-base font-medium transition ${activeTab === "chat"
              ? "bg-[#6F9C3D] text-white"
              : "bg-gray-400 text-white hover:bg-gray-300"
              }`}
          >
            Chat Support
          </button>
          <button
            onClick={() => setActiveTab("faq")}
            className={`px-6 py-2 rounded-lg text-base font-medium transition ${activeTab === "faq"
              ? "bg-[#6F9C3D] text-white"
              : "bg-gray-400 text-white hover:bg-gray-500"
              }`}
          >
            FAQs
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === "chat" ? <ChatSupportSection /> : <FaqSection />}
    </CustomerDashboardLayout>
  );
};

export default HelpCenterPage;