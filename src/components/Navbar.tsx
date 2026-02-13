"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { GiSharkJaws } from "react-icons/gi";
import { GiSharkFin } from "react-icons/gi";

const Navbar = () => {
  const session = useSession();
  return (
    <nav className="bg-background flex w-full items-center justify-between px-6 py-4 md:px-12">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center">
          <GiSharkFin className="h-15 w-15 text-[#5E3BEE]" />
          <span className="text-md font-bold text-[#5E3BEE]">Shark</span>
        </div>

        <div className="text-md flex gap-20 text-base font-bold text-[#111111]">
          <Link href="/">Home</Link>
          <Link href="/jobs">Job</Link>
          <p>Find Employers</p>
          <p>About Us</p>
        </div>

        {session.status === "unauthenticated" ? (
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
    </nav>
  );
};

export default Navbar;
