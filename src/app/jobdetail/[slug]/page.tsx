// import Footer from "@/components/Footer";
// import Navbar from "@/components/Navbar";
// import { Button } from "@/components/ui/button";
// import { Job } from "@/types/job";
// import { format } from "date-fns";
// import Image from "next/image";
// import { notFound } from "next/navigation";
// import { cache } from "react";
// import { BsBuilding } from "react-icons/bs";
// import { CiLocationOn } from "react-icons/ci";
// import { PiMoneyThin, PiShareNetwork } from "react-icons/pi";
// import SharePopup from "./components/SharePopup";
// import { JobDetails } from "./components/job-details";
// import { JobApplicationForm } from "./components/job-application-form";
// import { CheckCircle2 } from "lucide-react";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import JobDetail from "./components/job-detail";

// interface JobDetailProps {
//   params: Promise<{ slug: string }>;
// }

// const formatRupiah = (value: number) => {
//   return new Intl.NumberFormat("id-ID", {
//     style: "currency",
//     currency: "IDR",
//     minimumFractionDigits: 0,
//   }).format(value);
// };

// const getJob = cache(async (slug: string) => {
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL_API}/job/${slug}`,
//   );
//   if (!response.ok) return notFound();
//   const job: Job = await response.json();
//   return job;
// });

// export const generateMetadata = async (props: JobDetailProps) => {
//   const { slug } = await props.params;
//   const job = await getJob(slug);

//   return {
//     title: job.title,
//     company: job.company.companyName,
//     description: job.description,
//     experience: job.experience,
//     requirement: job.requirement,
//     responsibility: job.responsibility,
//     openGraph: {
//       images: job.thumbnail,
//     },
//   };
// };

// const JobDetail = async (props: JobDetailProps) => {
//   const { slug } = await props.params;
//   const job = await getJob(slug);

//   return (
//     <main className="bg-background min-h-screen">
//       <Navbar />
//       <div className="mx-auto max-w-7xl px-6 pt-24 pb-12">
//         <div className="grid gap-8 lg:grid-cols-3">
//           {/* Left column - Job details */}
//           <div className="lg:col-span-2">
//             {/* <JobDetails /> */}

//             <div className="space-y-8">
//               {/* Header */}
//               <div className="border-border border-b pb-8">
//                 <div className="flex flex-wrap items-start justify-between gap-4">
//                   <div className="flex-1">
//                     <div className="flex items-center gap-4">
//                       <h1 className="font-heading text-foreground text-3xl font-bold md:text-4xl">
//                         {job.title}
//                       </h1>

//                       <div className="flex items-center gap-1">
//                         <SharePopup
//                           url={`${process.env.NEXT_PUBLIC_BASE_URL}/${slug}`}
//                         />
//                       </div>
//                     </div>

//                     <div className="text-muted-foreground text-md mt-3 flex flex-wrap gap-3">
//                       <span className="bg-secondary rounded-full px-3 py-1 font-medium text-[#5E3BEE]">
//                         {job.company.companyName}
//                       </span>
//                     </div>
//                     <div className="text-muted-foreground mt-3 flex flex-wrap gap-3 text-sm">
//                       <span className="bg-secondary rounded-full px-3 py-1 font-medium text-[#5E3BEE]">
//                         Posted At{" "}
//                         {format(new Date(job.postedAt), "dd MMM yyyy")}{" "}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="relative w-full max-w-[200px] overflow-hidden">
//                     <Image
//                       src={job.thumbnail}
//                       alt="thumbnail"
//                       width={180}
//                       height={180}
//                       className="object-end object-cover"
//                     />
//                   </div>
//                 </div>

//                 {/* Quick Info */}
//                 <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
//                   <div className="bg-secondary rounded-lg p-3">
//                     <p className="text-muted-foreground text-xs">Salary</p>
//                     {/* <p className="text-foreground font-semibold">
//                       Rp. {job.salaryMin} - Rp.{job.salaryMax}
//                     </p> */}
//                     <p className="text-foreground font-semibold">
//                       {formatRupiah(Number(job.salaryMin))} –{" "}
//                       {formatRupiah(Number(job.salaryMax))}
//                     </p>
//                   </div>

//                   <div className="bg-secondary rounded-lg p-3">
//                     <p className="text-muted-foreground text-xs">Experience</p>
//                     <p className="text-foreground font-semibold">
//                       {job.experience}
//                     </p>
//                   </div>
//                   <div className="bg-secondary rounded-lg p-3">
//                     <p className="text-muted-foreground text-xs">Location</p>
//                     <p className="text-foreground font-semibold">
//                       {job.location}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Job Description */}
//               <div>
//                 <h2 className="font-heading text-foreground text-xl font-bold md:text-2xl">
//                   Job Description
//                 </h2>
//                 <div className="text-foreground mt-4 space-y-3 text-sm leading-relaxed md:text-base">
//                   <p>{job.description}</p>
//                 </div>
//               </div>

//               {/* Responsibilities */}
//               <div>
//                 <h2 className="font-heading text-foreground text-xl font-bold md:text-2xl">
//                   Responsibilities
//                 </h2>
//                 <div className="text-foreground mt-4 space-y-3 text-sm leading-relaxed md:text-base">
//                   <p>{job.responsibility}</p>
//                 </div>
//               </div>

//               {/* Requirements */}
//               <div>
//                 <h2 className="font-heading text-foreground text-xl font-bold md:text-2xl">
//                   Requirements
//                 </h2>
//                 <div className="mt-4 space-y-4">
//                   <div>
//                     <h3 className="text-foreground font-semibold">
//                       Technical Infrastructure
//                     </h3>
//                     <div className="text-foreground mt-4 space-y-3 text-sm leading-relaxed md:text-base">
//                       <p>{job.requirement}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* More Roles */}
//               <div className="bg-secondary rounded-lg p-6">
//                 <h2 className="font-heading text-foreground text-lg font-bold">
//                   More Roles Coming Soon
//                 </h2>
//                 <p className="text-muted-foreground mt-2 text-sm">
//                   Stay tuned for additional opportunities in AI-powered
//                   transcription and quality assurance roles.
//                 </p>
//               </div>
//             </div>
//           </div>
//           {/* Right column - Application form */}
//           <div>
//             {/* <JobApplicationForm /> */}
//             {job && <JobApplicationForm jobPostingId={String(job.id)} />}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </main>
//   );
// };
// export default JobDetail;

const DetailJob = async ({ params }: { params: { slug: string } }) => {
  const session = await auth();

  if (!session?.user.email) return redirect("/login");

  return <JobDetail params={params} />;
};

export default DetailJob;
