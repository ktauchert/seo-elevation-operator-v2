"use client";
import { useAuth } from "@/context/AuthContext";
import React from "react";

const CreditsInfo = () => {
  const { creditsData } = useAuth();
  return (
    <div className="w-[200px] h-[100px] bg-white/40 text-white p-4 flex justify-center flex-col items-center rounded-lg shadow-md shadow-cyan-600 border border-cyan-400 backdrop-blur-sm hover:opacity-0 opacity-100 transition-opacity duration-300 ease-in-out">
      <h3 className="text-xl font-bold">Credits</h3>
      <p>
        {creditsData?.credits} of {creditsData?.maxCredits} left
      </p>
      <div className="progress-bar w-full h-5 bg-slate-200 rounded-md ">
        <div
          className={`progress h-full ${
            (creditsData?.credits ?? 0) / (creditsData?.maxCredits ?? 1) < 100
              ? "bg-cyan-600"
              : "bg-green-700"
          } rounded-md`}
          style={{
            width: `${((creditsData?.credits ?? 0) / (creditsData?.maxCredits ?? 1)) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default CreditsInfo;
