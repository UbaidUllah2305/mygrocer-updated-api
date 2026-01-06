import React, { useState, useEffect } from "react";
import Header from "../../../Components/Admin/Header";
import Sidebar from "../../../Components/Admin/Sidebar";
import { router } from "@inertiajs/react";

const Subscription = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // State for plan selection
  const [selectedPlan, setSelectedPlan] = useState("per-order"); // 'per-order' or 'subscription'
  const [billingCycle, setBillingCycle] = useState("monthly"); // 'monthly' or 'yearly'

  // Sidebar toggle logic
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    if (isMobile) setIsSidebarOpen(false);
  };

  const handleSidebarChange = (id) => {
    const paths = {
      dashboard: "/dashboard",
      inventory: "/inventory",
      analytics: "/analytics",
      trends: "/trends",
      adjustments: "/adjustments",
      overheads: "/overheads",
      events: "/events",
      offers: "/offers",
      orders: "/orders",
      messages: "/messages",
      accounts: "/accounts",
      vouchers: "/settings/vouchers",
      delivery: "/settings/deliverysettings",
      subscription: "/settings/subscription",
      "vendor-dashboard": "/settings/vendor-dashboard",
      "help-center": "/settings/help-center",
    };

    if (paths[id]) {
      router.visit(paths[id], {
        preserveScroll: true,
        preserveState: true,
      });
    }

    if (isMobile) {
      closeSidebar();
    }
  };

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
  };

  const handleCheckout = () => {
    alert(`Selected plan: ${selectedPlan}, Billing: ${billingCycle}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#161c2b]">
      {/* Fixed Header */}
      <div className="shrink-0">
        <Header
          isMobile={isMobile}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={toggleSidebar}
        />
      </div>

      {/* Sidebar + Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          active="subscription"
          onChange={handleSidebarChange}
          isMobile={isMobile}
          mobileOpen={isMobile ? isSidebarOpen : true}
          onCloseMobile={closeSidebar}
        />

        {/* Main Content */}
        <main
          className={`flex-1 overflow-y-auto p-6 transition-all duration-300 ${isMobile ? "ml-0" : "ml-64"}`}
          style={{ marginTop: "99px" }}
        >
          {/* Breadcrumb */}
          <div className="text-xl text-gray-500 mb-2">Subscription /</div>

          {/* Page Title & Subtitle */}
          <div className="max-w-5xl mx-auto text-center lg:text-center">
            <h1 className="text-5xl font-semibold mb-2">Choose Your Plan</h1>
            <p className="text-2xl text-gray-600 mb-8">
              Select subscription that fits your business model
            </p>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Per Order Plan */}
            <div
              className={`rounded-xl lg:w-126 h-142 p-4 border-2 relative transition ${selectedPlan === "per-order"
                ? "bg-[#e1f6d8] border-[#6F9C3D]"
                : "bg-gray-100 border-gray-100"
                }`}
            >
              <h2 className="text-3xl font-semibold mb-2">Per Order</h2>
              <p className="text-gray-800 text-xl mb-5">Pay only when you use</p>
              <div className="mb-4 pt-5 border-t-2 border-gray-300">
                <span className="text-3xl font-semibold">$5</span>
                <span className="text-base ml-4">per order</span>
              </div>
              <p className="text-xl font-light text-gray-500 mb-4">No commitment required</p>
              <ul className="space-y-2 mb-6 text-xl">
                {[
                  "Pay only when you order",
                  "No monthly commitment",
                  "Full features access",
                  "Priority support",
                  "Cancel anytime",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <img src="/assets/Assets/checked.png" alt="✓" className="w-5 h-5" />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handlePlanSelect("per-order")}
                className={`w-full h-16 py-3 px-4 mt-16 rounded-lg font-bold text-xl transition ${selectedPlan === "per-order"
                  ? "bg-[#6F9C3D] text-white hover:bg-[#5a8232]"
                  : "bg-gray-400 text-white hover:bg-gray-500"
                  }`}
                style={{ fontFamily: 'Satoshi' }}
              >
                {selectedPlan === "per-order" ? "Selected Plan" : "Select Plan"}
              </button>
            </div>

            {/* Subscription Plan */}
            <div
              className={`rounded-xl lg:w-126 h-142 p-4 border-2 relative transition ${selectedPlan === "subscription"
                ? "bg-[#e1f6d8] border-[#6F9C3D]"
                : "bg-gray-100 border-gray-100"
                }`}
            >
              {/* Most Popular Badge — Positioned Over Border */}
              <div className="absolute top-0 right-8 transform translate-x-3 -translate-y-3 bg-[#6F9C3D] text-white text-base h-9 px-2 py-1 w-30 text-center rounded-full">
                Most Popular
              </div>

              <h2 className="text-3xl font-semibold mb-2">Subscription</h2>
              <p className="text-gray-800 text-xl mb-5">Best value for regular users</p>

              {/* Billing Toggle */}
              <div className="flex h-14 mb-4 border-t-2 text-xl border-gray-400 pt-3 relative">
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`flex-1 py-2 px-4 rounded-l-lg transition ${billingCycle === "monthly"
                    ? "bg-[#6F9C3D] text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                    }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle("yearly")}
                  className={`flex-1 py-2 px-4 rounded-r-lg font-medium relative transition ${billingCycle === "yearly"
                    ? "bg-[#6F9C3D] text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                    }`}
                >
                  Yearly
                  <span className="absolute bottom-8 right-3 bg-orange-500 text-white text-sm px-2 py-1 rounded-full whitespace-nowrap">
                    Save 20%
                  </span>
                </button>
              </div>

              <div className="mb-4">
                <span className="text-3xl font-semibold">
                  ${billingCycle === "monthly" ? "29" : "276"}
                </span>
                <span className="text-base ml-3">
                  per {billingCycle === "monthly" ? "month" : "year"}
                </span>
              </div>
              <p className="text-xl font-light text-gray-500 mb-4">
                Billed {billingCycle === "monthly" ? "monthly" : "annually"}
              </p>
              <ul className="space-y-2 mb-6 text-xl">
                {[
                  "Unlimited offers",
                  "All premium features",
                  "24/7 Priority support",
                  "Advanced analytics",
                  "Custom integrations",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <img src="/assets/Assets/checked.png" alt="✓" className="w-5 h-5" />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handlePlanSelect("subscription")}
                className={`w-full h-16 py-3 px-4 mt-3.5 rounded-lg font-bold text-xl transition ${selectedPlan === "subscription"
                  ? "bg-[#6F9C3D] text-white hover:bg-[#5a8232]"
                  : "bg-gray-400 text-white hover:bg-gray-500"
                  }`}
                style={{ fontFamily: 'Satoshi' }}
              >
                {selectedPlan === "subscription" ? "Selected Plan" : "Select Plan"}
              </button>
            </div>
          </div>

          {/* Continue to Checkout Button */}
          <div className="mt-10 text-center">
            <button
              onClick={handleCheckout}
              className="px-8 py-3 w-full md:w-174 h-16 bg-[#6F9C3D] text-white rounded-lg font-bold text-xl hover:bg-[#5a8232] transition focus:outline-none focus:ring-2 focus:ring-[#6F9C3D]/30"
              style={{ fontFamily: 'Satoshi' }}
            >
              Continue to Checkout
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Subscription;