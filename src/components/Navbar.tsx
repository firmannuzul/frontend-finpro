"use client";

import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GiSharkFin } from "react-icons/gi";
import { Button } from "./ui/button";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [openMenu, setOpenMenu] = useState(false);

  const [openProfile, setOpenProfile] = useState(false);

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    enabled: !!session?.user,
    queryFn: async () => {
      const res = await axiosInstance.get("/user/me/profile", {
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
      });
      return res.data;
    },
  });

  const avatarUrl =
    profile?.companyProfile?.logoPath || profile?.applicantProfile?.photoPath;

  return (
    <nav className="bg-background/80 sticky top-0 z-50 flex w-full items-center justify-between px-6 py-4 shadow backdrop-blur transition-all duration-300 md:px-12">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="flex cursor-pointer items-center">
          <GiSharkFin className="h-15 w-15 text-[#5E3BEE]" />
          <span className="text-md font-bold text-[#5E3BEE]">Shark</span>
        </Link>

        {/* Hamburger (Mobile) */}
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className="text-2xl md:hidden"
        >
          ☰
        </button>

        <div className="text-md hidden gap-20 text-base font-bold text-[#111111] md:flex">
          <Link href="/">Home</Link>
          <Link href="/jobs">Job</Link>
          <Link href="/companies">Employers</Link>
          <Link href="/about-us">About Us</Link>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          {status === "authenticated" && (
            <div className="relative">
              <Image
                src={avatarUrl || "/avatar-placeholder.avif"}
                alt="Profile"
                width={70}
                height={70}
                onClick={() => setOpenProfile(!openProfile)}
                className="ring-primary/20 h-18 w-18 cursor-pointer rounded-full border object-contain"
              />

              {openProfile && (
                <div className="absolute top-12 right-0 w-48 rounded-lg border bg-white shadow-lg">
                  {session?.user?.role === "APPLICANT" && (
                    <>
                      <Link
                        href="/my-application"
                        onClick={() => setOpenProfile(false)}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        My Application
                      </Link>

                      <Link
                        href="/profile"
                        onClick={() => setOpenProfile(false)}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Update Profile
                      </Link>
                    </>
                  )}

                  {session?.user?.role === "ADMIN" && (
                    <Link
                      href="/company-profile"
                      onClick={() => setOpenProfile(false)}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Update Company Profile
                    </Link>
                  )}
                </div>
              )}
            </div>
          )}

          {status === "unauthenticated" ? (
            <Link href="/login">
              <Button className="cursor-pointer rounded-lg border border-[#5E3BEE] bg-[#5E3BEE] px-8 py-6 font-bold text-white hover:bg-[#8A05BE]">
                Sign In
              </Button>
            </Link>
          ) : (
            <Button
              variant="destructive"
              onClick={() => signOut()}
              className="cursor-pointer rounded-lg border border-[#5E3BEE] bg-[#5E3BEE] px-8 py-6 font-bold text-white"
            >
              Sign Out
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {openMenu && (
        <div className="flex flex-col gap-4 bg-white px-6 pb-6 font-bold text-[#111] shadow md:hidden">
          <Link href="/" onClick={() => setOpenMenu(false)}>
            Home
          </Link>
          <Link href="/jobs" onClick={() => setOpenMenu(false)}>
            Job
          </Link>
          <p>Find Employers</p>
          <Link href="/about-us" onClick={() => setOpenMenu(false)}>
            About Us
          </Link>

          <div className="flex flex-col gap-3 border-t pt-4">
            {status === "unauthenticated" ? (
              <Link href="/login">
                <Button className="w-full rounded-lg bg-[#5E3BEE] py-3 font-bold text-white">
                  Sign In
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/profile">Profile</Link>
                <Link href="/my-application">My Application</Link>
                <Button
                  onClick={() => signOut()}
                  className="rounded-lg bg-[#5E3BEE] py-3 font-bold text-white"
                >
                  Sign Out
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
