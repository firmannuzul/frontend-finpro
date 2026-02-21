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
      <div className="mt-10 mb-16 flex justify-center">
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

// "use client";

// import PaginationSection from "@/components/PaginationSection";
// import { Input } from "@/components/ui/input";
// import { axiosInstance } from "@/lib/axios";
// import { Job } from "@/types/job";
// import { PageableResponse } from "@/types/pagination";
// import { useQuery } from "@tanstack/react-query";
// import { parseAsInteger, useQueryState } from "nuqs";
// import { useDebounceValue } from "usehooks-ts";
// import JobCard from "./JobCard";

// type JobListProps = {
//   take: number;
// };

// const JobList = ({ take }: JobListProps) => {
//   const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
//   const [search, setSearch] = useQueryState("search", { defaultValue: "" });
//   const [location] = useQueryState("location", { defaultValue: "" });
//   const [category] = useQueryState("category", { defaultValue: "" });
//   const [timeRange] = useQueryState("timeRange", { defaultValue: "all" });
//   const [sort] = useQueryState("sort", { defaultValue: "latest" });
//   const [startDate] = useQueryState("startDate", { defaultValue: "" });
//   const [endDate] = useQueryState("endDate", { defaultValue: "" });
//   // const [debouncedValue] = useDebounceValue(search, 500);
//   const [debouncedSearch] = useDebounceValue(search, 500);

//   const { data: jobs, isPending } = useQuery({
//     // queryKey: ["jobs", page, debouncedValue],
//     queryKey: [
//       "jobs",
//       page,
//       debouncedSearch,
//       location,
//       category,
//       timeRange,
//       sort,
//       startDate,
//       endDate,
//     ],
//     queryFn: async () => {
//       const jobs = await axiosInstance.get<PageableResponse<Job>>("/job", {
//         // params: { page, take, search: debouncedValue },
//         params: {
//           page,
//           take,
//           search: debouncedSearch,
//           location,
//           category,
//           timeRange,
//           sort,
//           startDate,
//           endDate,
//         },
//       });
//       return jobs.data;
//     },
//   });

//   const onClickPagination = (page: number) => {
//     setPage(page);
//   };

//   return (
//     <>
//       {/* <div className="mt-10 mb-16 flex justify-center">
//         <Input
//           placeholder="Search..."
//           className="max-w-xl"
//           onChange={(e) => setSearch(e.target.value)}
//           value={search}
//         />
//       </div> */}

//       <div className="container mx-auto grid grid-cols-3 gap-8 p-4">
//         {isPending && (
//           <div className="col-span-3 my-16 text-center">
//             <p className="text-2xl font-bold">Loading...</p>
//           </div>
//         )}

//         {jobs?.data.map((jobPosting) => {
//           return <JobCard key={jobPosting.id} job={jobPosting} />;
//         })}
//       </div>

//       {jobs?.meta && (
//         <PaginationSection meta={jobs.meta} onClick={onClickPagination} />
//       )}
//     </>
//   );
// };

// export default JobList;
