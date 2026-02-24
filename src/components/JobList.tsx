"use client";

import PaginationSection from "@/components/PaginationSection";
import { axiosInstance } from "@/lib/axios";
import { Job } from "@/types/job";
import { PageableResponse } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";
import { parseAsInteger, useQueryState } from "nuqs";
import { useDebounceValue } from "usehooks-ts";
import SearchFilterBar from "./Filter";
import JobCard from "./JobCard";

type JobListProps = {
  take: number;
};

const industries = ["All", "Technology", "Finance", "Education"];
const locations = ["All", "Jakarta", "Bandung", "Surabaya"];

const JobList = ({ take }: JobListProps) => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });

  // 🔁 renamed logically (UI still industry)
  const [category, setCategory] = useQueryState("category", {
    defaultValue: "All",
  });

  const [location, setLocation] = useQueryState("location", {
    defaultValue: "All",
  });

  const [debouncedValue] = useDebounceValue(search, 500);

  const { data: jobs, isPending } = useQuery({
    queryKey: ["jobs", page, debouncedValue, category, location],
    queryFn: async () => {
      const res = await axiosInstance.get<PageableResponse<Job>>("/job", {
        params: {
          page,
          take,
          search: debouncedValue,
          category: category !== "All" ? category : undefined, // ✅ FIX HERE
          location: location !== "All" ? location : undefined,
        },
      });

      return res.data;
    },
  });

  const onClickPagination = (page: number) => {
    setPage(page);
  };

  return (
    <>
      <SearchFilterBar
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        industry={category} // UI still says industry
        onIndustryChange={(value) => {
          setCategory(value); // but API uses category
          setPage(1);
        }}
        location={location}
        onLocationChange={(value) => {
          setLocation(value);
          setPage(1);
        }}
        industries={industries}
        locations={locations}
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
        {isPending && (
          <div className="col-span-full my-12 text-center">
            <p className="text-2xl font-bold">Loading...</p>
          </div>
        )}

        {jobs?.data.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {jobs?.meta && (
        <PaginationSection meta={jobs.meta} onClick={onClickPagination} />
      )}
    </>
  );
};

export default JobList;
