"use client";

import PaginationSection from "@/components/PaginationSection";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axios";
import { Job } from "@/types/job";
import { PageableResponse } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";
import { parseAsInteger, useQueryState } from "nuqs";
import { useDebounceValue } from "usehooks-ts";
import JobCard from "./JobCard";

type JobListProps = {
  take: number;
};

const JobList = ({ take }: JobListProps) => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [debouncedValue] = useDebounceValue(search, 500);

  const { data: jobs, isPending } = useQuery({
    queryKey: ["jobs", page, debouncedValue],
    queryFn: async () => {
      const jobs = await axiosInstance.get<PageableResponse<Job>>("/job", {
        params: { page, take, search: debouncedValue },
      });
      return jobs.data;
    },
  });

  const onClickPagination = (page: number) => {
    setPage(page);
  };

  return (
    <>
      <div className="mb-16 flex justify-center">
        <Input
          placeholder="Search..."
          className="max-w-xl"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>

      <div className="container mx-auto grid grid-cols-3 gap-8 p-4">
        {isPending && (
          <div className="col-span-3 my-16 text-center">
            <p className="text-2xl font-bold">Loading...</p>
          </div>
        )}

        {jobs?.data.map((jobPosting) => {
          return <JobCard key={jobPosting.id} job={jobPosting} />;
        })}
      </div>

      {jobs?.meta && (
        <PaginationSection meta={jobs.meta} onClick={onClickPagination} />
      )}
    </>
  );
};

export default JobList;

// "use client"; pake

// import { useEffect, useState } from "react";
// import { Job } from "@/types/job";
// import JobCard from "./JobCard";
// import axios from "axios";
// import { axiosInstance } from "@/lib/axios";
// import { useQuery } from "@tanstack/react-query";
// import { PageableResponse } from "@/types/pagination";

// const JobList = () => {pake
//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   const getJobs = async () => {
//     try {
//       const result = await axiosInstance.get("/job");
//       console.log(result.data);
//       setJobs(result.data.data);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     getJobs();
//   }, []);

//   return (
//     <div className="container mx-auto grid grid-cols-3 gap-8 p-4">
//       {isPending && (
//         <div className="col-span-3 text-center my-16">
//           <p className="text-2xl font-bold">Loading...</p>
//         </div>
//       )}
//       {jobs.map((jobPosting) => {
//         return <JobCard key={jobPosting.id} job={jobPosting} />;
//       })}
//     </div>
//   );
// };

// export default JobList;

//    const { data:jobs, isPending } = useQuery({
//     queryKey: ["jobs"],
//     queryFn: async () => {
//       const jobs = await axiosInstance.get<Job[]>("/job", {
//       });
//       return jobs.data;
//     },
//   });

// const { data: jobs = [], isPending } = useQuery({
//   queryKey: ["jobs"],
//   queryFn: async () => {
//     const res = await axiosInstance.get<{ data: Job[] }>("/job");
//     return res.data.data;
//   },
// });

//   const { data: jobs = [], isPending } = useQuery({ pake
//     queryKey: ["jobs"],
//     queryFn: async () => {
//       const res = await axiosInstance.get<PageableResponse<Job>>("/job");
//       return res.data.data;
//     },
//   });

//   return (
//     <div className="container mx-auto grid grid-cols-3 gap-8 p-4">
//       {isPending && (
//         <div className="col-span-3 my-16 text-center">
//           <p className="text-2xl font-bold">Loading...</p>
//         </div>
//       )}
//       {jobs?.map((jobPosting) => {
//         return <JobCard key={jobPosting.id} job={jobPosting} />;
//       })}
//     </div>
//   );
// };

// export default JobList;
