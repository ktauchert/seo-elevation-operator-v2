import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full relative h-full pb-1">
      <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 backdrop-blur-md bg-slate-100/20 py-2 px-4 h-full mb-4 rounded-lg text-slate-100 border border-cyan-600">
        Copyright © 2024 by Karsten Tauchert
        <Link
          className="hover:text-orange-500"
          href="mailto:webmaster@ktauchert.de"
        >
          webmaster@ktauchert.de
        </Link>
        <Link
          className="hover:text-orange-500"
          target="_blank"
          href="https://ktauchert.de"
        >
          Developer: ktauchert.de
        </Link>
        <Link className="hover:text-orange-500" href="/impressum">
          Impressum und Datenschutz
        </Link>
      </article>
    </footer>
  );
};

export default Footer;
