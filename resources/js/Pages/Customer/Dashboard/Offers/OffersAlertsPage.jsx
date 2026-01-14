import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import CustomerDashboardLayout from "@/Layouts/CustomerDashboardLayout";
import OffersTable from "./OffersTable";
import OffersToggle from "./OffersToggle";
import ViewOfferModal from "./ViewOfferModal";

const OffersAlertsPage = ({ auth }) => {
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

  return (
    <CustomerDashboardLayout
      auth={auth}
      showFilters={false}
      showLocationBar={false}
      showBreadcrumb={true}
    >
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
          Offers
        </h1>
        <OffersToggle
          isEnabled={isOffersEnabled}
          onToggle={() => setIsOffersEnabled(!isOffersEnabled)}
        />
      </div>

      {/* ✅ Styled Table */}
      <OffersTable
        offers={offers}
        onView={(offer) => {
          setViewingOffer(offer);
          setIsViewModalOpen(true);
        }}
      />

      {/* Modal */}
      <ViewOfferModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        offer={viewingOffer}
      />
    </CustomerDashboardLayout>
  );
};

export default OffersAlertsPage;