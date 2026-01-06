// resources/js/Pages/Customer/OffersAlertsPage.jsx

import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { Eye, ShoppingCart, X } from "lucide-react";
import CustomerHeader from "../../Components/Customer/CustomerHeader";

const OffersAlertsPage = () => {
  const [isOffersEnabled, setIsOffersEnabled] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingOffer, setViewingOffer] = useState(null);

  const offers = [
    {
      id: 1,
      storeName: "Al Fateh",
      type: "20% Off",
      title: "Welcome Bonus",
      startDate: "12-09-2024",
      endDate: "12-12-2024",
      status: "Unread",
      actions: "view_cart",
    },
  ];

  const ViewOfferModal = ({ isOpen, onClose, offer }) => {
    if (!isOpen || !offer) return null;

    // Mock data 
    const offerData = {
      name: offer.title || "Welcome Bonus",
      status: offer.status || "Active",
      schedule: `${offer.startDate} – ${offer.endDate}`,
    };

    return (
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        role="dialog"
        aria-modal="true"
        aria-labelledby="offer-modal-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="relative w-full max-w-[1161px] max-h-[95vh] rounded-xl bg-white shadow-xl ring-1 ring-black/10 transition-transform duration-300 overflow-hidden">
          {/* Close Button */}
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute right-0 top-0 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#ef4444] text-white shadow hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#ef4444]/50"
          >
            <X />
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
                    <div><span className="font-medium">Offer Name:</span> {offerData.name}</div>
                    <div><span className="font-medium">Status:</span> {offerData.status}</div>
                    <div><span className="font-medium">Discount Type:</span> Percentage</div>
                    <div><span className="font-medium">Discount Value:</span> 20%</div>
                    <div><span className="font-medium">Validity:</span></div>
                    <div className="ml-2 mt-1">
                      <div><span className="font-medium">Start Date:</span> {offer.startDate}</div>
                      <div><span className="font-medium">End Date:</span> {offer.endDate}</div>
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
                  className="max-h-[400px] object-contain rounded-lg max-w-[full]"
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI4IiBmaWxsPSIjNjk5NDNkIi8+PC9zdmc+";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <CustomerHeader />

      <main className="pt-20 px-4 sm:px-6 lg:px-8 pb-10">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div
            className="flex items-center gap-2 text-base md:text-lg mb-6 mt-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <Link href="/" className="hover:text-[#6F9C3D]">
              Go to home
            </Link>
            <span></span>
            <Link href="/customer/dashboard" className="hover:text-[#6F9C3D] font-medium">
              Dashboard
            </Link>
            <span>/</span>
            <span className="font-medium underline">Offers & Alerts</span>
          </div>

          {/* Page Title & Toggle Switch */}
          <div className="relative flex justify-between items-start mb-6">
            <h1
              className="text-xl md:text-2xl font-semibold"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Offers
            </h1>

            {/* Toggle Switch with Tooltip */}
            <div className="group">
              <div
                className="absolute -top-10 right-0 bg-white border border-gray-200 rounded-lg p-2 text-xs md:text-sm text-[#6F9C3D] shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                By turning on you will receive offers from all stores.
              </div>

              {/* Toggle Switch */}
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isOffersEnabled}
                  onChange={() => setIsOffersEnabled(!isOffersEnabled)}
                  className="sr-only"
                />
                <div
                  className={`relative w-10 h-6 rounded-full transition-colors ${isOffersEnabled ? "bg-[#6F9C3D]" : "bg-[#ABABAB]"
                    }`}
                >
                  <div
                    className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isOffersEnabled ? "transform translate-x-4" : ""
                      }`}
                  ></div>
                </div>
              </label>
            </div>
          </div>

          {/* Offers Table */}
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              {/* Table Header */}
              <div className="rounded-xl bg-[#E8EFE0] p-1">
                <div className="grid grid-cols-8 text-lg font-medium text-neutral-800" style={{ fontFamily: "'Inter', sans-serif" }}>
                  <div className="text-left pl-6 md:pl-10 py-2 truncate">#</div>
                  <div className="text-center py-2 truncate">Store Name</div>
                  <div className="text-center py-2 truncate">Type</div>
                  <div className="text-center py-2 truncate">Title</div>
                  <div className="text-center py-2 truncate">Start Date</div>
                  <div className="text-center py-2 truncate">End Date</div>
                  <div className="text-center py-2 truncate">Status</div>
                  <div className="text-center py-2 truncate">Actions</div>
                </div>
              </div>

              {/* Table Rows */}
              <div className="mt-3 space-y-3">
                {offers.map((offer) => (
                  <div
                    key={offer.id}
                    className="relative rounded-xl bg-[#f7f7f7] p-1 shadow-sm ring-1 ring-black/5 transition-all hover:bg-[#f3f3f3]"
                  >
                    <div className="grid grid-cols-8 gap-2 items-center text-lg text-neutral-800 font-normal" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                      {/* # */}
                      <div className="text-left pl-6 md:pl-10 py-2 truncate">{offer.id}</div>
                      {/* Store Name */}
                      <div className="text-center py-2 truncate">{offer.storeName}</div>
                      {/* Type */}
                      <div className="text-center py-2 truncate">{offer.type}</div>
                      {/* Title */}
                      <div className="text-center py-2 truncate">{offer.title}</div>
                      {/* Start Date */}
                      <div className="text-center py-2 truncate">{offer.startDate}</div>
                      {/* End Date */}
                      <div className="text-center py-2 truncate">{offer.endDate}</div>
                      {/* Status */}
                      <div className={`text-center py-2 truncate ${offer.status === "Read" ? "text-[#6F9C3D]" : "text-red-700"}`}>
                        {offer.status}
                      </div>
                      {/* Actions */}
                      <div className="text-center py-2 flex items-center justify-center gap-2">
                        <button
                          onClick={() => {
                            setViewingOffer(offer);
                            setIsViewModalOpen(true);
                          }}
                          className="inline-flex h-5 w-5 items-center justify-center text-neutral-400 hover:text-neutral-600 transition"
                          aria-label="View details"
                        >
                          <Eye />
                        </button>
                        <button
                          className="inline-flex h-5 w-5 items-center justify-center text-[#6F9C3D] transition"
                          aria-label="Add to cart"
                        >
                          <ShoppingCart />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Empty State */}
                {offers.length === 0 && (
                  <div className="rounded-xl bg-white p-4 text-center text-sm text-gray-600">
                    No offers found.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* View Offer Modal */}
        <ViewOfferModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          offer={viewingOffer}
        />
      </main>
    </div>
  );
};

export default OffersAlertsPage;