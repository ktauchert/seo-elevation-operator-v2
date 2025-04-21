"use client";
import React, { PropsWithChildren, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import {
  getContent,
  getExtractedContent,
  getPageSpeedData,
  getSEOAnalysis,
  getSEOScoring,
  saveSEOResult,
} from "@/helper/seo-helper";
import { ElevationResultData, SEOScoring } from "../../seo_types";
import { useSession } from "next-auth/react";
import { Elevation } from "@/components/DataTable";

// Define the shape of the context value
interface SEOContextType {
  allowed: boolean;
  message: string;
  elevating: boolean;
  progress: number;
  progressMessage: string;
  url: string;
  language: "en" | "de";
  seoAnalysis: string;
  seoScoring: SEOScoring | null;
  setLanguage: (lang: "en" | "de") => void;
  updateProgress: (value: number) => void;
  startAnalysis: (url: string) => Promise<void>;
  getElevations: (
    type?: string,
    searchFilter?: { searchKey: string; searchWord: string }
  ) => Promise<{id:string, elevation: ElevationResultData}[] | null>;
}

// Define the progress messages and steps
const PROGRESS_MESSAGES = [
  "Waiting for URL...",
  "Grabbing wings...",
  "Strapping wings on...",
  "Checking wind speed...",
  "Spreading wings...",
  "Taking off...",
  "Elevation complete!",
];
const PROGRESS_STEPS = [0, 20, 40, 60, 80, 100, 100];

// Create the context with the defined type
export const SEOContext = React.createContext<SEOContextType | undefined>(
  undefined
);

const SEOProvider = (props: PropsWithChildren) => {
  const [allowed, setAllowed] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("");
  const [elevating, setElevating] = React.useState<boolean>(false);
  const [progress, setProgress] = React.useState<number>(PROGRESS_STEPS[0]);
  const [progressMessage, setProgressMessage] = React.useState<string>(
    PROGRESS_MESSAGES[0]
  );
  const [url, setUrl] = React.useState<string>("");
  const [language, setLanguage] = React.useState<"en" | "de">("en");
  const [seoAnalysis, setSEOAnalysis] = React.useState<string>("");
  const [seoScoring, setSEOScoring] = React.useState<SEOScoring | null>(null);

  const { creditsData, setNewCredits } = useAuth();
  const { data: session } = useSession();


  useEffect(() => {
    if (creditsData?.credits === 0) {
      setAllowed(false);
    } else {
      setAllowed(true);
    }
  }, [creditsData]);

  const updateProgress = (value = 0) => {
    setProgress(PROGRESS_STEPS[value]);
    setProgressMessage(PROGRESS_MESSAGES[value]);
  };

  const getElevations = async (
    type?: string,
    searchFilter?: { searchKey: string; searchWord: string }
  ) => {
    type = type || "all";
    if (!session) return null;

    const user_uid = session?.user?.id;
    if (!user_uid) return null;

    const res = await fetch("/api/seo/read", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_uid,
        type,
        searchFilter,
      }),
    });
    if (res.status !== 200) {
      console.error("Error fetching elevations", res.statusText);
      return null;
    }
    const data = await res.json();
    if (!data) return null;
    if (data.results) {
      return data.results.map((elevation: Elevation) => ({
        ...elevation,
      }));
    }
  };

  const startAnalysis = async (url: string) => {
    if (!allowed) return;

    setMessage("");
    setElevating(true);
    setUrl(url);

    // Getting Content
    updateProgress(1);
    const content = await getContent(url);
    if (!content) {
      setMessage(
        "Failed to fetch content, please check the URL and try again."
      );
      setElevating(false);
      updateProgress(0);
      return;
    }

    // Extracting Content
    updateProgress(2);
    const extraction = await getExtractedContent(content);
    if (!extraction) {
      setMessage("Failed to extract content, please try again.");
      setElevating(false);
      updateProgress(0);
      return;
    }

    // Getting PageSpeed Data
    updateProgress(3);
    const pageSpeed = await getPageSpeedData(url);
    if (!pageSpeed) {
      setMessage("Failed to fetch PageSpeed data, please try again.");
      setElevating(false);
      updateProgress(0);
      return;
    }

    // SEO Analysis
    updateProgress(4);
    const seoAnalysis = await getSEOAnalysis(extraction, pageSpeed, language);
    if (!seoAnalysis) {
      setMessage("Failed to get SEO Analysis, please try again.");
      setElevating(false);
      updateProgress(0);
      return;
    }

    // SEO Scoring
    updateProgress(5);
    const seoScoring = await getSEOScoring(extraction, pageSpeed, language);
    if (!seoScoring) {
      setMessage("Failed to get SEO Scoring, please try again.");
      setElevating(false);
      updateProgress(0);
      return;
    }

    setSEOAnalysis(seoAnalysis);
    setSEOScoring(seoScoring);

    const success = await saveSEOResult(url, seoAnalysis, seoScoring, language);

    if (success) {
      updateProgress(6);
      setMessage("SEO Result has been saved.");
      const newCredits = (creditsData?.credits ?? 0) - 1;
      setNewCredits(newCredits);
      setElevating(false);
    } else {
      setMessage("Failed to save SEO Result, please try again.");
    }
  };

  return (
    <SEOContext.Provider
      value={{
        allowed,
        message,
        elevating,
        progress,
        progressMessage,
        url,
        language,
        setLanguage,
        seoAnalysis,
        seoScoring,
        updateProgress,
        startAnalysis,
        getElevations,
      }}
    >
      {props.children}
    </SEOContext.Provider>
  );
};

// Custom hook to use the SEOContext
export const useSEOContext = () => {
  const context = useContext(SEOContext);
  if (context === undefined) {
    throw new Error("useSEOContext must be used within an SEOProvider");
  }
  return context;
};

export default SEOProvider;
