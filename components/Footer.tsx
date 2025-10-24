"use client";
import clsx from "clsx";
import { useParams } from "next/navigation";

const Footer = () => {
  const color = useParams()?.slug === "white" ? "text-black" : "text-white";
  return (
    <div
      className={clsx(
        "fixed flex justify-start items-center md:gap-5 gap-2 bottom-2 md:px-20 px-5 md:text-xs text-[10px] md:tracking-widest text-nowrap",
        color
      )}
    >
      <p className="hover-animation uppercase font-medium">© 2025 Adidas</p>
      <p className="hover-animation uppercase font-medium">
        Terms & conditions
      </p>
      <p className="hover-animation uppercase font-medium">privacy</p>
      <p className="hover-animation uppercase font-medium">Cookies</p>
    </div>
  );
};

export default Footer;
