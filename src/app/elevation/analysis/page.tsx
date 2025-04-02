"use client";
import AnalysisInfo from "@/components/AnalysisInfo";
import RadialChart from "@/components/RadialChart";
import { useSEOContext } from "@/context/SEOContext";
import React, { useEffect } from "react";

type Props = {};

const AnalysisPage = (props: Props) => {
  const [url, setUrl] = React.useState<string>("");

  const {
    allowed,
    message,
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
    <div id="analysis-page" className="w-full flex flex-col items-center">
      <h1 className="text-4xl bg-gradient-to-tr to-cyan-400 from-orange-400  bg-clip-text text-transparent my-3">
        Ready to boost your online presence?
      </h1>

      <div className="analysis-container flex flex-wrap gap-4 w-full">
        <div className="flex gap-4 mt-5 w-full">
          <div
            id="search-container"
            className="w-full md:w-1/3 h-full backdrop-blur-sm bg-slate-100/60 rounded-md p-2 border border-cyan-700 flex flex-col"
          >
            <div className="header mb-2">
              <h3 className="text-xl">Get your elevation</h3>
              <h5 className="text-md">
                Enter your URL and hit &apos;Elevate&apos; and the magic begins.
              </h5>
            </div>

            <div className="content flex-1 flex flex-col justify-end">
              <input
                type="text"
                name="url"
                id="url"
                placeholder="Enter your URL"
                className="w-full p-2 rounded-md border border-cyan-700"
                value={url}
                onChange={(e) => setUrl((e.target as HTMLInputElement).value)}
              />
              <button
                type="button"
                className="w-full p-2 mt-2 bg-cyan-500 text-slate-100 rounded-md"
                onClick={handleElevateBtn}
                disabled={!url || !allowed}
              >
                Elevate
              </button>
            </div>
          </div>

          <div
            id="info-container"
            className="w-full md:w-2/3 h-full backdrop-blur-sm bg-slate-100/60 rounded-md p-2 border border-cyan-700 flex flex-col"
          >
            <h2 className="text-xl mb-2">Progress</h2>
            <div id="progress-info-container ">
              <div className="progress-message text-2xl italic text-slate-900 flex justify-center items-center h-full">
                {progressMessage}
              </div>
              <div className="progress-bar w-full h-5 bg-slate-200 rounded-md ">
                <div
                  className={`progress h-full ${
                    progress < 100 ? "bg-cyan-600" : "bg-green-700"
                  } rounded-md`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div id="resutlts-container" className="flex flex-wrap gap-4 w-full">
          <div
            id="result-container"
            className="w-1/2 h-full bg-slate-100 rounded-md p-2 border border-cyan-700"
          >
            <div className="flex flex-col gap-2">
              <h2 className="text-xl mb-2">SEO Analysis</h2>
              {seoAnalysis && (
                <div className="analysis-result text-slate-900">
                  <AnalysisInfo analysis={seoAnalysis} />
                </div>
              )}
            </div>
          </div>
          <div className="w-[calc(50%-1rem)] bg-white rounded-md p-2 border border-cyan-700 min-h-1 h-fit">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl mb-2">SEO Scoring</h2>
              {seoScoring && <RadialChart scoring={seoScoring} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
