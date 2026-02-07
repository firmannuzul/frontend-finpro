import Footer from "@/components/Footer";
import JobList from "@/components/JobList";
import Navbar from "@/components/Navbar";

const Job = () => {
  return (
    <div>
      <Navbar />
      <JobList take={9} />
      <Footer />
    </div>
  );
};

export default Job;
