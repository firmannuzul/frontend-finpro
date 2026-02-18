// 'use client'

// import { useState } from 'react'
// import { Search, MapPin, Briefcase, Clock, ArrowUpDown, RotateCcw } from 'lucide-react'
// import { Input } from '@/components/ui/input'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
// import { Button } from '@/components/ui/button'
// import { Label } from '@/components/ui/label'
// import { Separator } from '@/components/ui/separator'

// export type FilterState = {
//   search: string
//   location: string
//   category: string
//   timeRange: 'all' | 'week' | 'month' | 'custom'
//   sortOrder: 'latest' | 'oldest' | 'popular'
// }

// interface JobFilterSidebarProps {
//   onFilterChange?: (filters: FilterState) => void
// }

// export function JobFilterSidebar({ onFilterChange }: JobFilterSidebarProps) {
//   const [filters, setFilters] = useState<FilterState>({
//     search: '',
//     location: '',
//     category: '',
//     timeRange: 'all',
//     sortOrder: 'latest',
//   })

//   const handleFilterChange = (newFilters: Partial<FilterState>) => {
//     const updatedFilters = { ...filters, ...newFilters }
//     setFilters(updatedFilters)
//     onFilterChange?.(updatedFilters)
//   }

//   const handleReset = () => {
//     const defaultFilters: FilterState = {
//       search: '',
//       location: '',
//       category: '',
//       timeRange: 'all',
//       sortOrder: 'latest',
//     }
//     setFilters(defaultFilters)
//     onFilterChange?.(defaultFilters)
//   }

//   return (
//     <div className="w-full max-w-sm rounded-lg border border-border bg-white p-6 shadow-sm">
//       {/* Search */}
//       <div className="mb-6">
//         <div className="mb-3 flex items-center gap-2">
//           <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
//             <Search className="h-4 w-4 text-[hsl(270,60%,50%)]" />
//           </div>
//           <h3 className="text-lg font-bold text-foreground">Search</h3>
//         </div>
//         <Input
//           placeholder="Search job by title, tag, company"
//           value={filters.search}
//           onChange={(e) => handleFilterChange({ search: e.target.value })}
//           className="border-border"
//         />
//       </div>

//       <Separator />

//       {/* Location */}
//       <div className="my-6">
//         <div className="mb-3 flex items-center gap-2">
//           <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
//             <MapPin className="h-4 w-4 text-[hsl(270,60%,50%)]" />
//           </div>
//           <h3 className="text-lg font-bold text-foreground">Location</h3>
//         </div>
//         <Select value={filters.location} onValueChange={(val) => handleFilterChange({ location: val })}>
//           <SelectTrigger className="border-border">
//             <SelectValue placeholder="Select location" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="remote">Remote</SelectItem>
//             <SelectItem value="us">United States</SelectItem>
//             <SelectItem value="uk">United Kingdom</SelectItem>
//             <SelectItem value="eu">Europe</SelectItem>
//             <SelectItem value="asia">Asia</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       <Separator />

//       {/* Category */}
//       <div className="my-6">
//         <div className="mb-3 flex items-center gap-2">
//           <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
//             <Briefcase className="h-4 w-4 text-[hsl(270,60%,50%)]" />
//           </div>
//           <h3 className="text-lg font-bold text-foreground">Category</h3>
//         </div>
//         <Select value={filters.category} onValueChange={(val) => handleFilterChange({ category: val })}>
//           <SelectTrigger className="border-border">
//             <SelectValue placeholder="Select category" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="design">Design</SelectItem>
//             <SelectItem value="engineering">Engineering</SelectItem>
//             <SelectItem value="marketing">Marketing</SelectItem>
//             <SelectItem value="finance">Finance</SelectItem>
//             <SelectItem value="sales">Sales</SelectItem>
//             <SelectItem value="hr">Human Resources</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       <Separator />

//       {/* Time Range */}
//       <div className="my-6">
//         <div className="mb-3 flex items-center gap-2">
//           <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
//             <Clock className="h-4 w-4 text-[hsl(270,60%,50%)]" />
//           </div>
//           <h3 className="text-lg font-bold text-foreground">Time Range</h3>
//         </div>
//         <RadioGroup value={filters.timeRange} onValueChange={(val) => handleFilterChange({ timeRange: val as FilterState['timeRange'] })}>
//           <div className="flex items-center space-x-2">
//             <RadioGroupItem value="week" id="week" />
//             <Label htmlFor="week" className="cursor-pointer font-normal">Last 7 days</Label>
//           </div>
//           <div className="flex items-center space-x-2">
//             <RadioGroupItem value="month" id="month" />
//             <Label htmlFor="month" className="cursor-pointer font-normal">Last month</Label>
//           </div>
//           <div className="flex items-center space-x-2">
//             <RadioGroupItem value="custom" id="custom" />
//             <Label htmlFor="custom" className="cursor-pointer font-normal">Custom range</Label>
//           </div>
//         </RadioGroup>
//       </div>

