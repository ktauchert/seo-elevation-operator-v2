import React from "react";
import { CreditsData } from "../../auth_types";
import Link from "next/link";

const CreditsSummary = ({
  creditsData,
  classes = "",
}: {
  creditsData: CreditsData | null;
  classes?: string;
}) => {
  return (
    <div
      className={`bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-cyan-800/30 ${classes}`}
    >
      <h2 className="text-xl font-semibold mb-4">Credits</h2>
      <div className="bg-white/5 p-4 rounded-lg border border-cyan-800/50 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span>Available Credits</span>
          <span className="font-bold">{creditsData?.credits || 0}</span>
        </div>
        <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-cyan-500"
            style={{
              width: `${
                ((creditsData?.credits || 0) /
                  (creditsData?.maxCredits || 100)) *
                100
              }%`,
            }}
          ></div>
        </div>
        <div className="text-right text-xs text-gray-400">
          {creditsData?.credits || 0} of {creditsData?.maxCredits || 0}
        </div>
      </div>
      <Link
        href="/pricing"
        className="block text-center py-2 px-4 bg-gradient-to-r from-cyan-600 to-blue-500 hover:from-cyan-700 hover:to-blue-600 rounded-md transition-colors"
      >
        Buy More Credits
      </Link>
    </div>
  );
};

export default CreditsSummary;
