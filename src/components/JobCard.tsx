import { Job } from "@/types/job";
import { format } from "date-fns";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface JobCardProps {
  job: Job;
}

const JobCard = (props: JobCardProps) => {
  return (
    <Link href={`/jobdetail/${props.job.slug}`}>
      <div className="group border-border bg-card hover:border-primary hover:shadow-primary/5 rounded-xl border p-6 transition-all hover:shadow-lg">
        {/* Top row - salary, date, type */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-secondary text-foreground rounded-full px-3 py-1 text-xs font-medium">
            {props.job.category}
          </span>

          <span className="text-muted-foreground ml-auto flex px-3 py-1 text-xs">
            <Calendar className="h-3 w-3" />
            {format(new Date(props.job.postedAt), "dd MMM yyyy")}
          </span>
        </div>

        {/* Job info */}
        <div className="mt-4 flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
            <Image
              src={props.job.thumbnail}
              alt="thumbnail"
              width={100}
              height={100}
            />
          </div>
          <div>
            <h3 className="font-heading text-foreground text-base font-semibold">
              {props.job.title}
            </h3>
            <p className="text-muted-foreground mt-1 line-clamp-3 text-xs">
              {props.job.description}
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-border mt-4 flex items-center justify-between border-t pt-4">
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground flex items-center gap-1 text-xs">
              <Briefcase className="h-3 w-3" />
              {props.job.company.companyName}
            </span>
            <span className="text-muted-foreground flex items-center gap-1 text-xs">
              <MapPin className="h-3 w-3" />
              {props.job.location}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
