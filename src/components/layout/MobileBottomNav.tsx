"use client";
import { useAuth } from "@/context/AuthContext";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MobileBottomNav = () => {
  const { status } = useSession();
  const pathname = usePathname();

  return (
      <div className="w-full flex flex-row justify-between text-xl text-slate-100 ">
        {status === "authenticated" ? (
          <>
            <Link className="mobile-link-button" href="/">
              Home
            </Link>
            <Link
              className="mobile-link-button"
              href={
                pathname === "/elevation" ? "/elevation/analyze" : "/elevation"
              }
            >
              {pathname === "/elevation" ? "New Elevation" : "Elevation"}
            </Link>
            <Link className="mobile-link-button" href="/user">
              {pathname === "/user" ? "Settings" : "User"}
            </Link>
          </>
        ) : (
          <>
            <Link className="mobile-link-button" href="/">
              Home
            </Link>
            <Link className="mobile-link-button" href="/auth/login">
              Login
            </Link>
          </>
        )}
      </div>
    
  );
};

export default MobileBottomNav;
