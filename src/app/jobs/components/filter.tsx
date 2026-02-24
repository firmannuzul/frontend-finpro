"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type SearchFilterBarProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

const SearchFilterBar = ({ search, onSearchChange }: SearchFilterBarProps) => {
  return (
    <section className="bg-background py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <h1 className="text-foreground mb-2 text-3xl font-bold md:text-4xl">
          All Jobs
        </h1>
        <p className="text-muted-foreground">
          Browse all available job opportunities on the platform.
        </p>

        <div className="mt-8 flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search job title..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="bg-background pl-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchFilterBar;
