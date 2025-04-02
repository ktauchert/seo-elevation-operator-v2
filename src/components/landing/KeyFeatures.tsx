import React from "react";

import { IoSearch } from "react-icons/io5";
import { IoBarChartOutline } from "react-icons/io5";
import { IoTrendingUp } from "react-icons/io5";
import { IoClipboardOutline } from "react-icons/io5";
import { IoLogoEuro } from "react-icons/io5";

const features = [
  {
    icon: <IoSearch className="md:h-16 md:w-16 w-12 h-12" />,
    title: "SEO Analysis",
    description:
      "Gain deep insights into your website’s SEO performance with comprehensive analysis of essential elements like metadata, headings, page structure, and image optimization. Our app provides actionable recommendations to help you make impactful improvements.",
  },
  {
    icon: <IoBarChartOutline className="md:h-16 md:w-16 w-12 h-12" />,
    title: "Content Scoring",
    description:
      "Using advanced AI-driven scoring, the app evaluates your content against SEO best practices, providing you with a clear score and guidance to improve. From keyword density to readability, each score is crafted to help boost your content’s search engine visibility.",
  },
  {
    icon: <IoTrendingUp className="md:h-16 md:w-16 w-12 h-12" />,
    title: "Progress Tracking",
    description:
      "See the evolution of your SEO efforts over time with our progress tracking feature. Compare scores from previous analyses, allowing you to visualize improvement and understand what strategies are working effectively.",
  },
  {
    icon: <IoClipboardOutline className="md:h-16 md:w-16 w-12 h-12" />,
    title: "User-Friendly Dashboard",
    description:
      "Our intuitive dashboard puts essential information at your fingertips, with clear visualizations and an organized layout. Navigate easily between pages and access in-depth insights without any hassle, perfect for beginners and experts alike.",
  },
  {
    icon: <IoLogoEuro className="md:h-16 md:w-16 w-12 h-12" />,
    title: "Flexible, Free and Paid Pricing",
    description:
      'First 5 uses are free. Coming Later: After that our adaptable pricing model is designed for flexibility: users start with free credits and can unlock additional analyses as needed by purchasing credits or via integration with "Buy Me a Coffee," this model provides a simple way for users to support the app’s development while gaining access to more advanced features, all without a monthly subscription.',
  },
];

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className="p-5 border  rounded-lg backdrop-blur-sm bg-slate-100/20 shadow-md shadow-cyan-600 border-cyan-400">
    <div className="text-6xl text-cyan-500 flex flex-col items-center mb-5">
      <div className="w-full flex justify-center items-center mb-5">{icon}</div>
      <h3 className="text-center text-3xl md:text-4xl font-semibold text-cyan-500">
        {title}
      </h3>
    </div>
    <div>
      <p className="text-xl md:text-2xl text-slate-100">{description}</p>
    </div>
  </div>
);

const KeyFeatures = () => (
  <section id="key-features" className="h-full flex flex-col px-5 ">
    {/* <WaveBackground /> */}
    <h2 className="flex text-4xl md:text-6xl items-center justify-center font-bold text-slate-100 mt-20 mb-10 w-full relative">
      <span className="absolute top-1/2 -right-1/2 -translate-x-1/2 w-full h-10 bg-gradient-to-r from-transparent to-transparent via-cyan-600"></span>
      <span
        className="relative"
        style={{ textShadow: "0px 3px 3px #003942ed" }}
      >
        Key Features
      </span>
    </h2>
    <article className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </article>
  </section>
);

export default KeyFeatures;
