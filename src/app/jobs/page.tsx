import Footer from "@/components/Footer";
import JobList from "@/components/JobList";
import Navbar from "@/components/Navbar";
import { JobFilterSidebar } from "./components/job-filter-sidebar";

const Job = () => {
  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-7xl px-6">
        {/* <JobFilterSidebar/> */}
        <JobList take={9} />
      </div>
      <Footer />
    </div>
  );
};

export default Job;


// "use client";

// import Footer from "@/components/Footer";
// import JobList from "@/components/JobList";
// import Navbar from "@/components/Navbar";
// import { JobFilterSidebar } from "./components/job-filter-sidebar";

// const Job = () => {
//   return (
//     <div>
//       <Navbar />

//       <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 md:grid-cols-4 mt-10">

//         {/* Sidebar */}
//         <div className="md:col-span-1">
//           <JobFilterSidebar />
//         </div>

//         {/* Job List */}
//         <div className="md:col-span-3">
//           <JobList take={9} />
//         </div>

//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default Job;

