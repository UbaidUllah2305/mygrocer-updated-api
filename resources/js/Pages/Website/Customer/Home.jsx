import Header from "./Components/Header";
import Footer from "./Components/Footer";
import HeroSection from "./Pages/HeroSection";
import CustomerDashboardLayout from "../../../Layouts/CustomerDashboardLayout";

export default function Home({ auth }) {
  const user = auth?.user;

  return (
    <div className="min-h-screen">
      <Header auth={user} />

      <main>
        <HeroSection auth={user} />

        <CustomerDashboardLayout auth={user} showStoresList={true} />
      </main>

      <Footer />
    </div>
  );
}
