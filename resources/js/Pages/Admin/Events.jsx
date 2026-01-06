import React, { useState, useEffect } from "react";
import Header from "../../Components/Admin/Header";
import Sidebar from "../../Components/Admin/Sidebar";
import { router } from "@inertiajs/react";
import { Pencil, Search, ChevronRight, Calendar, Users, TrendingUp, Circle, Eye } from "lucide-react";

// Mock Event Data
const mockEvents = [
  {
    id: 1,
    name: "Black Friday",
    date: "29/09/2025",
    duration: "3 Days",
    daysRemaining: "10 Days",
    status: "Active",
    products: 20,
    revenue: "24,000",
  },
  {
    id: 2,
    name: "Summer Sale",
    date: "15/06/2025",
    duration: "7 Days",
    daysRemaining: "45 Days",
    status: "Upcoming",
    products: 15,
    revenue: "18,500",
  },
  {
    id: 3,
    name: "New Year Launch",
    date: "01/01/2026",
    duration: "1 Day",
    daysRemaining: "90 Days",
    status: "Planned",
    products: 30,
    revenue: "35,000",
  },
  {
    id: 4,
    name: "Holiday Promo",
    date: "20/12/2025",
    duration: "5 Days",
    daysRemaining: "60 Days",
    status: "Draft",
    products: 10,
    revenue: "12,000",
  },
];

// KPI Data
const kpiData = [
  {
    title: "Total Events",
    hint: "2 Active, 3 Upcoming",
    icon: '/assets/Assets/totalevents.png',
  },
  {
    title: "Revenue $24,000",
    hint: "Expected: $25,000",
    icon: '/assets/Assets/revenue.png',
  },
  {
    title: "Avg Conversion 14.2%",
    hint: "Best: 18.2%",
    icon: '/assets/Assets/conversion.png',
  },
  {
    title: "Avg ROI 485%",
    hint: "Best: 850%",
    icon: '/assets/Assets/roi.png',
  },
];

const ActionCard = ({ title, hint, onClick, icon }) => (
  <button
    onClick={onClick}
    className="w-full h-31 sm:w-auto rounded-xl bg-[#6f9c3d4f] px-8 py-3 flex flex-col justify-between gap-4 text-left hover:bg-[#6f9c3d33] transition cursor-pointer"
  >
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
    <div className="flex flex-col gap-1">
      <div className="text-base sm:text-xl font-medium text-[#3a3e47] truncate">{title}</div>
      <div className="text-xs sm:text-base text-gray-700">{hint}</div>
    </div>
  </button>
);

