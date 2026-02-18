"use client";

import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { GiSharkFin } from "react-icons/gi";
import { Button } from "./ui/button";

const Navbar = () => {
  const { data: session, status } = useSession();

  const [openProfile, setOpenProfile] = useState(false);

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    enabled: !!session?.user,
    queryFn: async () => {
      const res = await axiosInstance.get("/user/profile", {
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
      });
      return res.data;
    },
  });

  // const session = useSession();
  return (
    // <nav className="bg-background flex w-full items-center justify-between px-6 py-4 md:px-12">
    <nav className="bg-background/80 sticky top-0 z-50 flex w-full items-center justify-between px-6 py-4 shadow backdrop-blur transition-all duration-300 md:px-12">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="flex cursor-pointer items-center">
          <GiSharkFin className="h-15 w-15 text-[#5E3BEE]" />
          <span className="text-md font-bold text-[#5E3BEE]">Shark</span>
        </Link>

        <div className="text-md flex gap-20 text-base font-bold text-[#111111]">
          <Link href="/">Home</Link>
          <Link href="/jobs">Job</Link>
          <p>Find Employers</p>
          <Link href="/about-us">About Us</Link>
        </div>

        {/* {session.status === "unauthenticated" ? (
          <Link href="/login">
            <Button className="rounded-lg border border-[#5E3BEE] bg-[#5E3BEE] px-8 py-6 font-bold text-white hover:bg-[#8A05BE]">
              Sign In
            </Button>
          </Link>
        ) : (
          <Button
            variant="destructive"
            onClick={() => signOut()}
            className="rounded-lg border border-[#5E3BEE] bg-[#5E3BEE] px-8 py-6 font-bold text-white"
          >
            Sign Out
          </Button>
        )} */}

        <div className="flex items-center gap-4">
          {/* Avatar hanya muncul kalau login */}
          {status === "authenticated" && (
            <div className="relative">
              <img
                src={profile?.photoPath || "/avatar-placeholder.png"}
                alt="Profile"
                onClick={() => setOpenProfile(!openProfile)}
                className="h-10 w-10 cursor-pointer rounded-full border object-cover"
              />

              {openProfile && (
                <div className="absolute top-12 right-0 w-48 rounded-lg border bg-white shadow-lg">
                  <Link
                    href="/profile"
                    onClick={() => setOpenProfile(false)}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Update Profile
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Tombol Login / Logout tetap ada */}
          {status === "unauthenticated" ? (
            <Link href="/login">
              <Button className="rounded-lg border border-[#5E3BEE] bg-[#5E3BEE] px-8 py-6 font-bold text-white hover:bg-[#8A05BE]">
                Sign In
              </Button>
            </Link>
          ) : (
            <Button
              variant="destructive"
              onClick={() => signOut()}
              className="rounded-lg border border-[#5E3BEE] bg-[#5E3BEE] px-8 py-6 font-bold text-white"
            >
              Sign Out
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
