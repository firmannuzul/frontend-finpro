import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function DualRoleCTA() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Candidate Card */}
        <div className="border-border bg-card flex flex-col justify-center rounded-2xl border p-12 shadow-sm transition-all hover:shadow-md">
          <h3 className="font-heading text-foreground text-3xl font-bold">
            Take Your Career to the Next Level
          </h3>
          <p className="text-muted-foreground mt-4 text-lg">
            Join a diverse community and discover opportunities made for
            you{" "}
          </p>
          <Link
            href="/register"
            className="bg-foreground text-background mt-8 inline-flex w-fit items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all hover:gap-3 hover:shadow-md"
          >
            Join as a Candidate
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Employer Card */}
        <div className="flex flex-col justify-center rounded-2xl bg-gradient-to-br from-[#5E3BEE] to-[#5E3BEE] p-12 shadow-lg transition-all hover:shadow-xl">
          <h3 className="font-heading text-3xl font-bold text-white">
            Find the Best Talent for Your Company
          </h3>
          <p className="mt-4 text-lg text-white/90">
            Build your team with professionals who are ready to contribute.
            Hiring made simple.
          </p>
          <Link
            href="/register/admin"
            className="mt-8 inline-flex w-fit items-center gap-2 rounded-lg border-2 border-white px-6 py-3 text-sm font-semibold text-white transition-all hover:gap-3 hover:bg-white/10"
          >
            Join as an Employer
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
