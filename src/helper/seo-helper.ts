
import { Extraction, SEOScoring } from "../../seo_types";
import {
  seoPrompt,
  systemPromptAnalysis,
  systemPromptScoring,
} from "@/prompts/seoPrompts";

/**
 * Get content from a given URL
 * @param url
 * @returns string | null
 */
export const getContent = async (url: string): Promise<string | null> => {
  // Call your scraper function here
  try {
    const res = await fetch("/api/seo/scraper", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
      }),
    });

    if (res.status !== 200) {
      console.log("Failed to fetch response", res);
      throw new Error("Failed to fetch response");
    }
    const data = await res.json();
    return data.content;
  } catch (error) {
    console.error("Error fetching content", error);
    return null;
  }
};

/**
 * Get extracted content from a given content
 * @param content
 * @returns Extraction | null
 */
export const getExtractedContent = async (
  content: string
): Promise<Extraction | null> => {
  try {
    const res = await fetch("/api/seo/extractor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
      }),
    });

    if (res.status !== 200) {
      throw new Error("Failed to fetch response");
    }
    const extraction: Extraction = await res.json();
    return extraction;
  } catch (error) {
    console.error("Error extracting content", error);
    return null;
  }
};

/**
 * Get page speed data from a given URL
 * @param url
 * @returns number
 */
export const getPageSpeedData = async (url: string): Promise<number> => {
  try {
    const res = await fetch("/api/seo/speed", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
      }),
    });

    if (res.status !== 200) {
      throw new Error("Failed to fetch response");
    }
    const data = await res.json();
    return data.pageSpeedData;
  } catch (error) {
    console.error("Error fetching page speed data", error);
    return 0;
  }
};

/**
 * Get Seo analysis from a given extraction, page speed data and language with the help of OpenAI
 * @param extraction
 * @param pageSpeedData
 * @param language
 * @returns
 */
export const getSEOAnalysis = async (
  extraction: Extraction,
  pageSpeedData: number,
  language: string
): Promise<string> => {
  // Call your SEO function here
  const prompt = seoPrompt(extraction, pageSpeedData);
  const languagePrompt = `Answer in ${language}.`;
  try {
    const res = await fetch("/api/seo/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt + languagePrompt,
        systemPrompt: systemPromptAnalysis,
      }),
    });

    if (res.status !== 200) {
      throw new Error("Failed to fetch response");
    }
    const data = await res.json();
    return data.content;
  } catch (error) {
    console.error("Error fetching SEO analysis", error);
    return "";
  }
};

export const getSEOScoring = async (
  extraction: Extraction,
  pageSpeedData: number,
  language: string
): Promise<SEOScoring | null> => {
  // Call your SEO function here
  const prompt = seoPrompt(extraction, pageSpeedData);
  const languagePrompt = `Answer in ${language}.`;
  try {
    const res = await fetch("/api/seo/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt + languagePrompt,
        systemPrompt: systemPromptScoring,
      }),
    });
    if (res.status !== 200) {
      throw new Error("Failed to fetch response");
    }
    const data = await res.json();
    return JSON.parse(data.content);
  } catch (error) {
    console.error("Error fetching SEO scoring", error);
    return null;
  }
};

export const saveSEOResult = async (
  url: string,
  seoAnalysisResult: string,
  seoScoringResult: SEOScoring,
  language: string
) => {
  try {
    const res = await fetch("/api/seo/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          url,
          seoAnalysisResult,
          seoScoringResult,
          language,
        },
      }),
    });

    if (res.status !== 200) {
      throw new Error("Failed to save SEO result");
    }

    const data = await res.json();
    console.log(data.message);
    return true;
  } catch (error) {
    console.error("Error saving SEO result", error);
    return false;
  }
};
