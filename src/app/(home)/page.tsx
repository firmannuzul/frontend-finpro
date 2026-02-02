import Navbar from "@/components/Navbar";
import Jumbotron from "./components/Jumbotron";
import BlogCard from "./components/BlogCard";
import Footer from "@/components/Footer";
import Explore from "./components/Explore";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Jumbotron />
      <Explore />
      <hr className="mx-6 border-blue-700" />


      <div className="container mx-auto grid grid-cols-3 gap-8 p-4">
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
