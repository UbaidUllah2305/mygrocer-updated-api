// resources/js/Pages/Customer/OrdersPage.jsx

import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { X } from "lucide-react";
import CustomerHeader from "../../Components/Customer/CustomerHeader";

const PastOrderCard = ({ order, onViewSummary }) => {
  const [isRating, setIsRating] = useState(false);
  const [rating, setRating] = useState(order.rating || 0);

  const handleStarClick = (value) => {
    setRating(value);
    setIsRating(true);
    // Here you’d send rating to backend
    setTimeout(() => alert(`Thank you for rating ${value} stars!`), 500);
  };

  return (
    <div className=" bg-[#6F9C3D29] rounded-xl relative">
      {/* Top Row: Image + Store + Items + Delivery Date + Total */}
      <div className="flex items-start gap-4 p-4 pb-0 rounded-2xl bg-[#6F9C3D4F]">
        {/* Left: Image */}
        <img
          src={order.image}
          alt="Order item"
          className="w-28 md:w-33 h-20 md:h-24 -ml-4 -mt-4 object-cover rounded-lg"
        />

        {/* Center: Store + Items */}
        <div className="flex-1 min-w-0">
          <h3
            className="font-semibold text-lg md:text-xl text-[#6F9C3D]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {order.store}
          </h3>
          <p
            className="text-base md:text-lg mt-1 truncate"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {order.items}
          </p>
        </div>

        {/* Right: Delivery Date + Total */}
        <div className="flex flex-col items-end gap-1">
          <p className="text-base md:text-lg font-light">{order.deliveredAt}</p>
          <p className="text-lg md:text-xl font-bold text-neutral-800">{order.total}</p>
        </div>
      </div>

      {/* Bottom Row: Rating + Reorder Button */}
      <div className="flex items-center justify-between">
        {/* Left: Rating */}
        <div className="flex items-center gap-2 ml-6 md:ml-9">
          <span className="text-xs text-gray-600">Tap to rate your order</span>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleStarClick(star)}
              className={`w-5 h-5 ${star <= rating ? "text-yellow-500" : "text-gray-300"
                }`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="none"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87.69 6.89L12 21l-5.69-.48.69-6.89-5-4.87L9 8.24z" />
              </svg>
            </button>
          ))}
        </div>

        {/* Right: Reorder Button */}
        <button
          onClick={onViewSummary}
          className="px-4 py-2 bg-[#FF8829] text-white font-medium rounded-lg hover:bg-[#FF7A1A] transition text-sm whitespace-nowrap"
        >
          Select items to reorder
        </button>
      </div>
    </div>
  );
};

