"use client";
import { IoLogOutOutline } from "react-icons/io5";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import usePageTitle from "@/hooks/usePageTitle";

const TopNavBar = () => {
  const { data: session } = useSession();

  const { title } = usePageTitle();

  return (
    <div className="w-full bg-slate-950/50 flex flex-row items-center min-h-[60px] rounded-lg backdrop-blur-md">
      <h2 className="text-2xl md:text-4xl text-white ml-5">
        {Array.from(title).map((char, index) => (
          <span
            key={index}
            className={
              char === char.toUpperCase() && char !== "-"
                ? "text-cyan-600 hover:text-orange-600 hover:cursor-pointer transition-all"
                : "hover:text-orange-600 hover:cursor-pointer transition-all"
            }
          >
            {char}
          </span>
        ))}
      </h2>
      {session && (
        <div
          title="Logout"
          className="text-white ml-auto mr-5 cursor-pointer hover:text-orange-600"
        >
          <IoLogOutOutline
            className="text-2xl md:text-4xl"
            onClick={() => signOut()}
          />
        </div>
      )}
    </div>
  );
};

export default TopNavBar;
