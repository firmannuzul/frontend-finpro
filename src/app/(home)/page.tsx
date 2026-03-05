import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { CategorySection } from "./components/CategorySection";
import CompaniesCard from "./components/CompanyCard";
import CompanyLogo from "./components/CompanyLogo";
import { CTAbanner } from "./components/CTAbanner";
import { DualRoleCTA } from "./components/DualRoleCTA";
import HeroSection from "./components/HeroSection";
import { HowItWorks } from "./components/HowItWorks";
import NearbyJobsCard from "./components/NearByCard";
import { Testimonials } from "./components/Testimonials";

const Home = () => {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <HeroSection />
      <CompanyLogo />
      <NearbyJobsCard take={6} />
      <CategorySection />
      <CTAbanner />
      <CompaniesCard />
      <HowItWorks />
      <DualRoleCTA />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