const OrdersPage = () => {
  const activeOrder = {
    id: 1,
    store: "Purchase at Main Store",
    items: "Noodles, Opler's Milk pack",
    total: "Rs. 1,190.00",
    status: "Preparing Order",
    image: "/assets/Assets/Customer/order/store.svg", // placeholder image
  };

  const pastOrders = [
    {
      id: 2,
      store: "Purchase at Main Store",
      items: "Noodles, Opler's Milk pack",
      total: "Rs. 1,190.00",
      status: "Delivered",
      image: "/assets/Assets/Customer/order/store.svg",
      deliveredAt: "22 Nov 2025 at 02:06 am",
      rating: 4.5, // 4.5 out of 5 stars
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewSummary = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <CustomerHeader />

      <main className="pt-20 px-4 sm:px-6 lg:px-8 pb-10">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div
            className="flex items-center gap-2 text-sm text-gray-500 mb-6 mt-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <Link href="/" className="hover:text-[#6F9C3D]">
              Go to home
            </Link>
            <span>/</span>
            <Link href="/customer/dashboard" className="hover:text-[#6F9C3D]">
              Dashboard
            </Link>
            <span>/</span>
            <span className="text-gray-800 font-medium underline">Ordering & Reordering</span>
          </div>

          {/* Active Orders */}
          <div className="mb-10">
            <h2
              className="text-xl font-semibold mb-4"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Active Orders
            </h2>

            {activeOrder ? (
              <div className="bg-[#6F9C3D4F] rounded-xl p-4 md:p-6 relative">
                {/* Image + Status Unit - Left Side */}
                <div className="absolute top-0 left-0 flex flex-col items-start gap-2">
                  <img
                    src={activeOrder.image}
                    alt="Order item"
                    className="w-28 md:w-33 h-20 md:h-24 object-cover rounded-lg"
                  />
                  <span className="text-xs font-medium text-gray-700">
                    {activeOrder.status}
                  </span>
                </div>

                {/* Content - To the right of image+status */}
                <div className="ml-32 md:ml-36">
                  <h3
                    className="font-semibold text-lg text-[#6F9C3D]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {activeOrder.store}
                  </h3>
                  <p
                    className="text-base text-gray-800 mt-1"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {activeOrder.items}
                  </p>
                  <span className="text-lg font-bold text-gray-900">{activeOrder.total}</span>
                </div>

                {/* Button - Bottom Right */}
                <button
                  onClick={handleViewSummary}
                  className="absolute bottom-4 -mr-4 -mb-4 right-4 px-4 py-2 bg-[#FF8829] text-white font-medium rounded-lg hover:bg-[#FF7A1A] transition text-sm md:text-base whitespace-nowrap"
                >
                  View Detailed Summary
                </button>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No active orders.</p>
            )}
          </div>

          {/* Past Orders */}
          <div>
            <h2
              className="text-xl font-semibold mb-4"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Past Orders
            </h2>

            {pastOrders.length > 0 ? (
              <div className="space-y-4">
                {pastOrders.map((order) => (
                  <PastOrderCard
                    key={order.id}
                    order={order}
                    onViewSummary={handleViewSummary}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center font-light text-lg py-12 text-gray-600">
                Oops, looks like you haven't any past orders yet.
              </p>
            )}
          </div>
        </div>

        {/* Order Detail Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl w-full max-w-[800px] h-[600px] shadow-xl relative p-4 overflow-y-auto">
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-0 right-0 bg-red-600 rounded-2xl text-white transition z-10"
              >
                <X />
              </button>

              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-28 h-28 md:w-33 md:h-33 bg-gray-200 rounded-full flex items-center justify-center">
                  </div>
                  <div>
                    <h2
                      className="text-xl font-bold"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Purchase at Main Store
                    </h2>
                    <p className="text-lg text-neutral-800 mt-1">Date : 12-09-2025</p>
                    <p className="text-lg text-neutral-800">Time : 12:09 pm</p>
                  </div>
                </div>
              </div>

              {/* Progress Tracker */}
              <div className="px-6 py-4">
                <div className="flex items-center justify-between relative">
                  {/* Connective Line */}
                  <div className="absolute w-auto top-5 left-16 right-3 h-0.5 bg-[#6F9C3D]"></div>

                  {[1, 2, 3, 4, 5, 6].map((step) => (
                    <div key={step} className="flex flex-col items-center z-10">
                      {/* Circle */}
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${step === 1
                          ? "bg-[#6F9C3D] text-white"
                          : "bg-[#EDEDED] text-gray-700"
                          }`}
                      >
                        {step}
                      </div>
                      {/* Label */}
                      <span
                        className={`mt-2 text-xs ${step === 1 ? "text-[#6F9C3D]" : "text-gray-500"
                          }`}
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {step === 1
                          ? "Order Confirmed"
                          : step === 2
                            ? "Processing"
                            : step === 3
                              ? "Prepared"
                              : step === 4
                                ? "Dispatched"
                                : step === 5
                                  ? "Out for Delivery"
                                  : "Delivered"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Items + Totals Section */}
              <div className="px-6 py-4 flex gap-6">
                {/* Left Side: Items & Subtotal */}
                <div className="flex-1">
                  {/* Order Items */}
                  <div className="space-y-3 mb-4">
                    {[
                      { name: "1 x Olper's Full Cream Milk 1500ml", price: "Rs. 347.00" },
                      { name: "1 x Nescafe Classic 1", price: "Rs. 26.00" },
                      { name: "1 x Peri peri sauce", price: "Rs. 172.00" },
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between font-medium">
                        <span className="text-sm">{item.name}</span>
                        <span className="text-sm">{item.price}</span>
                      </div>
                    ))}
                  </div>

                  {/* Subtotal, Fees, Discount */}
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Subtotal</span>
                      <span className="text-sm">Rs. 545</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Standard delivery Charges</span>
                      <span className="text-sm">Rs. 159</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Service fee</span>
                      <span className="text-sm">Rs. 8.56</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Packaging Fee</span>
                      <span className="text-sm">Rs. 25</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Discount</span>
                      <span className="text-sm">- Rs. 99.05</span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Total Box */}
                <div className="w-[280px] mt-38">
                  <div className="bg-[#C7D5B8] rounded-xl p-4">
                    <div className="text-sm text-gray-600">(incl. fees and tax)</div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-bold text-lg">Total</span>
                      <span className="text-2xl font-bold">Rs. 638.51</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default OrdersPage;