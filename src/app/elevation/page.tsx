"use client";
import React, { useState, useEffect } from "react";
import { useSEOContext } from "@/context/SEOContext";
import { useAuth } from "@/context/AuthContext";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { IoBarChart } from "react-icons/io5";
import CreditsSummary from "@/components/CreditsSummary";
import formatFirestoreDate from "@/helper/firestore-date";
import { Elevation } from "@/components/DataTable";

const ElevationPage = () => {
  const [recentElevations, setRecentElevations] = useState<
    Elevation[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  const { getElevations } = useSEOContext();
  const { creditsData } = useAuth();

  useEffect(() => {
    if (!session) {
      redirect("/login");
    }

    const loadRecentElevations = async () => {
      setIsLoading(true);
      const data = await getElevations();
      if (data) {
        setRecentElevations(
          data.slice(0, 5)
        );
      }
      setIsLoading(false);
    };

    loadRecentElevations();
  }, [session, getElevations]);

  // Calculate average score
  const averageScore =
    recentElevations.length > 0
      ? Math.round(
          (recentElevations.reduce(
            (acc, curr) => acc + (curr.overallScore || 0),
            0
          ) /
            recentElevations.length) *
            100
        ) / 100
      : 0;

  return (
    <div className="p-6 w-full text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">SEO Elevation Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quick Stats Panel */}
        <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-cyan-800/30">
          <h2 className="text-xl font-semibold mb-4">Account Overview</h2>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-white/5 rounded-lg border border-cyan-800/50 text-center">
              <p className="text-sm text-gray-400">Available Credits</p>
              <p className="text-2xl font-bold">{creditsData?.credits || 0}</p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg border border-cyan-800/50 text-center">
              <p className="text-sm text-gray-400">Total Elevations</p>
              <p className="text-2xl font-bold">
                {recentElevations.length || 0}
              </p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg border border-cyan-800/50 text-center">
              <p className="text-sm text-gray-400">Average Score</p>
              <p className="text-2xl font-bold">{averageScore}</p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg border border-cyan-800/50 text-center">
              <p className="text-sm text-gray-400">Last Elevation</p>
              <p className="text-2xl font-bold">
                {recentElevations.length > 0
                  ? formatFirestoreDate(recentElevations[0].updatedAt)
                  : "N/A"}
              </p>
            </div>
          </div>

          <Link
            href="/elevation/analysis"
            className="block text-center py-3 px-4 bg-cyan-600 hover:bg-cyan-700 rounded-md transition-colors"
          >
            Start New Analysis
          </Link>
        </div>

        {/* Recent Elevations */}
        <div className="md:col-span-2 bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-cyan-800/30">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Elevations</h2>
            <Link
              href="/elevation/summary"
              className="text-sm text-cyan-400 hover:text-cyan-300"
            >
              View All →
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
            </div>
          ) : recentElevations.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-cyan-900/60">
                  <tr>
                    <th className="text-left p-3 border-b border-cyan-800/30">
                      URL
                    </th>
                    <th className="text-left p-3 border-b border-cyan-800/30">
                      Date
                    </th>
                    <th className="text-left p-3 border-b border-cyan-800/30">
                      Score
                    </th>
                    <th className="text-right p-3 border-b border-cyan-800/30">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentElevations.map((elevation, index) => (
                    <tr
                      key={elevation.id}
                      className={`${
                        index % 2 === 0 ? "bg-white/5" : "bg-white/10"
                      } hover:bg-cyan-900/40`}
                    >
                      <td className="p-3 border-b border-cyan-800/20">
                        <div
                          className="max-w-[300px] truncate"
                          title={elevation.url}
                        >
                          {elevation.url}
                        </div>
                      </td>
                      <td className="p-3 border-b border-cyan-800/20">
                        {formatFirestoreDate(elevation.updatedAt)}
                      </td>
                      <td className="p-3 border-b border-cyan-800/20">
                        <div className="flex items-center">
                          <div
                            className={`w-3 h-3 rounded-full mr-2 ${
                              (elevation.overallScore || 0) >= 70
                                ? "bg-green-500"
                                : (elevation.overallScore || 0) >= 40
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                          ></div>
                          {elevation.overallScore || "N/A"}
                        </div>
                      </td>
                      <td className="p-3 border-b border-cyan-800/20 text-right">
                        <Link
                          href={`/elevation/detail/${elevation.id}`}
                          className="px-3 py-1 bg-cyan-600 hover:bg-cyan-700 rounded text-white text-sm mr-2"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => window.open(elevation.url, "_blank")}
                          className="px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded text-white text-sm"
                        >
                          Visit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
                href="/elevation/analysis"
                className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-md transition-colors"
              >
                Start New Elevation
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Feature Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* SEO Tips */}
        <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-cyan-800/30">
          <h2 className="text-xl font-semibold mb-4">SEO Tips</h2>
          <ul className="space-y-3">
            <li className="p-3 bg-white/5 rounded-md border border-cyan-800/50">
              <h3 className="font-medium text-cyan-300">Optimize Meta Tags</h3>
              <p className="text-sm text-gray-300 mt-1">
                Ensure your title and meta descriptions are compelling and
                keyword-rich.
              </p>
            </li>
            <li className="p-3 bg-white/5 rounded-md border border-cyan-800/50">
              <h3 className="font-medium text-cyan-300">Mobile Optimization</h3>
              <p className="text-sm text-gray-300 mt-1">
                Make sure your website is responsive and mobile-friendly for
                better rankings.
              </p>
            </li>
            <li className="p-3 bg-white/5 rounded-md border border-cyan-800/50">
              <h3 className="font-medium text-cyan-300">Page Speed</h3>
              <p className="text-sm text-gray-300 mt-1">
                Optimize images and reduce server response time to improve
                loading speeds.
              </p>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-cyan-800/30">
          <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/elevation/analysis"
              className="p-4 bg-white/5 rounded-lg border border-cyan-800/50 text-center hover:bg-white/10 transition-colors flex items-center justify-center flex-col"
            >
              <IoBarChart className="text-cyan-500 text-3xl mb-2" />
              <span>Analysis</span>
            </Link>
            <Link
              href="/elevation/summary"
              className="p-4 bg-white/5 rounded-lg border border-cyan-800/50 text-center hover:bg-white/10 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mx-auto text-cyan-400 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>Reports</span>
            </Link>
            <Link
              href="/profile"
              className="p-4 bg-white/5 rounded-lg border border-cyan-800/50 text-center hover:bg-white/10 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mx-auto text-cyan-400 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>Profile</span>
            </Link>
            <Link
              href="/help"
              className="p-4 bg-white/5 rounded-lg border border-cyan-800/50 text-center hover:bg-white/10 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mx-auto text-cyan-400 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Help</span>
            </Link>
          </div>
        </div>

        {/* Credits Management */}
        <CreditsSummary creditsData={creditsData} />
      </div>
    </div>
  );
};

export default ElevationPage;
