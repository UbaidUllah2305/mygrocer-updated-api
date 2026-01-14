import React from "react";
import { X } from "lucide-react";

const ViewOfferModal = ({ isOpen, onClose, offer }) => {
  if (!isOpen || !offer) return null;

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
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-0 top-0 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#ef4444] text-white shadow hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#ef4444]/50"
        >
          <X />
        </button>

        <div className="p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
          <h2 id="offer-modal-title" className="text-xl sm:text-2xl font-semibold text-[#6F9C3D] mb-4 sm:mb-6">
            Offer View Details
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-4">
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

              <div className="bg-[#F4F4F4] rounded-lg p-3 sm:p-4">
                <h3 className="text-lg font-medium text-[#6F9C3D] mb-2">Categories</h3>
                <div className="space-y-1.5 text-base text-[#3a3e47]">
                  <div><span className="font-medium">Categories Included:</span> Beauty Products, Makeup, Skincare.</div>
                  <div><span className="font-medium">Excluded Products:</span> Bread, Eggs, Meat, Dupatta</div>
                </div>
              </div>
            </div>

            <div className="rounded-lg p-3 sm:p-4 flex items-center justify-center">
              <img
                src="/assets/Assets/offers-sale.svg"
                alt="Offer Banner"
                className="max-h-[400px] object-contain rounded-lg max-w-full"
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

export default ViewOfferModal;