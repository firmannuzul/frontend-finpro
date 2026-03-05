import {
  BarChart3,
  Code,
  Cpu,
  DollarSign,
  Megaphone,
  Palette,
  Settings,
  Zap,
} from "lucide-react";

import { AiOutlineBank } from "react-icons/ai";
import { FaComputer } from "react-icons/fa6";
import { FiTruck } from "react-icons/fi";
import { LiaBriefcaseMedicalSolid } from "react-icons/lia";
import {
  MdLiveTv,
  MdOutlinePrecisionManufacturing,
  MdOutlineRealEstateAgent,
} from "react-icons/md";
import { SlEnergy } from "react-icons/sl";

const categories = [
  { name: "Design", count: "236 Jobs Available", icon: Palette },
  { name: "Analyst", count: "236 Jobs Available", icon: BarChart3 },
  { name: "Electrician", count: "236 Jobs Available", icon: Zap },
  { name: "Finance", count: "236 Jobs Available", icon: DollarSign },
  { name: "Technology", count: "216 Jobs Available", icon: Cpu },
  { name: "Engineering", count: "216 Jobs Available", icon: Settings },
  { name: "Marketing", count: "216 Jobs Available", icon: Megaphone },
  { name: "Programmer", count: "216 Jobs Available", icon: Code },
];

const categories1 = [
  { name: "Technology", count: "236 Jobs Available", icon: FaComputer },
  { name: "Energy", count: "236 Jobs Available", icon: SlEnergy },
  {
    name: "Manufacturing",
    count: "236 Jobs Available",
    icon: MdOutlinePrecisionManufacturing,
  },
  {
    name: "Healthcare",
    count: "236 Jobs Available",
    icon: LiaBriefcaseMedicalSolid,
  },
  {
    name: "Banking & Financial Service",
    count: "216 Jobs Available",
    icon: AiOutlineBank,
  },
  {
    name: "Real Estate & Infrastructure",
    count: "216 Jobs Available",
    icon: MdOutlineRealEstateAgent,
  },
  {
    name: "Transportation & Logistics",
    count: "216 Jobs Available",
    icon: FiTruck,
  },
  {
    name: "Media & Entertainment",
    count: "216 Jobs Available",
    icon: MdLiveTv,
  },
];

export function CategorySection() {
  return (
    <section className="bg-primary/2 mt-8 py-10">
      {/* <div className="mx-auto max-w-7xl px-6"> */}
      <div className="container mx-auto px-6">
        <div className="text-start">
          <h2 className="font-heading text-foreground text-3xl font-bold md:text-4xl">
            Explore by <span className="text-[#5E3BEE]">category</span>
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {categories1.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.name}
                type="button"
                className="group bg-card flex flex-col items-start gap-3 rounded-xl border p-4 text-left transition-all hover:border-[#5E3BEE] hover:shadow-lg active:scale-[0.98] sm:flex-row sm:items-center sm:gap-4 sm:p-5"
              >
                <div className="bg-secondary group-hover:text-primary-foreground flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-[#5E3BEE] transition-colors group-hover:bg-[#5E3BEE]">
                  <Icon className="h-5 w-5 sm:w-6" />
                </div>
                <div>
                  <h3 className="font-heading text-foreground line-clamp-2 text-sm font-semibold sm:text-base">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground mt-1 text-xs sm:text-sm">
                    {category.count}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
