"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { IoArrowBack, IoBarChart, IoClipboardOutline } from "react-icons/io5";
import RadialChart from "@/components/RadialChart";
import AnalysisInfo from "@/components/AnalysisInfo";
import { ElevationResultData } from "../../../../../seo_types";
import formatFirestoreDate from "@/helper/firestore-date";

export default function ElevationDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [elevation, setElevation] = useState<ElevationResultData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/auth/login");
    }

    if (status === "authenticated" && session?.user?.id) {
      fetchElevationData();
    }
  }, [status, session, params.id]);

  const fetchElevationData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/seo/elevation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_uid: session?.user?.id,
          elevation_id: params.id,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${await response.text()}`);
      }

      const data = await response.json();
      setElevation(data.elevation);
    } catch (error) {
      console.error("Failed to fetch elevation data:", error);
      setError("Failed to load elevation data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };


  if (status === "loading" || isLoading) {
    return (
      <div className="p-6 w-full text-white">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 w-full text-white">
        <div className="bg-red-900/20 p-6 rounded-lg border border-red-800/50">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p>{error}</p>
          <div className="mt-4">
            <Link
              href="/elevation"
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors flex items-center gap-2 w-fit"
            >
              <IoArrowBack /> Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 w-full text-white">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">SEO Elevation Details</h1>
          <p className="text-gray-300 mt-2">{elevation?.url || "Loading..."}</p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/elevation"
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-md transition-colors flex items-center gap-2"
          >
            <IoArrowBack className="font-bold text-lg" />
            Back to Dashboard
          </Link>
        </div>
      </div>

      {elevation ? (
        <>
          {/* Summary Card */}
          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-cyan-800/30 mb-6">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white/5 p-4 rounded-lg border border-cyan-800/50">
                <h3 className="text-sm text-gray-400">Overall Score</h3>
                <p className="text-2xl font-bold flex items-center">
                  <span
                    className={`inline-block w-3 h-3 rounded-full mr-2 ${
                      elevation.overallScore >= 70
                        ? "bg-green-500"
                        : elevation.overallScore >= 40
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  ></span>
                  {elevation.overallScore || "N/A"}
                </p>
              </div>

              <div className="bg-white/5 p-4 rounded-lg border border-cyan-800/50">
                <h3 className="text-sm text-gray-400">Created</h3>
                <p className="text-lg font-medium">
                  {formatFirestoreDate(elevation.updatedAt)}
                </p>
              </div>

              <div className="bg-white/5 p-4 rounded-lg border border-cyan-800/50">
                <h3 className="text-sm text-gray-400">Updated</h3>
                <p className="text-lg font-medium">
                  {formatFirestoreDate(elevation.updatedAt)}
                </p>
              </div>

              <div className="bg-white/5 p-4 rounded-lg border border-cyan-800/50">
                <h3 className="text-sm text-gray-400">Actions</h3>
                <button
                  onClick={() => window.open(elevation.url, "_blank")}
                  className="px-3 py-1 bg-cyan-600 hover:bg-cyan-700 rounded text-white text-sm"
                >
                  Visit Website
                </button>
              </div>
            </div>
          </div>

          {/* Analysis Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* SEO Analysis */}
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-cyan-800/30 min-h-[580px]">
              <h2 className="text-xl font-semibold mb-4">SEO Analysis</h2>

              {elevation.result ? (
                <div className="analysis-result overflow-y-auto max-h-[730px] scrollbar scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-cyan-700 scrollbar-track-slate-700/35">
                  <AnalysisInfo analysis={elevation.result} />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <IoClipboardOutline className="text-6xl text-gray-500 mb-4" />
                  <p className="text-lg text-gray-400">
                    No analysis data available
                  </p>
                </div>
              )}
            </div>

            {/* SEO Scoring */}
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-cyan-800/30 min-h-[500px]">
              <h2 className="text-xl font-semibold mb-4">SEO Scoring</h2>

              {elevation.scoring ? (
                <div className="flex justify-center items-center py-4">
                  <RadialChart scoring={elevation.scoring} />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <IoBarChart className="text-6xl text-gray-500 mb-4" />
                  <p className="text-lg text-gray-400">
                    No scoring data available
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-cyan-800/30">
          <p className="text-center">Elevation not found</p>
        </div>
      )}
    </div>
  );
}
