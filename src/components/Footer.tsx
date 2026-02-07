import { BsTelephone } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdOutlinePlace } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="mt-16 border-t bg-[#0e1111]">
      {/* <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-4 md:flex-row"> */}
      <div className="container mx-auto grid grid-cols-4 py-4 md:flex-row">
        <div className="flex flex-col justify-baseline">
          <h1 className="mt-4 text-3xl font-bold text-[#B3B3B3]">
            Your Company
          </h1>
          <p className="mt-2 py-2 text-lg text-white">
            Find your dream job or hire the best talent. Connect employers with
            job seekers.
          </p>
          <div className="flex items-center gap-4 py-4 text-white">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-blue-500"
            >
              <FaFacebookF size={25} />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-sky-400"
            >
              <FaXTwitter size={25} />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-pink-500"
            >
              <FaInstagram size={25} />
            </a>
          </div>
        </div>
        <div className="ml-20 flex flex-col">
          <h1 className="mt-4 text-2xl font-bold text-[#B3B3B3]">
            Job Seekers
          </h1>

          <div className="flex flex-col gap-2 text-[#FFFFFF]">
            <a
              href="/about"
              className="mt-4 underline-offset-4 transition hover:text-[#820AD1] hover:underline"
            >
              Browse Job
            </a>
            <a
              href="/about"
              className="underline-offset-4 transition hover:text-[#820AD1] hover:underline"
            >
              Saved Job
            </a>
            <a
              href="/about"
              className="underline-offset-4 transition hover:text-[#820AD1] hover:underline"
            >
              Browse Job
            </a>
            <a
              href="/about"
              className="underline-offset-4 transition hover:text-[#820AD1] hover:underline"
            >
              Saved Job
            </a>
          </div>
        </div>
        <div className="ml-20 flex flex-col">
          <h1 className="mt-4 text-2xl font-bold text-[#B3B3B3]">Employers</h1>

          <div className="flex flex-col gap-2 text-[#FFFFFF]">
            <a
              href="/about"
              className="mt-4 underline-offset-4 transition hover:text-[#820AD1] hover:underline"
            >
              Post a Job
            </a>
            <a
              href="/about"
              className="underline-offset-4 transition hover:text-[#820AD1] hover:underline"
            >
              Browse Candidates
            </a>
            <a
              href="/about"
              className="underline-offset-4 transition hover:text-[#820AD1] hover:underline"
            >
              Post a Job
            </a>
            <a
              href="/about"
              className="underline-offset-4 transition hover:text-[#820AD1] hover:underline"
            >
              Browse Candidates
            </a>
          </div>
        </div>
        <div className="ml-20 flex flex-col">
          <h1 className="mt-4 text-2xl font-bold text-[#B3B3B3]">Contact Us</h1>

          <div className="flex flex-col gap-2 text-[#FFFFFF]">
            <div className="mt-4 flex items-center">
              <CiMail size={18} />
              <p className="ml-1">support@yourcomppany.com</p>
            </div>
            <div className="flex items-center">
              <BsTelephone size={18} />
              <p className="ml-1">+62 822-1236-6613</p>
            </div>
            <div className="flex items-center">
              <MdOutlinePlace size={80} />
              <p className="ml-1 text-sm">
                Jl. Sultan Iskandar Muda, RT.10/RW.6, Kebayoran Lama Utara,
                Kec.Kebayoran Lama, Kota Jakarta Selatan, DKI Jakarta 12240
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-white-700 container mx-auto border-t py-5 text-sm text-gray-300">
        <div className="grid grid-cols-2">
          <p className="text-md text-[#B3B3B3]">
            © {new Date().getFullYear()} YourCompany. All rights reserved.
          </p>

          <div className="flex justify-end gap-6">
            <a
              href="/terms"
              className="mr-4 text-white underline-offset-4 transition hover:text-[#820AD1] hover:underline"
            >
              Terms & Conditions
            </a>
            <a
              href="/privacy"
              className="mr-10 text-white underline-offset-4 transition hover:text-[#820AD1] hover:underline"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
