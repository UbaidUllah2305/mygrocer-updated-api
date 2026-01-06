import React, { useState, useEffect } from "react";
import Header from "../../Components/Admin/Header";
import Sidebar from "../../Components/Admin/Sidebar";
import { router } from "@inertiajs/react";
import { Pencil, Search, ChevronRight, Calendar, Users, TrendingUp, Circle, Eye } from "lucide-react";

// ✅ UPDATED MOCK DATA TO MATCH IMAGE
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

// ✅ KPI DATA FROM IMAGE
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

const renderHintBadges = (hintText) => {
  if (!hintText) return null;
  const parts = hintText.split(' ').filter(part => part.trim() !== '');
  return parts.map((part, index) => (
    <span
      key={index}
      className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full mr-1 last:mr-0"
    >
      {part}
    </span>
  ));
};

const ActionCard = ({ title, hint, onClick, icon }) => (
  <button
    onClick={onClick}
    className="w-full h-31 sm:w-auto rounded-xl bg-[#6f9c3d4f] px-8 py-3 flex flex-col justify-between gap-4 text-left hover:bg-[#6f9c3d33] transition cursor-pointer"
  >
    {/* Top Bar: Icon + Chevron */}
    <div className="flex items-center justify-between">
      <img
        src={icon}
        alt=""
        className="w-5 h-5 sm:w-6 sm:h-6"
        onError={(e) => {
          e.target.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cmVjdCB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9Im5vbmUiIC8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iOCIgZmlsbD0iIzY5OTQzZCIgLz48L3N2Zz4=";
        }}
      />
      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#161c2b]" aria-hidden="true" />
    </div>

    {/* Content Area */}
    <div className="flex flex-col gap-1">
      {/* Title */}
      <div className="text-base sm:text-xl font-medium text-[#3a3e47] truncate">{title}</div>
      {/* Hint */}
      <div className="text-xs sm:text-base text-gray-700">{hint}</div>
    </div>
  </button>
);

