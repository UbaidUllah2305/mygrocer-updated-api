import CustomerDashboardLayout from "@/Layouts/CustomerDashboardLayout";
import ShoppingSection from "@/Pages/Website/Customer/Pages/ShoppingSection";
import StoresGrid from "@/Pages/Website/Customer/Pages/StoresGrid";

export default function CustomerDashboard({ auth }) {
  return (
    <CustomerDashboardLayout
      auth={auth}
      showFilters={true}
      showLocationBar={true}
      showBreadcrumb={true}
    >
      <ShoppingSection />
      <StoresGrid />
    </CustomerDashboardLayout>
  );
}
