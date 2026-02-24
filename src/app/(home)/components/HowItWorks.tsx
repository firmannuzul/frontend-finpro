import { UserPlus, Upload, Search, CheckCircle } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Create account",
    description:
      "Sign up in minutes with your email  to start your job search journey.",
    icon: UserPlus,
  },
  {
    number: 2,
    title: "Upload CV/Resume",
    description:
      "Upload your CV. We'll match your skills with the right opportunities.",
    icon: Upload,
  },
  {
    number: 3,
    title: "Find suitable job",
    description:
      "Browse through  job  based on your skills, experience, and preferences.",
    icon: Search,
  },
  {
    number: 4,
    title: "Apply job",
    description:
      "Submit applications with one click and track your application status in real-time.",
    icon: CheckCircle,
  },
];

export function HowItWorks() {
  return (
    // <section className="py-24">
    <section className="bg-primary/2 py-12 md:py-16 mt-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="font-heading text-foreground text-3xl font-bold md:text-4xl">
            How <span className="text-[#5E3BEE]">Shark</span> works
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Get started in 4 simple steps and find your dream job
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="flex flex-col items-center text-center"
              >
                {/* Step number and icon container */}
                <div className="relative mb-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#5E3BEE] bg-[hsl(270,60%,50%)]/10">
                    <Icon className="h-8 w-8 text-[#5E3BEE]" />
                  </div>
                  <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#5E3BEE] text-sm font-bold text-white">
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-heading text-foreground text-xl font-bold">
                  {step.title}
                </h3>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                  {step.description}
                </p>

                {/* Connection line - hidden on last item and mobile */}
                {step.number < 4 && (
                  <div className="absolute top-8 left-1/2 hidden h-0.5 w-12 translate-x-12 translate-y-4 bg-gradient-to-r from-[#5E3BEE] to-[#5E3BEE] lg:block" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
