import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ApplicationForm from "./components/application-form";

const MyApplication = async () => {
  const session = await auth();

  if (!session?.user.email) return redirect("/login");

  return <ApplicationForm />;
};

export default MyApplication;
