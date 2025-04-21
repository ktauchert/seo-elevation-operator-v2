"use client";
import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import formatFirestoreDate from "@/helper/firestore-date";
import CreditsSummary from "@/components/CreditsSummary";
import {
  RiDashboardHorizontalLine,
  RiDeleteBin6Line,
  RiPieChartBoxLine,
  RiSettings2Line,
} from "react-icons/ri";


const User = () => {
  const { userData, creditsData } = useAuth();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // TODO: Implement actual account deletion functionality
  const handleDeleteAccount = async () => {
    // This is a placeholder for the actual deletion logic
    try {
      // await deleteUserAccount(); // Implement this function in your AuthContext
      toast.success("Account deleted successfully");
      // Redirect to home page or login page after deletion
    } catch (error) {
      toast.error("Failed to delete account");
      console.error("Error deleting account:", error);
    }
  };

  return (
    <div className="p-6 w-full text-white">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Account Settings</h1>
          <p className="text-gray-300 mt-2">
            Manage your profile and preferences
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Section */}
        <div className="lg:col-span-2 bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-cyan-800/30">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Profile Information</h2>
            <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-md text-sm transition-colors">
              Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-6">
                <label className="block text-sm text-gray-400 mb-1">
                  Display Name
                </label>
                <div className="p-3 bg-white/5 border border-cyan-800/50 rounded-md">
                  {userData?.displayName || "Not set"}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm text-gray-400 mb-1">
                  Email
                </label>
                <div className="p-3 bg-white/5 border border-cyan-800/50 rounded-md">
                  {userData?.email || "Not set"}
                </div>
              </div>
            </div>

            <div>
              <div className="mb-6">
                <label className="block text-sm text-gray-400 mb-1">
                  First Name
                </label>
                <div className="p-3 bg-white/5 border border-cyan-800/50 rounded-md">
                  {userData?.firstName || "Not set"}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm text-gray-400 mb-1">
                  Last Name
                </label>
                <div className="p-3 bg-white/5 border border-cyan-800/50 rounded-md">
                  {userData?.lastName || "Not set"}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm text-gray-400 mb-1">
              Account Updated
            </label>
            <div className="p-3 bg-white/5 border border-cyan-800/50 rounded-md">
              {/* TODO: Add account creation date from user data */}
              {userData?.updatedAt
                ? formatFirestoreDate(userData.updatedAt)
                : "Not available"}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Credits Summary */}
          <CreditsSummary creditsData={creditsData} />

          {/* Account Actions */}
          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-cyan-800/30">
            <h2 className="text-xl font-semibold mb-4">Account Actions</h2>
            <div className="space-y-3">
              <Link
                href="/elevation"
                className="flex items-center p-3 bg-white/5 border border-cyan-800/50 rounded-md hover:bg-white/10 transition-colors"
              >
                <RiDashboardHorizontalLine className="text-cyan-400 text-2xl mr-3" />
                Elevation Dashboard
              </Link>
              <Link
                href="/elevation/summary"
                className="flex items-center p-3 bg-white/5 border border-cyan-800/50 rounded-md hover:bg-white/10 transition-colors"
              >
                <RiPieChartBoxLine className="text-cyan-400 text-2xl mr-3" />
                View Reports
              </Link>
              <Link
                href="/settings"
                className="flex items-center p-3 bg-white/5 border border-cyan-800/50 rounded-md hover:bg-white/10 transition-colors"
              >
                <RiSettings2Line className="text-cyan-400 text-2xl mr-3" />
                Settings
              </Link>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center w-full p-3 bg-red-900/20 border border-red-800/50 rounded-md hover:bg-red-900/30 transition-colors text-left"
              >
                <RiDeleteBin6Line className="text-red-400 text-2xl mr-3" />
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity - TODO: Implement activity tracking */}
      <div className="mt-6 bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-cyan-800/30">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>

        {/* TODO: Replace with actual user activity data */}
        <div className="space-y-4">
          <div className="p-4 bg-white/5 border border-cyan-800/50 rounded-md">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Website Analysis</p>
                  <p className="text-sm text-gray-400">
                    You analyzed example.com
                  </p>
                </div>
              </div>
              <span className="text-sm text-gray-400">Today</span>
            </div>
          </div>

          <div className="p-4 bg-white/5 border border-cyan-800/50 rounded-md">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Credits Purchased</p>
                  <p className="text-sm text-gray-400">You bought 50 credits</p>
                </div>
              </div>
              <span className="text-sm text-gray-400">Yesterday</span>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Account Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 p-6 rounded-lg max-w-md w-full border border-red-500">
            <h3 className="text-xl font-bold mb-2">Delete Account</h3>
            <p className="mb-6 text-gray-300">
              Are you absolutely sure you want to delete your account? This
              action is permanent and cannot be undone. All your data, including
              analysis history and settings, will be permanently removed.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
