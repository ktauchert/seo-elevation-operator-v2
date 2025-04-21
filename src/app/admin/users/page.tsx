"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  IoArrowBack,
  IoTrash,
  IoPersonCircle,
  IoShieldCheckmark,
  IoCheckmarkCircle,
} from "react-icons/io5";
import { toast } from "react-hot-toast";
import formatFirestoreDate from "@/helper/firestore-date";

type User = {
  id: string;
  displayName: string;
  email: string;
  role: string;
  udpatedAt: Date;
  elevationCount?: number;
  status: "active" | "suspended" | "pending";
  image?: string;
  accessRequestId?: string;
};

type UserStats = {
  total: number;
  admins: number;
  users: number;
  pending: number;
};

export default function UsersManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userStats, setUserStats] = useState<UserStats>({
    total: 0,
    admins: 0,
    users: 0,
    pending: 0,
  });
  const [filter, setFilter] = useState<"all" | "active" | "admin" | "pending">(
    "all"
  );

  const { userData } = useAuth();
  const { data: session, status } = useSession();

  useEffect(() => {
    // Only check authentication when the session is loaded
    if (status === "loading") {
      return;
    }

    if (status === "unauthenticated") {
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

    // Load user data when authenticated and admin
    loadUsers();
  }, [status, session, userData, filter]);

  // In the loadUsers function, replace the Firebase code with API calls:

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/user/all", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filter,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `API returned ${response.status}: ${await response.text()}`
        );
      }

      const data = await response.json();
      setUsers(data.users);
      setUserStats({
        total: data.stats.total,
        admins: data.stats.admins,
        users: data.stats.regularUsers,
        pending: data.stats.pending,
      });
    } catch (error) {
      console.error("Error loading users data:", error);
      toast.error("Failed to load users");
    } finally {
      setIsLoading(false);
    }
  };

  // For handleDeleteUser:
  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    try {
      const response = await fetch("/api/user/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_uid:
            userToDelete.id.startsWith("pending_") &&
            userToDelete.accessRequestId
              ? userToDelete.accessRequestId
              : userToDelete.id,
          type: userToDelete.id.startsWith("pending_")
            ? "access_request"
            : "user",
        }),
      });

      if (!response.ok) {
        throw new Error(
          `API returned ${response.status}: ${await response.text()}`
        );
      }

      toast.success(
        `${
          userToDelete.id.startsWith("pending_") ? "Access request" : "User"
        } deleted successfully`
      );

      // Update the UI
      setUsers(users.filter((user) => user.id !== userToDelete.id));
      setShowDeleteModal(false);

      // Update stats
      setUserStats({
        ...userStats,
        total: userStats.total - 1,
        admins:
          userToDelete.role === "admin"
            ? userStats.admins - 1
            : userStats.admins,
        users:
          userToDelete.role === "user" ? userStats.users - 1 : userStats.users,
        pending:
          userToDelete.status === "pending"
            ? userStats.pending - 1
            : userStats.pending,
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    }
  };

  // For handleUpdateUserRole:
  const handleUpdateUserRole = async (newRole: string) => {
    if (!currentUser) return;

    try {
      // Can only update role for actual users, not pending access requests
      if (currentUser.id.startsWith("pending_")) {
        toast.error("Cannot change role for pending user");
        return;
      }

      const response = await fetch("/api/user/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_uid: currentUser.id,
          updates: {
            role: newRole,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(
          `API returned ${response.status}: ${await response.text()}`
        );
      }

      toast.success(`User role updated to ${newRole}`);

      // Update the UI
      setUsers(
        users.map((user) =>
          user.id === currentUser.id ? { ...user, role: newRole } : user
        )
      );

      // Update stats
      if (currentUser.role === "admin" && newRole !== "admin") {
        setUserStats({
          ...userStats,
          admins: userStats.admins - 1,
          users: userStats.users + 1,
        });
      } else if (currentUser.role !== "admin" && newRole === "admin") {
        setUserStats({
          ...userStats,
          admins: userStats.admins + 1,
          users: userStats.users - 1,
        });
      }

      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating user role:", error);
      toast.error("Failed to update user role");
    }
  };

  // For handleUpdateUserStatus:
  const handleUpdateUserStatus = async (
    newStatus: "active" | "suspended" | "pending"
  ) => {
    if (!currentUser) return;

    try {
      if (
        currentUser.id.startsWith("pending_") &&
        currentUser.accessRequestId
      ) {
        // For pending access requests, handle through access request collection
        const response = await fetch("/api/user/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_uid: currentUser.accessRequestId,
            type: "access_request",
            updates: {
              status: newStatus === "active" ? "approved" : "denied",
            },
          }),
        });

        if (!response.ok) {
          throw new Error(
            `API returned ${response.status}: ${await response.text()}`
          );
        }

        toast.success(
          `User ${currentUser.displayName || currentUser.email} ${
            newStatus === "active" ? "approved" : "denied"
          }`
        );

        // Remove from users list if the new status doesn't match the current filter
        if (
          (filter === "active" && newStatus !== "active") ||
          (filter === "pending" && newStatus !== "pending")
        ) {
          setUsers(users.filter((user) => user.id !== currentUser.id));
        } else {
          setUsers(
            users.map((user) =>
              user.id === currentUser.id ? { ...user, status: newStatus } : user
            )
          );
        }
      } else {
        // Regular user - update status in user data
        const response = await fetch("/api/user/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_uid: currentUser.id,
            updates: {
              status: newStatus,
            },
          }),
        });

        if (!response.ok) {
          throw new Error(
            `API returned ${response.status}: ${await response.text()}`
          );
        }

        // Update the UI
        setUsers(
          users.map((user) =>
            user.id === currentUser.id ? { ...user, status: newStatus } : user
          )
        );

        toast.success(`User status updated to ${newStatus}`);
      }

      // Update pending count if needed
      if (currentUser.status === "pending" && newStatus !== "pending") {
        setUserStats({ ...userStats, pending: userStats.pending - 1 });
      } else if (currentUser.status !== "pending" && newStatus === "pending") {
        setUserStats({ ...userStats, pending: userStats.pending + 1 });
      }

      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating user status:", error);
      toast.error("Failed to update user status");
    }
  };

  // For handleApproveUser and handleDenyUser:
  const handleApproveUser = async (user: User) => {
    if (!user.accessRequestId || !user.id.startsWith("pending_")) {
      toast.error("This is not a pending access request");
      return;
    }

    try {
      const response = await fetch("/api/access/control", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "update",
          requestId: user.accessRequestId,
          status: "approved",
        }),
      });

      if (!response.ok) {
        throw new Error(
          `API returned ${response.status}: ${await response.text()}`
        );
      }

      toast.success(`User ${user.displayName || user.email} approved`);

      // Update the UI - remove from list if filter is "pending"
      if (filter === "pending") {
        setUsers(users.filter((u) => u.id !== user.id));
        setUserStats({ ...userStats, pending: userStats.pending - 1 });
      } else {
        setUsers(
          users.map((u) => (u.id === user.id ? { ...u, status: "active" } : u))
        );
      }
    } catch (error) {
      console.error("Error approving user:", error);
      toast.error("Failed to approve user");
    }
  };

  const handleDenyUser = async (user: User) => {
    if (!user.accessRequestId || !user.id.startsWith("pending_")) {
      toast.error("This is not a pending access request");
      return;
    }

    try {
      const response = await fetch("/api/access/control", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "update",
          requestId: user.accessRequestId,
          status: "denied",
        }),
      });

      if (!response.ok) {
        throw new Error(
          `API returned ${response.status}: ${await response.text()}`
        );
      }

      toast.success(`User ${user.displayName || user.email} denied`);

      // Update the UI - remove from list if filter is "pending"
      if (filter === "pending") {
        setUsers(users.filter((u) => u.id !== user.id));
        setUserStats({ ...userStats, pending: userStats.pending - 1 });
      } else {
        setUsers(
          users.map((u) =>
            u.id === user.id ? { ...u, status: "suspended" } : u
          )
        );
      }
    } catch (error) {
      console.error("Error denying user:", error);
      toast.error("Failed to deny user");
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
              <h1 className="text-3xl font-bold">User Management</h1>
              <p className="text-gray-300 mt-2">
                Manage platform users, roles and access
              </p>
            </div>
            <div>
              <Link
                href="/admin"
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-md transition-colors flex items-center gap-2"
              >
                <IoArrowBack />
                Back to Dashboard
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-cyan-800/30 flex items-center">
              <div className="p-3 bg-blue-800/50 rounded-full mr-3">
                <IoPersonCircle className="text-blue-300 text-xl" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Total Users</p>
                <h3 className="text-xl font-bold">{userStats.total}</h3>
              </div>
            </div>

            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-cyan-800/30 flex items-center">
              <div className="p-3 bg-purple-800/50 rounded-full mr-3">
                <IoShieldCheckmark className="text-purple-300 text-xl" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Admin Users</p>
                <h3 className="text-xl font-bold">{userStats.admins}</h3>
              </div>
            </div>

            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-cyan-800/30 flex items-center">
              <div className="p-3 bg-green-800/50 rounded-full mr-3">
                <IoPersonCircle className="text-green-300 text-xl" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Regular Users</p>
                <h3 className="text-xl font-bold">{userStats.users}</h3>
              </div>
            </div>

            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-cyan-800/30 flex items-center">
              <div className="p-3 bg-yellow-800/50 rounded-full mr-3">
                <IoPersonCircle className="text-yellow-300 text-xl" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Pending Users</p>
                <h3 className="text-xl font-bold">{userStats.pending}</h3>
              </div>
            </div>
          </div>

          {/* Filter Controls */}
          <div className="flex mb-6 gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-md transition-colors ${
                filter === "all"
                  ? "bg-cyan-600 text-white"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              All Users
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`px-4 py-2 rounded-md transition-colors ${
                filter === "active"
                  ? "bg-cyan-600 text-white"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              Active Users
            </button>
            <button
              onClick={() => setFilter("admin")}
              className={`px-4 py-2 rounded-md transition-colors ${
                filter === "admin"
                  ? "bg-cyan-600 text-white"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              Admins
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-2 rounded-md transition-colors ${
                filter === "pending"
                  ? "bg-cyan-600 text-white"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              Pending
            </button>
          </div>

          {/* Users Table */}
          <div className="bg-white/10 rounded-lg backdrop-blur-sm border border-cyan-800/30 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-cyan-900/70">
                  <tr>
                    <th className="text-left p-4 border-b border-cyan-800/30">
                      User
                    </th>
                    <th className="text-left p-4 border-b border-cyan-800/30">
                      Email
                    </th>
                    <th className="text-left p-4 border-b border-cyan-800/30">
                      Role
                    </th>
                    <th className="text-left p-4 border-b border-cyan-800/30">
                      Status
                    </th>
                    <th className="text-left p-4 border-b border-cyan-800/30">
                      Updated
                    </th>
                    <th className="text-left p-4 border-b border-cyan-800/30">
                      Elevations
                    </th>
                    <th className="text-right p-4 border-b border-cyan-800/30">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={8} className="p-4 text-center">
                        <div className="flex justify-center py-8">
                          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cyan-500"></div>
                        </div>
                      </td>
                    </tr>
                  ) : users.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-4 text-center text-gray-400">
                        No users found
                      </td>
                    </tr>
                  ) : (
                    users.map((user, index) => (
                      <tr
                        key={user.id}
                        className={`
                          ${index % 2 === 0 ? "bg-white/5" : "bg-white/10"} 
                          ${
                            user.id.startsWith("pending_")
                              ? "bg-yellow-900/10"
                              : ""
                          }
                          hover:bg-cyan-900/40 transition-colors
                        `}
                      >
                        <td className="p-4 border-b border-cyan-800/20">
                          <div className="flex items-center">
                            {user.image ? (
                              <img
                                src={user.image}
                                alt={user.displayName}
                                className="w-8 h-8 rounded-full mr-3"
                              />
                            ) : (
                              <div className="w-8 h-8 bg-cyan-800 rounded-full flex items-center justify-center mr-3">
                                <span>
                                  {user.displayName?.[0] ||
                                    user.email?.[0] ||
                                    "?"}
                                </span>
                              </div>
                            )}
                            <span>
                              {user.displayName || "No Name"}
                              {user.id.startsWith("pending_") && (
                                <span className="ml-2 text-xs text-yellow-300">
                                  (Pending Request)
                                </span>
                              )}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 border-b border-cyan-800/20">
                          {user.email}
                        </td>
                        <td className="p-4 border-b border-cyan-800/20">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              user.role === "admin"
                                ? "bg-purple-900/50 text-purple-300"
                                : "bg-blue-900/50 text-blue-300"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="p-4 border-b border-cyan-800/20">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              user.status === "active"
                                ? "bg-green-900/50 text-green-300"
                                : user.status === "pending"
                                ? "bg-yellow-900/50 text-yellow-300"
                                : "bg-red-900/50 text-red-300"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="p-4 border-b border-cyan-800/20">
                          {formatFirestoreDate(user.udpatedAt)}
                        </td>
                        <td className="p-4 border-b border-cyan-800/20">
                          {user.elevationCount || 0}
                        </td>
                        <td className="p-4 border-b border-cyan-800/20 text-right">
                          {user.id.startsWith("pending_") ? (
                            // Pending access request actions
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => handleApproveUser(user)}
                                className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm flex items-center"
                              >
                                <IoCheckmarkCircle className="mr-1" />
                                Approve
                              </button>
                              <button
                                onClick={() => handleDenyUser(user)}
                                className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm flex items-center"
                              >
                                <IoTrash className="mr-1" />
                                Deny
                              </button>
                            </div>
                          ) : (
                            // Regular user actions
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => {
                                  setCurrentUser(user);
                                  setShowEditModal(true);
                                }}
                                className="px-2 py-1 bg-cyan-600 hover:bg-cyan-700 rounded text-sm"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  setUserToDelete(user);
                                  setShowDeleteModal(true);
                                }}
                                className="px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-sm flex items-center"
                              >
                                <IoTrash className="mr-1" />
                                Delete
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Delete Confirmation Modal */}
          {showDeleteModal && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
              <div className="bg-slate-800 p-6 rounded-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
                <p className="mb-6">
                  Are you sure you want to{" "}
                  {userToDelete?.id.startsWith("pending_")
                    ? "reject"
                    : "delete"}{" "}
                  the user{" "}
                  <span className="font-semibold text-cyan-400">
                    {userToDelete?.displayName || userToDelete?.email}
                  </span>
                  ? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteUser}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
                  >
                    {userToDelete?.id.startsWith("pending_")
                      ? "Reject"
                      : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Edit User Modal */}
          {showEditModal && currentUser && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
              <div className="bg-slate-800 p-6 rounded-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Edit User</h2>

                <div className="mb-4">
                  <div className="flex items-center mb-4">
                    {currentUser.image ? (
                      <img
                        src={currentUser.image}
                        alt={currentUser.displayName}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-cyan-800 rounded-full flex items-center justify-center mr-4">
                        <span className="text-lg">
                          {currentUser.displayName?.[0] ||
                            currentUser.email?.[0] ||
                            "?"}
                        </span>
                      </div>
                    )}
                    <div>
                      <h3 className="font-medium">{currentUser.displayName}</h3>
                      <p className="text-sm text-gray-400">
                        {currentUser.email}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      Role
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdateUserRole("user")}
                        className={`px-3 py-1 rounded ${
                          currentUser.role === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-white/10 hover:bg-white/20"
                        }`}
                      >
                        User
                      </button>
                      <button
                        onClick={() => handleUpdateUserRole("admin")}
                        className={`px-3 py-1 rounded ${
                          currentUser.role === "admin"
                            ? "bg-purple-600 text-white"
                            : "bg-white/10 hover:bg-white/20"
                        }`}
                      >
                        Admin
                      </button>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-1">
                      Status
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdateUserStatus("active")}
                        className={`px-3 py-1 rounded ${
                          currentUser.status === "active"
                            ? "bg-green-600 text-white"
                            : "bg-white/10 hover:bg-white/20"
                        }`}
                      >
                        Active
                      </button>
                      <button
                        onClick={() => handleUpdateUserStatus("suspended")}
                        className={`px-3 py-1 rounded ${
                          currentUser.status === "suspended"
                            ? "bg-red-600 text-white"
                            : "bg-white/10 hover:bg-white/20"
                        }`}
                      >
                        Suspended
                      </button>
                      <button
                        onClick={() => handleUpdateUserStatus("pending")}
                        className={`px-3 py-1 rounded ${
                          currentUser.status === "pending"
                            ? "bg-yellow-600 text-white"
                            : "bg-white/10 hover:bg-white/20"
                        }`}
                      >
                        Pending
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setUserToDelete(currentUser);
                      setShowEditModal(false);
                      setShowDeleteModal(true);
                    }}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded flex items-center"
                  >
                    <IoTrash className="mr-1" />
                    Delete User
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
