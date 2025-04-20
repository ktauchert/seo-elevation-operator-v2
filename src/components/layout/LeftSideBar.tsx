"use client";
import { useAuth } from "@/context/AuthContext";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
// import CreditsCounter from "../CreditsCounter";

const LeftSideBar = () => {
  const { status } = useSession();
  const { userData } = useAuth();
  const pathname = usePathname();

  const isAdmin = userData?.role === "admin";

  // Helper function for menu links
  const menuLink = (href: string, text: string) => {
    const isActive = href === pathname;
    return (
      <li className="pr-5">
        <Link
          href={href}
          className={`w-full flex bg-transparent hover:bg-slate-400/10 hover:text-orange-600 py-1 px-2 rounded-md transition-all ${
            isActive ? "text-orange-600 bg-slate-400/10" : ""
          }`}
        >
          {text}
        </Link>
      </li>
    );
  };

  return (
    <nav className="flex flex-col bg-slate-950/50 backdrop-blur-md rounded-lg h-full">
      {status === "loading" ? (
        <div className="w-full h-full p-4">
          <div className="w-full bg-white/20 h-1/4 rounded-lg shadow-md animate-pulse mb-4"></div>
          <div className="w-full bg-white/20 h-1/4 rounded-lg shadow-md animate-pulse mb-4"></div>
          <div className="w-full bg-white/20 h-1/4 rounded-lg shadow-md animate-pulse mb-4"></div>
        </div>
      ) : (
        <>
          <h4 className="text-4xl text-slate-100 mb-5 p-5">Menu</h4>

          {/* Home Menu */}
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
                  className="w-full flex bg-transparent hover:bg-slate-400/10 hover:text-orange-600 py-1 px-2 rounded-md transition-all"
                >
                  Top
                </Link>
              </li>
              <li className="pr-5">
                <Link
                  href="/#key-features"
                  className="w-full flex bg-transparent hover:bg-slate-400/10 hover:text-orange-600 py-1 px-2 rounded-md transition-all"
                >
                  Key Features
                </Link>
              </li>
              <li className="pr-5">
                <Link
                  href="/#testimonials"
                  className="w-full flex bg-transparent hover:bg-slate-400/10 hover:text-orange-600 py-1 px-2 rounded-md transition-all"
                >
                  Good to Know
                </Link>
              </li>
            </ul>
          </div>

          {/* User Menu - Only visible when authenticated */}
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
                {menuLink("/user", "Info")}
              </ul>
            </div>
          )}

          {/* Elevation Menu - Only visible when authenticated */}
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
                {menuLink("/elevation", "Dashboard")}
                {menuLink("/elevation/analysis", "Elevate your SEO")}
                {menuLink("/elevation/summary", "All Elevations")}
              </ul>
            </div>
          )}

          {/* Admin Menu - Only visible for admin users */}
          {status === "authenticated" && isAdmin && (
            <div className="menu-section w-full text-slate-100 mt-5">
              <h5
                className={`text-2xl pl-5 mb-2 ${
                  pathname.includes("admin") ? "text-cyan-600" : ""
                }`}
              >
                Admin
              </h5>
              <ul className="pl-10 text-xl space-y-2">
                {menuLink("/admin", "Dashboard")}
                {menuLink("/admin/access", "Access Management")}
                {menuLink("/admin/users", "User Management")}
                {menuLink("/admin/statistics", "Statistics")}
              </ul>
            </div>
          )}
        </>
      )}
    </nav>
  );
};

export default LeftSideBar;
