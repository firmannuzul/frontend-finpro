"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import {
  Building2,
  MapPin,
  Clock,
  ChevronRight,
  Search,
  Building2Icon,
  Map,
} from "lucide-react";

import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { Application } from "@/types/application";
import { useSession } from "next-auth/react";
import { axiosInstance } from "@/lib/axios";
import Image from "next/image";

const ApplicationForm = () => {
  const { data: session } = useSession();

  const [applications, setApplications] = useState<Application[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    if (!session?.user?.accessToken) return;

    axiosInstance
      .get("/applicant/me", {
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
      })
      .then((res) => setApplications(res.data));
  }, [session]);

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        app.jobPosting.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        app.company.companyName
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesStatus =
        filterStatus === "all" || app.status === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [applications, searchQuery, filterStatus]);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "PENDING":
        return "Pending";
      case "REVIEWING":
        return "Under Review";
      case "ACCEPTED":
        return "Accepted";
      case "REJECTED":
        return "Rejected";
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "REVIEWING":
        return "bg-blue-100 text-blue-700";
      case "ACCEPTED":
        return "bg-green-100 text-green-700";
      case "REJECTED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <main>
      <Navbar />

      <div className="from-background to-secondary/20 min-h-screen bg-gradient-to-b px-6 py-12">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-foreground text-4xl font-bold">
              My Applications
            </h1>
            <p className="text-muted-foreground mt-2">
              Track and manage all your job applications
            </p>
          </div>

          {/* Search & Filters */}
          <div className="mb-8 grid gap-4 md:grid-cols-4">
            <div className="relative md:col-span-2">
              <Search className="text-muted-foreground absolute top-3 left-3 h-5 w-5" />
              <Input
                placeholder="Search by job title or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border-input bg-background h-10 rounded-md border px-3"
            >
              <option value="all">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="REVIEWING">Under Review</option>
              <option value="ACCEPTED">Accepted</option>
              <option value="REJECTED">Rejected</option>
            </select>

            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setFilterStatus("all");
              }}
            >
              Reset
            </Button>
          </div>

          {/* Applications List */}
          <div className="space-y-4">
            {filteredApplications.length > 0 ? (
              filteredApplications.map((application) => (
                <Link
                  key={application.id}
                  href={`/jobdetail/${application.jobPosting.slug}`}
                >
                  <Card className="transition-all hover:border-[#5E3BEE] hover:shadow-lg">
                    <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
                      {/* Left */}
                      <div className="flex-1">
                        <div className="flex items-start gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[hsl(270,60%,50%)]/10">
                            <Image
                              src={application.jobPosting.thumbnail}
                              alt="thumbnail"
                              width={150}
                              height={150}
                            />
                          </div>

                          <div className="flex-1">
                            <h3 className="text-foreground text-lg font-bold">
                              {application.jobPosting.title}
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              {application.company.companyName}
                            </p>

                            <div className="text-muted-foreground mt-3 flex flex-wrap gap-3 text-sm">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {application.jobPosting.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                Applied{" "}
                                {new Date(
                                  application.appliedAt,
                                ).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right */}
                      <div className="flex flex-col items-start gap-3 md:items-end">
                        <Badge className={getStatusColor(application.status)}>
                          {getStatusLabel(application.status)}
                        </Badge>

                        <p className="hidden text-sm font-semibold md:block">
                          Rp {application.jobPosting.salaryMin.toLocaleString()}{" "}
                          - Rp{" "}
                          {application.jobPosting.salaryMax.toLocaleString()}
                        </p>

                        <Button size="sm" className="gap-2 bg-[#5E3BEE]">
                          View Details
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="border-border bg-secondary/30 flex flex-col items-center justify-center rounded-lg border py-16">
                <Building2 className="text-muted-foreground h-12 w-12" />
                <p className="text-foreground mt-4 text-lg font-semibold">
                  No applications found
                </p>
                <Link href="/jobs">
                  <Button className="mt-6 bg-[#5E3BEE]">Browse Jobs</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default ApplicationForm;
