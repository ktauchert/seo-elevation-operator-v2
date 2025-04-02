"use client";
import { useAuth } from "@/context/AuthContext";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
// import CreditsCounter from "../CreditsCounter";

const LeftSideBar = () => {
  const { status } = useSession();
  const pathname = usePathname();

  return (
    <nav className="flex flex-col bg-slate-950/50 backdrop-blur-md rounded-lg h-full ">
      {["loading"].includes(status) ? (
        <div className="w-full h-full p-4">
          <div className="w-full bg-white/20 h-1/4 rounded-lg shadow-md animate-pulse mb-4"></div>
          <div className="w-full bg-white/20 h-1/4 rounded-lg shadow-md animate-pulse mb-4"></div>
          <div className="w-full bg-white/20 h-1/4 rounded-lg shadow-md animate-pulse mb-4"></div>
        </div>
      ) : (
        <>
          <h4 className="text-4xl text-slate-100 mb-5 p-5">Menu</h4>
          <div className="menu-section w-full text-slate-100">
            <h5
              className={`text-2xl pl-5 mb-2 ${
                pathname === "/" ? "text-cyan-600" : ""
              }`}
            >
              Home
            </h5>
            <ul className="pl-10 text-xl space-y-2">
              <li className="pr-5">
                <Link
                  href="/#hero"
                  className=" w-full flex bg-transparent hover:bg-slate-400/10 hover:text-orange-600 py-1 px-2 rounded-md transition-all"
                >
                  Top
                </Link>
              </li>
              <li className="pr-5">
                <Link
                  href="/#key-features"
                  className={`w-full flex bg-transparent hover:bg-slate-400/10 hover:text-orange-600 py-1 px-2 rounded-md transition-all`}
                >
                  Key Features
                </Link>
              </li>
              <li className="pr-5">
                <Link
                  href="/#testimonials"
                  className=" w-full flex bg-transparent hover:bg-slate-400/10 hover:text-orange-600 py-1 px-2 rounded-md transition-all"
                >
                  Good to Know
                </Link>
              </li>
            </ul>
          </div>
          {/* User-Menu */}
          {status === "authenticated" && (
            <div className="menu-section w-full text-slate-100 mt-5">
              <h5
                className={`text-2xl pl-5 mb-2 ${
                  pathname.includes("user") ? "text-cyan-600" : ""
                }`}
              >
                User
              </h5>
              <ul className="pl-10 text-xl space-y-2">
                <li className="pr-5">
                  <Link
                    href="/user"
                    className={`w-full flex bg-transparent hover:bg-slate-400/10 hover:text-orange-600 py-1 px-2 rounded-md transition-all ${
                      pathname === "/user"
                        ? "text-orange-600 bg-slate-400/10"
                        : ""
                    }`}
                  >
                    Info
                  </Link>
                </li>
                {/* <li className="pr-5">
              <a
                href="#key-features"
                className=" w-full flex bg-transparent hover:bg-slate-400/10 hover:text-orange-600 py-1 px-2 rounded-md transition-all"
              >
                Key Features
              </a>
            </li>
            <li className="pr-5">
              <a
                href="#testimonials"
                className=" w-full flex bg-transparent hover:bg-slate-400/10 hover:text-orange-600 py-1 px-2 rounded-md transition-all"
              >
                Good to Know
              </a>
            </li> */}
              </ul>
            </div>
          )}
          {/* Elevation-Menu */}
          {status === "authenticated" && (
            <div className="menu-section w-full text-slate-100 mt-5">
              <h5
                className={`text-2xl pl-5 mb-2 ${
                  pathname.includes("elevation") ? "text-cyan-600" : ""
                }`}
              >
                Elevation
              </h5>
              <ul className="pl-10 text-xl space-y-2">
                <li className="pr-5">
                  <Link
                    href="/elevation"
                    className={`w-full flex bg-transparent hover:bg-slate-400/10 hover:text-orange-600 py-1 px-2 rounded-md transition-all ${
                      pathname === "/elevation"
                        ? "text-orange-600 bg-slate-400/10"
                        : ""
                    }`}
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="pr-5">
                  <Link
                    href="/elevation/analysis"
                    className={`w-full flex bg-transparent hover:bg-slate-400/10 hover:text-orange-600 py-1 px-2 rounded-md transition-all ${
                      pathname === "/elevation/analyze"
                        ? "text-orange-600 bg-slate-400/10"
                        : ""
                    }`}
                  >
                    Elevate your SEO
                  </Link>
                </li>
                <li className="pr-5">
                  <Link
                    href="/elevation/summary"
                    className={`w-full flex bg-transparent hover:bg-slate-400/10 hover:text-orange-600 py-1 px-2 rounded-md transition-all ${
                      pathname === "/elevation/summary"
                        ? "text-orange-600 bg-slate-400/10"
                        : ""
                    }`}
                  >
                    All Elevations
                  </Link>
                </li>
              </ul>
            </div>
          )}
          {/* <div className="menu-section w-full text-slate-100 mt-5 absolute bottom-5 px-5">
              {user ? <CreditsCounter /> : null}
            </div> */}
        </>
      )}
    </nav>
  );
};

export default LeftSideBar;
