import CustomerDashboardLayout from "@/Layouts/CustomerDashboardLayout";
import Header from "@/Pages/Website/Customer/Components/Header";

export default function Home({ auth }) {
  const user = auth?.user;

  return (
    <div className="min-h-screen">
      <Header auth={auth} />

      <main>

        <CustomerDashboardLayout auth={auth} showStoresList={true} />
      </main>
    </div>
  );
}
