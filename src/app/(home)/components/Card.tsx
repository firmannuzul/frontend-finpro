"use client";

import JobCard from "@/components/JobCard";
import { axiosInstance } from "@/lib/axios";
import { Job } from "@/types/job";
import { PageableResponse } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";
import { parseAsInteger, useQueryState } from "nuqs";
import { useDebounceValue } from "usehooks-ts";

type PaginationListProps = {
  take: number;
};

const Card = ({ take }: PaginationListProps) => {
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search] = useQueryState("search", { defaultValue: "" });

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
  return (
    <div className="mx-auto max-w-7xl px-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-foreground text-3xl font-bold md:text-4xl">
          Latest <span className="text-[#5E3BEE]">Jobs</span> Post
        </h2>
        <button
          type="button"
          className="text-primary text-sm font-medium hover:underline"
        >
          {"Browse All >"}
        </button>
      </div>

      {/* <div className="container mx-auto grid grid-cols-3 gap-8 p-4 border"> */}
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {isPending && (
          <div className="col-span-3 my-16 text-center">
            <p className="text-2xl font-bold">Loading...</p>
          </div>
        )}

        {jobs?.data.map((jobPosting) => {
          return <JobCard key={jobPosting.id} job={jobPosting} />;
        })}
      </div>
    </div>
  );
};

export default Card;
