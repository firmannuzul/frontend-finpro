import { BsTelephone } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GiSharkFin } from "react-icons/gi";
import { MdOutlinePlace } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="mt-16 border-t bg-[#0e1111]">
      <div className="container mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col gap-16 md:flex-row md:justify-between">
          <div className="flex flex-col md:max-w-md">
            <div className="flex items-center gap-3">
              <GiSharkFin className="h-10 w-10 text-[#B3B3B3]" />
              <span className="text-2xl font-bold text-[#B3B3B3]">Shark</span>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-white">
              Find your dream job or hire the best talent. Connect employers
              with job seekers.
            </p>

            <div className="mt-8 flex flex-col gap-4 text-[#FFFFFF]">
              <div className="flex items-center gap-3">
                <CiMail size={20} className="shrink-0" />
                <p className="text-sm">contact@shark.com</p>
              </div>
              <div className="flex items-center gap-3">
                <BsTelephone size={20} className="shrink-0" />
                <p className="text-sm">+62 822 1236 6613</p>
              </div>
              <div className="flex items-start gap-3">
                <MdOutlinePlace size={20} className="mt-0.5 shrink-0" />
                <p className="text-sm">
                  Jl. Sultan Iskandar Muda, Gandaria, Kec. Kebayoran Lama, Kota
                  Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-12 md:flex-row md:gap-16">
            <div className="flex flex-col">
              <h3 className="text-lg font-bold text-[#B3B3B3]">Job Seekers</h3>

              <div className="mt-6 flex flex-col gap-3 text-[#FFFFFF]">
                <a
                  href="/about"
                  className="text-sm underline-offset-4 transition hover:text-[#820AD1] hover:underline"
                >
                  Browse Job
                </a>
                <a
                  href="/about"
                  className="text-sm underline-offset-4 transition hover:text-[#820AD1] hover:underline"
                >
                  Saved Job
                </a>
                <a
                  href="/about"
                  className="text-sm underline-offset-4 transition hover:text-[#820AD1] hover:underline"
                >
                  Browse Job
                </a>
                <a
                  href="/about"
                  className="text-sm underline-offset-4 transition hover:text-[#820AD1] hover:underline"
                >
                  Saved Job
                </a>
              </div>
            </div>

            <div className="flex flex-col">
              <h3 className="text-lg font-bold text-[#B3B3B3]">Employers</h3>

              <div className="mt-6 flex flex-col gap-3 text-[#FFFFFF]">
                <a
                  href="/about"
                  className="text-sm underline-offset-4 transition hover:text-[#820AD1] hover:underline"
                >
                  Post a Job
                </a>
                <a
                  href="/about"
                  className="text-sm underline-offset-4 transition hover:text-[#820AD1] hover:underline"
                >
                  Browse Candidates
                </a>
                <a
                  href="/about"
                  className="text-sm underline-offset-4 transition hover:text-[#820AD1] hover:underline"
                >
                  Post a Job
                </a>
                <a
                  href="/about"
                  className="text-sm underline-offset-4 transition hover:text-[#820AD1] hover:underline"
                >
                  Browse Candidates
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto border-t border-white py-5 text-sm text-gray-300">
        <div className="mx-auto flex max-w-7xl px-6 py-5">
          <div className="flex w-full items-center justify-between">
            <p className="text-md text-[#B3B3B3]">
              © {new Date().getFullYear()} Shark. All rights reserved.
            </p>

            <div className="flex items-center gap-4 text-white">
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
