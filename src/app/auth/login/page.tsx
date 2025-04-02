"use client";

import Button from "@/components/Button";
import Card from "@/components/Card";
import { FcGoogle } from "react-icons/fc";
import { IoLogoGoogle } from "react-icons/io5";
import { signIn, signOut, useSession } from "next-auth/react";
import { useActionState, useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);

  const { data: session } = useSession();

  const handleOnGoogleLogin = async () => {
    try {
      const res = await signIn("google", {
        callbackUrl: "/",
        redirect: false,
      });
      console.log(res);
      if (res?.error) {
        setError("Login failed try again.");
      } else {
        setError(null);
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.target as HTMLFormElement).email.value;
    const password = e.currentTarget.password.value;

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
        isSignup: false,
      });
      console.log(res);
      if (res?.error) {
        setError("Login failed, try again.");
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
          {session ? (
            <div className="text-xl flex flex-col items-center">
              <p className="text-2xl my-2">Hallo, {session.user?.name}</p>
              <p className="text-lg my-4">
                You are already logged in go on and elevate you SEO{" "}
                <Link
                  className="text-cyan-800 hover:text-orange-500"
                  href={"/elevation"}
                >
                  here
                </Link>
                .
              </p>
            </div>
          ) : (
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
          )}
        </div>
      </Card>
    </section>
  );
}
