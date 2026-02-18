import { auth } from "@/auth";
import { redirect } from "next/navigation";
import UpdateProfile from "./components/profile-form";

const Profile = async () => {
  const session = await auth();

  if (!session?.user.email) return redirect("/login");

  return <UpdateProfile />;
};

export default Profile;
