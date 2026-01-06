import Header from "./Components/Header";
import Footer from "./Components/Footer";
import HeroSection from "./Pages/HeroSection";
import BenefitsSection from "./Pages/BenefitsSection";
import PartnerSection from "./Pages/PartnerSection";
import FeaturesSection from "./Pages/FeaturesSection";
import TestimonialsSection from "./Pages/TestimonialsSection";
import FAQSection from "./Pages/FAQSection";

export default function Home({ auth }) {
    return (
        <div className="min-h-screen bg-white">
            <Header auth={auth} />

            <main>
                <HeroSection />
                <BenefitsSection />
                <PartnerSection />
                <FeaturesSection />
                <TestimonialsSection />
                <FAQSection />
            </main>

            <Footer />
        </div>
    );
}
