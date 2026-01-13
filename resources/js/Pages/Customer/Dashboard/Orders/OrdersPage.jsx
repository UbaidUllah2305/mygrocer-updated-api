// src/Pages/Customer/OrdersPage.jsx
import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import CustomerDashboardLayout from "@/Layouts/CustomerDashboardLayout";
import OrderDetailModal from "./OrderDetailModal";
import { Package, Clock, ChevronRight } from "lucide-react";

const PastOrderCard = ({ order, onViewSummary }) => {
  const [isRating, setIsRating] = useState(false);
  const [rating, setRating] = useState(order.rating || 0);

  const handleStarClick = (value) => {
    setRating(value);
    setIsRating(true);
    setTimeout(() => alert(`Thank you for rating ${value} stars!`), 500);
  };

  return (
    <div className="group bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex flex-col md:flex-row gap-5">
        {/* Image Section */}
        <div className="relative shrink-0">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
            <img
              src={order.image}
              alt="Order item"
              className="w-full h-full object-cover mix-blend-multiply"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#6F9C3D] transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
                {order.store}
              </h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {order.items}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-lg font-bold text-[#6F9C3D]">{order.total}</p>
              <div className="flex items-center justify-end gap-1 mt-1 text-xs font-medium text-gray-400">
                <Clock size={12} />
                <span>{order.deliveredAt}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-4 mt-4 pt-4 border-t border-gray-50">
            {/* Rating */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Rate your order</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleStarClick(star)}
                    className={`transition-transform hover:scale-110 focus:outline-none ${star <= rating ? "text-yellow-400" : "text-gray-200"}`}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87.69 6.89L12 21l-5.69-.48.69-6.89-5-4.87L9 8.24z" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={onViewSummary}
              className="px-5 py-2.5 bg-orange-50 text-[#FF8829] hover:text-white hover:bg-[#FF8829] font-medium rounded-lg transition-all duration-200 text-sm flex items-center gap-2"
            >
              <span>Reorder Items</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrdersPage = ({ auth }) => {
  // Use state to manage mock data slightly more realistically
  const [activeOrder] = useState({
    id: 1,
    store: "Purchase at Main Store",
    items: "Noodles, Opler's Milk pack, Large Eggs (12 pack), Fresh Bread, Butter 200g...",
    total: "Rs. 1,190.00",
    status: "Preparing Order",
    statusStep: 2, // 1: Confirmed, 2: Preparing, 3: Dispatched...
    image: "/assets/Assets/Customer/order/store.svg",
  });

  const [pastOrders] = useState([
    {
      id: 2,
      store: "Super Mart",
      items: "Noodles, Opler's Milk pack",
      total: "Rs. 1,190.00",
      status: "Delivered",
      image: "/assets/Assets/Customer/order/store.svg",
      deliveredAt: "22 Nov, 02:06 am",
      rating: 4,
    },
    {
      id: 3,
      store: "Fresh Grocers",
      items: "Organic Bananas, Apples, Orange Juice 1L",
      total: "Rs. 850.00",
      status: "Delivered",
      image: "/assets/Assets/Customer/order/store.svg",
      deliveredAt: "18 Nov, 10:30 am",
      rating: 5,
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Helper to open modal (mock implementation)
  const handleViewSummary = () => {
    setIsModalOpen(true);
  };

  return (
    <CustomerDashboardLayout
      auth={auth}
      showFilters={false}
      showLocationBar={false}
      showBreadcrumb={true}
    >
      {/* Active Orders Section */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-50 rounded-lg text-[#6F9C3D]">
            <Package size={20} />
          </div>
          <h2 className="text-xl font-bold text-gray-800" style={{ fontFamily: "'Inter', sans-serif" }}>
            Active Orders
          </h2>
        </div>

        {activeOrder ? (
          <div className="bg-gradient-to-br from-[#6F9C3D] to-[#5a8030] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group">
            {/* Decorative background circles */}
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 -ml-10 -mb-5 w-32 h-32 bg-black opacity-5 rounded-full blur-xl"></div>

            <div className="relative z-10 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-xl p-2 shrink-0 border border-white/30">
                <img src={activeOrder.image} alt="Order item" className="w-full h-full object-contain drop-shadow-md" />
              </div>

              <div className="flex-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold mb-3 border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-yellow-300 animate-pulse"></span>
                  {activeOrder.status}
                </div>
                <h3 className="font-bold text-xl md:text-2xl mb-1">{activeOrder.store}</h3>
                <p className="text-green-50 text-sm md:text-base opacity-90 line-clamp-1 mb-4">{activeOrder.items}</p>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
                  <span className="text-2xl font-bold">{activeOrder.total}</span>
                  <button
                    onClick={handleViewSummary}
                    className="px-6 py-2.5 bg-white text-[#6F9C3D] font-bold rounded-lg shadow-sm hover:bg-gray-50 hover:shadow-md transition-all text-sm"
                  >
                    Track Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-2xl p-8 text-center border-2 border-dashed border-gray-200">
            <p className="text-gray-500 font-medium">No active orders right now</p>
            <Link href="/shop" className="text-[#6F9C3D] font-semibold text-sm hover:underline mt-2 inline-block">Start Shopping</Link>
          </div>
        )}
      </section>

      {/* Past Orders Section */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-orange-50 rounded-lg text-[#FF8829]">
            <Clock size={20} />
          </div>
          <h2 className="text-xl font-bold text-gray-800" style={{ fontFamily: "'Inter', sans-serif" }}>
            Past Orders
          </h2>
        </div>

        {pastOrders.length > 0 ? (
          <div className="grid gap-5">
            {pastOrders.map((order) => (
              <PastOrderCard key={order.id} order={order} onViewSummary={handleViewSummary} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
              <Package size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">No past orders</h3>
            <p className="text-gray-500 mt-1">Looks like you haven't ordered anything yet.</p>
          </div>
        )}
      </section>

      {/* Modal */}
      <OrderDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={activeOrder}
      />
    </CustomerDashboardLayout>
  );
};

export default OrdersPage;