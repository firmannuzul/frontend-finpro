"use client";

import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "next-share";
import { useState } from "react";
import { RiShareForwardLine } from "react-icons/ri";

export default function SharePopup({ url }: { url: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* SHARE TRIGGER */}
      <RiShareForwardLine
        size={35}
        onClick={() => setOpen(!open)}
        // className="text-3xl cursor-pointer transition hover:scale-110 hover:text-[#820AD1]"
        className="cursor-pointer"
      />

      {/* POPUP */}
      {open && (
        <div className="animate-fadeIn absolute right-0 bottom-12 flex gap-3 rounded-xl border bg-white p-3 shadow-xl">
          <LinkedinShareButton url={url}>
            <LinkedinIcon size={35} round />
          </LinkedinShareButton>

          <FacebookShareButton url={url}>
            <FacebookIcon size={35} round />
          </FacebookShareButton>

          <TwitterShareButton url={url}>
            <TwitterIcon size={35} round />
          </TwitterShareButton>

          <WhatsappShareButton url={url}>
            <WhatsappIcon size={35} round />
          </WhatsappShareButton>
        </div>
      )}
    </div>
  );
}
