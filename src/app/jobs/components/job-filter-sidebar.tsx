"use client";

import { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  ArrowUpDown,
  RotateCcw,
} from "lucide-react";
import { useQueryState } from "nuqs";
import { useDebounceValue } from "usehooks-ts";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export function JobFilterSidebar() {
  /* 🔤 local input state (smooth typing) */
  const [searchInput, setSearchInput] = useState("");

  /* 🌐 query state (URL driven) */
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [location, setLocation] = useQueryState("location", {
    defaultValue: "",
  });
  const [category, setCategory] = useQueryState("category", {
    defaultValue: "",
  });
  const [timeRange, setTimeRange] = useQueryState("timeRange", {
    defaultValue: "all",
  });
  const [sort, setSort] = useQueryState("sort", { defaultValue: "latest" });
  const [startDate, setStartDate] = useQueryState("startDate", {
    defaultValue: "",
  });
  const [endDate, setEndDate] = useQueryState("endDate", { defaultValue: "" });

  /* ⏳ debounce input */
  const [debouncedSearch] = useDebounceValue(searchInput, 400);

  /* sync debounce → query param */
  useEffect(() => {
    setSearch(debouncedSearch);
  }, [debouncedSearch]);

  /* keep input synced when URL changes */
  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  const handleReset = () => {
    setSearchInput("");
    setSearch("");
    setLocation("");
    setCategory("");
    setTimeRange("all");
    setSort("latest");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="w-full max-w-sm rounded-lg border bg-white p-6 shadow-sm">
      {/* 🔍 Search */}
      <div className="mb-6">
        <div className="mb-3 flex items-center gap-2">
          <Search className="h-4 w-4 text-[hsl(270,60%,50%)]" />
          <h3 className="text-lg font-bold">Search</h3>
        </div>
        <Input
          placeholder="Search title, company, category..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      <Separator />

      {/* 📍 Location (searchable) */}
      <div className="my-6">
        <h3 className="mb-3 flex items-center gap-2 text-lg font-bold">
          <MapPin className="h-4 w-4 text-[hsl(270,60%,50%)]" /> Location
        </h3>

        <Input
          placeholder="Type location (Jakarta, Remote, etc)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        {/* optional quick suggestions */}
        <div className="mt-2 flex flex-wrap gap-2 text-sm">
          {["Jakarta", "Bandung", "Surabaya", "Remote"].map((city) => (
            <button
              key={city}
              onClick={() => setLocation(city.toLowerCase())}
              className="hover:bg-muted rounded-md border px-2 py-1"
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* 💼 Category (searchable) */}
      <div className="my-6">
        <h3 className="mb-3 flex items-center gap-2 text-lg font-bold">
          <Briefcase className="h-4 w-4 text-[hsl(270,60%,50%)]" /> Category
        </h3>

        <Input
          placeholder="Type category (Engineering, Finance, etc)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        {/* quick suggestions */}
        <div className="mt-2 flex flex-wrap gap-2 text-sm">
          {["Engineering", "Design", "Finance", "Marketing", "Sales", "HR"].map(
            (cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat.toLowerCase())}
                className="hover:bg-muted rounded-md border px-2 py-1"
              >
                {cat}
              </button>
            ),
          )}
        </div>
      </div>

      <Separator />

      {/* ⏱ Time Range */}
      <div className="my-6">
        <h3 className="mb-3 flex items-center gap-2 text-lg font-bold">
          <Clock className="h-4 w-4 text-[hsl(270,60%,50%)]" /> Time Range
        </h3>

        <RadioGroup value={timeRange} onValueChange={setTimeRange}>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="week" />
            <Label>Last 7 days</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="month" />
            <Label>Last month</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="custom" />
            <Label>Custom range</Label>
          </div>
        </RadioGroup>

        {timeRange === "custom" && (
          <div className="mt-3 flex gap-2">
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        )}
      </div>

      <Separator />

      {/* 🔃 Sort */}
      <div className="my-6">
        <h3 className="mb-3 flex items-center gap-2 text-lg font-bold">
          <ArrowUpDown className="h-4 w-4 text-[hsl(270,60%,50%)]" /> Sort
        </h3>

        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger>
            <SelectValue placeholder="Sort jobs" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="popular">Most popular</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* 🔄 Reset */}
      <Button
        variant="outline"
        className="mt-6 w-full gap-2"
        onClick={handleReset}
      >
        <RotateCcw className="h-4 w-4" />
        Reset Filters
      </Button>
    </div>
  );
}
