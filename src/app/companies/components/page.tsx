"use client";

import PaginationSection from "@/components/PaginationSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axios";
import type { Companies } from "@/types/companies";
import { PageableResponse, PaginationMeta } from "@/types/pagination";
import { Building2, MapPin, Search } from "lucide-react";
import { useEffect, useState } from "react";

const industries = [
  "All",
  "Technology",
  "E-Commerce",
  "Transportation",
  "Telecommunications",
  "Consumer Goods",
  "Finance",
  "Energy",
];

const locations = ["All", "Jakarta", "Bandung", "Surabaya"];

const CompaniesPage = () => {
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
              take: 9,
            },
          },
        );

        setCompanies(res.data.data);
        setMeta(res.data.meta); // 🔥 ini penting buat pagination
      } catch (err) {
        console.error(err);
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
    <div className="bg-background min-h-screen">
      {/* Header */}
      <section className="bg-background py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-7">
          <h1 className="text-foreground mb-2 text-3xl font-bold md:text-4xl">
            All Companies
          </h1>
          <p className="text-muted-foreground">
            Browse all registered companies on the platform.
          </p>

          {/* Filters */}
          <div className="mt-8 flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search company name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-background pl-10"
              />
            </div>

            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="border-input bg-background text-foreground rounded-md border px-4 py-2 text-sm"
            >
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry === "All" ? "All Industries" : industry}
                </option>
              ))}
            </select>

            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="border-input bg-background text-foreground rounded-md border px-4 py-2 text-sm"
            >
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location === "All" ? "All Locations" : location}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Company Grid */}
      <section className="mx-auto max-w-7xl px-6 py-10 md:px-7">
        {loading && (
          <p className="text-muted-foreground py-20 text-center">
            Loading companies...
          </p>
        )}

        {!loading && (
          <>
            {filteredCompanies.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredCompanies.map((company) => (
                  <div
                    key={company.id}
                    className="border-border bg-card flex flex-col gap-4 rounded-xl border p-6 transition-shadow duration-300 hover:shadow-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl">
                        {company.logoPath ? (
                          <img
                            src={company.logoPath}
                            alt={company.companyName}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-primary text-lg font-bold">
                            {company.companyName.charAt(0)}
                          </span>
                        )}
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-foreground truncate text-lg font-bold">
                          {company.companyName}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {company.industry}
                        </p>
                      </div>
                    </div>

                    <p className="text-muted-foreground line-clamp-2 text-sm">
                      {company.description}
                    </p>

                    <div className="text-muted-foreground flex items-center gap-2 text-xs">
                      <MapPin className="h-3.5 w-3.5" />
                      {company.location}
                    </div>

                    <Button
                      variant="outline"
                      className="mt-auto w-full cursor-pointer font-semibold"
                      //   onClick={() => window.open(company.websiteUrl, "_blank")}
                      onClick={() => {
                        const url = company.websiteUrl.startsWith("http")
                          ? company.websiteUrl
                          : `https://${company.websiteUrl}`;

                        window.open(url, "_blank");
                      }}
                    >
                      Visit Website
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <Building2 className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                <p className="text-muted-foreground">No companies found.</p>
              </div>
            )}

            {meta && (
              <div className="mt-10 flex cursor-pointer justify-center">
                <PaginationSection
                  meta={meta}
                  onClick={(newPage) => setPage(newPage)}
                />
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default CompaniesPage;
