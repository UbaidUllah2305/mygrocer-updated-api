import React from "react";
import { router } from "@inertiajs/react";
import { ClipboardCheck, Box, Calendar, ChevronRight } from "lucide-react";

const ActionCard = ({ title, hint, onClick, icon }) => (
  <button
    onClick={onClick}
    className="w-full rounded-xl bg-[#6f9c3d]/30 px-4 sm:px-6 py-4 sm:py-5 flex flex-col justify-between gap-3 sm:gap-4 text-left hover:bg-[#6f9c3d]/40 active:scale-[0.98] transition-all duration-200 cursor-pointer group shadow-sm hover:shadow-md"
  >
    <div className="flex items-center justify-between">
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/80 flex items-center justify-center shadow-sm">
        <img
          src={icon}
          alt=""
          className="w-6 h-6 sm:w-7 sm:h-7 transition-transform group-hover:scale-110"
          onError={(e) => {
            e.target.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cmVjdCB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9Im5vbmUiIC8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iOCIgZmlsbD0iIzY5OTQzZCIgLz48L3N2Zz4=";
          }}
        />
      </div>
      <div className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center transition-transform group-hover:translate-x-1">
        <ChevronRight className="w-5 h-5 text-[#161c2b]" aria-hidden="true" />
      </div>
    </div>
    <div className="flex flex-col gap-1">
      <div className="text-base sm:text-lg lg:text-xl font-semibold text-[#2d3748]">
        {title}
      </div>
      <div className="text-xs sm:text-sm text-gray-700">{hint}</div>
    </div>
  </button>
);

const ListItem = ({ Icon, title, detail, time }) => (
  <div className="flex justify-between items-center gap-3 rounded-xl border border-gray-200 bg-white p-2 sm:p-3 hover:shadow-md hover:border-[#6f9c3d]/30 transition-all duration-200">
    <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#6f9c3d]/10 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#6f9c3d]" aria-hidden="true" />
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0 flex-1">
        <span className="font-semibold text-sm sm:text-base text-gray-900">{title}</span>
        <span className="text-gray-600 text-xs sm:text-sm truncate">{detail}</span>
      </div>
    </div>
    <div className="text-gray-500 text-xs sm:text-sm flex-shrink-0">
      {time}
    </div>
  </div>
);

const ShopkeeperDashboard = ({ auth }) => {
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    else if (hour < 18) return "Good Afternoon";
    else return "Good Evening";
  };

  return (
    <>
      {/* Greeting Banner */}
      <div className="rounded-2xl bg-gradient-to-br from-[#ffe8d6] via-[#ffd9b3] to-[#ffca9a] p-4 sm:p-5 lg:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 shadow-lg border border-orange-200/50">
        <div className="flex-1 min-w-0">
          <h1 className="font-inter font-bold text-2xl sm:text-3xl lg:text-4xl text-[#161c2b] mb-2">
            {getGreeting()}, {auth?.user?.name}!
          </h1>
          <p className="font-inter text-sm sm:text-base lg:text-lg text-gray-700">
            Here's what's happening with your store today
          </p>
        </div>
        <div className="flex-shrink-0 bg-white/40 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/60">
          <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#6f9c3d] mb-1">
            $112,847
          </div>
          <div className="text-xs sm:text-sm text-gray-600 font-medium">
            Today's Revenue
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <section className="mt-6 sm:mt-8 lg:mt-10">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-inter mb-4 sm:mb-5 text-gray-900">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <ActionCard
            icon="/assets/Assets/plus.svg"
            title="Add New Product"
            hint="Update your inventory"
            onClick={() => router.visit("/add-products")}
          />
          <ActionCard
            icon="/assets/Assets/gift.svg"
            title="Create Offer"
            hint="Boost your sales"
            onClick={() => router.visit("/create-offers")}
          />
          <ActionCard
            icon="/assets/Assets/event1.svg"
            title="Schedule Event"
            hint="Plan promotions"
            onClick={() => router.visit("/add-events")}
          />
          <ActionCard
            icon="/assets/Assets/analytic.svg"
            title="View Analytics"
            hint="Detailed insights"
            onClick={() => router.visit("/analytics")}
          />
        </div>
      </section>

      {/* Recent Activity */}
      <section className="mt-6 sm:mt-8 lg:mt-10">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-5 text-gray-900">
          Recent Activity
        </h2>
        <div className="space-y-3">
          <ListItem
            Icon={ClipboardCheck}
            title="New Order Received:"
            detail="Order #1234 - $145.99"
            time="2min ago"
          />
          <ListItem
            Icon={Box}
            title="Inventory Updated:"
            detail="Added 50 units of Product A"
            time="14min ago"
          />
          <ListItem
            Icon={Calendar}
            title="Event Scheduled:"
            detail="Black Friday Campaign"
            time="2 hours ago"
          />
        </div>
      </section>
    </>
  );
};

export default ShopkeeperDashboard;
