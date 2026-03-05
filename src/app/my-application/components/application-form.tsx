"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import PaginationSection from "@/components/PaginationSection";

import { Building2, ChevronRight, Clock, MapPin, Search } from "lucide-react";

import { axiosInstance } from "@/lib/axios";
import { Application } from "@/types/application";
import { PageableResponse, PaginationMeta } from "@/types/pagination";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const ApplicationForm = () => {
  const { data: session } = useSession();
  const formatIDR = (value: number) =>
    new Intl.NumberFormat("id-ID").format(value);

  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const [applications, setApplications] = useState<Application[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    if (!session?.user?.accessToken) return;

    const fetchApplications = async () => {
      try {
        setLoading(true);

        const res = await axiosInstance.get<PageableResponse<Application>>(
          "/applicant/me1",
          {
            headers: {
              Authorization: `Bearer ${session.user.accessToken}`,
            },
            params: {
              page,
              take: 6,
            },
          },
        );

        setApplications(res.data.data);
        setMeta(res.data.meta);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [page, session?.user?.accessToken]);

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
        {/* <div className="mx-auto max-w-7xl"> */}
        <div className="container mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold">My Applications</h1>
            <p className="text-muted-foreground mt-2">
              Track and manage all your job applications
            </p>
          </div>

          {/* Layout */}
          <div className="flex gap-6">
            {/* Sidebar */}
            <aside className="bg-background sticky top-24 w-full max-w-sm space-y-5 self-start rounded-xl border p-5 shadow-sm">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold">
                  <Search className="h-4 w-4" />
                  Search
                </label>
                <Input
                  placeholder="Search by job title or company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-semibold">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-background w-full rounded-md border px-3 py-2 text-sm"
                >
                  <option value="all">All status</option>
                  <option value="PENDING">Pending</option>
                  <option value="REVIEWING">Under review</option>
                  <option value="ACCEPTED">Accepted</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSearchQuery("");
                  setFilterStatus("all");
                }}
              >
                Reset Filters
              </Button>
            </aside>

            {/* Applications List */}
            <div className="flex-1 space-y-4">
              {loading && (
                <p className="text-muted-foreground py-20 text-center">
                  Loading applications...
                </p>
              )}

              {!loading &&
                (filteredApplications.length > 0 ? (
                  filteredApplications.map((application) => (
                    <Link
                      key={application.id}
                      href={`/jobdetail/${application.jobPosting.slug}`}
                    >
                      <Card className="transition-all hover:border-[#5E3BEE] hover:shadow-lg">
                        <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
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
                                <h3 className="text-lg font-bold">
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

                          <div className="flex flex-col items-start gap-3 md:items-end">
                            <Badge
                              className={getStatusColor(application.status)}
                            >
                              {getStatusLabel(application.status)}
                            </Badge>
                            Rp{" "}
                            {formatIDR(
                              Number(application.jobPosting.salaryMin),
                            )}{" "}
                            - Rp{" "}
                            {formatIDR(
                              Number(application.jobPosting.salaryMax),
                            )}
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
                  <div className="bg-secondary/30 flex flex-col items-center justify-center rounded-lg border py-16">
                    <Building2 className="text-muted-foreground h-12 w-12" />
                    <p className="mt-4 text-lg font-semibold">
                      No applications found
                    </p>
                    <Link href="/jobs">
                      <Button className="mt-6 bg-[#5E3BEE]">Browse Jobs</Button>
                    </Link>
                  </div>
                ))}

              {meta && (
                <div className="mt-10 flex cursor-pointer justify-center">
                  <PaginationSection
                    meta={meta}
                    onClick={(newPage) => setPage(newPage)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default ApplicationForm;
