"use client";

import Button from "@/components/Button";
import Card from "@/components/Card";
import { FcGoogle } from "react-icons/fc";
import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [accessStatus, setAccessStatus] = useState<
    "unknown" | "pending" | "approved" | "denied"
  >("unknown");
  const [isCheckingAccess, setIsCheckingAccess] = useState(false);

  const { data: session } = useSession();
  const { userData, checkAccessStatus, requestAccess } = useAuth();

  // Check user access status when session changes
  useEffect(() => {
    if (session?.user?.email) {
      checkUserAccess(session.user.email);
    }
  }, [session]);

  const checkUserAccess = async (email: string) => {
    setIsCheckingAccess(true);
    try {
      const status = await checkAccessStatus(email);
      setAccessStatus(status);
    } catch (error) {
      console.error("Error checking access status:", error);
    } finally {
      setIsCheckingAccess(false);
    }
  };

  const handleRequestAccess = async () => {
    if (!session?.user?.email) {
      toast.error("You must be logged in to request access");
      return;
    }

    const toastId = toast.loading("Submitting access request...");

    try {
      console.log("Submitting access request for:", session.user.email);
      const status = await requestAccess(
        session.user.email,
        session.user.name || ""
      );

      toast.dismiss(toastId);
      setAccessStatus(status);

      if (status === "pending") {
        toast.success("Access request submitted successfully!");
      } else {
        toast.success(
          `Your request has already been submitted. Status: ${status}`
        );
      }
    } catch (error) {
      toast.dismiss(toastId);
      console.error("Request access error:", error);
      toast.error("Failed to submit access request. Please try again.");
    }
  };

  const handleOnGoogleLogin = async () => {
    try {
      const res = await signIn("google", {
        callbackUrl: "/auth/login",
        redirect: false,
      });

      if (res?.error) {
        setError("Login failed try again.");
      } else {
        setError(null);
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <section
      id="login"
      className="flex w-full h-full items-center justify-center"
    >
      <Card header headerText="Login" footer={false}>
        <div className="flex flex-col items-center">
          {error && <p className="text-red-500">{error}</p>}

          {!session ? (
            // Not logged in - show login button
            <div className="flex flex-col">
              <div className="tos-provacy-agreement text-lg md:text-xl text-slate-950 mb-10">
                By registering or logging in you agree to our{" "}
                <Link
                  href="/terms-policy"
                  className="text-xl text-cyan-900 hover:text-orange-700"
                >
                  Terms of Service and Privacy Policy
                </Link>
                .
              </div>

              <Button
                buttonType="button"
                buttonText="Login"
                onClick={handleOnGoogleLogin}
              >
                <span className="flex items-center">
                  <FcGoogle className="mr-3 text-3xl md:text-4xl" />
                  <span className="w-full text-center text-2xl md:text-3xl">
                    Login with Google
                  </span>
                </span>
              </Button>
            </div>
          ) : isCheckingAccess ? (
            // Checking access status
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500 mb-4"></div>
              <p className="text-lg">Checking access status...</p>
            </div>
          ) : accessStatus === "approved" ? (
            // User is approved, show success and redirect option
            <div className="text-xl flex flex-col items-center">
              <div className="bg-green-100 text-green-800 p-4 rounded-md mb-6 w-full text-center">
                <p className="text-xl">✅ Access Approved</p>
              </div>
              <p className="text-2xl mb-4">Welcome, {session.user?.name}!</p>
              <p className="text-lg mb-6">
                You have full access to SEO Elevation Operator.
              </p>
              <Link
                href="/elevation"
                className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-md transition-colors"
              >
                Go to Dashboard
              </Link>
            </div>
          ) : accessStatus === "pending" ? (
            // User has requested access but is waiting for approval
            <div className="text-xl flex flex-col items-center">
              <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md mb-6 w-full text-center">
                <p className="text-xl">⏳ Approval Pending</p>
              </div>
              <p className="text-lg mb-4">Hello, {session.user?.name}</p>
              <p className="text-base mb-6 text-center">
                Your access request is being reviewed by our team. You'll
                receive an email when your access is approved.
              </p>
              <button
                onClick={() => signIn("google", { callbackUrl: "/auth/login" })}
                className="text-cyan-800 hover:text-cyan-600"
              >
                Refresh Status
              </button>
            </div>
          ) : accessStatus === "denied" ? (
            // User was denied access
            <div className="text-xl flex flex-col items-center">
              <div className="bg-red-100 text-red-800 p-4 rounded-md mb-6 w-full text-center">
                <p className="text-xl">❌ Access Denied</p>
              </div>
              <p className="text-lg mb-4">Hello, {session.user?.name}</p>
              <p className="text-base mb-6 text-center">
                Unfortunately, your access request was denied. If you believe
                this is a mistake, please contact our support team.
              </p>
              <a
                href="mailto:support@seo-elevation-operator.com"
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors"
              >
                Contact Support
              </a>
            </div>
          ) : (
            // User is logged in but hasn't requested access yet
            <div className="text-xl flex flex-col items-center">
              <div className="bg-blue-100 text-blue-800 p-4 rounded-md mb-6 w-full text-center">
                <p className="text-xl">🔒 Restricted Access</p>
              </div>
              <p className="text-lg mb-4">Hello, {session.user?.name}</p>
              <p className="text-base mb-6 text-center">
                SEO Elevation Operator is available by request only. Click below
                to request access to the platform.
              </p>
              <Button
                buttonType="button"
                buttonText="Request Access"
                onClick={handleRequestAccess}
              />
            </div>
          )}
        </div>
      </Card>
    </section>
  );
}
