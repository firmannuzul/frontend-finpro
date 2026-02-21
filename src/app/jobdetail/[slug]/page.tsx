import { auth } from "@/auth";
import { redirect } from "next/navigation";
import JobDetail from "./components/job-detail";

const DetailJob = async ({ params }: { params: { slug: string } }) => {
  const session = await auth();

  if (!session?.user.email) return redirect("/login");

  return <JobDetail params={params} />;
};

export default DetailJob;
