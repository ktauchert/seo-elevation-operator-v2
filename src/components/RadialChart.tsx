"use client";
import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { SEOScoring } from "../../seo_types";

// Register the required components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface Data {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}
interface Options {
  scales: {
    r: {
      angleLines: { display: boolean };
      suggestedMin: number;
      suggestedMax: number;
      pointLabels: {
        color: string; // Set the radial axis labels to white
        font: {
          size: number; // Optional: Adjust font size
          family: string; // Optional: Set font family
        };
      };
    };
  };
  plugins: {
    legend: {
      labels: {
        font: {
          size: number; // Optional: Adjust font size for legend labels
          family: string; // Optional: Set font family for legend labels
        };
        color: string; // Set legend text color to white
      };
    };
  };
}

type Props = {
  scoring: SEOScoring;
  options?: Options;
};

const scoringMap = {
  title: "Title",
  metaDescription: "Meta Description",
  headings: "Headings",
  altText: "Alt Text",
  wordCount: "Word Count",
  internalLinks: "Internal Links",
  externalLinks: "External Links",
  openGraph: "Open Graph",
  canonicalUrl: "Canonical URL",
  robotsTag: "Robots Tag",
  viewport: "Viewport",
  performance: "Performance",
};

const options = {
  scales: {
    r: {
      angleLines: { display: false },
      suggestedMin: 0,
      suggestedMax: 10,
      pointLabels: {
        color: "white", // Set the radial axis labels to white
        font: {
          size: 14, // Optional: Adjust font size
          family: "Arial", // Optional: Set font family
        },
      },
    },
  },
  plugins: {
    legend: {
      labels: {
        font: {
          size: 16, // Optional: Adjust font size for legend labels
          family: "Arial", // Optional: Set font family for legend labels
        },
        color: "white", // Set legend text color to white
      },
    },
  },
};

const RadialChart = ({ scoring }: Props) => {
  const [preparedData] = React.useMemo(() => {
    const labels = Object.keys(scoring)
      .filter((key) => key !== "overallScore") // Exclude overallScore
      .map((key) => scoringMap[key as keyof typeof scoringMap]);

    const data = Object.entries(scoring)
      .filter(([key]) => key !== "overallScore") // Exclude overallScore
      .map(([, value]) => value);

    const preparedData: Data = {
      labels,
      datasets: [
        {
          label: "SEO Scoring",
          data,
          backgroundColor: "rgba(34, 202, 236, 0.2)",
          borderColor: "rgba(34, 202, 236, 1)",
          borderWidth: 2,
        },
      ],
    };

    return [preparedData];
  }, [scoring]);

  return <Radar data={preparedData} options={options} />;
};

export default RadialChart;