const EventsPage = () => {
  const [active, setActive] = useState("events");
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Filter & Modal States
  const [selectedTab, setSelectedTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

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

  // Filter events
  const filteredEvents = mockEvents.filter((event) => {
    const matchesTab = selectedTab === "All" || event.status === selectedTab;
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

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
          className={`flex-1 overflow-y-auto p-6 transition-all duration-300 ${isMobile ? "ml-0" : "ml-64"}`
          }
          style={{ marginTop: "99px" }}
        >
          {/* Page Title + Search + Add Button */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h1 className="text-2xl font-medium">Event Management</h1>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 max-w-md">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search Events"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl text-base outline-none focus:ring-2 focus:ring-[#6F9C3D] focus:border-[#6F9C3D] h-12"
                  style={{ fontFamily: 'Comic Neue' }}
                />
              </div>
              <button
                type="button"
                onClick={() => router.visit('/add-events')}
                className="h-12 w-43 px-6 py-3 text-xl font-medium text-white bg-[#6F9C3D] rounded-lg shadow-sm transition hover:bg-[#5a8232] focus:outline-none focus:ring-2 focus:ring-[#6F9C3D]/30 whitespace-nowrap"
              >
                Add Events
              </button>
            </div>
          </div>

          {/* Action Cards */}
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
            <h2 className="text-2xl font-medium">Event Details</h2>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex flex-wrap items-center rounded-xl px-2 py-1 space-x-1 border border-gray-300 bg-white shadow-sm">
                {["All", "Active", "Upcoming", "Planned", "Completed", "Drafts"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`px-3 py-1.5 rounded-xl text-xl  transition whitespace-nowrap ${selectedTab === tab
                      ? "bg-[#6F9C3D] text-white text-xl font-medium"
                      : "text-gray-500 hover:bg-white hover:text-[#3a3e47]"
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  className="p-1.5 text-gray-500 hover:text-gray-700 transition"
                  aria-label="List view"
                >
                  <img
                    src="/assets/Assets/list.png"
                    alt="List view"
                    className="h-5 w-5 object-contain"
                    onError={(e) => (e.target.style.opacity = "0.3")}
                  />
                </button>
                <button
                  type="button"
                  className="p-1.5 text-gray-500 hover:text-gray-700 transition"
                  aria-label="Grid view"
                >
                  <img
                    src="/assets/Assets/pixels.png"
                    alt="Grid view"
                    className="h-5 w-5 object-contain"
                    onError={(e) => (e.target.style.opacity = "0.3")}
                  />
                </button>
                <button
                  type="button"
                  className="p-1.5 text-gray-500 hover:text-gray-700 transition"
                  aria-label="Filter"
                >
                  <img
                    src="/assets/Assets/filter.png"
                    alt="Filter"
                    className="h-5 w-5 object-contain"
                    onError={(e) => (e.target.style.opacity = "0.3")}
                  />
                </button>
                <button
                  type="button"
                  className="p-1.5 text-gray-500 hover:text-gray-700 transition"
                  aria-label="Refresh"
                >
                  <img
                    src="/assets/Assets/reload.png"
                    alt="Refresh"
                    className="h-5 w-5 object-contain"
                    onError={(e) => (e.target.style.opacity = "0.3")}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Events Table */}
          <div className="overflow-x-auto">
            <div className="min-w-[1000px]">
              {/* Table Header */}
              <div className="rounded-xl bg-[#6f9c3d4f] p-4">
                <div className="grid grid-cols-8 text-lg font-medium text-[#3a3e47]" style={{ fontFamily: "'Inter', sans-serif" }}>
                  <div className="text-left py-2 truncate">Event Name</div>
                  <div className="text-left py-2 truncate">Event Date</div>
                  <div className="text-left py-2 truncate">Duration</div>
                  <div className="text-left py-2 truncate">Days Remaining</div>
                  <div className="text-left py-2 truncate ml-6">Status</div>
                  <div className="text-right py-2 truncate mr-6">Products</div>
                  <div className="text-center py-2 truncate">Expected Revenue</div>
                  <div className="text-center py-2 truncate">Actions</div>
                </div>
              </div>

              {/* Table Rows */}
              <div className="mt-3 space-y-3">
                {filteredEvents.length === 0 ? (
                  <div className="rounded-xl bg-white p-4 text-center text-sm text-gray-600">
                    No events found.
                  </div>
                ) : (
                  filteredEvents.map((event) => (
                    <div
                      key={event.id}
                      className="rounded-xl bg-[#f7f7f7] p-4 shadow-sm ring-1 ring-black/5 transition-all hover:bg-[#f3f3f3]"
                    >
                      <div className="grid grid-cols-8 gap-2 items-center text-lg font-normal" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                        {/* Event Name */}
                        <div className="text-left py-2 truncate text-[#3a3e47]">{event.name}</div>
                        {/* Event Date */}
                        <div className="text-left py-2 truncate text-[#3a3e47]">{event.date}</div>
                        {/* Duration */}
                        <div className="text-left py-2 truncate text-[#3a3e47]">{event.duration}</div>
                        {/* Days Remaining */}
                        <div className="text-left py-2 truncate text-[#3a3e47]">{event.daysRemaining}</div>
                        {/* Event Status */}
                        <div className="text-left py-2 truncate ml-6">
                          <span>{event.status}</span>
                        </div>
                        {/* Products */}
                        <div className="text-right py-2 truncate text-[#3a3e47] mr-6">{event.products}</div>
                        {/* Expected Revenue */}
                        <div className="text-center py-2 truncate text-[#3a3e47]">${event.revenue}</div>
                        {/* Actions */}
                        <div className="text-center py-2 flex items-center justify-center gap-2">
                          <button
                            type="button"
                            className="p-1.5 hover:bg-gray-100 rounded transition"
                            title="View Event"
                            onClick={() => {
                              setSelectedEvent(event);
                              setIsModalOpen(true);
                            }}
                          >
                            <Eye className="w-4 h-4 text-gray-500" />
                          </button>
                          <button
                            type="button"
                            className="p-1.5 hover:bg-gray-100 rounded transition"
                            title="Edit Event"
                            onClick={() => console.log("Edit", event.id)}
                          >
                            <Pencil className="w-4 h-4 text-[#6F9C3D]" />
                          </button>
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

      {/* EVENT VIEW MODAL */}
      {isModalOpen && selectedEvent && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="event-modal-title"
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
              className="absolute right-0 top-0 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#ef4444] text-white shadow hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#ef4444]/50"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <h2 id="event-modal-title" className="text-xl sm:text-2xl font-semibold text-[#6F9C3D] mb-4 sm:mb-6">
                Event View Details
              </h2>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Left Side */}
                <div className="space-y-4">
                  {/* Coupon Details Box */}
                  <div className="bg-[#F4F4F4] rounded-lg p-3 sm:p-4">
                    <h3 className="text-lg font-semibold text-[#6F9C3D] mb-2">Coupon Details</h3>
                    <div className="space-y-1.5 text-base text-[#3a3e47]">
                      <div><span className="font-medium">Event Name:</span> {selectedEvent.name}</div>
                      <div><span className="font-medium">Event Date:</span> {selectedEvent.date}</div>
                      <div><span className="font-medium">Discount Type:</span> Percentage</div>
                      <div><span className="font-medium">Discount Value:</span> 50%</div>
                      <div><span className="font-semibold text-[#6F9C3D]">Validity:</span></div>
                      <div className="mt-1">
                        <div><span className="font-medium">Start Date:</span> {selectedEvent.date}</div>
                        <div><span className="font-medium">End Date:</span> {selectedEvent.date}</div>
                      </div>
                    </div>
                  </div>

                  {/* Categories Box */}
                  <div className="bg-[#F4F4F4] rounded-lg p-3 sm:p-4">
                    <h3 className="text-lg font-semibold text-[#6F9C3D] mb-2">Categories</h3>
                    <div className="space-y-1.5 text-base text-[#3a3e47]">
                      <div><span className="font-medium">Categories Included:</span> Beauty Products, Makeup, Skincare.</div>
                      <div><span className="font-medium">Excluded Products:</span> Bread, Eggs, Meat, Dupatta</div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Event Banner */}
                <div className="rounded-lg flex items-center justify-center">
                  <img
                    src="/assets/Assets/winter-sale.svg"
                    alt="Event Banner"
                    className="max-h-48 rounded-lg w-full sm:max-w-114 sm:max-h-100"
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
    </div >
  );
};

export default EventsPage;