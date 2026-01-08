import React from "react";

const EventViewModal = ({ isOpen, event, onClose }) => {
  if (!isOpen || !event) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-290 max-h-[95vh] rounded-xl bg-white shadow-xl ring-1 ring-black/10 overflow-hidden">
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-0 top-0 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#ef4444] text-white shadow hover:opacity-90"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#6F9C3D] mb-4 sm:mb-6">
            Event View Details
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-4">
              <div className="bg-[#F4F4F4] rounded-lg p-3 sm:p-4">
                <h3 className="text-lg font-semibold text-[#6F9C3D] mb-2">Coupon Details</h3>
                <div className="space-y-1.5 text-base text-[#3a3e47]">
                  <div><span className="font-medium">Event Name:</span> {event.name}</div>
                  <div><span className="font-medium">Event Date:</span> {event.date}</div>
                  <div><span className="font-medium">Discount Type:</span> Percentage</div>
                  <div><span className="font-medium">Discount Value:</span> 50%</div>
                  <div><span className="font-semibold text-[#6F9C3D]">Validity:</span></div>
                  <div className="mt-1">
                    <div><span className="font-medium">Start Date:</span> {event.date}</div>
                    <div><span className="font-medium">End Date:</span> {event.date}</div>
                  </div>
                </div>
              </div>

              <div className="bg-[#F4F4F4] rounded-lg p-3 sm:p-4">
                <h3 className="text-lg font-semibold text-[#6F9C3D] mb-2">Categories</h3>
                <div className="space-y-1.5 text-base text-[#3a3e47]">
                  <div><span className="font-medium">Categories Included:</span> Beauty Products, Makeup, Skincare.</div>
                  <div><span className="font-medium">Excluded Products:</span> Bread, Eggs, Meat, Dupatta</div>
                </div>
              </div>
            </div>

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
  );
};

export default EventViewModal;