"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";

import {
  IoPersonAdd,
  IoStatsChart,
  IoAnalytics,
  IoSettings,
} from "react-icons/io5";
import formatFirestoreDate from "@/helper/firestore-date";

export default function AdminDashboard() {
  interface AccessRequest {
    id: string;
    displayName: string | null;
    email: string;
    requestedAt: string;
    status: "approved" | "denied" | "pending";
  }

  const [stats, setStats] = useState({
    pendingAccessRequests: 0,
    totalUsers: 0,
    totalElevations: 0,
    recentAccessRequests: [] as AccessRequest[],
  });
  const [isLoading, setIsLoading] = useState(true);

  const { userData } = useAuth();
  const { data: session, status } = useSession();

  // Check if user is admin (with proper loading handling)
  useEffect(() => {
    // Only check authentication when the session is loaded
    if (status === "loading") {
      // Don't do anything while loading
      return;
    }

    if (status === "unauthenticated") {
      // Only redirect if definitely not authenticated
      redirect("/auth/login");
      return;
    }

    // At this point we know the user is authenticated
    if (userData === null) {
      // User data is still loading, don't redirect yet
      return;
    }

    // Now we have both the session and user data
    if (userData?.role !== "admin") {
      redirect("/elevation");
      return;
    }

    // Load dashboard data when authenticated and admin
    loadDashboardData();
  }, [status, session, userData]);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/access/summary", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `API returned ${response.status}: ${await response.text()}`
        );
      }

      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error loading access requests:", error);
      // toast.error("Failed to load access requests");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 w-full text-white">
      {status === "loading" || userData === null ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-gray-300 mt-2">
                Overview of platform statistics and user management
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-cyan-800/30 flex items-center">
              <div className="p-4 bg-cyan-800/50 rounded-full mr-4">
                <IoPersonAdd className="text-cyan-300 text-2xl" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Pending Access Requests</p>
                <div className="flex items-baseline">
                  <h3 className="text-2xl font-bold">
                    {isLoading ? (
                      <div className="h-8 w-16 bg-white/20 animate-pulse rounded"></div>
                    ) : (
                      stats.pendingAccessRequests
                    )}
                  </h3>
                  <Link
                    href="/admin/access"
                    className="ml-2 text-xs text-cyan-400 hover:text-cyan-300"
                  >
                    View All →
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-cyan-800/30 flex items-center">
              <div className="p-4 bg-purple-800/50 rounded-full mr-4">
                <IoStatsChart className="text-purple-300 text-2xl" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Users</p>
                <div className="flex items-baseline">
                  <h3 className="text-2xl font-bold">
                    {isLoading ? (
                      <div className="h-8 w-16 bg-white/20 animate-pulse rounded"></div>
                    ) : (
                      stats.totalUsers
                    )}
                  </h3>
                  <Link
                    href="/admin/users"
                    className="ml-2 text-xs text-cyan-400 hover:text-cyan-300"
                  >
                    Manage →
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-cyan-800/30 flex items-center">
              <div className="p-4 bg-green-800/50 rounded-full mr-4">
                <IoAnalytics className="text-green-300 text-2xl" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Elevations</p>
                <div className="flex items-baseline">
                  <h3 className="text-2xl font-bold">
                    {isLoading ? (
                      <div className="h-8 w-16 bg-white/20 animate-pulse rounded"></div>
                    ) : (
                      stats.totalElevations
                    )}
                  </h3>
                  <Link
                    href="/admin/statistics"
                    className="ml-2 text-xs text-cyan-400 hover:text-cyan-300"
                  >
                    Analytics →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Recent Access Requests Panel */}
            <div className="md:col-span-2 bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-cyan-800/30">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  Recent Access Requests
                </h2>
                <Link
                  href="/admin/access"
                  className="text-sm text-cyan-400 hover:text-cyan-300"
                >
                  View All →
                </Link>
              </div>

              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
                </div>
              ) : stats.recentAccessRequests.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-cyan-900/60">
                      <tr>
                        <th className="text-left p-3 border-b border-cyan-800/30">
                          User
                        </th>
                        <th className="text-left p-3 border-b border-cyan-800/30">
                          Email
                        </th>
                        <th className="text-left p-3 border-b border-cyan-800/30">
                          Requested At
                        </th>
                        <th className="text-left p-3 border-b border-cyan-800/30">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentAccessRequests.map((request, index) => (
                        <tr
                          key={request.id}
                          className={`${
                            index % 2 === 0 ? "bg-white/5" : "bg-white/10"
                          } hover:bg-cyan-900/40`}
                        >
                          <td className="p-3 border-b border-cyan-800/20">
                            {request.displayName || "Unknown"}
                          </td>
                          <td className="p-3 border-b border-cyan-800/20">
                            {request.email}
                          </td>
                          <td className="p-3 border-b border-cyan-800/20">
                            {formatFirestoreDate(request.requestedAt)}
                          </td>
                          <td className="p-3 border-b border-cyan-800/20">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                request.status === "approved"
                                  ? "bg-green-900/50 text-green-300"
                                  : request.status === "denied"
                                  ? "bg-red-900/50 text-red-300"
                                  : "bg-yellow-900/50 text-yellow-300"
                              }`}
                            >
                              {request.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-400">
                    No access requests found
                  </p>
                </div>
              )}
            </div>

            {/* Admin Quick Access */}
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-cyan-800/30">
              <h2 className="text-xl font-semibold mb-4">Admin Tools</h2>
              <div className="grid grid-cols-2 gap-4">
                <Link
                  href="/admin/access"
                  className="p-4 bg-white/5 rounded-lg border border-cyan-800/50 text-center hover:bg-white/10 transition-colors flex items-center justify-center flex-col"
                >
                  <IoPersonAdd className="text-cyan-500 text-3xl mb-2" />
                  <span>Access Requests</span>
                </Link>
                <Link
                  href="/admin/users"
                  className="p-4 bg-white/5 rounded-lg border border-cyan-800/50 text-center hover:bg-white/10 transition-colors flex items-center justify-center flex-col"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-cyan-400 mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span>User Management</span>
                </Link>
                <Link
                  href="/admin/statistics"
                  className="p-4 bg-white/5 rounded-lg border border-cyan-800/50 text-center hover:bg-white/10 transition-colors flex items-center justify-center flex-col"
                >
                  <IoStatsChart className="text-cyan-500 text-3xl mb-2" />
                  <span>Analytics</span>
                </Link>
                <Link
                  href="/admin/settings"
                  className="p-4 bg-white/5 rounded-lg border border-cyan-800/50 text-center hover:bg-white/10 transition-colors flex items-center justify-center flex-col"
                >
                  <IoSettings className="text-cyan-500 text-3xl mb-2" />
                  <span>Settings</span>
                </Link>
              </div>

              <div className="mt-6 p-4 bg-cyan-900/20 rounded-lg border border-cyan-800/50">
                <h3 className="font-medium text-cyan-300 mb-2">Admin Tips</h3>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li>• Review access requests regularly to avoid backlog</li>
                  <li>• Check user analytics for platform usage patterns</li>
                  <li>• Monitor system performance in the settings panel</li>
                </ul>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="mt-6 bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-cyan-800/30">
            <h2 className="text-xl font-semibold mb-4">System Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-green-900/20 rounded-lg border border-green-800/50">
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="font-medium">API Services</span>
                </div>
                <p className="text-xs text-gray-300 mt-1">
                  All systems operational
                </p>
              </div>
              <div className="p-4 bg-green-900/20 rounded-lg border border-green-800/50">
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="font-medium">Database</span>
                </div>
                <p className="text-xs text-gray-300 mt-1">
                  Connected and responding
                </p>
              </div>
              <div className="p-4 bg-green-900/20 rounded-lg border border-green-800/50">
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="font-medium">Authentication</span>
                </div>
                <p className="text-xs text-gray-300 mt-1">
                  Service running normally
                </p>
              </div>
              <div className="p-4 bg-green-900/20 rounded-lg border border-green-800/50">
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="font-medium">Storage</span>
                </div>
                <p className="text-xs text-gray-300 mt-1">No issues detected</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
