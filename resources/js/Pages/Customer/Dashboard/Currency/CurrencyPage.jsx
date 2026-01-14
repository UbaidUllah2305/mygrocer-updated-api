import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import CustomerDashboardLayout from "@/Layouts/CustomerDashboardLayout";
import CurrencySelector from "./CurrencySelector";

const CurrencyPage = ({ auth }) => {
  const [selectedCurrency, setSelectedCurrency] = useState("Dollar");

  const handleUpdate = () => {
    alert(`Currency updated to: ${selectedCurrency}`);
    // In real app: send to backend via Inertia.post()
  };

  return (
    <CustomerDashboardLayout
      auth={auth}
      showFilters={false}
      showLocationBar={false}
      showBreadcrumb={true}
    >
      {/* Page Title */}
      <h1 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
        Change Currency
      </h1>

      {/* Currency Selector */}
      <div className="mb-6 w-full max-w-[1336px]">
        <CurrencySelector
          value={selectedCurrency}
          onChange={setSelectedCurrency}
        />
      </div>

      {/* Update Button */}
      <div className="flex justify-end mt-8">
        <button
          onClick={handleUpdate}
          className="px-6 py-3 md:max-w-[200px] w-full md:w-auto bg-[#FF8B29] text-white text-base md:text-lg font-bold rounded-lg hover:bg-[#FF7A1A] transition"
        >
          Update
        </button>
      </div>
    </CustomerDashboardLayout>
  );
};

export default CurrencyPage;