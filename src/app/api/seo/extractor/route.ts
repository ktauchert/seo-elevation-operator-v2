import * as cheerio from "cheerio";
import { NextRequest, NextResponse } from "next/server";
import { Extraction } from "../../../../../seo_types";

export async function POST(req: NextRequest) {
  const { content } = await req.json();

  if (!content) {
    return NextResponse.json({ error: "Content is required" }, { status: 400 });
  }

  try {
    const $ = cheerio.load(content);

    const title = $("title").text();
    const metaDescription = $('meta[name="description"]').attr("content");
    const headings = $("h1, h2, h3")
      .map((_, el) => $(el).text())
      .get();
    const images = $("img")
      .map((_, el) => $(el).attr("alt"))
      .get()
      .filter(Boolean);
    const bodyText = $("p, article, section").text();
    const wordCount = bodyText.split(" ").length;

    const internalLinks = $("a")
      .filter((_, el) => $(el).attr("href")?.startsWith("/") ?? false)
      .map((_, el) => $(el).attr("href"))
      .get();
    const externalLinks = $("a")
      .filter((_, el) => $(el).attr("href")?.startsWith("http") ?? false)
      .map((_, el) => $(el).attr("href"))
      .get();

    const ogTitle = $('meta[property="og:title"]').attr("content");
    const ogDescription = $('meta[property="og:description"]').attr("content");
    const ogImage = $('meta[property="og:image"]').attr("content");

    const canonicalUrl = $('link[rel="canonical"]').attr("href");
    const robots = $('meta[name="robots"]').attr("content");
    const viewport = $('meta[name="viewport"]').attr("content");

    const extraction: Extraction = {
      title,
      metaDescription,
      headings,
      images,
      wordCount,
      internalLinks,
      externalLinks,
      ogTitle,
      ogDescription,
      ogImage,
      canonicalUrl,
      robots,
      viewport,
    };

    return NextResponse.json(extraction, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to extract the content" },
      { status: 500 }
    );
  }
}
