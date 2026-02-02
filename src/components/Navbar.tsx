import Image from "next/image";

const Navbar = () => {
  return (
    <div className="container mx-auto flex items-center justify-between p-4">
      <Image src="/next.svg" alt="logo" width={120} height={50} />

      <div className="flex gap-20 text-lg text-[rgb(11,43,130)]">
        <p>Home</p>
        <p>Find Jobs</p>
        <p>Find Employers</p>
        <p>About Us</p>
      </div>

    <button className="border border-[#5E3bEE] px-8 py-4 text-[#5E3bEE] rounded-lg ">
      Sign In
    </button>

    </div>
  );
};

export default Navbar;
