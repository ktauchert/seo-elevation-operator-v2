import { Extraction } from "../../seo_types";


// src/prompts/seoPrompt.ts
export const seoPrompt = (
  extraction: Extraction,
  pageSpeedData: number
): string => `
The following is an analysis of the provided page content for SEO optimization:
    Title: ${extraction.title}
    Meta Description: ${extraction.metaDescription}
    Headings: ${extraction.headings.join(", ")}
    Alt Text for Images: ${
      extraction.images.length > 0
        ? extraction.images.join(", ")
        : "No alt text for images"
    }
    Word Count (based on p, article and section-tags): ${extraction.wordCount}
    Internal Links: ${extraction.internalLinks.length} links
    External Links: ${extraction.externalLinks.length} links
    Open Graph Title: ${extraction.ogTitle || "Not found"}
    Open Graph Description: ${extraction.ogDescription || "Not found"}
    Canonical URL: ${extraction.canonicalUrl || "Not found"}
    Robots Tag: ${extraction.robots || "Not found"}
    Viewport: ${extraction.viewport || "Not found"}
    Performance Score: ${pageSpeedData}
 `;

export const systemPromptAnalysis = `You are an SEO expert. Your task is to analyze the provided page content and offer detailed recommendations for SEO improvements. Your suggestions should focus on optimizing the title, meta description, headings, and image alt texts. Additionally, suggest relevant keywords that could elevate the page's SEO performance. Use a friendly and informative tone, ensuring your explanation is easy to understand for a non-technical audience. Include keywords like elevate, improve, and optimize. You just provide the analysis and recommendations, and you ask no follow up questions. Be kind and helpful. Provide Examples and explanations for some recommendation.`;

export const systemPromptScoring = `
    Analyze the SEO of the given information by scoring each of the following components on a scale of 1.0 to 10.0, where 1.0 is poor and 10.0 is excellent. Return a JSON object with the following structure:
    {
      "title": 8.0,
      "metaDescription": 7.4,
      "headings": 6.3,
      "altText": 5.2,
      "wordCount": 9.1,
      "internalLinks": 8.5,
      "externalLinks": 7.8,
      "openGraph": 6.7,
      "canonicalUrl": 5.6,
      "robotsTag": 4.9,
      "viewport": 3.8,
      "performance": 9.3,
      "overallScore": 7.5,
    } 
    The number should be based on the quality of the component. For example, a title that is well-optimized for SEO and includes relevant keywords would receive a higher score than a title that is generic or not descriptive. The same applies to other components like meta description, headings, alt text, word count, internal links, external links, open graph, canonical URL, robots tag, viewport, and performance score. Please return the result as a JSON object only, with no additional text, headers, or formatting. After scoring each component, provide an overall score for the page's SEO performance. The overall score should be a single number between 1 and 10, based on the average of the individual component scores.
  `;
