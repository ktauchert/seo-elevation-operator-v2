import React from "react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="h-[calc(100svh-10rem)] flex items-center justify-center"
    >
      {/* <WaveBackground /> */}
      <article id="welcome-message" className="flex flex-col items-center">
        <div className="text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-200 mb-4">
          Welcome
        </div>
        <div className="text-3xl md:text-3xl lg:text-4xl font-semibold text-slate-200 mb-4">
          to
        </div>
        <div className="text-4xl md:text-6xl lg:text-7xl bg-gradient-to-tr font-semibold to-teal-500 from-cyan-600 bg-clip-text text-transparent mb-5 md:mb-10 text-center">
          <h1>SEO Elevation Operator</h1>
        </div>

        <div className="text-slate-200  text-2xl lg:text-5xl leading-normal mb-5 text-center">
          <h2>Elevate Your Site’s SEO Performance</h2>
        </div>
        <div className=" text-xl lg:text-3xl text-slate-200 max-w-3xl mb-1 text-center">
          Get actionable insights to boost visibility and improve site rankings
          with our AI-powered SEO analysis.
        </div>
        <div className="button-container w-full flex justify-center mt-5">
          <Link
            href={`/auth/login`}
            className="bg-orange-700 hover:bg-orange-500 text-white font-semibold rounded text-2xl py-2 px-4 animate-pulse hover:animate-none"
          >
            Get Started for Free
          </Link>
        </div>
      </article>
    </section>
  );
};

export default HeroSection;
