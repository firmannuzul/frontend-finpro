import { Button } from "@/components/ui/button";
import { MapPin, Search } from "lucide-react";
const HeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden px-6 py-12 md:px-12 md:py-20">
      {/* Decorative elements */}
      <div className="border-primary/20 absolute top-10 left-1/3 -z-10 h-32 w-32 rounded-full border" />
      <div className="bg-primary/40 absolute top-20 left-1/4 h-2 w-2 rounded-full" />
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 md:flex-row">
        {/* Left content */}
        <div className="flex-1 space-y-6">
          <h1 className="text-foreground text-4xl leading-tight font-extrabold md:text-5xl lg:text-6xl">
            Jobs that match your skills.{" "}
            <span className="text-[#5E3BEE]">Careers</span> that fit your goals.
          </h1>

          <p className="text-muted-foreground max-w-md text-sm leading-relaxed md:text-base">
            Explore a wide range of opportunities tailored to your skills and
            interests. Whether you’re an experienced professional or just
            starting out, there’s a role waiting for you.
          </p>
          {/* Search bar */}
          <div className="bg-card border-border flex max-w-lg flex-col items-stretch gap-2 rounded-xl border p-2 shadow-sm sm:flex-row">
            <div className="flex flex-1 items-center gap-2 px-3">
              <Search className="text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Keyword"
                className="text-foreground placeholder:text-muted-foreground flex-1 bg-transparent text-sm outline-none"
              />
            </div>
            <div className="border-border flex flex-1 items-center gap-2 border-l px-3">
              <MapPin className="text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Location"
                className="text-foreground placeholder:text-muted-foreground flex-1 bg-transparent text-sm outline-none"
              />
            </div>
            <Button className="rounded-lg px-6">Search</Button>
          </div>
          <p className="text-muted-foreground text-xs">
            Tags:{" "}
            <span className="text-foreground">
              Digital Marketer, UX Designer, Data Analyst
            </span>
          </p>
        </div>
        {/* Right image */}
        <div className="relative flex flex-1 justify-center">
          <div className="relative h-72 w-72 overflow-hidden md:h-80 md:w-80 lg:h-96 lg:w-96">
            <img
              src="/positive001.png"
              alt="thumbnail"
              className="ml-15 h-auto w-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
