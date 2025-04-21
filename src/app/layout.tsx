import type { Metadata } from "next";
import localFont from "next/font/local";
import ParticlesComponent from "@/components/background/particles";

import "./globals.scss";
import CookieBanner from "@/components/utils/CookieBanner";
import AuthContextProvider from "@/context/AuthContext";
import { Suspense } from "react";
import GoogleAnalytics from "@/components/background/GoogleAnalytics";
import TopNavBar from "@/components/layout/TopNavBar";
import LeftSideBar from "@/components/layout/LeftSideBar";
import SessionWrapper from "@/components/layout/SessionWrapper";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import SEOProvider from "@/context/SEOContext";

const SUSESans = localFont({
  src: "./fonts/SUSE-VariableFont_wght.ttf",
  variable: "--font-source",
  weight: "100 400 600",
});

export const metadata: Metadata = {
  title: "SEO Elevation Operator - Enhance Your Website's SEO Performance",
  description:
    "Discover how SEO Elevation Operator can elevate your website's rankings with AI-driven insights, boosting visibility and improving user engagement.",
  authors: [{ name: "Karsten Tauchert", url: "ktauchert.de" }],
  openGraph: {
    title: "SEO Elevation Operator - Enhance Your Website's SEO Performance",
    description:
      "Discover how SEO Elevation Operator can elevate your website's rankings with AI-driven insights, boosting visibility and improving user engagement.",
    type: "website",
    url: "https://www.seo-elevation-operator.com/",
  },
  twitter: {
    site: "@SEO_Elevation",
    title: "SEO Elevation Operator - Enhance Your Website's SEO Performance",
    creator: "Karsten Tauchert",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-cyan-700 scrollbar-track-slate-700/35"
    >
      <Suspense fallback={null}>
        <GoogleAnalytics
          GA_MEAUSREMENT_ID={
            process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID as string
          }
        />
      </Suspense>
      <body
        className={`${SUSESans.className} antialiased w-full flex h-svh max-h-svh`}
      >
        <SessionWrapper>
          <AuthContextProvider>
            <SEOProvider>
              <ParticlesComponent />
              <div className="flex h-screen flex-col relative w-screen relative">
                {/* Header */}

                <div className="flex flex-1 overflow-hidden">
                  {/* Sidebar */}
                  <aside className=" w-64 lg:flex flex-col hidden m-4 pb-8 h-full">
                    <LeftSideBar />
                  </aside>

                  {/* Main Content */}
                  <main className="flex-1 overflow-auto p-4 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-cyan-700 scrollbar-track-slate-700/35">
                    <header className="sticky top-0 z-50  ">
                      <TopNavBar />
                    </header>
                    <div className="w-max-[1290px] h-full pb-4">{children}</div>
                    {/* <p>Dein scrollbarer Inhalt kommt hier hin...</p>
                  <div className="h-96 bg-gray-300 my-4"></div>
                  <div className="h-96 bg-gray-300 my-4"></div>
                  <div className="h-96 bg-gray-300 my-4"></div> */}
                  </main>
                </div>
                {/* <div className="absolute bottom-4 right-4">
                  <CreditsInfo />
                </div> */}
                {/* Mobile Navigation */}
                <nav className="sticky bottom-0 left-0 w-full py-1 flex justify-around md:hidden">
                  <MobileBottomNav />
                </nav>
              </div>
              <CookieBanner />
            </SEOProvider>
          </AuthContextProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}