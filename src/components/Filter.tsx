"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

type Props = {
  search: string;
  onSearchChange: (v: string) => void;

  location: string;
  onLocationChange: (v: string) => void;

  category: string;
  onCategoryChange: (v: string) => void;

  timeRange: string;
  onTimeRangeChange: (v: string) => void;

  customFrom: string;
  customTo: string;
  onCustomFromChange: (v: string) => void;
  onCustomToChange: (v: string) => void;

  sortOrder: string;
  onSortOrderChange: (v: string) => void;

  locations: string[];
  categories: string[];

  onReset: () => void;
};

const SearchFilterBar = ({
  search,
  onSearchChange,
  location,
  onLocationChange,
  category,
  onCategoryChange,
  timeRange,
  onTimeRangeChange,
  customFrom,
  customTo,
  onCustomFromChange,
  onCustomToChange,
  sortOrder,
  onSortOrderChange,
  locations,
  categories,
  onReset,
}: Props) => {
  return (
    <aside className="bg-background sticky top-24 w-full max-w-sm space-y-5 self-start rounded-xl border p-5 shadow-sm">
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold">
          <Search className="h-4 w-4" /> Search
        </label>
        <Input
          placeholder="Search job..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div>
        <label className="text-sm font-semibold">Location</label>
        <select
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          className="bg-background w-full rounded-md border px-3 py-2 text-sm"
        >
          <option value="All">All locations</option>
          {locations.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-sm font-semibold">Category</label>
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="bg-background w-full rounded-md border px-3 py-2 text-sm"
        >
          <option value="All">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold">Time Range</label>

        {["week", "month", "custom"].map((v) => (
          <label key={v} className="flex cursor-pointer gap-2 text-sm">
            <input
              type="radio"
              value={v}
              checked={timeRange === v}
              onChange={(e) => onTimeRangeChange(e.target.value)}
            />
            {v === "week" && "Last 7 days"}
            {v === "month" && "Last month"}
            {v === "custom" && "Custom range"}
          </label>
        ))}

        {timeRange === "custom" && (
          <div className="flex gap-2 pt-1">
            <input
              type="date"
              value={customFrom}
              onChange={(e) => onCustomFromChange(e.target.value)}
              className="w-full rounded-md border px-2 py-1 text-sm"
            />
            <input
              type="date"
              value={customTo}
              onChange={(e) => onCustomToChange(e.target.value)}
              className="w-full rounded-md border px-2 py-1 text-sm"
            />
          </div>
        )}
      </div>

      <div>
        <label className="text-sm font-semibold">Sort Order</label>
        <select
          value={sortOrder}
          onChange={(e) => onSortOrderChange(e.target.value)}
          className="bg-background w-full rounded-md border px-3 py-2 text-sm"
        >
          <option value="desc">Latest</option>
          <option value="asc">Oldest</option>
        </select>
      </div>
      <Button variant="outline" className="w-full" onClick={onReset}>
        Reset Filters
      </Button>
    </aside>
  );
};

export default SearchFilterBar;
