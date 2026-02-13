import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Card from "./components/Card";
import { CategorySection } from "./components/CategorySection";
import CompanyLogo from "./components/CompanyLogo";
import { CTAbanner } from "./components/CTAbanner";
import HeroSection from "./components/HeroSection";

const Home = () => {
  return (
    // <div>
    <div className="bg-background min-h-screen">
      <Navbar />
      <HeroSection />
      <CompanyLogo />
      <CategorySection />
      <CTAbanner />
      <Card take={6} />
      <Footer />
    </div>
  );
};

export default Home;
