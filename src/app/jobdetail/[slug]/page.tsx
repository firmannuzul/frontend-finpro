import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Job } from "@/types/job";
import { format } from "date-fns";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";
import { BsBuilding } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { PiMoneyThin, PiShareNetwork } from "react-icons/pi";
import SharePopup from "./components/SharePopup";

interface JobDetailProps {
  params: Promise<{ slug: string }>;
}

const getJob = cache(async (slug: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL_API}/job/${slug}`,
  );
  if (!response.ok) return notFound();
  const job: Job = await response.json();
  return job;
});

export const generateMetadata = async (props: JobDetailProps) => {
  const { slug } = await props.params;
  const job = await getJob(slug);

  return {
    title: job.title,
    company: job.company.companyName,
    description: job.description,
    openGraph: {
      images: job.thumbnail,
    },
  };
};

const JobDetail = async (props: JobDetailProps) => {
  const { slug } = await props.params;
  const job = await getJob(slug);

  return (
    <div>
      {/* <div className="mx-auto max-w-7xl px-6"> */}

      <Navbar />
      <div className="container mx-auto max-w-6xl space-y-2">
        <div className="relative mt-10 h-[390px] w-full overflow-hidden rounded-xl">
          <Image
            src={job.thumbnail}
            alt="thumbnail"
            fill
            className="object-cover object-center"
          />
        </div>

        <div className="mt-10">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-bold">{job.title}</h1>
            <div className="flex items-center gap-1">
              <SharePopup url={`${process.env.NEXT_PUBLIC_BASE_URL}/${slug}`} />
              {/* <h1 className="font-bold">Share</h1> */}
            </div>
          </div>
        </div>
        <p className="mb-8 text-lg">{job.company.companyName}</p>
        <div className="item-center mt-3 flex gap-1">
          <CiLocationOn size={21} />
          <p className="text-md">{job.location}</p>
        </div>
        <div className="item-center mt-3 flex gap-1">
          <BsBuilding size={21} />
          <p className="text-md">{job.category}</p>
        </div>
        <div className="item-center mt-3 flex gap-1">
          <PiMoneyThin size={21} />
          <p className="text-md">
            Rp.{job.salaryMin} - Rp.{job.salaryMax} per month
          </p>
        </div>
        <p className="mt-3 line-clamp-3">
          Posted At {format(new Date(job.postedAt), "dd MMM yyyy")}
        </p>
        <div className="flex gap-4">
          <Button className="rounded-lg border border-[#820AD1] bg-[#820AD1] px-8 py-6 font-bold text-white hover:bg-[#8A05BE]">
            Apply
          </Button>
          <Button className="rounded-lg border border-[#820AD1] bg-[#820AD1] px-8 py-6 font-bold text-white hover:bg-[#8A05BE]">
            Save
          </Button>
        </div>
        <p className="mt-15">{job.description}</p>
      </div>
      <Footer />
    </div>
  );
};
export default JobDetail;