const OffersPage = () => {
  const [active, setActive] = useState("offers");
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Filter State
  const [selectedTab, setSelectedTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Checkbox Selection State
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);

  // ✅ Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

  // Sidebar mobile toggle
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

  // Filter offers based on tab and search
  const filteredOffers = mockOffers.filter((offer) => {
    const matchesTab = selectedTab === "All" ||
      (selectedTab === "Product Offers" && ["Beauty", "Electronics", "Apparel"].includes(offer.category)) ||
      (selectedTab === "Delivery Offers" && false); // No delivery offers in mock data
    const matchesSearch = offer.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Handle View Offer
  const handleViewOffer = (offer) => {
    setSelectedOffer(offer);
    setIsModalOpen(true);
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
          active={active}
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
          {/* Page Title + Search + Add Button */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h1 className="text-2xl font-medium">Offers</h1>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 max-w-md">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search Offers"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl text-base outline-none focus:ring-2 focus:ring-[#6F9C3D] focus:border-[#6F9C3D] h-12"
                  style={{ fontFamily: 'Comic Neue' }}
                />
              </div>
              <button
                type="button"
                onClick={() => router.visit('/create-offers')}
                className="h-12 w-auto sm:w-56 px-6 py-3 text-base font-medium text-white bg-[#6F9C3D] rounded-lg shadow-sm transition hover:bg-[#5a8232] focus:outline-none focus:ring-2 focus:ring-[#6F9C3D]/30 whitespace-nowrap"
              >
                Create New Offer
              </button>
            </div>
          </div>

          {/* Action Cards — KPIs from Figma Image */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {kpiData.map((kpi, idx) => (
              <ActionCard
                key={idx}
                title={kpi.title}
                hint={kpi.hint}
                icon={kpi.icon}
                onClick={() => console.log("View details for:", kpi.title)}
              />
            ))}
          </section>

          {/* Filter Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <h2 className="text-2xl font-medium">All Offers Details</h2>

            <div className="flex flex-wrap items-center gap-2">
              {/* Tab Container - wraps on small screens */}
              <div className="flex flex-wrap items-center rounded-xl px-2 py-1 space-x-1 border border-gray-300 bg-white shadow-sm">
                {["All", "Product Offers", "Delivery Offers"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`px-3 py-1.5 rounded-xl text-xl  transition whitespace-nowrap ${selectedTab === tab
                      ? "bg-[#6F9C3D] text-white"
                      : "text-gray-500 hover:bg-white hover:text-[#3a3e47] font-light"
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="overflow-x-auto">
            <div className="min-w-[900px]">
              {/* Table Header Bar */}
              <div className="rounded-md bg-[#6f9c3d4f] p-3">
                <div className="flex items-center">
                  <div className="w-12 flex items-center justify-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 accent-[#6F9C3D] focus:ring-[#6F9C3D]"
                      checked={selectAll}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        setSelectAll(isChecked);
                        if (isChecked) {
                          const newSelected = new Set(filteredOffers.map((o) => o.id));
                          setSelectedRows(newSelected);
                        } else {
                          setSelectedRows(new Set());
                        }
                      }}
                    />
                  </div>

                  {/* Flex-based header columns */}
                  <div className="flex-1 flex ml-2">
                    <div className="w-[18%] py-2 text-xl text-[#3a3e47] truncate whitespace-nowrap">Offer Details</div>
                    <div className="w-[12%] py-2 text-xl text-[#3a3e47] truncate whitespace-nowrap">Status</div>
                    <div className="w-[15%] py-2 text-xl text-[#3a3e47] truncate whitespace-nowrap">Category</div>
                    <div className="w-[17%] py-2 text-xl text-[#3a3e47] truncate whitespace-nowrap">Performance</div>
                    <div className="w-[15%] py-2 text-xl text-[#3a3e47] truncate whitespace-nowrap">Schedule</div>
                    <div className="w-[13%] py-2 text-xl text-[#3a3e47] truncate whitespace-nowrap">Revenue</div>
                    <div className="w-[10%] py-2 text-xl text-[#3a3e47] text-center truncate whitespace-nowrap">Actions</div>
                  </div>
                </div>
              </div>

              {/* Table Rows */}
              <div className="mt-3 space-y-1">
                {filteredOffers.length === 0 ? (
                  <div className="rounded-xl bg-white p-4 text-center text-sm text-gray-600">
                    No offers found.
                  </div>
                ) : (
                  filteredOffers.map((offer, idx) => (
                    <div
                      key={offer.id}
                      className="rounded-md bg-[#f7f7f7] p-3 shadow-sm flex items-center"
                    >
                      <div className="w-12 flex items-center justify-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 accent-[#6F9C3D] focus:ring-[#6F9C3D]"
                          checked={selectedRows.has(offer.id)}
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            const newSelected = new Set(selectedRows);
                            if (isChecked) {
                              newSelected.add(offer.id);
                            } else {
                              newSelected.delete(offer.id);
                            }
                            setSelectedRows(newSelected);
                            setSelectAll(newSelected.size === filteredOffers.length);
                          }}
                        />
                      </div>

                      {/* Fixed 7-column grid — matches header */}
                      <div className="flex-1">
                        {/* Flex-based row columns */}
                        <div className="flex-1 flex ml-2">
                          {/* Offer Details - wider */}
                          <div className="w-[18%] py-2 text-left min-w-0">
                            <div className="text-xl text-[#3a3e47] truncate">{offer.name}</div>
                            <div className="text-sm truncate text-[#407D55] leading-tight">{offer.details}</div>
                            <div className="mt-1 flex flex-nowrap overflow-hidden">
                              {renderHintBadges(offer.hint)}
                            </div>
                          </div>

                          {/* Status */}
                          <div className="w-[12%] py-2 truncate flex items-center whitespace-nowrap text-[#3a3e47]">{offer.status}</div>

                          {/* Category */}
                          <div className="w-[15%] py-2 truncate flex items-center whitespace-nowrap text-[#3a3e47]">{offer.category}</div>

                          {/* Performance */}
                          <div className="w-[17%] py-2 truncate flex items-center whitespace-nowrap text-[#3a3e47]">{offer.perfomance}</div>

                          {/* Schedule */}
                          <div className="w-[15%] py-2 truncate whitespace-nowrap">
                            <div className="text-xl text-gray-600">{offer.schedule.split('\n')[0]}</div>
                            <div className="text-base text-[#407D55]">{offer.schedule.split('\n')[1]}</div>
                          </div>

                          {/* Revenue */}
                          <div className="w-[13%] py-2 truncate whitespace-nowrap">
                            <div className="text-[#3a3e47]">${offer.revenue}</div>
                            {offer.target && parseFloat(offer.revenue) > 0 && (
                              <div className={`text-base ${parseFloat(offer.revenue) / parseFloat(offer.target) > 1 ? "text-green-600" : "text-red-600"}`}>
                                {parseFloat(offer.revenue) / parseFloat(offer.target) > 1
                                  ? `+${Math.round(((parseFloat(offer.revenue) / parseFloat(offer.target)) - 1) * 100)}% vs target`
                                  : `- ${Math.round((1 - parseFloat(offer.revenue) / parseFloat(offer.target)) * 100)}% vs target`}
                              </div>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="w-[10%] py-2 flex items-center justify-center whitespace-nowrap">
                            <button
                              type="button"
                              className="p-1 text-gray-400 hover:text-gray-500 transition"
                              title="View Offer"
                              onClick={() => handleViewOffer(offer)}
                            >
                              <Eye size={18} />
                            </button>
                            <button
                              type="button"
                              className="p-1 text-[#6F9C3D] hover:text-[#6F9C4F] transition"
                              title="Edit Offer"
                              onClick={() => console.log("Edit", offer.id)}
                            >
                              <Pencil size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* OFFER VIEW MODAL */}
      {isModalOpen && selectedOffer && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="offer-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div className="relative w-full max-w-290 max-h-[95vh] rounded-xl bg-white shadow-xl ring-1 ring-black/10 transition-transform duration-300 overflow-hidden">
            {/* Close Button */}
            <button
              type="button"
              aria-label="Close"
              onClick={() => setIsModalOpen(false)}
              className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#ef4444] text-white shadow hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#ef4444]/50"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <h2 id="offer-modal-title" className="text-xl sm:text-2xl font-semibold text-[#6F9C3D] mb-4 sm:mb-6">
                Offer View Details
              </h2>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Left Side: Offer Details + Categories */}
                <div className="space-y-4">
                  {/* Offer Details Box */}
                  <div className="bg-[#F4F4F4] rounded-lg p-3 sm:p-4">
                    <h3 className="text-lg font-medium text-[#6F9C3D] mb-2">Offer Details</h3>
                    <div className="space-y-1.5 text-base text-[#3a3e47]">
                      <div><span className="font-medium">Offer Name:</span> {selectedOffer.name}</div>
                      <div><span className="font-medium">Status:</span> {selectedOffer.status}</div>
                      <div><span className="font-medium">Discount Type:</span> Percentage</div>
                      <div><span className="font-medium">Discount Value:</span> 50%</div>
                      <div><span className="font-medium">Validity:</span></div>
                      <div className="ml-2 mt-1">
                        <div><span className="font-medium">Start Date:</span> {selectedOffer.schedule.split('\n')[0]?.split('–')[0] || selectedOffer.schedule.split('\n')[0]}</div>
                        <div><span className="font-medium">End Date:</span> {selectedOffer.schedule.split('\n')[0]?.split('–')[1] || selectedOffer.schedule.split('\n')[0]}</div>
                      </div>
                    </div>
                  </div>

                  {/* Categories Box */}
                  <div className="bg-[#F4F4F4] rounded-lg p-3 sm:p-4">
                    <h3 className="text-lg font-medium text-[#6F9C3D] mb-2">Categories</h3>
                    <div className="space-y-1.5 text-base text-[#3a3e47]">
                      <div><span className="font-medium">Categories Included:</span> Beauty Products, Makeup, Skincare.</div>
                      <div><span className="font-medium">Excluded Products:</span> Bread, Eggs, Meat, Dupatta</div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Offer Banner */}
                <div className="rounded-lg p-3 sm:p-4 flex items-center justify-center">
                  <img
                    src="/assets/Assets/offers-sale.svg"
                    alt="Offer Banner"
                    className="max-h-100 object-contain rounded-lg max-w-114"
                    onError={(e) => {
                      e.target.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cmVjdCB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9Im5vbmUiIC8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iOCIgZmlsbD0iIzY5OTQzZCIgLz48L3N2Zz4=";
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OffersPage;