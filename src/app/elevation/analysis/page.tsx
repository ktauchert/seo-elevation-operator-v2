"use client";
import AnalysisInfo from "@/components/AnalysisInfo";
import RadialChart from "@/components/RadialChart";
import { useSEOContext } from "@/context/SEOContext";
import Link from "next/link";
import { IoArrowBack, IoBarChart, IoClipboardOutline } from "react-icons/io5";
import CreditsSummary from "@/components/CreditsSummary";
import { useState } from "react";
 

const AnalysisPage = ( ) => {
  const [url, setUrl] = useState<string>("");

  const {
    allowed,
    progress,
    progressMessage,
    startAnalysis,
    seoScoring,
    seoAnalysis,
  } = useSEOContext();

  const handleElevateBtn = () => {
    if (!url) return;
    if (!allowed) {
      alert("Please enter a valid URL.");
      return;
    }
    // check url if correct format
    const urlPattern = new RegExp(
      "^(https?:\\/\\/(www\\.)?|www\\.)[a-zA-Z0-9-]+(\\.[a-zA-Z]{2,})+([\\/\\w \\.-]*)*\\/?$"
    );
    if (!urlPattern.test(url)) {
      alert("Please enter a valid URL.");
      return;
    }
    startAnalysis(url);
  };

  return (
    <div className="p-6 w-full text-white">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">SEO Elevation Analysis</h1>
          <p className="text-gray-300 mt-2">
            Analyze and optimize your website&apos;s SEO performance
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/elevation"
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-md transition-colors flex items-center gap-2"
          >
            <IoArrowBack className="font-bold text-lg" />
            Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* URL Input Panel */}
        <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-cyan-800/30 ">
          <h2 className="text-xl font-semibold mb-4">Get Your Elevation</h2>
          <p className="text-gray-300 mb-6">
            Enter your URL and hit &apos;Elevate&apos; to start the analysis process.
          </p>

          {!allowed && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-md">
              <p>You don&apos;t have enough credits to perform an analysis.</p>
            </div>
          )}

          <div className="space-y-4">
            <input
              type="text"
              name="url"
              id="url"
              placeholder="Enter your URL"
              className="w-full p-3 rounded-md bg-white/5 border border-cyan-800/50 focus:border-cyan-400 outline-none"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button
              type="button"
              className="w-full p-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleElevateBtn}
              disabled={!url || !allowed}
            >
              Elevate
            </button>
          </div>
        </div>

        {/* Credits Panel */}
        <CreditsSummary creditsData={null} />

        {/* Progress Panel */}
        <div className=" bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-cyan-800/30">
          <h2 className="text-xl font-semibold mb-4">Analysis Progress</h2>

          <div className="flex items-center justify-center h-32">
            <div className="text-center">
              <p className="text-2xl mb-6">{progressMessage}</p>
              <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ease-out ${
                    progress < 100 ? "bg-cyan-500" : "bg-green-500"
                  }`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SEO Analysis */}
        <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-cyan-800/30 min-h-[400px]">
          <h2 className="text-xl font-semibold mb-4">SEO Analysis</h2>

          {seoAnalysis ? (
            <div className="analysis-result overflow-y-auto max-h-[580px] scrollbar scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-cyan-700 scrollbar-track-slate-700/35">
              <AnalysisInfo analysis={seoAnalysis} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <IoClipboardOutline className="text-6xl text-gray-500 mb-4" />
              <p className="text-lg text-gray-400">
                Start an analysis to see results here
              </p>
            </div>
          )}
        </div>

        {/* SEO Scoring */}
        <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-cyan-800/30 min-h-[400px]">
          <h2 className="text-xl font-semibold mb-4">SEO Scoring</h2>

          {seoScoring ? (
            <div className="flex justify-center items-center py-4">
              <RadialChart scoring={seoScoring} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <IoBarChart className="text-6xl text-gray-500 mb-4" />
              <p className="text-lg text-gray-400">
                Charts will appear after analysis
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
