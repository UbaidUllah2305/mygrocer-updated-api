import React, { useState } from "react";
import { Search } from "lucide-react";
import { router } from "@inertiajs/react";
import OffersTable from "./OffersTable";
import OffersKpiCard from "./OffersKpiCard";
import OfferViewModal from "./OfferViewModal";

// UPDATED MOCK DATA TO MATCH IMAGE
const mockOffers = [
  {
    id: 1,
    name: "Black Friday",
    details: "50% off on all products",
    hint: "Beauty Makeup Limited Time",
    status: "Active",
    category: "Beauty",
    perfomance: "78% of target",
    schedule: "Nov 24–Nov 29\n3 days remaining",
    revenue: "8,450",
    target: "15,000",
    progress: 78,
  },
  {
    id: 2,
    name: "Holiday Electronics Sale",
    details: "Up to 30% off on smart phones",
    hint: "Electronics Smart Phones",
    status: "Scheduled",
    category: "Electronics",
    perfomance: "Not Started",
    schedule: "Dec 1–Dec 25\nStarts in 7 days",
    revenue: "0.00",
    target: "15,000",
    progress: 0,
  },
  {
    id: 3,
    name: "Summer Clearance",
    details: "70% off on seasonal items",
    hint: "Seasonal Clearance",
    status: "Expired",
    category: "Apparel",
    perfomance: "95% completed",
    schedule: "Aug 13–Sep 15\nEnded 2 months ago",
    revenue: "12,340",
    target: "15,000",
    progress: 95,
  },
];

// KPI DATA FROM IMAGE
const kpiData = [
  {
    title: "Active Offers",
    hint: "2 Active",
    icon: '/assets/Assets/totalevents.png',
  },
  {
    title: "Revenue $24,000",
    hint: "Increased: 15.3% this month",
    icon: '/assets/Assets/revenue.png',
  },
  {
    title: "Avg Conversion 14.2%",
    hint: "+1.2% vs average",
    icon: '/assets/Assets/conversion.png',
  },
  {
    title: "Avg ROI 485%",
    hint: "-3.1% this week",
    icon: '/assets/Assets/roi.png',
  },
];

const OffersPage = () => {
  const [selectedTab, setSelectedTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

  const filteredOffers = mockOffers.filter((offer) => {
    const matchesTab = selectedTab === "All" ||
      (selectedTab === "Product Offers" && ["Beauty", "Electronics", "Apparel"].includes(offer.category)) ||
      (selectedTab === "Delivery Offers" && false);
    const matchesSearch = offer.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleViewOffer = (offer) => {
    setSelectedOffer(offer);
    setIsModalOpen(true);
  };

  const handleEditOffer = (offer) => {
    console.log("Edit offer:", offer.id);
    router.visit(`/create-offers?offerId=${offer.id}`);
  };

  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Offers</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage and track your promotions</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search Offers"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl text-base outline-none focus:ring-2 focus:ring-[#6F9C3D] h-12"
            />
          </div>
          <button
            type="button"
            onClick={() => router.visit('/create-offers')}
            className="h-12 w-auto sm:w-56 px-6 py-3 text-base font-medium text-white bg-[#6F9C3D] rounded-lg shadow-sm hover:bg-[#5a8232] transition"
          >
            Create New Offer
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpiData.map((kpi, idx) => (
          <OffersKpiCard
            key={idx}
            title={kpi.title}
            hint={kpi.hint}
            icon={kpi.icon}
            onClick={() => console.log("View KPI:", kpi.title)}
          />
        ))}
      </section>

      {/* Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-xl font-medium">All Offers Details</h2>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex flex-wrap items-center rounded-xl px-2 py-1 space-x-1 border border-gray-300 bg-white shadow-sm">
            {["All", "Product Offers", "Delivery Offers"].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-3 py-1.5 rounded-xl text-base transition whitespace-nowrap ${selectedTab === tab
                  ? "bg-[#6F9C3D] text-white"
                  : "text-gray-500 hover:bg-white hover:text-[#3a3e47]"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ✅ Reusable Table */}
      <OffersTable
        offers={filteredOffers}
        onViewOffer={handleViewOffer}
        onEditOffer={handleEditOffer}
      />

      {/* ✅ Modal */}
      <OfferViewModal
        isOpen={isModalOpen}
        offer={selectedOffer}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default OffersPage;