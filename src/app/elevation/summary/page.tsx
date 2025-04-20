"use client";
import React, { useEffect, useState } from "react";
import { useSEOContext } from "@/context/SEOContext";
import { useAuth } from "@/context/AuthContext";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import DataTable from "@/components/DataTable";
import Link from "next/link";
import CreditsInfo from "@/components/CreditsInfo";
import formatFirestoreDate from "@/helper/firestore-date";

const SummaryPage = () => {
  const [list, setList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();
  const { creditsData } = useAuth();

  if (!session) {
    redirect("/login");
  }

  const { getElevations } = useSEOContext()!;

  useEffect(() => {
    const fetchElevations = async () => {
      setIsLoading(true);
      const elevations = await getElevations();
      if (elevations) {
        setList(
          elevations.map((elevation: any) => ({
            ...elevation,
            // Keep the original timestamp for sorting
            // updatedAt: new Date(
            //   elevation.updatedAt._seconds * 1000 +
            //     elevation.updatedAt._nanoseconds / 1e6
            // ).toLocaleString(),
          }))
        );
      }
      setIsLoading(false);
    };
    fetchElevations();
  }, [getElevations]);

  return (
    <div className="p-6 w-full text-white">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Elevations Summary</h1>
          <p className="text-gray-300 mt-2">
            View and manage all your SEO elevations
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/elevation"
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-md transition-colors flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-cyan-800/30 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-white/5 rounded-lg border border-cyan-800/50 text-center">
            <p className="text-sm text-gray-400">Total Elevations</p>
            <p className="text-2xl font-bold">{list.length}</p>
          </div>
          <div className="p-4 bg-white/5 rounded-lg border border-cyan-800/50 text-center">
            <p className="text-sm text-gray-400">Available Credits</p>
            <p className="text-2xl font-bold">{creditsData?.credits || 0}</p>
          </div>
          <div className="p-4 bg-white/5 rounded-lg border border-cyan-800/50 text-center">
            <p className="text-sm text-gray-400">Average Score</p>
            <p className="text-2xl font-bold">
              {list.length > 0
                ? Math.round(
                    (list.reduce(
                      (acc, curr) => acc + (curr.overallScore || 0),
                      0
                    ) /
                      list.length) *
                      100
                  ) / 100
                : 0}
            </p>
          </div>
          <div className="p-4 bg-white/5 rounded-lg border border-cyan-800/50 text-center">
            <p className="text-sm text-gray-400">Last Elevation</p>
            <p className="text-2xl font-bold">
              {list.length > 0 ? formatFirestoreDate(list[0].updatedAt) : "N/A"}
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
          </div>
        ) : list.length > 0 ? (
          <DataTable data={list} />
        ) : (
          <div className="bg-white/5 p-8 rounded-lg border border-cyan-800/30 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
            <p className="text-xl text-gray-300 mb-2">No elevations found</p>
            <p className="text-gray-400 mb-6">
              Start analyzing websites to see your elevation history
            </p>
            <Link
              href="/elevation"
              className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-md transition-colors"
            >
              Start New Elevation
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryPage;
