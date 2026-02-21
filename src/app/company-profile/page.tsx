import { auth } from "@/auth";
import { redirect } from "next/navigation";
import UpdateCompanyProfile from "./components/profile-form";

const Profile = async () => {
  const session = await auth();

  if (!session?.user.email) return redirect("/login");

  return <UpdateCompanyProfile />;
};

export default Profile;