//       <Separator />

//       {/* Sort Order */}
//       <div className="my-6">
//         <div className="mb-3 flex items-center gap-2">
//           <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
//             <ArrowUpDown className="h-4 w-4 text-[hsl(270,60%,50%)]" />
//           </div>
//           <h3 className="text-lg font-bold text-foreground">Sort Order</h3>
//         </div>
//         <Select value={filters.sortOrder} onValueChange={(val) => handleFilterChange({ sortOrder: val as FilterState['sortOrder'] })}>
//           <SelectTrigger className="border-border">
//             <SelectValue placeholder="Select sort order" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="latest">Latest first</SelectItem>
//             <SelectItem value="oldest">Oldest first</SelectItem>
//             <SelectItem value="popular">Most popular</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       <Separator />

//       {/* Reset Button */}
//       <div className="mt-6">
//         <Button
//           variant="outline"
//           className="w-full gap-2 border-border text-foreground hover:bg-secondary"
//           onClick={handleReset}
//         >
//           <RotateCcw className="h-4 w-4" />
//           Reset Filters
//         </Button>
//       </div>
//     </div>
//   )
// }



'use client'

import { Search, MapPin, Briefcase, Clock, ArrowUpDown, RotateCcw } from 'lucide-react'
import { useQueryState } from "nuqs"

import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export function JobFilterSidebar() {
  const [search, setSearch] = useQueryState("search", { defaultValue: "" })
  const [location, setLocation] = useQueryState("location", { defaultValue: "" })
  const [category, setCategory] = useQueryState("category", { defaultValue: "" })
  const [timeRange, setTimeRange] = useQueryState("timeRange", { defaultValue: "all" })
  const [sortOrder, setSortOrder] = useQueryState("sort", { defaultValue: "latest" })

  const handleReset = () => {
    setSearch("")
    setLocation("")
    setCategory("")
    setTimeRange("all")
    setSortOrder("latest")
  }

  return (
    <div className="w-full max-w-sm rounded-lg border border-border bg-white p-6 shadow-sm">

      {/* Search */}
      <div className="mb-6">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
            <Search className="h-4 w-4 text-[hsl(270,60%,50%)]" />
          </div>
          <h3 className="text-lg font-bold">Search</h3>
        </div>
        <Input
          placeholder="Search job by title, tag, company"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Separator />

      {/* Location */}
      <div className="my-6">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
            <MapPin className="h-4 w-4 text-[hsl(270,60%,50%)]" />
          </div>
          <h3 className="text-lg font-bold">Location</h3>
        </div>

        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger>
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="remote">Remote</SelectItem>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="uk">United Kingdom</SelectItem>
            <SelectItem value="eu">Europe</SelectItem>
            <SelectItem value="asia">Asia</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Category */}
      <div className="my-6">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
            <Briefcase className="h-4 w-4 text-[hsl(270,60%,50%)]" />
          </div>
          <h3 className="text-lg font-bold">Category</h3>
        </div>

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="design">Design</SelectItem>
            <SelectItem value="engineering">Engineering</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="sales">Sales</SelectItem>
            <SelectItem value="hr">Human Resources</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Time Range */}
      <div className="my-6">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
            <Clock className="h-4 w-4 text-[hsl(270,60%,50%)]" />
          </div>
          <h3 className="text-lg font-bold">Time Range</h3>
        </div>

        <RadioGroup value={timeRange} onValueChange={setTimeRange}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="week" id="week" />
            <Label htmlFor="week">Last 7 days</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="month" id="month" />
            <Label htmlFor="month">Last month</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="custom" id="custom" />
            <Label htmlFor="custom">Custom range</Label>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      {/* Sort Order */}
      <div className="my-6">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
            <ArrowUpDown className="h-4 w-4 text-[hsl(270,60%,50%)]" />
          </div>
          <h3 className="text-lg font-bold">Sort Order</h3>
        </div>

        <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger>
            <SelectValue placeholder="Select sort order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Latest first</SelectItem>
            <SelectItem value="oldest">Oldest first</SelectItem>
            <SelectItem value="popular">Most popular</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Reset */}
      <Button
        variant="outline"
        className="mt-6 w-full gap-2"
        onClick={handleReset}
      >
        <RotateCcw className="h-4 w-4" />
        Reset Filters
      </Button>
    </div>
  )
}
