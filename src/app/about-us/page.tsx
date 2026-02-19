import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Briefcase, Award, Heart, Globe } from "lucide-react";
const stats = [
  { label: "Job Listings", value: "10K+", icon: Briefcase },
  { label: "Companies", value: "500+", icon: Globe },
  { label: "Job Seekers", value: "50K+", icon: Users },
  { label: "Successful Hires", value: "8K+", icon: Award },
];
const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To connect talented professionals with their dream careers while helping companies find the perfect candidates to grow their teams.",
  },
  {
    icon: Heart,
    title: "Our Vision",
    description:
      "A world where everyone has access to meaningful work opportunities, regardless of background or location.",
  },
  {
    icon: Users,
    title: "Our Team",
    description:
      "A passionate group of recruiters, engineers, and designers dedicated to making the job search experience seamless and enjoyable.",
  },
];
const team = [
  { name: "Firman Nuzul", initials: "FN" },
  { name: "Moh Adi", initials: "MA" },
];
const AboutUs = () => {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 py-16 text-center md:px-12 md:py-24">
        <h1 className="text-foreground mb-4 text-4xl font-bold md:text-5xl">
          About <span className="text-[#5E3BEE]">Shark</span>
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          We're on a mission to revolutionize the way people find jobs and
          companies discover talent. We've been bridging the gap
          between opportunity and ambition.
        </p>
      </section>
      {/* Stats */}
      <section className="px-6 pb-16 md:px-12">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="text-center">
              <CardContent className="pt-6">
                <stat.icon className="text-[#5E3BEE] mx-auto mb-3 h-8 w-8" />
                <p className="text-foreground text-3xl font-bold">
                  {stat.value}
                </p>
                <p className="text-muted-foreground mt-1 text-sm">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      {/* Values */}
      <section className="bg-muted/50 px-6 py-16 md:px-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-foreground mb-10 text-center text-3xl font-bold">
            What Drives Us
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((item) => (
              <Card key={item.title}>
                <CardContent className="pt-6">
                  <item.icon className="text-[#5E3BEE] mb-4 h-10 w-10" />
                  <h3 className="text-foreground mb-2 text-xl font-semibold">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Team */}
      <section className="px-6 py-16 md:px-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-foreground mb-10 text-center text-3xl font-bold">
            Meet the Team
          </h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-2">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="bg-[#5E3BEE]/10 mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full">
                  <span className="text-[#5E3BEE] text-lg font-bold">
                    {member.initials}
                  </span>
                </div>
                <h4 className="text-foreground font-semibold">{member.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};
export default AboutUs;
