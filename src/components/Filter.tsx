"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type SearchFilterBarProps = {
  search: string;
  onSearchChange: (value: string) => void;

  industry: string;
  onIndustryChange: (value: string) => void;

  location: string;
  onLocationChange: (value: string) => void;

  industries: string[];
  locations: string[];
};

const SearchFilterBar = ({
  search,
  onSearchChange,
  industry,
  onIndustryChange,
  location,
  onLocationChange,
  industries,
  locations,
}: SearchFilterBarProps) => {
  return (
    <section className="bg-background py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-4">
        <h1 className="text-foreground mb-2 text-3xl font-bold md:text-4xl">
          All Jobs
        </h1>
        <p className="text-muted-foreground">
          Browse all registered jobs on the platform.
        </p>
        <div className="mt-8 flex flex-col gap-4 md:flex-row">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search job title..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Industry */}
          <select
            value={industry}
            onChange={(e) => onIndustryChange(e.target.value)}
            className="border-input bg-background text-foreground rounded-md border px-4 py-2 text-sm"
          >
            {industries.map((item) => (
              <option key={item} value={item}>
                {item === "All" ? "All Industries" : item}
              </option>
            ))}
          </select>

          {/* Location */}
          <select
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            className="border-input bg-background text-foreground rounded-md border px-4 py-2 text-sm"
          >
            {locations.map((item) => (
              <option key={item} value={item}>
                {item === "All" ? "All Locations" : item}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
};

export default SearchFilterBar;
