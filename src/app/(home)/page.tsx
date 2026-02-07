import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Explore from "./components/Explore";
import Jumbotron from "./components/Jumbotron";
import JobList from "@/components/JobList";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Jumbotron />
      <Explore />
      <hr className="mx-6 border-blue-700" />
      <JobList take={3} />
      <Footer />
    </div>
  );
};

export default Home;
