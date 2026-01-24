import React, { useState } from "react";
import { Link } from "@inertiajs/react";

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState("per-order"); // 'per-order' or 'subscription'
  const [billingCycle, setBillingCycle] = useState("monthly"); // 'monthly' or 'yearly'

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
  };

  const handleCheckout = () => {
    alert(`Selected plan: ${selectedPlan}, Billing: ${billingCycle}`);
  };

  return (
    <>
      {/* Page Header */}
      <div className="max-w-5xl mx-auto text-center mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Choose Your Plan
        </h1>
        <p className="text-base sm:text-lg text-gray-600">
          Select subscription that fits your business model
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {/* Per Order Plan */}
        <div
          className={`rounded-xl p-4 border-2 relative transition ${
            selectedPlan === "per-order"
              ? "bg-[#e1f6d8] border-[#6F9C3D]"
              : "bg-gray-100 border-gray-100"
          }`}
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">Per Order</h2>
          <p className="text-gray-800 text-base sm:text-lg mb-4">Pay only when you use</p>
          <div className="mb-4 pt-4 border-t-2 border-gray-300">
            <span className="text-xl sm:text-2xl font-semibold">$5</span>
            <span className="text-sm sm:text-base ml-2">per order</span>
          </div>
          <p className="text-base text-gray-500 mb-4">No commitment required</p>
          <ul className="space-y-2 mb-6 text-base">
            {[
              "Pay only when you order",
              "No monthly commitment",
              "Full features access",
              "Priority support",
              "Cancel anytime",
            ].map((item, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <img src="/assets/Assets/checked.png" alt="✓" className="w-4 h-4" />
                {item}
              </li>
            ))}
          </ul>
          <button
            onClick={() => handlePlanSelect("per-order")}
            className={`w-full py-3 px-4 rounded-lg font-medium text-base mt-12 transition ${
              selectedPlan === "per-order"
                ? "bg-[#6F9C3D] text-white hover:bg-[#5a8232]"
                : "bg-gray-400 text-white hover:bg-gray-500"
            }`}
          >
            {selectedPlan === "per-order" ? "Selected Plan" : "Select Plan"}
          </button>
        </div>

        {/* Subscription Plan */}
        <div
          className={`rounded-xl p-4 border-2 relative transition ${
            selectedPlan === "subscription"
              ? "bg-[#e1f6d8] border-[#6F9C3D]"
              : "bg-gray-100 border-gray-100"
          }`}
        >
          {/* Most Popular Badge */}
          <div className="absolute -top-3 right-4 bg-[#6F9C3D] text-white text-xs h-7 px-2 py-1 w-28 text-center rounded-full">
            Most Popular
          </div>

          <h2 className="text-xl sm:text-2xl font-semibold mb-2">Subscription</h2>
          <p className="text-gray-800 text-base sm:text-lg mb-4">Best value for regular users</p>

          {/* Billing Toggle */}
          <div className="flex h-12 mb-4 border-t-2 text-base border-gray-400 pt-3 relative">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`flex-1 py-1 px-3 rounded-l-lg transition ${
                billingCycle === "monthly"
                  ? "bg-[#6F9C3D] text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`flex-1 py-1 px-3 rounded-r-lg font-medium relative transition ${
                billingCycle === "yearly"
                  ? "bg-[#6F9C3D] text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
              }`}
            >
              Yearly
              <span className="absolute -top-6 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">
                Save 20%
              </span>
            </button>
          </div>

          <div className="mb-4">
            <span className="text-xl sm:text-2xl font-semibold">
              ${billingCycle === "monthly" ? "29" : "276"}
            </span>
            <span className="text-sm sm:text-base ml-2">
              per {billingCycle === "monthly" ? "month" : "year"}
            </span>
          </div>
          <p className="text-base text-gray-500 mb-4">
            Billed {billingCycle === "monthly" ? "monthly" : "annually"}
          </p>
          <ul className="space-y-2 mb-6 text-base">
            {[
              "Unlimited offers",
              "All premium features",
              "24/7 Priority support",
              "Advanced analytics",
              "Custom integrations",
            ].map((item, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <img src="/assets/Assets/checked.png" alt="✓" className="w-4 h-4" />
                {item}
              </li>
            ))}
          </ul>
          <button
            onClick={() => handlePlanSelect("subscription")}
            className={`w-full py-3 px-4 rounded-lg font-medium text-base transition ${
              selectedPlan === "subscription"
                ? "bg-[#6F9C3D] text-white hover:bg-[#5a8232]"
                : "bg-gray-400 text-white hover:bg-gray-500"
            }`}
          >
            {selectedPlan === "subscription" ? "Selected Plan" : "Select Plan"}
          </button>
        </div>
      </div>

      {/* Continue to Checkout Button */}
      <div className="mt-8 text-center max-w-5xl mx-auto">
        <button
          onClick={handleCheckout}
          className="px-6 py-3 w-full sm:w-auto sm:min-w-[200px] bg-[#6F9C3D] text-white rounded-lg font-medium text-base hover:bg-[#5a8232] transition"
        >
          Continue to Checkout
        </button>
      </div>
    </>
  );
};

export default Subscription;