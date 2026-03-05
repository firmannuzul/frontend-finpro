"use client";

import JobCard from "@/components/JobCard";
import { axiosInstance } from "@/lib/axios";
import { Job } from "@/types/job";
import { PageableResponse } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";

type Props = {
  take: number;
};

const NearbyJobsCard = ({ take }: Props) => {
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [useLocation, setUseLocation] = useState(false);

  const handleUseLocation = () => {
    if (useLocation) {
      setUseLocation(false);
      return;
    }

    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        setUseLocation(true);
      },
      () => {
        alert("Location permission denied");
        setUseLocation(false);
      },
    );
  };

  const { data, isPending } = useQuery({
    queryKey: ["jobs", lat, lng, useLocation],
    queryFn: async () => {
      if (useLocation && lat && lng) {
        const res = await axiosInstance.get<PageableResponse<Job>>(
          "/job/nearby",
          {
            params: {
              lat,
              lng,
              radius: 20,
              take,
            },
          },
        );
        return res.data;
      }

      const res = await axiosInstance.get<PageableResponse<Job>>("/job", {
        params: { take },
      });

      return res.data;
    },
  });

  return (
    <div className="container mx-auto mt-12 px-6">
      <div className="flex items-center justify-between">
        {/* LEFT SIDE */}
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold">
            {useLocation ? (
              <>
                Jobs <span className="text-[#5E3BEE]">Near</span> You
              </>
            ) : (
              <>
                Latest <span className="text-[#5E3BEE]">Jobs</span> Post
              </>
            )}
          </h2>

          <button
            onClick={handleUseLocation}
            className={`flex cursor-pointer items-center gap-2 rounded-md border px-4 py-2 text-sm transition ${
              useLocation
                ? "border-primary bg-[#5E3BEE] text-white"
                : "hover:bg-muted"
            }`}
          >
            <MapPin className={`h-4 w-4 ${useLocation ? "text-white" : ""}`} />
            {useLocation ? "Using Your Location" : "Use My Location"}
          </button>
        </div>

        {/* RIGHT SIDE */}
        <Link href="/jobs">
          <button className="text-primary cursor-pointer text-sm font-medium hover:underline">
            Browse All &gt;
          </button>
        </Link>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {isPending && (
          <div className="col-span-3 py-10 text-center">Loading...</div>
        )}

        {data?.data.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default NearbyJobsCard;
