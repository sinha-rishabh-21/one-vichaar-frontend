import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex items-center justify-center bg-black text-white p-2">
      <footer className="flex gap-4">
        <Link href="https://www.linkedin.com/in/rishabh-sinha-94347a25a/">
          <Image
            alt=""
            src="/linkedin.svg"
            width={20}
            height={20}
            className=""
          />
        </Link>
        Made with ❤️ by Rishabh
        <Link href="https://github.com/sinha-rishabh-21">
          <Image alt="" src="/github.svg" width={20} height={20} />
        </Link>
      </footer>
    </div>
  );
};

export default Footer;
