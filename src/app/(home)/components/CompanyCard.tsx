"use client";

import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/axios";
import type { Companies } from "@/types/companies";
import { PageableResponse, PaginationMeta } from "@/types/pagination";
import { Building2, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const CompaniesCard = () => {
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [page, setPage] = useState(1);

  const [companies, setCompanies] = useState<Companies[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);

        const res = await axiosInstance.get<PageableResponse<Companies>>(
          "/user/companie",
          {
            params: {
              page,
              take: 6,
            },
          },
        );

        setCompanies(res.data.data);
        setMeta(res.data.meta);
      } catch (err) {
        console.error("Fetch companies error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [page]);

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch = company.companyName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesIndustry =
      selectedIndustry === "All" || company.industry === selectedIndustry;

    const matchesLocation =
      selectedLocation === "All" || company.location === selectedLocation;

    return matchesSearch && matchesIndustry && matchesLocation;
  });

  return (
    <div className="bg-background">
      {/* <section className="mx-auto max-w-7xl px-6 py-5 md:px-7"> */}
      <section className="container mx-auto px-6 py-5 md:px-7">
        {/* Section heading */}

        <div className="mb-12">
          <div className="flex items-start justify-between">
            {/* LEFT SIDE */}
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Trusted Companies <span className="text-[#5E3BEE]">Hiring</span>{" "}
                Now
              </h2>
              <p className="text-muted-foreground mt-2 text-sm">
                Discover fast-growing companies across top industries
              </p>
            </div>

            {/* RIGHT SIDE */}
            <Link href="/companies">
              <button
                type="button"
                className="text-primary cursor-pointer text-sm font-medium hover:underline"
              >
                Browse All &gt;
              </button>
            </Link>
          </div>
        </div>

        {loading && (
          <p className="text-muted-foreground text-center">
            Loading companies...
          </p>
        )}

        {!loading && (
          <>
            {filteredCompanies.length > 0 ? (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {filteredCompanies.map((company) => (
                  <div
                    key={company.id}
                    className="group bg-card border-border relative flex flex-col overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    {/* Logo + name */}
                    <div className="mb-4 flex items-center gap-4">
                      <div className="bg-primary/10 flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl">
                        {company.logoPath ? (
                          <Image
                            src={company.logoPath}
                            alt={company.companyName}
                            width={100}
                            height={100}
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <span className="text-primary text-xl font-bold">
                            {company.companyName.charAt(0)}
                          </span>
                        )}
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-foreground group-hover:text-primary truncate text-lg font-semibold transition">
                          {company.companyName}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {company.industry}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-4 line-clamp-3 text-sm leading-relaxed">
                      {company.description}
                    </p>

                    {/* Location */}
                    <div className="text-muted-foreground mb-6 flex items-center gap-2 text-xs">
                      <MapPin className="h-4 w-4" />
                      {company.location}
                    </div>

                    {/* CTA */}
                    <Button
                      variant="outline"
                      className="group-hover:border-primary group-hover:text-primary mt-auto w-full cursor-pointer font-semibold transition"
                      onClick={() => {
                        const url = company.websiteUrl.startsWith("http")
                          ? company.websiteUrl
                          : `https://${company.websiteUrl}`;
                        window.open(url, "_blank");
                      }}
                    >
                      Visit Company
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <Building2 className="text-muted-foreground mx-auto mb-4 h-14 w-14" />
                <p className="text-muted-foreground text-sm">
                  No companies found.
                </p>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default CompaniesCard;
