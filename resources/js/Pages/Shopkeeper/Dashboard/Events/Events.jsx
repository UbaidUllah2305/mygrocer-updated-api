import React, { useState } from "react";
import { Search } from "lucide-react";
import { router } from "@inertiajs/react";
import EventsTable from "./EventsTable";
import EventViewModal from "./EventViewModal";
import EventsKpiCard from "./EventsKpiCard";

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

const EventsPage = () => {
  const [selectedTab, setSelectedTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const filteredEvents = mockEvents.filter((event) => {
    const matchesTab = selectedTab === "All" || event.status === selectedTab;
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleViewEvent = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleEditEvent = (event) => {
    console.log("Edit event:", event.id);
    router.visit(`/edit-event/${event.id}`);
  };

  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Event Management</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Manage and track your promotional events
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search Events"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl text-base outline-none focus:ring-2 focus:ring-[#6F9C3D] h-12"
            />
          </div>
          <button
            type="button"
            onClick={() => router.visit('/add-events')}
            className="h-12 w-43 px-6 py-3 text-base font-medium text-white bg-[#6F9C3D] rounded-lg shadow-sm hover:bg-[#5a8232] transition"
          >
            Add Events
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpiData.map((kpi, idx) => (
          <EventsKpiCard
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
        <h2 className="text-xl font-medium">Event Details</h2>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex flex-wrap items-center rounded-xl px-2 py-1 space-x-1 border border-gray-300 bg-white shadow-sm">
            {["All", "Active", "Upcoming", "Planned", "Completed", "Drafts"].map((tab) => (
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
      <EventsTable
        events={filteredEvents}
        onViewEvent={handleViewEvent}
        onEditEvent={handleEditEvent}
      />

      {/* ✅ Modal */}
      <EventViewModal
        isOpen={isModalOpen}
        event={selectedEvent}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default EventsPage;