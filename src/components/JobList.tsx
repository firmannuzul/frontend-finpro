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

type Props = {
  take: number;
};

const industries = ["All", "Technology", "Finance", "Education"];
const locations = ["All", "Jakarta", "Bandung", "Surabaya"];

const JobList = ({ take }: Props) => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });

  const [category, setCategory] = useQueryState("category", {
    defaultValue: "All",
  });

  const [location, setLocation] = useQueryState("location", {
    defaultValue: "All",
  });

  const [timeRange, setTimeRange] = useQueryState("range", {
    defaultValue: "",
  });

  const [customFrom, setCustomFrom] = useQueryState("from", {
    defaultValue: "",
  });

  const [customTo, setCustomTo] = useQueryState("to", {
    defaultValue: "",
  });

  const [sortOrder, setSortOrder] = useQueryState("sortOrder", {
    defaultValue: "desc",
  });

  const [debouncedSearch] = useDebounceValue(search, 400);

  const { data: jobs, isPending } = useQuery({
    queryKey: [
      "jobs",
      page,
      debouncedSearch,
      category,
      location,
      timeRange,
      customFrom,
      customTo,
      sortOrder,
    ],
    queryFn: async () => {
      const res = await axiosInstance.get<PageableResponse<Job>>("/job", {
        params: {
          page,
          take,
          search: debouncedSearch,
          category: category !== "All" ? category : undefined,
          location: location !== "All" ? location : undefined,
          timeRange: timeRange || undefined,
          from: timeRange === "custom" ? customFrom : undefined,
          to: timeRange === "custom" ? customTo : undefined,
          sortOrder,
        },
      });

      return res.data;
    },
  });

  return (
    <>
      {/* <section className="mx-auto max-w-7xl px-4 pt-10 pb-6"> */}
      <section className="container mx-auto px-4 pt-10 pb-6">
        <h1 className="mb-2 text-3xl font-bold md:text-4xl">All Jobs</h1>
        <p className="text-muted-foreground">
          Browse all registered jobs on the platform.
        </p>
      </section>

      {/* <div className="mx-auto flex max-w-7xl gap-6 px-4 pb-8"> */}
      <div className="container mx-auto flex gap-6 px-4 pb-8">
        <SearchFilterBar
          search={search}
          onSearchChange={(v) => {
            setSearch(v);
            setPage(1);
          }}
          location={location}
          onLocationChange={setLocation}
          category={category}
          onCategoryChange={setCategory}
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
          customFrom={customFrom}
          customTo={customTo}
          onCustomFromChange={setCustomFrom}
          onCustomToChange={setCustomTo}
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
          locations={locations}
          categories={industries}
          onReset={() => {
            setSearch("");
            setCategory("All");
            setLocation("All");
            setTimeRange("");
            setCustomFrom("");
            setCustomTo("");
            setSortOrder("desc");
            setPage(1);
          }}
        />

        <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {isPending && (
            <div className="col-span-full py-12 text-center font-semibold">
              Loading jobs...
            </div>
          )}

          {jobs?.data.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>

      {jobs?.meta && (
        <div className="mt-10 flex cursor-pointer justify-center pl-[25rem]">
          <PaginationSection meta={jobs.meta} onClick={setPage} />
        </div>
      )}
    </>
  );
};

export default JobList;
