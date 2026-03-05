"use client";

import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Building2, Globe, Briefcase } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PaginationSection from "@/components/PaginationSection";

export default function CompanyDetailPage() {
  const { id } = useParams();

  const [company, setCompany] = useState<any>(null);
  const [loadingCompany, setLoadingCompany] = useState(true);

  const [jobs, setJobs] = useState<any[]>([]);
  const [meta, setMeta] = useState<any>(null);
  const [jobPage, setJobPage] = useState(1);
  const [loadingJobs, setLoadingJobs] = useState(false);

  /* =========================
     FETCH COMPANY DETAIL
  ========================== */
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setLoadingCompany(true);
        const res = await axiosInstance.get(`/user/companies/${id}`);
        setCompany(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingCompany(false);
      }
    };

    if (id) fetchCompany();
  }, [id]);

  /* =========================
     FETCH COMPANY JOBS (PAGINATION)
  ========================== */
  useEffect(() => {
    const fetchJobs = async () => {
      if (!id) return;

      try {
        setLoadingJobs(true);

        const res = await axiosInstance.get(`/job/companies/${id}/jobs`, {
          params: {
            page: jobPage,
            take: 7,
          },
        });

        setJobs(res.data.data);
        setMeta(res.data.meta);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingJobs(false);
      }
    };

    fetchJobs();
  }, [id, jobPage]);

  if (loadingCompany) return <p className="p-10 text-center">Loading...</p>;

  if (!company) return <p className="p-10 text-center">Company not found</p>;

  return (
    <div className="bg-background min-h-screen pb-16">
      <Navbar />

      {/* HERO */}
      <div className="from-primary/20 to-primary/5 relative h-40" />

      <div className="container mx-auto px-6">
        <div className="bg-card -mt-16 rounded-xl border p-8 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            {/* Logo */}
            <div className="bg-primary/10 flex h-28 w-28 items-center justify-center overflow-hidden rounded-xl border">
              {company.logoPath ? (
                <Image
                  src={company.logoPath}
                  alt={company.companyName}
                  width={120}
                  height={120}
                />
              ) : (
                <Building2 className="text-primary h-10 w-10" />
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold">{company.companyName}</h1>

              <div className="text-muted-foreground mt-2 flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Building2 className="h-4 w-4" />
                  {company.industry}
                </div>

                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {company.location}
                </div>

                {company.websiteUrl && (
                  <a
                    href={
                      company.websiteUrl.startsWith("http")
                        ? company.websiteUrl
                        : `https://${company.websiteUrl}`
                    }
                    target="_blank"
                    className="flex items-center gap-1 hover:underline"
                  >
                    <Globe className="h-4 w-4" />
                    Website
                  </a>
                )}
              </div>
            </div>

            {/* Job Count */}
            <div className="bg-primary/10 rounded-lg px-6 py-3 text-center">
              <p className="text-xl font-bold">{meta?.total || 0}</p>
              <p className="text-muted-foreground text-xs">Open Jobs</p>
            </div>
          </div>

          {/* TABS */}
          <Tabs defaultValue="about" className="mt-8">
            <TabsList>
              <TabsTrigger value="about" className="cursor-pointer">
                About
              </TabsTrigger>
              <TabsTrigger value="jobs" className="cursor-pointer">
                Jobs
              </TabsTrigger>
            </TabsList>

            {/* ABOUT TAB */}
            <TabsContent value="about">
              <p className="text-muted-foreground mt-4 leading-relaxed">
                {company.description || "No description available."}
              </p>
            </TabsContent>

            {/* JOBS TAB */}
            <TabsContent value="jobs">
              {loadingJobs ? (
                <p className="mt-6 text-center">Loading jobs...</p>
              ) : jobs.length > 0 ? (
                <>
                  <div className="mt-4 grid gap-4">
                    {jobs.map((job: any) => (
                      <Link
                        key={job.id}
                        href={`/jobdetail/${job.slug}`}
                        className="flex items-center justify-between rounded-lg border p-4 transition hover:shadow-md"
                      >
                        <div>
                          <h3 className="font-semibold">{job.title}</h3>
                          <p className="text-muted-foreground text-sm">
                            {job.location}
                          </p>
                        </div>

                        <Briefcase className="text-muted-foreground h-5 w-5" />
                      </Link>
                    ))}
                  </div>

                  {/* PAGINATION */}
                  {meta && (
                    <div className="mt-8 flex cursor-pointer justify-center">
                      <PaginationSection
                        meta={meta}
                        onClick={(page: number) => setJobPage(page)}
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="mt-6 text-center">
                  <Briefcase className="text-muted-foreground mx-auto mb-3 h-10 w-10" />
                  <p className="text-muted-foreground">
                    No job vacancies available.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
}
