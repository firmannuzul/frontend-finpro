import Footer from "@/components/Footer";
import JobList from "@/components/JobList";
import Navbar from "@/components/Navbar";

const Job = () => {
  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-7xl px-6">
        <JobList take={9} />
      </div>
      <Footer />
    </div>
  );
};

export default Job;
