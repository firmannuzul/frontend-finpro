import Image from "next/image";
import { Job } from "@/types/job";
import { format } from "date-fns";
import Link from "next/link";
import { CiLocationOn } from "react-icons/ci";

interface JobCardProps {
  job: Job;
}

const JobCard = (props: JobCardProps) => {
  return (
    <Link href={`/jobdetail/${props.job.slug}`}>
      <div className="space-y-2 rounded-xl border p-8">
        <Image
          src={props.job.thumbnail}
          alt="thumbnail"
          width={500}
          height={500}
        />
        <p className="w-fit rounded-xl bg-[#820AD1] px-4 text-sm text-white">
          {props.job.category}
        </p>
        <h2 className="mb-0 line-clamp-2 text-xl font-bold">
          {props.job.title}
        </h2>
        <h1 className="mt-0 line-clamp-2 text-lg">
          {props.job.company.companyName}
        </h1>
        <div className="flex item-center gap-1 mt-3">
          <CiLocationOn size={21} />
          <p className="text-md">{props.job.location}</p>
        </div>
        <p className="line-clamp-3">{props.job.description}</p>
        <p className="line-clamp-3">
          Posted At {format(new Date(props.job.postedAt), "dd MMM yyyy")}
        </p>
      </div>
    </Link>
  );
};

export default JobCard;
