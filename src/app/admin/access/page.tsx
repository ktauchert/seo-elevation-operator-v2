"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { toast } from "react-hot-toast";
import { db } from "@/config/firebaseClientConfig";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

type AccessRequest = {
  id: string;
  email: string;
  displayName: string;
  requestedAt: any; // Firestore timestamp
  status: "pending" | "approved" | "denied";
  ipAddress?: string;
  userAgent?: string;
  reason?: string;
  reviewedBy?: string;
  reviewedAt?: any; // Firestore timestamp
};

export default function AccessManagement() {
  const [requests, setRequests] = useState<AccessRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<
    "all" | "pending" | "approved" | "denied"
  >("pending");

  const { userData } = useAuth();
  const { data: session, status } = useSession();

  console.log("Session", session);
  console.log("User Data", userData);

  // Check if user is admin (with proper loading handling)
  useEffect(() => {
    // Only check authentication when the session is loaded
    if (status === "loading") {
      // Don't do anything while loading
      return;
    }

    if (status === "unauthenticated") {
      // Only redirect if definitely not authenticated
      redirect("/auth/login"); // Make sure to use the correct path
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

    // Load access requests only when authenticated and admin
    loadRequests();
  }, [status, session, userData, filter]);
  const loadRequests = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "list",
          filter,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `API returned ${response.status}: ${await response.text()}`
        );
      }

      const data = await response.json();
      setRequests(data.requests);
    } catch (error) {
      console.error("Error loading access requests:", error);
      toast.error("Failed to load access requests");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (
    requestId: string,
    newStatus: "approved" | "denied"
  ) => {
    try {
      const response = await fetch("/api/admin/access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "update",
          requestId,
          status: newStatus,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `API returned ${response.status}: ${await response.text()}`
        );
      }

      // Update the UI
      setRequests(
        requests.map((req) =>
          req.id === requestId ? { ...req, status: newStatus } : req
        )
      );

      toast.success(`Request ${newStatus}`);
    } catch (error) {
      console.error(`Error updating status to ${newStatus}:`, error);
      toast.error(`Failed to update request to ${newStatus}`);
    }
  };

  return (
    <div className="p-6 w-full text-white">
      {status === "loading" || userData === null ? (
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Access Management</h1>
            <p className="text-gray-300 mt-2">
              Review and manage user access requests
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Filter controls */}
          <div className="flex mb-6">
            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-2 mr-2 rounded-md ${
                filter === "pending"
                  ? "bg-yellow-600"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter("approved")}
              className={`px-4 py-2 mr-2 rounded-md ${
                filter === "approved"
                  ? "bg-green-600"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              Approved
            </button>
            <button
              onClick={() => setFilter("denied")}
              className={`px-4 py-2 mr-2 rounded-md ${
                filter === "denied"
                  ? "bg-red-600"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              Denied
            </button>
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-md ${
                filter === "all"
                  ? "bg-cyan-600"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              All
            </button>
          </div>

          {/* Requests table */}
          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-cyan-800/30">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
              </div>
            ) : requests.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-400">
                  No {filter !== "all" ? filter : ""} access requests found
                </p>
              </div>
            ) : (
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
                      <th className="text-right p-3 border-b border-cyan-800/30">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((request, index) => (
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
                          {request.requestedAt
                            ? new Date(
                                request.requestedAt.seconds * 1000
                              ).toLocaleDateString("de-DE")
                            : "Unknown"}
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
                        <td className="p-3 border-b border-cyan-800/20 text-right">
                          {request.status === "pending" ? (
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() =>
                                  handleUpdateStatus(request.id, "approved")
                                }
                                className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-white text-sm"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() =>
                                  handleUpdateStatus(request.id, "denied")
                                }
                                className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white text-sm"
                              >
                                Deny
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() =>
                                handleUpdateStatus(
                                  request.id,
                                  request.status === "approved"
                                    ? "denied"
                                    : "approved"
                                )
                              }
                              className={`px-3 py-1 ${
                                request.status === "approved"
                                  ? "bg-red-600 hover:bg-red-700"
                                  : "bg-green-600 hover:bg-green-700"
                              } rounded text-white text-sm`}
                            >
                              {request.status === "approved"
                                ? "Revoke"
                                : "Approve"}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
