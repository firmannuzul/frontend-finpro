"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = () => {
  const session = useSession();
  return (
    <div className="container mx-auto flex items-center justify-between p-4">
      <Image src="/next.svg" alt="logo" width={120} height={50} />

      <div className="flex gap-20 text-base font-medium text-[#111111]">
        <p>Home</p>
        <p>Find Jobs</p>
        <p>Find Employers</p>
        <p>About Us</p>
      </div>

      {session.status === "unauthenticated" ? (
        <Link href="/login">
          <Button className="rounded-lg border border-[#820AD1] bg-[#820AD1] px-8 py-6 text-white hover:bg-[#8A05BE]">
            Sign In
          </Button>
        </Link>
      ) : (
        <Button
          variant="destructive"
          onClick={() => signOut()}
          className="rounded-lg border border-[#820AD1] bg-[#820AD1] px-8 py-6 text-white"
        >
          Sign Out
        </Button>
      )}
    </div>
  );
};

export default Navbar;
